import z from "zod"
import 'express';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const SignUpSchema = z.object({
    email : z.string().email( { message : "Plese Provide Valid Email"}),
    username : z.string().min(5 , {message : "5 Word Require "}).max(10 , { message : "10 Words Require"}),
    password : z.string(),
    firstname : z.string(),
    lastname : z.string(),
})
export const LoginSchema = z.object({
    email : z.string().email( { message : "Plese Provide Valid Email"}),
    password : z.string(),
})

