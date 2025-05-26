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
import { toggleTodoStatus, updateTodo } from "../../api/send/todo";
import { getAllUserEmails } from "../../api/send/getalluseremails";

const TaskEditor = ({ isOpen, onClose, task, onUpdateTask, isAdmin }) => {
  const toast = useToast();
  const [editedTask, setEditedTask] = useState({ ...task });
  const [userEmails, setUserEmails] = useState([]);

  // Carregar todos os usuários com id e email ao abrir modal, se for admin
  useEffect(() => {
    if (isAdmin && isOpen) {
      getAllUserEmails()
        .then(setUserEmails)
        .catch((error) => {
          console.error("Erro ao buscar usuários:", error);
        });
    }
  }, [isAdmin, isOpen]);

  // Quando a task muda, inicializa o estado local da task, incluindo userId e userEmail
  useEffect(() => {
    setEditedTask({
      ...task,
      userId: task.userId || "",
      userEmail: task.userEmail || "",
    });
  }, [task]);

  const handleStatusToggle = async () => {
    const newStatus = editedTask.status === "completed" ? "pending" : "completed";
    try {
      await toggleTodoStatus({ docId: task.id, status: newStatus });
      toast({
        title: `Task marcada como ${newStatus}`,
        status: newStatus === "completed" ? "success" : "warning",
      });
      setEditedTask({ ...editedTask, status: newStatus });
      onUpdateTask({ ...editedTask, status: newStatus });
    } catch (error) {
      console.error(error);
    }
  };

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
        <ModalHeader>Editar Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column" spacing={4}>
            <Input
              placeholder="Título"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Descrição"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
            <Select
              value={editedTask.status}
              onChange={(e) =>
                setEditedTask({ ...editedTask, status: e.target.value })
              }
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
            />
            <Input
              placeholder="Observação"
              value={editedTask.observation}
              onChange={(e) =>
                setEditedTask({ ...editedTask, observation: e.target.value })
              }
            />

            {/* Campo para trocar usuário responsável */}
            {isAdmin ? (
              <Select
                placeholder="Selecione um usuário"
                value={editedTask.userId || ""}
                onChange={(e) => {
                  const selectedUserId = e.target.value;
                  // Encontra o email do usuário selecionado para atualizar também
                  const selectedUser = userEmails.find(
                    (user) => user.id === selectedUserId
                  );
                  setEditedTask({
                    ...editedTask,
                    userId: selectedUserId,
                    userEmail: selectedUser?.email || "",
                  });
                }}
              >
                {userEmails.map(({ id, email }) => (
                  <option key={id} value={id}>
                    {email}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                placeholder="Usuário responsável"
                value={editedTask.userEmail || ""}
                isReadOnly
              />
            )}
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

export default TaskEditor;
