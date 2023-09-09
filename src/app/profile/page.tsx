"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/profile.type";
import PostCard from "@/components/PostCard/PostCard";
import Layout from "@/components/layout/Layout";

const Profile = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchProfile = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { status, data } = await axiosInstance("/api/profile");
      if (status === 200) {
        setProfileData(data);
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
        ) : profileData ? (
          <div className="w-[350px] ">
            <div className="flex flex-col justify-center items-center mt-8">
              <div className="w-[150px] h-[150px] rounded-full bg-slate-400"></div>
              <p className="font-bold text-white text-2xl mt-4">
                {profileData.name}
              </p>
              <p className=" text-neutral-400 text-lg">
                @{profileData.userHandle}
              </p>
              <div className="flex items-center mt-6">
                <p className="font-bold text-white text-2xl">432</p>
                <p className=" text-neutral-600 text-base pl-2">Followers</p>
              </div>
              <Button className="mt-2">Edit Profile</Button>
              <Button
                className="mt-2"
                variant="outline"
                onClick={() => router.push("/create-post")}
              >
                Create Post
              </Button>
              <div className="flex flex-col w-full mt-6">
                <p className="font-bold text-neutral-400 text-base text-left">
                  Bio
                </p>
                <p className="text-neutral-400 text-base text-left">
                  {profileData.bio}
                </p>
              </div>
            </div>
            <div className="mt-6">
              {profileData.posts.map((post) => {
                return (
                  <div className="mt-4" key={post.id}>
                    <PostCard post={post} profile={profileData} />
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

export default Profile;
