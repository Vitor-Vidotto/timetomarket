"use client"
import Navbar from "../components/NavBar";
import RenameLinkGrid from "../components/Renomeadores";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 overflow-hidden">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Navbar />
          <RenameLinkGrid />
      </main>
    </div>
  );
}
