"use client"
import Auth from "../components/login/Auth";
import Navbar from "../components/NavBar";
import PainelUserNavBar from "../components/navbars/PainelUserNavBar ";
import AddTodo from "../components/kanban/AddTodo";
import TodoListeditUser from "../components/kanban/TodoListEditUser"
import { ChakraProvider, extendTheme } from "@chakra-ui/react";



const theme = extendTheme({
  fonts: {
    heading: `'Raleway'`,
    body: `'Open Sans', sans-serif`,
  },
})
export default function Home() {
  return (
    <div data-tauri-drag-region className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 overflow-hidden">
      <Auth />
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Navbar />
        <PainelUserNavBar />
        <ChakraProvider theme={theme} >
        <AddTodo />
        <TodoListeditUser />
        </ChakraProvider>
      </main>
    </div>
  );
}
