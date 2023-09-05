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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userHandle, setUserHandle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLoginClick = async () => {
    setError(null);
    if (name && userHandle) {
      setIsLoading(true);
      try {
        const { status, data } = await axiosInstance.post(
          "/api/create-profile",
          {
            name,
            userHandle,
            bio,
          }
        );
        if (status === 200) {
          router.push(`/feed`);
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
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Profile</CardTitle>
          <CardDescription>Just need few more details!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  placeholder="Enter something about you"
                  type="text"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userHandle">Userhandle</Label>
                <Input
                  id="userHandle"
                  placeholder="Enter user handle"
                  type="text"
                  onChange={(e) => setUserHandle(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handleLoginClick}>
            {isLoading ? "Fetching" : "Create"}
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
  );
};

export default CreateProfile;
