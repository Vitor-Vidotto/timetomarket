import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { updateTodo } from "../../../api/send/todo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const TaskEditorAdmin = ({ isOpen, onClose, task, onUpdateTask }) => {
  const toast = useToast();
  const [editedTask, setEditedTask] = useState({ ...task });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setEditedTask({
      ...task,
      userId: task.userId || "",
      userEmail: task.userEmail || "",
    });
  }, [task]);

  // Busca todos os usuários do Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => doc.data());
        setUsers(userList);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const updatedTask = { ...editedTask };
      await updateTodo(task.id, updatedTask);
      toast({
        title: "Task atualizada com sucesso",
        status: "success",
      });
      onUpdateTask(updatedTask);
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao atualizar task",
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className=" text-gray-900 text-sm rounded-lg block w-full p-2.5">
          Editar Task (Admin)
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column" spacing={4}>
            {/* Select para trocar o e-mail do usuário */}
            <Select
              placeholder="Selecionar usuário"
              value={editedTask.userEmail}
              onChange={(e) =>
                setEditedTask({ ...editedTask, userEmail: e.target.value })
              }
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              {users.map((user, idx) => (
                <option key={idx} value={user.userEmail}>
                  {user.userEmail}
                </option>
              ))}
            </Select>

            <Input
              placeholder="Título"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            <Textarea
              placeholder="Descrição"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            <Select
              value={editedTask.status}
              onChange={(e) =>
                setEditedTask({ ...editedTask, status: e.target.value })
              }
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="Backlog">Backlog</option>
              <option value="Para fazer">Para fazer</option>
              <option value="Fazendo">Fazendo</option>
              <option value="Testando">Testando</option>
              <option value="Finalizado">Finalizado</option>
            </Select>
            <Input
              type="date"
              placeholder="Data"
              value={editedTask.displayDate}
              onChange={(e) =>
                setEditedTask({ ...editedTask, displayDate: e.target.value })
              }
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
            <Input
              placeholder="Observação"
              value={editedTask.observation}
              onChange={(e) =>
                setEditedTask({ ...editedTask, observation: e.target.value })
              }
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="teal" onClick={handleSaveChanges}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskEditorAdmin;
