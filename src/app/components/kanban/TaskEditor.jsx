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
import { updateTodo } from "../../api/send/todo";

const TaskEditor = ({ isOpen, onClose, task, onUpdateTask }) => {
  const toast = useToast();
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    setEditedTask({
      ...task,
      userId: task.userId || "",
      userEmail: task.userEmail || "",
    });
  }, [task]);

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
        <ModalHeader className=" text-gray-900 text-sm rounded-lg block w-full p-2.5">Editar Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column" spacing={4}>
            <Input
              placeholder="Título"
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Descrição"
              value={editedTask.description}
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
            <Select
            className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={editedTask.displayDate}
              onChange={(e) =>
                setEditedTask({ ...editedTask, displayDate: e.target.value })
              }
            />
            <Input
              placeholder="Observação"
              className="bg-[#18191E] border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={editedTask.observation}
              onChange={(e) =>
                setEditedTask({ ...editedTask, observation: e.target.value })
              }
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

export default TaskEditor;
