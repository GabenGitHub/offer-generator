import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import passport from "passport";

const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("User does not exist.");
        else {
            req.logIn(user, async (err) => {
                if (err) throw err;
                const foundUser = await User.findOne({ email: req.body.email }).exec();

                if (!foundUser) {
                    return;
                }

                const userDto = {
                    name: foundUser.name,
                    email: foundUser.email,
                };
                res.json({ user: userDto });
            });
        }
    })(req, res, next);
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

const logout = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isUnauthenticated()) {
        res.status(401);
        res.json({ message: "Unauthorized" });
    } else {
        req.logout();
        req.session.destroy(function(err){
            if (err){
               console.log(err);
            }
        });
        res.json({ message: "Logout success" });
    }
};


export = { login, register, logout };