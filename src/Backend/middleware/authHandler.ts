import { Request, Response, NextFunction } from "express";

const loginRequire = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).send();
    }

    next();
}

export = loginRequire;