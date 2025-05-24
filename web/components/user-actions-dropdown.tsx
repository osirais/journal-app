"use client";

import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useTransition, type FC } from "react";

interface UserActionsDropdownProps {
  username: string;
}

export const UserActionsDropdown: FC<UserActionsDropdownProps> = ({ username }) => {
  const [isPending, startTransition] = useTransition();
  const hoverBgClass = "hover:bg-white/20";
  const cursorPointer = "cursor-pointer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center gap-2 ${hoverBgClass} ${cursorPointer}`}
        >
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>{username}</span>
          </div>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex w-full cursor-pointer items-center gap-2">
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2 text-red-500"
          onClick={() => {
            startTransition(() => {
              signOutAction();
            });
          }}
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
