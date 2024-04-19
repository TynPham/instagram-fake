"use client";

import authApi from "@/apis/auth.api";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { path } from "@/constants/path";
import { handleErrorApi } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export interface LogoutProps {}

export default function Logout(props: LogoutProps) {
  const { toast } = useToast();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await authApi.logout();
      toast({
        description: res.payload.payload.message,
      });
      router.push(path.login);
      router.refresh();
    } catch (error) {
      handleErrorApi(error);
    }
  };
  return (
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
