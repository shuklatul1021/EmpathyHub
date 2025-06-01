import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

export const prismaclient = new PrismaClient();
export const JWT_SECRET = "AtulShuklaTest1021@new"