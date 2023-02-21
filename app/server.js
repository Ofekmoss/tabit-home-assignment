import express from 'express';
import bodyParser from 'body-parser';
import "./utils/envFile.util.js"; // Load data from the .env file
import NotFoundError from "./errors/notFound.error.js";
import usersRouter from './routes/users.routes.js';
import mongoose from 'mongoose';
import resturantsRouter from './routes/resturants.routes.js';
import TabitError from './errors/tabit.error.js';
import { StatusCodes } from 'http-status-codes';
import { sendErrorResponse } from './utils/responseFormatter.utils.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/resturants', resturantsRouter);

app.use((req, res, next) => {
    next(new NotFoundError({ message: "Not Found" }));
});

app.use((error, request, response, next) => {
    const errorCode = (error instanceof TabitError) ? error.code : StatusCodes.INTERNAL_SERVER_ERROR;
    return sendErrorResponse(error, errorCode, response);
});

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGO_URL
).then(result => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
})