import { useEffect, useState } from "react";
import { auth } from "../firebase"; 
import { checkUserExistence, getUserRole, addConfig } from "./addUser";
import { useRouter, usePathname } from "next/navigation";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname(); // pega a rota atual

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      setUser(authUser);

      // Permitir acesso livre à rota inicial (/)
      if (!authUser && pathname !== "/") {
        router.push("/login");
        setIsLoading(false);
        return;
      }

      if (authUser) {
        try {
          const configExists = await checkUserExistence(authUser.uid);
          if (!configExists) {
            await addConfig({
              userId: authUser.uid,
              userEmail: authUser.email,
              userRole: "user",
            });
          }

          const userRole = await getUserRole(authUser.uid);
          setIsAdmin(userRole === "admin");
        } catch (error) {
          console.error("Erro ao buscar configurações do usuário:", error);
        }
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return { user, isAdmin, isLoading };
};

export default useAuth;
