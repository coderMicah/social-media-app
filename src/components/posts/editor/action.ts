"use server"

import { validatedRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { createpostSchema } from "@/lib/validation"

export const submitPost = async (input:string) => {
   const {user} = await validatedRequest()
   if(!user) throw new Error("Unathorized")

    const {content} = createpostSchema.parse({content:input})
    await prisma.post.create({
        data:{
            content,
            userId:user.id
        }
    })
}