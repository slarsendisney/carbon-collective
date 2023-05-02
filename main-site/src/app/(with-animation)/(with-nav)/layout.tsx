import { Footer } from "@/components/nav/Footer";
import { Nav } from "@/components/nav/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col h-full">
      <Nav />
      <main className="flex flex-col grow">{children}</main>
      <Footer />
    </div>
  );
}
