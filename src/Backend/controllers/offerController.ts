import { Request, Response } from "express";
import Offer from "../models/offer";

const postOffer = async (req: Request, res: Response) => {
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
};

const getOffers = async (req: Request, res: Response) => {
    const offers = await Offer.find({});
    res.status(200).send(offers);
};

const getOffer = async (req: Request, res: Response) => {
    const offer = await Offer.findById(req.params.id);
    res.status(200).send(offer);
};

const deleteOffer = async (req: Request, res: Response) => {
    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).send();
};

const modifyOffer = async (req: Request, res: Response) => {
    await Offer.findByIdAndUpdate(req.params.id, req.body.data);
    res.status(200).send();
};

export = { postOffer, getOffers, getOffer, deleteOffer, modifyOffer };