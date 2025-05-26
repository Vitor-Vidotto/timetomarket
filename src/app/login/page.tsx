'use client'

import LoginForm from "../components/login/LoginForm";
import useAuth from "../hook/useAuth";
import Navbar from "../components/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

export default function Projetos() {
  const { user } = useAuth(); // Use o hook useAuth

  return (
    <ChakraProvider theme={theme}>

    <main
      className="flex min-h-screen flex-col"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
      >
      <Navbar />
      <LoginForm />
    </main>
      </ChakraProvider>
  );
}
