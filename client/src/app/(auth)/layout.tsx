import { home_phone } from "@/assets/images";
import { authFooter } from "@/data/auth-footer";
import Image from "next/image";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div className="w-full flex-1 flex justify-center gap-4 pt-8 items-center">
        <Image src={home_phone} width={465} height={635} alt="home_phone" className="object-cover h-4/5" />
        {children}
      </div>
      <div className="p-8 flex flex-col gap-6 items-center justify-center text-xs text-zinc-500 pb-16">
        <ul className="flex gap-4 items-center">
          {authFooter.row1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="flex gap-4 items-center">
          {authFooter.row2.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
