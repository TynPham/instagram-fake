/* eslint-disable react/no-unescaped-entities */
import { logo } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { AiFillFacebook } from "react-icons/ai";
import Link from "next/link";
import { path } from "@/constants/path";
import RegisterForm from "./register-form";

export interface RegisterProps {}

export default function Register(props: RegisterProps) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <Card className="w-[350px] rounded-none">
        <CardHeader>
          <CardTitle className="flex justify-center">
            <Image src={logo} alt="logo" className="w-44" />
          </CardTitle>
          <CardDescription className="text-center">Sign up to see photos and videos from your friends.</CardDescription>
          <Button className="w-full !mt-4 flex items-center gap-2">
            <AiFillFacebook className="w-6 h-6" /> Log In With Facebook
          </Button>
          <div className="flex justify-center gap-6 w-full items-center !mt-4">
            <Separator className="flex-1" />
            <span>OR</span>
            <Separator className="flex-1" />
          </div>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <Card className="w-[350px] rounded-none">
        <CardHeader>
          <p className="text-center">
            Have an account?{" "}
            <Link href={path.login} className="text-blue-600">
              Log in
            </Link>
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}
