import { AreaProperties } from "./area-properties";

export interface Offer {
    id: string,
    areas: AreaProperties,
    name: string,
    company: string,
    email: string,
    message: string,
    amount: number,
    status: string,
    pricePerPc: number,
    totalPrice: number,
    myMessage: string,
    date: Date,
}
