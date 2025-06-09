import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { VantaBackground } from "@/components/ui/vanta-background";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative">
      <VantaBackground />
      <HeroSection />
    </main>
  );
}
