import React from "react";
import {
    Box,
    Button,
    CloseButton,
    Link,
    Text,
} from "@chakra-ui/react";
import { auth } from "../../firebase";
import useAuth from "../../hook/useAuth"

const PainelAdminNavBar = () => {
    const { user } = useAuth() as { user: { email: string } | null };


    return (
        <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
            <div className="flex container lg:py-8 flex-wrap items-center justify-between mx-auto px-4 py-2">
                {user && (
                    <>
                        <Text color="white">Painel Admin</Text>
                        <Text color="white">{user.email}</Text>
                        <CloseButton
  width={50}
  border="1px solid"
  backgroundColor="brown"
  borderRadius={16}
  borderColor="red"
  color="red"
  onClick={() => auth.signOut()}
>
  Sair
</CloseButton>

                    </>
                )}
            </div>
        </nav >
    );
};

export default PainelAdminNavBar;