"use client";
import Layout from "@/components/layout/Layout";
import { axiosInstance } from "@/lib/axios";
import { Post } from "@/types/post.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Comment } from "@/types/comment.type";

const PostPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCommentText, setCurrentCommentText] = useState("");
  const params = useParams();
  const postId = Number(params.postId);

  const fetchProfile = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { status, data } = await axiosInstance(`/api/posts/${postId}`);
      if (status === 200) {
        setPost(data);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    setError(null);
    try {
      const { status, data } = await axiosInstance(`/api/comments/${postId}`);
      if (status === 200) {
        setComments(data.comments);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const createComment = async () => {
    setError(null);
    if (!currentCommentText) return;

    setIsCommentLoading(true);
    try {
      const { status, data } = await axiosInstance.post(`/api/comments`, {
        postId,
        content: currentCommentText,
      });
      if (status === 200) {
        fetchComments();
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchComments();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center w-full h-screen">
        {isLoading ? (
          <div>Loading...</div>
        ) : post ? (
          <div className="w-[350px] ">
            <div className="flex items-center mt-4">
              <div className="w-[30px] h-[30px] rounded-full bg-slate-400"></div>
              <p className="font-bold ml-2">{post.author.userHandle}</p>
            </div>
            <p className="mt-4 font-bold text-2xl">{post.title}</p>
            <p className="mt-2">{post.content}</p>
            <div className="h-[1px] w-full bg-neutral-600 mt-4" />
            <p className="mt-4 font-bold text-lg">Comments</p>
            <div className="my-2">
              <Input
                type="text"
                placeholder="Your comment on the post..."
                onChange={(e) => setCurrentCommentText(e.target.value)}
              />
              <Button
                variant="outline"
                className="mt-2"
                onClick={createComment}
              >
                {isCommentLoading ? "Commenting" : "Comment"}
              </Button>
            </div>
            <div className="mt-4">
              {comments.map((comment) => {
                return (
                  <div key={comment.id} className="flex mt-2">
                    <div className="w-[20px] h-[20px] rounded-full bg-slate-400 mt-1"></div>
                    <div className="ml-2">
                      <p className="text-neutral-500">
                        {comment.author.userHandle}
                      </p>
                      <p className="text-neutral-300 text-base">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
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

export default PostPage;
