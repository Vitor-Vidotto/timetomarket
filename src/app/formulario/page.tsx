"use client"

import MVPForm from "../components/forms/form";
import Navbar from "../components/NavBar";

export default function Home() {

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
      <Navbar />
      <div>
        <MVPForm />
      </div>
      </main>
    </div>
  );
}
