import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero";
import { MusicSection } from "@/components/sections/music";
import { TechnologiesSection } from "@/components/sections/technologies";
import { VantaBackground } from "@/components/ui/vanta-background";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative">
      <VantaBackground />
      <HeroSection />
      <FeaturedProjects />
      <TechnologiesSection />
      <AboutSection />
      <MusicSection />
      <ContactSection />
    </main>
  );
}
