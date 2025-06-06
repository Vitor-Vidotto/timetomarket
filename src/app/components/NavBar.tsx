"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaQuestionCircle, FaCog, FaSun, FaMoon, FaAddressBook } from "react-icons/fa";
import { usePathname } from "next/navigation";
import KanbanRedirectButton from "../components/kanban/KanbanRedirectButton"
import { helpMessages } from "./helpMessages";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { PiInfinityBold } from "react-icons/pi";
import { MdOutlineWeb } from "react-icons/md";
import useAuth from "../hook/useAuth";
const HelpModal: React.FC<{ isOpen: boolean; onClose: () => void; message: string }> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md text-center">
        <h2 className="text-xl text-black font-semibold mb-4">Ajuda</h2>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
          Fechar
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const pathname = usePathname();
  const { isAdmin, isLoading } = useAuth(); // <-- aqui está o hook

  useEffect(() => {
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(systemPreference);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (isDarkMode === null) return;
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  if (isDarkMode === null) return <div>Carregando...</div>;

  return (
    <>
      <nav className="fixed top-0 left-0 h-full group w-16 hover:w-64 bg-white dark:bg-gray-900 shadow-lg z-20 px-4 py-6 flex flex-col justify-between transition-all duration-300 overflow-hidden">
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center space-x-3 text-2xl font-bold text-black dark:text-white">
            <span><span className="text-xl">🏠</span></span>
            <span className="hidden group-hover:inline text-lg">Menu</span>
          </Link>

          <button
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-500"
          >
            <FaQuestionCircle />
            <span className="hidden group-hover:inline">Ajuda</span>
          </button>

          <KanbanRedirectButton />
        {isAdmin && (
            <>
              <Link href="/indisponivel" className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-500">
                <MdOutlineWeb />
                <span className="hidden group-hover:inline">Gerador Landing Page</span>
              </Link>
              <Link href="/indisponivel" className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-500">
                <TbMessageChatbotFilled />
                <span className="hidden group-hover:inline">Chat Bot</span>
              </Link>
              <Link href="/indisponivel" className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-500">
                <PiInfinityBold />
                <span className="hidden group-hover:inline">CI/CD</span>
              </Link>
            </>)}
        </div>

        <button onClick={toggleTheme} className="flex items-center space-x-3 text-2xl text-black dark:text-white">
          {isDarkMode ? <FaSun /> : <FaMoon />}
          <span className="hidden group-hover:inline text-base">
            {isDarkMode ? "Claro" : "Escuro"}
          </span>
        </button>
      </nav>

      {/* Modal de ajuda */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        message={helpMessages[pathname] || "Ajuda não disponível para esta rota."}
      />
    </>
  );
};

export default Navbar;
