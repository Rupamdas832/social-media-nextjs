"use client";

import { Post } from "@/types/post.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserProfile } from "@/types/profile.type";

interface PostCardProps {
  post: Post;
  profile: UserProfile;
}

const PostCard = ({ post, profile }: PostCardProps) => {
  const { title, content } = post;
  const { name } = profile;
  return (
    <Card className="w-[350px]">
      <CardDescription className="flex items-center mt-2 ml-2">
        <div className="w-[30px] h-[30px] rounded-full bg-slate-400"></div>
        <p className="pl-2">{name}</p>
      </CardDescription>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">{content}</CardContent>
    </Card>
  );
};

export default PostCard;
