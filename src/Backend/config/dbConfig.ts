import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_CONNECTION: string = process.env.DB_CONNECTION!;

const connectDB = async (): Promise<void> => {
    await mongoose.connect(DB_CONNECTION)
        .then(() => console.log("MongoDB connected..."))
        .catch((err: any) => console.log("MongoDB NOT connected ", err));
};

export default connectDB;