import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = `mongodb+srv://${process.env.DB_DATABASE}:${process.env.DB_PASSWORD}@${process.env.DB_USER}.ma5qp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const databaseConnection = {
    getConnect: () => {
        mongoose
            .connect(db, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => console.log('Database Connected Successfully'))
    }
}

export default databaseConnection;