import mongoose, { model } from 'mongoose';
import { Status } from './statusEnum';

const areaSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    mailbox:    { type: Number, required: true },
});

const offerSchema = new mongoose.Schema({
    areas:      [{ type: areaSchema, required: true }],
    name:       { type: String, required: true },
    company:    { type: String, required: true },
    email:      { type: String, required: true },
    message:    { type: String },
    amount:     { type: Number },
    status:     { type: String, default: Status.UNPROCESSED },
    pricePerPc: { type: Number },
    totalPrice: { type: Number },
    myMessage:  { type: String },
    date:       { type: Date, default: Date.now, required: true },
});

offerSchema.virtual('id').get(function(): mongoose.VirtualType {
    // @ts-ignore
    return this._id;
});
offerSchema.set('toJSON', { virtuals: true });

export = model('Offer', offerSchema);