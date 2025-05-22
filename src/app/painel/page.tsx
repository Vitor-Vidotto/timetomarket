"use client"
import Auth from "../components/login/Auth";
import Navbar from "../components/NavBar";
import AddTodo from "../components/kanban/AddTodo";
import TodoListedit from "../components/kanban/TodoListEditor"
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import PainelAdminNavBar from "../components/navbars/PainelAdmNavBar";



const theme = extendTheme({
  fonts: {
    heading: `'Raleway'`,
    body: `'Open Sans', sans-serif`,
  },
})
export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 overflow-hidden">
      <Auth />
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <Navbar />
        <PainelAdminNavBar />
        <ChakraProvider theme={theme} >
        <AddTodo />
        <TodoListedit />
        </ChakraProvider>
      </main>
    </div>
  );
}
