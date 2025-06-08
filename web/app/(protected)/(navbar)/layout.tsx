import { Navbar } from "@/components/navbar/navbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div id="main-content" className="min-h-screen">
        {children}
      </div>
    </>
  );
}
