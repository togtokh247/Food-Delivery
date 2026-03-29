import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type AuthRequest = Request & { userId?: string };

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) return res.status(401).json({ message: "Unauthorized" });

    const token = authorization.split(" ")[1] as string;

    try {
        const { user } = jwt.verify(token, "isthissecret") as { user: { _id: string } };

        req.userId = user._id;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
