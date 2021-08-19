import { Request, Response } from "express";
import Offer from "../models/offer";

const offer = async (req: Request, res: Response) => {
    const { areas, name, company, email, message, amount } = req.body;

    const newOffer = new Offer({
        areas,
        name,
        company,
        email,
        message,
        amount
    });

    await newOffer.save();
    res.status(201).send();
}

export = offer;