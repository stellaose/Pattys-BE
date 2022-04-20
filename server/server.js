import app from './app.js';
import databaseConnection from './Database/index.js';
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 3500;

// Handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1)
})

databaseConnection.getConnect();

const server = app.listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`
    );
}); 

// Unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled rejection');

    server.close(() => {
        process.exit(1);
    });
})