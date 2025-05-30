'use client'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
} from '@chakra-ui/react'
import { PasswordField } from './PasswordField'
import { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'
import { useRouter } from 'next/navigation'
import Auth from './Auth';
import { getUserRole } from '@/app/hook/addUser';

export default function LoginForm() {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const toast = useToast();
    const router = useRouter();

    async function handleLogin() {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passRef.current.value
            );
    
            const user = userCredential.user;
            const role = await getUserRole(user.uid);
    
            toast({
                description: "Autenticado com Sucesso",
                title: "Autenticado",
                duration: 3000,
                status: "success"
            });
    
            if (role === "admin") {
                router.push("/painel");
            } else {
                router.push("/kanban");
            }
        } catch (error) {
            toast({
                title: "Erro ao autenticar",
                description: error.message || "Verifique seu e-mail e senha.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }
    

    return (
        <Box
            h="100vh"
            color="black"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Container maxW="lg">
                <Stack spacing="8">
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg="white"
                        boxShadow="lg"
                        borderRadius="xl"
                    >
                    <Stack spacing="6">
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xs', md: 'sm' }}>Login</Heading>
                        </Stack>
                    </Stack>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    <FormControl>
                                        <FormLabel color={"Black"} htmlFor="email">E-mail</FormLabel>
                                        <Input required
                                            className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                            placeholder="seu@email.com" data-testid="email-input" id="email" type="email" ref={emailRef} />
                                    </FormControl>
                                    <PasswordField data-testid="senha-input" ref={passRef} required
                                        className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Senha" />
                                </Stack>
                                <Stack spacing="6">
                                    <Button colorScheme="blue" data-testid="login" type="submit" onClick={handleLogin}
                                        className="bg-[#18191E] border border-[#33353F] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                                    >Autenticar</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}