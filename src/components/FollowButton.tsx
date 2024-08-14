"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { IFollowerInfo } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";

interface IFollowerButtonProps {
  userId: string;
  initialState: IFollowerInfo;
}

const FollowButton = ({ userId, initialState }: IFollowerButtonProps) => {
  const { data } = useFollowerInfo(userId, initialState);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
  });

  return (
    <Button variant={data.isFollowedByUser ? "secondary" : "default"} onClick={() => mutate()}>
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
