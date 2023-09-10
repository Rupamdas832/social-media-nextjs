import { Post } from "./post.type";
import { UserProfile } from "./profile.type";

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  authorId: number;
  author: UserProfile;
  postId: number;
  post: Post;
}
