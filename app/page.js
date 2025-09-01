import Image from "next/image";
import { NavBar } from "@/components/navbar";
import { Hero } from "@/components/HeroSection";
export default function Home() {
  return (
    <div className="flex flex-col">
       <NavBar />
       <Hero />
    </div>

  );
}
