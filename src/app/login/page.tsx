'use client'
import LoginForm from "../components/login/LoginForm";
import useAuth from "../hook/useAuth";
import Navbar from "../components/NavBar";

export default function Projetos() {
  const { user } = useAuth(); // Use o hook useAuth

  
  return (
    <main className="flex min-h-screen flex-col bg-[#ffffff]">
      <Navbar/>
      <LoginForm />
    </main>
  );
}