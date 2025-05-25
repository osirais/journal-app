import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {children}
        <Toaster />
      </div>
    </>
  );
}
