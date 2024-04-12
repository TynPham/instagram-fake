import { post } from "@/assets/images";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";
import { FiBookmark, FiSend } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import Stories from "./components/stories";

export default function Home() {
  return (
    <div className="py-10 px-4 flex gap-8 2xl:gap-16 justify-center">
      <div className="flex flex-col items-center gap-8 max-w-[630px]">
        <div className="max-w-[320px] sm:max-w-[500px] lg:max-w-full">
          <Stories />
        </div>
        <div className="flex flex-col gap-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <article className="flex items-center gap-2 text-zinc-500">
                      <h3 className="font-bold text-black">yanlovebeauty</h3>
                      <span>2d</span>
                    </article>
                  </div>
                  <HiOutlineDotsHorizontal className="w-6 h-6" />
                </div>
                <div>
                  <Image src={post} width={500} height={500} className="object-cover rounded-md" alt="post-image" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-4">
                    <AiOutlineHeart className="w-7 h-7 " />
                    <FaRegComment className="w-7 h-7" />
                    <FiSend className="w-7 h-7 " />
                  </div>
                  <FiBookmark className="w-7 h-7 " />
                </div>
                <article className="flex flex-col gap-2 text-sm">
                  <h3 className="font-bold">305 likes</h3>
                  <p className="flex items-center gap-1">
                    <span className="font-bold">phanvanduc.official</span>
                    <span>Chúc mừng sinh nhật chị</span>
                  </p>
                  <span className="text-zinc-400">View all 3 comments</span>
                  <Input
                    placeholder="Add a comment..."
                    className="border-0 border-b rounded-none pl-0 focus-within:!ring-0 focus-within:!ring-offset-0"
                  />
                </article>
              </div>
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
