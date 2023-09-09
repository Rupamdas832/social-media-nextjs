import { UserProfile } from "./profile.type";

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  author: UserProfile;
}
