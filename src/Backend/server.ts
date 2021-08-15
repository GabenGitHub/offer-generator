import {Request, Response} from 'express';
import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import offerRoutes from './routes/offerRoutes';

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
app.use("/api/offer", offerRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
});

// Middleware
app.use(errorHandler);

export = app;