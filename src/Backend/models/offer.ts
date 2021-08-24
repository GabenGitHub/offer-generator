import mongoose, { model } from 'mongoose';
import { Status } from './status';

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
    amount:     { type: Number },
    status:     { type: Number, default: Status.unProcessed },
    pricePerPc: { type: Number },
    totalPrice: { type: Number },
    myMessage:  { type: String },
    date:       { type: Date, default: Date.now, required: true },
});

export = model('Offer', offerSchema);