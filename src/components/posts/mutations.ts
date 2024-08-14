import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePostAction } from "./actions"
import { PostData, PostsPage } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import { usePathname, useRouter } from "next/navigation";

export const useDeletePostMutation = () => {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const router = useRouter()
    const pathname = usePathname()


    const mutation = useMutation({

        mutationFn: deletePostAction,
        onSuccess: async (deletedPost) => {
            const queryFilters: QueryFilters = { queryKey: ["post-feed"] }

            await queryClient.cancelQueries(queryFilters);

            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(queryFilters, (oldData) => {
                if (!oldData) return
                return {
                    pageParams: oldData.pageParams,
                    pages: oldData.pages.map(page => ({
                        nextCursor: page.nextCursor,
                        posts: page.posts.filter(p => p.id !== deletedPost.id)
                    }))
                }
            })

            toast({ description: "Post delete" })

            if (pathname === `/posts/${deletedPost.id}`) {
                router.push(`/users/${deletedPost.user.username}`)
            }
        },
        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to delete post.Please try again"
            })

        }

    })

    return mutation;
}