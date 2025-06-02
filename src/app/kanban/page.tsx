"use client";

import Auth from "../components/login/Auth";
import Navbar from "../components/NavBar";
import PainelUserNavBar from "../components/navbars/PainelUserNavBar ";
import AddTodo from "../components/kanban/AddTodo";
import TodoListeditUser from "../components/kanban/TodoListEditUser";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <div
        data-tauri-drag-region
        className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 "
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Auth />
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <Navbar />
          <PainelUserNavBar />
          <AddTodo />
          <TodoListeditUser />
        </main>
      </div>
    </ChakraProvider>
  );
}
