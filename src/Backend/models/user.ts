import mongoose, { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    created:    { type: Date, default: Date.now, required: true },
});

export = model('User', userSchema);