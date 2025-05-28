import HeaderAuth from "@/components/header-auth";
import { ThemeDrawer } from "@/components/theme-drawer";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

export const Navbar: FC = () => {
  return (
    <nav className="border-b-foreground/10 bg-background sticky left-0 top-0 z-50 flex h-16 w-full justify-center border-b">
      <div className="flex w-full max-w-7xl items-center justify-between px-5 py-3 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            <NotebookPen className="size-6" />
            <span className="font-mono">logal</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <HeaderAuth />
          <ThemeDrawer />
        </div>
      </div>
    </nav>
  );
};
