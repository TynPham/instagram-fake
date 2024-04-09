/* eslint-disable react/no-unescaped-entities */
import { logo } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { AiFillFacebook } from "react-icons/ai";
import Link from "next/link";
import { path } from "@/constants/path";
import LoginForm from "./login-form";

export interface LoginProps {}

export default function Login(props: LoginProps) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <Card className="w-[350px] rounded-none">
        <CardHeader>
          <CardTitle className="flex justify-center">
            <Image src={logo} alt="logo" className="w-44" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-8">
          <div className="flex justify-center gap-6 w-full items-center">
            <Separator className="flex-1" />
            <span>OR</span>
            <Separator className="flex-1" />
          </div>
          <div className="flex flex-col gap-4 text-[#385185] items-center">
            <div className="flex items-center gap-2 font-semibold">
              <AiFillFacebook className="w-6 h-6" />
              <p>Log In With Facebook</p>
            </div>
            <span className="text-xs">Forgot password?</span>
          </div>
        </CardFooter>
      </Card>
      <Card className="w-[350px] rounded-none">
        <CardHeader>
          <p className="text-center">
            Don't have an account?{" "}
            <Link href={path.register} className="text-blue-600">
              Sign up
            </Link>
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}
