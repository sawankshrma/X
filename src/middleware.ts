import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
const JWT_SECRET = process.env.JWT_SECRET ?? '';

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token)  {
        return res.status(403).json({
                message: "Unauthorized"
                });}

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    if (!decoded) {
        res.status(403).json({
            message: "Unathorised"
        })
        return;
    }
    // @ts-ignore
    req.userId = decoded.id;
    next();

}