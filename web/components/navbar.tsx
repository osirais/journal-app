import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
      <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
        <div className="flex items-center gap-5 font-semibold">
          <Link href="/">journal-app</Link>
          <div className="flex items-center gap-2"></div>
        </div>
        <HeaderAuth />
      </div>
    </nav>
  );
};
