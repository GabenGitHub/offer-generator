import app from './server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_CONNECTION: string = process.env.DB_CONNECTION!;

const config = {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}

const connectDB = async (): Promise<void> => {
    await mongoose.connect(DB_CONNECTION, config)
        .then(() => console.log("MongoDB connected..."))
        .catch((err: any) => console.log("MongoDB NOT connected ", err));
};

connectDB();

app.listen(4300, () => {
    console.log('listening on 4300');
});