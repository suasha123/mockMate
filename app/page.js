import Image from "next/image";
import { NavBar } from "@/components/navbar";
import HomePage from "@/components/Home";
export default function Home() {
  return (
    <div className="flex flex-col">
    <NavBar />
    <HomePage />
    </div>

  );
}
