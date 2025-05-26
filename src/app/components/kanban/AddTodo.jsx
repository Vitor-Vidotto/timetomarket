import React, { useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Stack,
  RadioGroup,
  Radio,
  Select,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import useAuth from "../../hook/useAuth";
import { addTodo } from "../../api/send/todo";

const AddTodo = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a exibição do modal
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Backlog");
  const [displayDate, setDisplayDate] = useState(""); // Novo campo: Data de Exibição
  const [observation, setObservation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    const todo = {
      title,
      description,
      status,
      userId: user.uid,
      displayDate,
      observation,
      userEmail: user.email, // <- Adiciona o e-mail aqui
    };
    
    try {
      // Chame a função addTodo para adicionar a tarefa ao Firebase
      await addTodo(todo);

      setIsOpen(false); // Fecha o modal após a criação da tarefa
      setTitle("");
      setDescription("");
      setStatus("Backlog");
      setDisplayDate("");
      setObservation("");

      toast({ title: "Todo created successfully", status: "success" });
    } catch (error) {
      console.error(error);
      toast({ title: "Error creating todo", status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mt={5}>
      <Button onClick={() => setIsOpen(true)} variantColor="teal" mb={3}
      position={"relative"} top="5%" 
      
      >
        Criar Task
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Formulário existente */}
            <Stack direction="column">
              <Input
                placeholder="Titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value={"Backlog"} style={{ color: "white", fontWeight: "bold" }}>
                  Backlog
                </option>
                <option value={"Para fazer"} style={{ color: "white", fontWeight: "bold" }}>
                  Para fazer
                </option><option value={"Fazendo"} style={{ color: "white", fontWeight: "bold" }}>
                  Fazendo
                </option>
                <option value={"Testando"} style={{ color: "white", fontWeight: "bold" }}>
                 Testando
                </option>
                <option value={"Finalizado"} style={{ color: "white", fontWeight: "bold" }}>
                 Finalizado
                </option>

              </Select>
              <Input
  type="date" // Set the input type to date
  placeholder="Data"
  value={displayDate}
  onChange={(e) => setDisplayDate(e.target.value)}
/>



                <Input
                placeholder="Observação"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleTodoCreate()}
              disabled={title.length < 1 || description.length < 1 || isLoading}
              variantColor="teal"
              variant="solid"
            >
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddTodo;