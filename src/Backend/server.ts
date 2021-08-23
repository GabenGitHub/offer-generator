import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import offerRoutes from './routes/offerRoutes';
import authRoutes from './routes/authRoutes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initPassport from './config/passportConfig';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocs from './swagger/swagger.json';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// SWAGGER
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Passport
const SECRET: string = process.env.SECRET || "supersecret";

const sessionOptions = {
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}

app.use(session(sessionOptions));
app.use(cookieParser(SECRET));
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api", offerRoutes);
app.use("/api", authRoutes);

// Middleware
app.use(errorHandler);

export = app;