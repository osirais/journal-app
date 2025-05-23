import Link from "next/link";
import { FC } from "react";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";

export const Navbar: FC = () => {
  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="flex w-full max-w-5xl items-center justify-between px-5 py-3 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link href="/">journal-app</Link>
        </div>
        <div className="flex items-center gap-3">
          <HeaderAuth />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};
