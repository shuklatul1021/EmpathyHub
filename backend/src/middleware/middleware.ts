import { NextFunction , Response ,  Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/import";


export const UserAuth = async(req : Request , res : Response, next : NextFunction)=>{
    const token = req.headers.token;
    if(!token){
        res.status(403).send({
            message : 'Token Require'
        })
        return;
    }
    try{
        const VerifyToken = await jwt.verify(token as string , JWT_SECRET);
        if(!VerifyToken){
            res.status(403).send({
                message : "Wrong Token"
            })
            return;
        }
        if(VerifyToken && typeof VerifyToken !== "string"){
            req.userId = VerifyToken.id;
            next()
        }
    }catch(e){
        console.log(e);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}