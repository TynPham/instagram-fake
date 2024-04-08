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
