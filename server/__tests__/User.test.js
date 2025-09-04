import request from "supertest";
import app from "../app.js";
import dotenv from "dotenv";
import { User } from "../user/Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config({ quiet: true });

const mockResetToken = "mock-reset-token";
const mockHashedToken = "mock-hashed-token";

jest.mock("../user/Models/UserModel.js", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    find: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
  genSaltSync: jest.fn(() => "mock-salt"),
  hashSync: jest.fn((password, salt) => `mock-hash-${password}-${salt}`),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("../Utils/validateEmail", () => ({
  validateEmail: jest.fn(() => false),
}));

jest.mock("../Utils/SendEmail.js", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true),
}));

jest.mock("crypto", () => ({
  randomBytes: () => mockResetToken,
  createHash: () => ({
    update: () => ({
      digest: () => mockHashedToken,
    }),
  }),
  getHashes: () => [],
}));

// ? clearing all mocks before each test
beforeEach(async () => {
  jest.clearAllMocks();
});

// ` create user
describe("POST /v1/user/auth/register", () => {
  // ' Negative test
  it("throws an error", async () => {
    const mockData = {
      firstname: "Ese",
      lastname: "Mercy",
      email: "ese@yopmail.com",
    };
    User.create.mockResolvedValue(mockData);
    const res = await request(app)
      .post("/v1/user/auth/register")
      .send(mockData)
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please fill all fields");
  });

  // ' Negative test
  it("throws an error", async () => {
    const mockData = {
      firstname: "Ese",
      lastname: "Mercy",
      email: "ese",
      password: "EseMercy1234.",
      avatar: {
        public_id: "public_id",
        url: "https://res.cloudinary.com/stellaose",
      },
    };

    User.create.mockResolvedValue(mockData);

    const res = await request(app)
      .post("/v1/user/auth/register")
      .send(mockData)
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please enter a valid email");
  });

  // ' Negative test
  it("should throw an error", async () => {
    const mockData = {
      firstname: "Ese",
      lastname: "Mercy",
      email: "ese@yopmail.com",
      password: "EseMe.",
      avatar: {
        public_id: "public_id",
        url: "https://res.cloudinary.com/stellaose",
      },
    };

    User.create.mockResolvedValue(mockData);

    const res = await request(app)
      .post("/v1/user/auth/register")
      .send(mockData)
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "Password must not be less than 7 characters"
    );
  });

  // ' Negative test
  it("should find user", async () => {
    const mockData = {
      firstname: "Ese",
      lastname: "Mercy",
      email: "ese@yopmail.com",
      password: "EseMercy1234.",
      avatar: {
        public_id: "public_id",
        url: "https://res.cloudinary.com/stellaose",
      },
    };

    User.findOne.mockResolvedValue(mockData);

    const res = await request(app)
      .post("/v1/user/auth/register")
      .send(mockData)
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "This email exist already Please log in now."
    );
  });

  // # Positive test
  it("responds with json", async () => {
    User.findOne.mockResolvedValue(null);

    const mockData = {
      firstname: "Ese",
      lastname: "Mercy",
      email: "ese@yopmail.com",
      password: "EseMercy1234.",
      avatar: {
        public_id: "public_id",
        url: "https://res.cloudinary.com/stellaose",
      },
    };

    User.create.mockResolvedValue(mockData);

    const res = await request(app)
      .post("/v1/user/auth/register")
      .send(mockData)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("User created successfully");
  });
});

// ' login user
describe("POST /v1/user/auth/login", () => {
  // & Negative Test
  it("should throw an error", async () => {
    const mockData = {
      email: "stella@yopmail.com",
    };

    User.create.mockResolvedValue(mockData);

    const res = await request(app)
      .post("/v1/user/auth/login")
      .send(mockData)
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("All fields must be provided");
  });

  // & Negative Test
  it("should throw an error", async () => {
    const mockData = {
      email: "nonexistent@example.com",
      password: "EseMercy1234.",
    };

    // Mock the method chaining pattern: User.findOne().select()
    const mockQuery = {
      select: jest.fn().mockResolvedValue(null),
    };
    User.findOne.mockReturnValue(mockQuery);

    const res = await request(app)
      .post("/v1/user/auth/login")
      .send(mockData)
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("This email does not exist. Please sign up");
  });

  // ~ Positive test
  it("responds with json", async () => {
    const mockData = {
      email: "ese@yopmail.com",
      password: "EseMercy1234.",
    };
    const mockQuery = {
      select: jest.fn().mockReturnThis(null),
    };

    User.findOne.mockReturnValue(mockQuery);

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockResolvedValue("token");

    const res = await request(app)
      .post("/v1/user/auth/login")
      .send(mockData)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.message).toBe("Login successful");
  });
});

// = forget password
describe("POST /v1/user/auth/forget-password", () => {
  it("should send a password reset email", async () => {
    const mockEmail = "user@example.com";
    const mockUser = {
      email: mockEmail,
      password: "password123",
      resetPasswordToken: undefined,
      resetPasswordExpire: undefined,
      save: jest.fn().mockResolvedValue(true),
    };

    User.findOne.mockResolvedValue(mockUser);

    const res = await request(app)
      .post("/v1/user/auth/forget-password")
      .send({ email: mockEmail })
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should return an error if email is not found", async () => {
    const mockEmail = "non-existent-email@example.com";

    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/v1/user/auth/forget-password")
      .send({ email: mockEmail })
      .set("Accept", "application/json");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("This email does not exist");
  });
});

// - reset password
