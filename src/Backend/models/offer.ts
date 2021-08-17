import mongoose, { model } from 'mongoose';

const areaSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    population: { type: Number, required: true },
});

const offerSchema = new mongoose.Schema({
    areas:      [{ type: areaSchema, required: true }],
    name:       { type: String, required: true },
    company:    { type: String, required: true },
    email:      { type: String, required: true },
    message:    { type: String },
    date:       { type: Date, default: Date.now, required: true },
});

export = model('Offer', offerSchema);