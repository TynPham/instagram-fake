import Stories from "./components/stories";
import SwitchAccount from "./components/switch-account";
import Suggests from "./components/suggests";
import PostLists from "./components/post-lists";
import { DEFAULT_PAGINATION_VALUE } from "@/constants/common";
import { fetchMorePosts } from "@/actions/fetch-more-posts";

export default async function Home() {
  const initPosts = await fetchMorePosts(DEFAULT_PAGINATION_VALUE);
  return (
    <div className="py-10 px-4 flex gap-8 2xl:gap-16 justify-center">
      <div className="flex flex-col items-center gap-8 max-w-[630px]">
        <div className="max-w-[320px] sm:max-w-[500px] lg:max-w-full">
          <Stories />
        </div>
        <PostLists initPosts={initPosts} />
      </div>
      <div className="w-80 text-sm flex-col gap-10 hidden xl:flex">
        <div className="flex flex-col gap-6">
          <SwitchAccount />
          <div className="flex flex-col gap-5">
            <article className="flex items-center justify-between gap-2">
              <p className="text-zinc-500 font-bold">Suggested for you</p>
              <span className="text-xs font-bold">See All</span>
            </article>
            <Suggests />
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
