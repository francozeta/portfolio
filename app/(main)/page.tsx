import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero";
import { MusicSection } from "@/components/sections/music";
import { TechnologiesSection } from "@/components/sections/technologies";
import { VantaBackground } from "@/components/ui/vanta-background";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Franco Zeta's Portfolio",
  description:
    "Welcome to Franco Zeta's portfolio. Discover my projects, skills, and passion for software development and design.",
  openGraph: {
    title: "Home | Franco Zeta's Portfolio",
    description:
      "Welcome to Franco Zeta's portfolio. Discover my projects, skills, and passion for software development and design.",
  },
}

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
