import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import offerRoutes from './routes/offerRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000",
    //   credentials: true,
    })
);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use("/api", offerRoutes);
app.use("/api", authRoutes);

// Middleware
app.use(errorHandler);

export = app;