import { authFooter } from "@/data/auth.dummy";
import ScreenshotSlider from "./components/screenshot-slider";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div className="w-full flex-1 flex justify-center gap-10 pt-8 items-center">
        <ScreenshotSlider />
        {children}
      </div>
      <div className="p-8 flex flex-col gap-6 items-center justify-center text-xs text-zinc-500 pb-16">
        <ul className="flex gap-4 items-center flex-wrap justify-center">
          {authFooter.row1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <ul className="flex gap-4 items-center flex-wrap justify-center">
          {authFooter.row2.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
