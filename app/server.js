import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import "./utils/envFile.util.js"; // Load data from the .env file
import handleError from "./middleware/errorHandler.js";
import NotFoundError from "./entities/error/notFound.error.js";
import usersRouter from './routes/users.routes.js';
import mongoose from 'mongoose';
import resturantsRouter from './routes/resturants.routes.js';


const app = express();

const corsOptions = {
    credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/resturants', resturantsRouter);

app.use((req, res, next) => {
    next(new NotFoundError({ message: "Not Found" }));
});

handleError(app);

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGO_URL
).then(result => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
})