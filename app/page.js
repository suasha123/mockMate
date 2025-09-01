import Image from "next/image";
import { NavBar } from "@/components/navbar";
import { Hero } from "@/components/HeroSection";
import { Work } from "@/components/worksection";
import { Feature } from "@/components/Features";
export default function Home() {
  return (
    <div className="flex flex-col">
       <NavBar />
       <Hero />
       <Feature />
       <Work />
    </div>

  );
}
