import { Request, Response } from "express";

const offer = (req: Request, res: Response) => {
    console.log(req.body);
    const { areas } = req.body;

    // TODO: save to DB
    res.send(areas)
}

export = offer;