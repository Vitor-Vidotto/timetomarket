"use client";

import Auth from "../components/login/Auth";
import Navbar from "../components/NavBar";
import AddTodo from "../components/kanban/AddTodo";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";
import TodoListedit from "../components/kanban/TodoListEditor"
import PainelAdminNavBar from "../components/navbars/PainelAdmNavBar";
import GoToForms from "../components/kanban/Admin/goToForms"

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
          <PainelAdminNavBar />
          <AddTodo />
          <GoToForms />
          <TodoListedit />
        </main>
      </div>
    </ChakraProvider>
  );
}
