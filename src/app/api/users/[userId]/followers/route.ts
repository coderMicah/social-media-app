import { validatedRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { IFollowerInfo } from "@/lib/types";


export async function GET(req: Request, { params: { userId } }: { params: { userId: string } }) {

    try {
        const { user: loggedInUser } = await validatedRequest()
        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                followers: {
                    where: {
                        followerId: loggedInUser.id
                    },
                    select: {
                        followerId: true
                    }
                },
                _count: {
                    select: {
                        followers: true
                    }
                }
            }
        })

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 })
        }

        const data: IFollowerInfo = { followers: user._count.followers, isFollowedByUser: !!user.followers.length }
        return Response.json(data)

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server error" }, { status: 500 })
    }
}


export async function POST(req: Request, { params: { userId } }: { params: { userId: string } }) {
    try {

        const { user: loggedInUser } = await validatedRequest()
        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        await prisma.follow.upsert({
            where:{
                followerId_followingId :{
                    followerId:loggedInUser.id,
                    followingId:userId
                }
            },
            create:{
                followerId:loggedInUser.id,
                followingId:userId
            },
            update:{ }
        })

        return new Response
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server error" }, { status: 500 })
    }
}


export async function DELETE(req: Request, { params: { userId } }: { params: { userId: string } }) {
    try {

        const { user: loggedInUser } = await validatedRequest()
        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        await prisma.follow.deleteMany({
            where:{followerId:loggedInUser.id,
                followingId:userId}
        })

        return new Response
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server error" }, { status: 500 })
    }
}

