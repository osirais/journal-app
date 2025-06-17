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
import { useDialogStore } from "@/hooks/use-dialog-store";
import {
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  NotebookPen,
  Trophy,
  User,
  UserCog
} from "lucide-react";
import Link from "next/link";
import { type FC } from "react";

interface UserActionsDropdownProps {
  username: string;
}

export const UserActionsDropdown: FC<UserActionsDropdownProps> = ({ username }) => {
  const dialog = useDialogStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:text-foreground flex cursor-pointer items-center gap-2 hover:bg-white/20"
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
        <DropdownMenuItem asChild>
          <Link href="/journals" className="flex w-full cursor-pointer items-center gap-2">
            <NotebookPen size={16} />
            <span>Journals</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/tasks" className="flex w-full cursor-pointer items-center gap-2">
            <ClipboardList size={16} />
            <span>Tasks</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/achievements" className="flex w-full cursor-pointer items-center gap-2">
            <Trophy size={16} />
            <span>Achievements</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/manage-account" className="flex w-full cursor-pointer items-center gap-2">
            <UserCog size={16} />
            <span>Manage Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2 text-red-500"
          onClick={() => dialog.open("sign-out")}
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
