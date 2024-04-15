import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import { FiBookmark, FiSend } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import Stories from "./components/stories";
import postsApi from "@/apis/posts.api";
import { cookies } from "next/headers";
import TextMore from "@/components/TextMore";
import { formatDistance } from "date-fns";
import Post from "./components/post";

export default async function Home() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const res = await postsApi.getNewFeeds(access_token as string, { page: 1, limit: 10 });
  const posts = res.payload.result;
  return (
    <div className="py-10 px-4 flex gap-8 2xl:gap-16 justify-center">
      <div className="flex flex-col items-center gap-8 max-w-[630px]">
        <div className="max-w-[320px] sm:max-w-[500px] lg:max-w-full">
          <Stories />
        </div>
        <div className="flex flex-col gap-2 md:w-[80%]">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
      <div className="w-80 text-sm flex-col gap-10 hidden xl:flex">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <article>
                <h3 className="font-bold">kait1104</h3>
                <span className="text-zinc-500">KaiT</span>
              </article>
            </div>
            <span className="text-blue-500 font-bold text-xs">Switch</span>
          </div>
          <div className="flex flex-col gap-5">
            <article className="flex items-center justify-between gap-2">
              <p className="text-zinc-500 font-bold">Suggested for you</p>
              <span className="text-xs font-bold">See All</span>
            </article>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <article>
                    <h3 className="font-bold">kait1104</h3>
                    <span className="text-zinc-500">KaiT</span>
                  </article>
                </div>
                <span className="text-blue-500 font-bold text-xs">Follow</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <article>
                    <h3 className="font-bold">kait1104</h3>
                    <span className="text-zinc-500">KaiT</span>
                  </article>
                </div>
                <span className="text-blue-500 font-bold text-xs">Follow</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <article>
                    <h3 className="font-bold">kait1104</h3>
                    <span className="text-zinc-500">KaiT</span>
                  </article>
                </div>
                <span className="text-blue-500 font-bold text-xs">Follow</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <article>
                    <h3 className="font-bold">kait1104</h3>
                    <span className="text-zinc-500">KaiT</span>
                  </article>
                </div>
                <span className="text-blue-500 font-bold text-xs">Follow</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <article>
                    <h3 className="font-bold">kait1104</h3>
                    <span className="text-zinc-500">KaiT</span>
                  </article>
                </div>
                <span className="text-blue-500 font-bold text-xs">Follow</span>
              </li>
            </ul>
          </div>
        </div>
        <article className="flex flex-col gap-6 text-xs text-zinc-500">
          <ul className="flex flex-wrap gap-2">
            <li>About</li>
            <li>Help</li>
            <li>Press</li>
            <li>API</li>
            <li>Jobs</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Locations</li>
            <li>Language</li>
            <li>Meta Verified</li>
          </ul>
          <span>© 2024 INSTAGRAM FROM META</span>
        </article>
      </div>
    </div>
  );
}
