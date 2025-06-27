"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const import_1 = require("../config/import");
const UserAuth = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.status(403).send({
            message: 'Token Require'
        });
        return;
    }
    try {
        const VerifyToken = await jsonwebtoken_1.default.verify(token, import_1.JWT_SECRET);
        if (!VerifyToken) {
            res.status(403).send({
                message: "Wrong Token"
            });
            return;
        }
        if (VerifyToken && typeof VerifyToken !== "string") {
            req.userId = VerifyToken.id;
            next();
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};
exports.UserAuth = UserAuth;
