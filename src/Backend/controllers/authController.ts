import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const login = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.send("login")
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).send();
    } catch (error) {
        console.log(error);
    }
};


export = { login, register };