import app from './server.js';
import databaseConnection from './Database/index.js';

const port = process.env.PORT || 3500;

databaseConnection.getConnect();

app.listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`
    );
});