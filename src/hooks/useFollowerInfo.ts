import kyInstance from "@/lib/ky";
import { IFollowerInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";


const useFollowerInfo = (userId: string, initialState: IFollowerInfo) => {

    const query = useQuery({
        queryKey: ["follower-info", userId],
        queryFn: () => kyInstance.get(`/api/users/${userId}/followers`).json<IFollowerInfo>(),
        initialData: initialState,
        staleTime: Infinity
    })


    return query;

}

export default useFollowerInfo;