import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/contexts/theme-context";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <ThemeProvider>
        <div className="min-h-screen">{children}</div>
      </ThemeProvider>
    </>
  );
}
