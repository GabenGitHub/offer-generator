import mongoose, { model } from 'mongoose';
import IUser from './IUser';

const userSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    created:    { type: Date, default: Date.now, required: true },
});

const userModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);
export default userModel;