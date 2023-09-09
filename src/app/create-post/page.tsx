"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleCreateClick = async () => {
    setError(null);
    if (title && content) {
      setIsLoading(true);
      try {
        const { status, data } = await axiosInstance.post("/api/create-post", {
          title,
          content,
        });
        if (status === 200) {
          router.push(`/profile`);
        }
      } catch (error: any) {
        console.log(error);
        setError(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>
              What do you want to share with world?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Title</Label>
                  <Input
                    id="name"
                    placeholder="Enter title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="message">Content</Label>
                  <Textarea
                    placeholder="Type your content here..."
                    id="message"
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={250}
                    className="h-40"
                  />
                  <p className="text-xs text-right">{250 - content.length}</p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={handleCreateClick}>
              {isLoading ? "Creating" : "Create"}
            </Button>
          </CardFooter>
        </Card>
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

export default CreatePost;
