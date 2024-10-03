import ThreeExperience from "@/components/3d-experience";
import Navbar from "@/components/navbar";
import TypeEffect from "@/components/type-effect";
import Image from "next/image";
import TypewriterComponent from "typewriter-effect";

export default function Home() {
  return (
   
    <main className="flex flex-col items-center gap-4 p-7">
        <h2 className="font-bold text-4xl text-slate-950" >Tech Bot</h2>
        <ThreeExperience />
        <TypeEffect />
    </main>
     
  );
}
