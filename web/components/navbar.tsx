import Link from "next/link";
import type { FC } from "react";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NotebookPen } from "lucide-react";

export const Navbar: FC = () => {
  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="flex w-full max-w-5xl items-center justify-between px-5 py-3 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            <NotebookPen className="h-6 w-6" />
            <span className="font-mono">logal</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <HeaderAuth />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};
