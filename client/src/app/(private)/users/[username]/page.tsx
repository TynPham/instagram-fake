/* eslint-disable react/no-unescaped-entities */
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authFooter } from "@/data/auth.dummy";
import { BsGearWide } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkIcon, Grid3X3Icon, MonitorPlayIcon } from "lucide-react";

export interface ProfileProps {
  params: {
    username: string;
  };
}

export default function Profile({ params: { username } }: ProfileProps) {
  return (
    <div className="max-w-[935px] min-h-screen flex flex-col justify-between gap-8 mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-12 px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 lg:items-center lg:px-8">
          <Avatar className="w-36 h-36">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="object-cover" />
          </Avatar>
          <div className="flex flex-col gap-4">
            <article className="flex items-center gap-4 flex-wrap">
              <h3 className="text-lg font-semibold">{username}</h3>
              <div className="flex items-center gap-4">
                <Button variant="outline">Edit profile</Button>
                <Button variant="outline">View archive</Button>
                <BsGearWide className="w-6 h-6 cursor-pointer" />

              </div>
            </article>
            <article className="flex items-center gap-8">
              <p>
                <b>1</b> post
              </p>
              <p>
                <b>109</b> followers
              </p>
              <p>
                <b>299</b> following
              </p>
            </article>
            <article>
              <b>KaiT</b>
            </article>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-max items-center">
          <Button variant="outline" className=" rounded-full w-20 h-20">
            <GoPlus className="w-16 h-16 text-zinc-400" />
          </Button>
          <b>New</b>
        </div>
      </div>
      <div className="flex-1">
        <Tabs defaultValue="posts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="flex items-center gap-2 font-bold">
              <Grid3X3Icon className="w-4 h-4" /> POSTS
            </TabsTrigger>
            <TabsTrigger value="reels" className="flex items-center gap-2 font-bold ">
              <MonitorPlayIcon className="w-4 h-4" /> REELS
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2 font-bold">
              <BookmarkIcon className="w-4 h-4" /> SAVED
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">posts</TabsContent>
          <TabsContent value="reels">reels</TabsContent>
          <TabsContent value="saved">saved</TabsContent>
        </Tabs>
      </div>
      <div className="p-8 flex flex-col gap-6 items-center justify-center text-xs text-zinc-500 pb-4">
        <ul className="flex gap-4 items-center flex-wrap justify-center">
          {authFooter.row1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="flex gap-4 items-center flex-wrap justify-center">
          {authFooter.row2.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
