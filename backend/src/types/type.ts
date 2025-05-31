import z from "zod"

export const SignUpSchema = z.object({
    email : z.string().email( { message : "Plese Provide Valid Email"}),
    username : z.string().min(5 , {message : "5 Word Require "}).max(10 , { message : "10 Words Require"}),
    firstname : z.string(),
    lastname : z.string(),
    bio : z.string()
})
export const LoginSchema = z.object({
    email : z.string().email( { message : "Plese Provide Valid Email"}),
    username : z.string().min(5 , {message : "5 Word Require "}).max(10 , { message : "10 Words Require"}),
    firstname : z.string(),
    lastname : z.string(),
    bio : z.string()
})