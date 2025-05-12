import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headersToken = req.headers['authorization']
    console.log(headersToken);

    if (headersToken != undefined && headersToken.startsWith('Bearer')) {
        try {
            const token = headersToken.slice(7)
            jwt.verify(token, process.env.SECRET_KEY || "TSE-Nahuel-Alaniz")
            next()
        } catch (error) {
            res.status(401).json({
                msg: `Token Invalida`
            })
        }

    } else {
        res.status(401).json({
            msg: `Acceso Denegado`
        })

    }
}

export default validateToken