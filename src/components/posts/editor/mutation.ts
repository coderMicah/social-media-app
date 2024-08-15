import { useToast } from "@/components/ui/use-toast";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { submitPost } from "./action";
import { PostsPage } from "@/lib/types";
import { useSession } from "@/app/(main)/SessionProvider";


export function useSubmitPostMutation() {
    const { toast } = useToast()
    const { user } = useSession();
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: submitPost,
        onSuccess: async (newPost) => {

            // we could invalidate queries but that would result into longer delay we will have 
            // to wait for the infinte queries to finish fetching to be able to show the new added post 
            // queryClient.invalidateQueries({queryKey: ["post-feed", "for-you"]})

            //alternaively we can update the cache
            // make query filters include also posts with userId
            const queryFilter = {
                queryKey: ["post-feed"],
                predicate(query) {
                    return (
                        query.queryKey.includes("for-you") ||
                        (query.queryKey.includes("user-posts") &&
                            query.queryKey.includes(user.id))
                    );
                },
            } satisfies QueryFilters;

            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries(queryFilter)

            // Optimistically update to the new value (update the cache)
            await queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(queryFilter, (oldData) => {
                const firstpage = oldData?.pages[0];
                if (firstpage) {
                    return {
                        pageParams: oldData.pageParams,
                        pages: [
                            {
                                posts: [newPost, ...firstpage.posts],
                                nextCursor: firstpage.nextCursor
                            },
                            ...oldData.pages.slice(1)
                        ]
                    }
                }
            })

            //if we want to post b4 the feed is shown(cache is empty)
            queryClient.invalidateQueries({
                queryKey: queryFilter.queryKey,
                predicate(query) {
                    return queryFilter.predicate(query) && !query.state.data;
                },
            })

            toast({ description: "Post created" })
        },
        onError: (error) => {
            console.error(error)
            toast({
                variant: "destructive",
                description: "Failed to post please try again"
            })
        }
    })

    return mutation;
}