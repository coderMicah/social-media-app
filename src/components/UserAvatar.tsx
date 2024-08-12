import Image from "next/image";
import avatarPlaiceholderImg from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

interface IUserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, size, className }: IUserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || avatarPlaiceholderImg}
      alt="user-avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
    />
  );
};

export default UserAvatar;
