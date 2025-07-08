import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = `mongodb+srv://${process.env.DB_DATABASE}:${process.env.DB_PASSWORD}@${process.env.DB_USER}.y9jncnc.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

const databaseConnection = {
  getConnect: () => {
    mongoose
      .connect(db)
      .then(() => console.log("Database Connected Successfully"));
  },
};

export default databaseConnection;
