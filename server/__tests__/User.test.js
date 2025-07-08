import request from "supertest";
import app from "../app.js";
import dotenv from "dotenv";
import { User } from "../admin/Models/UserModel.js";

dotenv.config({ quiet: true });
jest.mock("../Models/UserModel.js", () => ({
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

const mockQuery = {
  select: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  exec: jest.fn(),
};


// ? clearing all mocks before each test
beforeEach(async () => {
  jest.clearAllMocks();
});

describe("POST /v1/user/register", () => {
  it("responds with json", async () => {
    const res = await request(app)
      .post("/v1/user/register")
      .send({ email: "testdev@dev.com", password: "1234567" })
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.statusCode).toBe(400);
  });
});


