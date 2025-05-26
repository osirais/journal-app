import { Navbar } from "@/components/navbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
    </>
  );
}
