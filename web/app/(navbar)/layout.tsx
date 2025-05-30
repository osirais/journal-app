import { Navbar } from "@/components/navbar/navbar";
import { ThemeProvider } from "@/contexts/theme-context";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <div id="main-content" className="min-h-screen">
          {children}
        </div>
      </ThemeProvider>
    </>
  );
}
