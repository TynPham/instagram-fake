import { logo } from "@/assets/images";
import { path } from "@/constants/path";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineMenu, AiOutlineMessage, AiOutlineProfile } from "react-icons/ai";
import { TbSquarePlus } from "react-icons/tb";
import { BsThreads } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import ProfileNavBar from "./components/profile-navbar";

export interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const headersList = headers();
  const pathname = headersList.get("next-url") || path.home;
  return (
    <div>
      <div className="fixed top-0 left-0 w-[4.8rem] lg:w-80 py-8 px-4 pb-6 hidden md:flex flex-col justify-between gap-8 h-full border-r border-zinc-200 transition-all">
        <div className="flex flex-col gap-4">
          <Link href={path.home} className="py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer lg:hidden">
            <FaInstagram className="w-7 h-7" />
          </Link>
          <Link href={path.home} className="py-3 px-2 transition-all duration-300 cursor-pointer hidden lg:block">
            <Image src={logo} width={110} height={110} alt="logo" />
          </Link>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
              {pathname === path.home ? (
                <GoHomeFill className="w-7 h-7 group-hover:scale-110 transition-all" />
              ) : (
                <GoHome className="w-7 h-7 group-hover:scale-110 transition-all" />
              )}
              <span
                className={cn("hidden lg:inline", {
                  "text-black font-bold": pathname === path.home,
                })}
              >
                Home
              </span>
            </li>
            <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
              <GoSearch className="w-7 h-7 group-hover:scale-110 transition-all" /> <span className="hidden lg:inline">Search</span>
            </li>
            <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
              <MdOutlineExplore className="w-7 h-7 group-hover:scale-110 transition-all" /> <span className="hidden lg:inline">Explore</span>
            </li>
            <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
              <BiMoviePlay className="w-7 h-7 group-hover:scale-110 transition-all" /> <span className="hidden lg:inline">Reels</span>
            </li>
            <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
              <AiOutlineMessage className="w-7 h-7 group-hover:scale-110 transition-all" /> <span className="hidden lg:inline">Messages</span>
            </li>
            <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
              <AiOutlineHeart className="w-7 h-7 group-hover:scale-110 transition-all" /> <span className="hidden lg:inline">Notifications</span>
            </li>
            <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
              <TbSquarePlus className="w-7 h-7 group-hover:scale-110 transition-all" /> <span className="hidden lg:inline">Create</span>
            </li>
            <ProfileNavBar />
          </ul>
        </div>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
            <BsThreads className="w-7 h-7 group-hover:scale-110 transition-all" /> <span className="hidden lg:inline">Threads</span>
          </li>
          <li className="flex items-center gap-4 py-3 px-2 hover:bg-zinc-200 rounded-lg transition-all duration-300 cursor-pointer group">
            <AiOutlineMenu className="w-7 h-7 group-hover:scale-110 transition-all" /> <span className="hidden lg:inline">More</span>
          </li>
        </ul>
      </div>
      <div className="md:ml-[4.8rem] lg:ml-80">{children}</div>
    </div>
  );
}
