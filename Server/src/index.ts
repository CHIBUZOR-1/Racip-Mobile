import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import { connectDB } from './db';
import favouritesRouter from './favouriteRoutes';

dotenv.config();
const app: Application = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// 🔑 Clerk middleware
app.use(clerkMiddleware());

app.use('/fav', favouritesRouter);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});
