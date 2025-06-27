"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
require("express");
exports.SignUpSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Plese Provide Valid Email" }),
    username: zod_1.default.string().min(5, { message: "5 Word Require " }).max(10, { message: "10 Words Require" }),
    password: zod_1.default.string(),
    firstname: zod_1.default.string(),
    lastname: zod_1.default.string(),
});
exports.LoginSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Plese Provide Valid Email" }),
    password: zod_1.default.string(),
});
