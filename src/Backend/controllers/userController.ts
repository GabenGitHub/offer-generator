import { Request, Response } from "express";
import User from "../models/user";

const getUsers = async (req: Request, res: Response) => {
    const users = await User.find({});
    res.status(200).send(users);
}

const getUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
}

const modifyUser = async (req: Request, res: Response) => {
    await User.findByIdAndUpdate(req.params.id, req.body.data);
    const foundUser = await User.findById(req.params.id);
    
    if (!foundUser) {
        return;
    };

    const userDto = {
        name: foundUser.name,
        email: foundUser.email,
    };
    res.status(200).send(userDto);
}

const deleteUser = async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send();
}

export = { getUsers, getUser, modifyUser, deleteUser };