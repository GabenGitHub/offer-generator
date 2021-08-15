import { Request, Response, NextFunction } from "express";

export = (err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: "Server error" });
	console.log("Server error: ", err);
	next();
};