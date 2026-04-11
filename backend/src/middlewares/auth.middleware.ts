import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

type AuthRequest = Request & { userId?: string };

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) return res.status(401).json({ message: "Unauthorized" });

    const token = authorization.startsWith("Bearer ")
        ? authorization.split(" ")[1]
        : authorization;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const { user } = jwt.verify(token, config.jwtSecret) as {
            user: { _id: string };
        };

        req.userId = user._id;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
