import { Post } from "./post.type";

export interface UserProfile {
  bio: string;
  email: string;
  name: string;
  profilePic: string;
  userHandle: string;
  posts: Post[];
  isLoggedInUserFollowing?: boolean;
  profileId: number;
  followers: any[];
  following: any[];
}
