// components/KanbanRedirectButton.tsx
"use client";
import { useRouter } from "next/navigation";
import useAuth from "../../hook/useAuth";
import { BsKanbanFill } from "react-icons/bs";

const KanbanRedirectButton = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
    } else if (isAdmin) {
      router.push("/painel");
    } else {
      router.push("/kanban");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-500"
    >
      <BsKanbanFill />
      <span className="hidden group-hover:inline">Kanban</span>
    </button>
  );
};

export default KanbanRedirectButton;
