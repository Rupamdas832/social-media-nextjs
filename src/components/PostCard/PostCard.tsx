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
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
  profile: UserProfile;
}

const PostCard = ({ post, profile }: PostCardProps) => {
  const { title, content } = post;
  const { name } = profile;
  return (
    <Card className="w-[350px]" id={`${post.id}`}>
      <CardDescription
        className="flex items-center justify-between p-2"
        id={`${post.id}`}
      >
        <div className="flex items-center">
          <div className="w-[30px] h-[30px] rounded-full bg-slate-400"></div>
          <p className="pl-2">{name}</p>
        </div>
        <p className="text-neutral-500">
          {format(new Date(post.createdAt), "hh:mm, dd-MMM-yy")}
        </p>
      </CardDescription>
      <CardHeader className="p-4" id={`${post.id}`}>
        <CardTitle className="text-xl" id={`${post.id}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0" id={`${post.id}`}>
        {content}
      </CardContent>
    </Card>
  );
};

export default PostCard;
