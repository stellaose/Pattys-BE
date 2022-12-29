import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js'
import dotenv from 'dotenv'

dotenv.config();

const db = `mongodb+srv://${process.env.DB_DATABASE}:${process.env.DB_PASSWORD}@${process.env.DB_USER}.ma5qp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// ? Opening database connection before each test
beforeEach(async () => {
    await mongoose.connect(db);
});
  
describe("POST /v1/user/register", () => {
    it("responds with json", async () => {
        const res = await request(app).post("/v1/user/register")
        .send({email: 'testdev@dev.com', password: '1234567'})
        .set('Accept', 'application/json')
        
        expect(res.status).toBe(400)
        expect(res.statusCode).toBe(400)
    });
});

  
//   * Closing database connection after each test. 
  afterEach(async () => {
    await mongoose.connection.close();
});
  
  
