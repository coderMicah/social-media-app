"use server"

import { validatedRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { getPostDataInclude } from "@/lib/types"

export async function deletePostAction(id: string) {

    const { user } = await validatedRequest()

    if (!user) throw new Error("Unauthorized")

    const post = await prisma.post.findUnique({ where: { id } })

    if (!post) throw new Error("Post not found")

    if (post.userId !== user.id) throw new Error("Unauthorized")

    const deletedPost = await prisma.post.delete({ where: { id }, include: getPostDataInclude(user.id) })
    return deletedPost;
}