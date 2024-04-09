import { screenshot1, screenshot2, screenshot3, screenshot4 } from "@/assets/images";
import { StaticImageData } from "next/image";

type AuthFooterRow = "row1" | "row2";

export const authFooter: { [key in AuthFooterRow]: string[] } = {
  row1: [
    "Meta",
    "About",
    "Blog",
    "Jobs",
    "Help",
    "API",
    "Privacy",
    "Terms",
    "Locations",
    "Instagram Lite",
    "Threads",
    "Contact Uploading & Non-Users",
    "Meta Verified",
  ],
  row2: ["English", "© 2024 Instagram from Meta"],
};

export const authScreenShot: StaticImageData[] = [screenshot1, screenshot2, screenshot3, screenshot4];
