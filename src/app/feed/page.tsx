"use client";

import PostCard from "@/components/PostCard/PostCard";
import { axiosInstance } from "@/lib/axios";
import { Post } from "@/types/post.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchProfile = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { status, data } = await axiosInstance("/api/posts");
      if (status === 200) {
        setPosts(data.posts);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center w-full h-screen">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {posts.map((post: Post) => {
              return (
                <div className="mt-4" key={post.id}>
                  <PostCard post={post} profile={post.author} />
                </div>
              );
            })}
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="w-[350px] mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </Layout>
  );
};

export default Feed;
