import { z } from "zod"

const requiredString = z.string().trim().min(1, "Required")
export const signUpSchema = z.object({
    email: requiredString.email("Invalid email address"),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, - and _ allowed"
    ),
    password: requiredString.min(8, "Must atleast be 8 characters")

})
export const loginSchema = z.object({
    username: requiredString,
    password: requiredString
})

export const createpostSchema = z.object({
   content:requiredString
})

export type SignUpValues = z.infer<typeof signUpSchema>
export type loginValues = z.infer<typeof loginSchema>


