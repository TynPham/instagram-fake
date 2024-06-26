import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/provider/app.provider";
import { cookies } from "next/headers";
import { User } from "@/types/user.type";
import userApi from "@/apis/user.api";

const SegoeUI = localFont({ src: "../assets/fonts/SVN-Segoe-UI.ttf" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = cookies();
  const access_token = cookiesStore.get("access_token")?.value;
  const refresh_token = cookiesStore.get("refresh_token")?.value;
  let user: User | null = null;
  if (access_token) {
    await userApi.getMe(access_token).then((res) => {
      user = res.payload.result;
    });
  }
  return (
    <html lang="en">
      <body className={SegoeUI.className}>
        <AppProvider initToken={{ access_token, refresh_token }} user={user}>
          {children} <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
