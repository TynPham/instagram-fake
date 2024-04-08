import { logo } from "@/assets/images";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
      <Image src={logo} width={100} height={100} alt="logo" />
      <p>Notifications</p>
    </div>
  );
}
