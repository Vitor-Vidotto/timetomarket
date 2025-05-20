"use client";
import React, { useState } from "react";
import Image from "next/image";

const LandingPage = () => {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // Duração da animação
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center text-white">
        <div
          onClick={handleClick}
          className={`cursor-pointer animate-bounce-slow ${
            isShaking ? "animate-shake" : ""
          }`}
        >
          <Image
            src="/images/teste.png"
            alt="Logo da Empresa"
            width={200}
            height={200}
            className="drop-shadow-lg"
          />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-wide animate-fade-in text-center">
          Bem-vindo à sua plataforma
        </h1>
      </div>
    </main>
  );
};

export default LandingPage;
