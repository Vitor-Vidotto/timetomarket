import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Text,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { deleteTodo, toggleTodoStatus } from "../../api/send/todo";
import useAuth from "../../hook/useAuth";
import { FaTrash, FaEdit } from "react-icons/fa";
import TaskEditor from "./TaskEditor";

const statusColumns = [
  "Não Lançado",
  "Encerrado",
  "Suspenso",
  "Revogado",
  "Homologação",
];


const TodoListeditUser = () => {
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuth();
  const toast = useToast();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "todo"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapshot) => {
      let ar = [];
      querySnapshot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  }, [user]);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // mapeamento no topo
const statusColors = {
  "Não Lançado": "gray.100",
  "Encerrado": "green.100",
  "Suspenso": "yellow.100",
  "Revogado": "red.100",
  "Homologação": "blue.100",
};


  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const movedTodo = todos.find((todo) => todo.id === draggableId);
    if (movedTodo && movedTodo.status !== destination.droppableId) {
      await toggleTodoStatus({ docId: draggableId, status: destination.droppableId });
      toast({
        title: `Movido para ${destination.droppableId}`,
        status: "info",
      });
    }
  };

  const handleTodoDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      await deleteTodo(id);
      toast({ title: "Deletado com Sucesso!", status: "success" });
    }
  };

  const handleEditTask = (task) => setEditingTask(task);
  const handleCloseEditor = () => setEditingTask(null);
  const handleUpdateTask = (updatedTask) => {
    setTodos((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  return (
    <Box>
      <Input
        placeholder="Buscar tarefa"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        mb={4}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box display="flex" gap={4} overflowX="auto">
        {statusColumns.map((status) => (
  <Droppable droppableId={status} key={status}>
    {(provided) => (
      <Box
        ref={provided.innerRef}
        {...provided.droppableProps}
        p={4}
        bg={statusColors[status]} // <-- background color por status
        minW="250px"
        borderRadius="md"
        color="black" // <-- texto preto
      >
        <Text fontWeight="bold" mb={2}>
          {status}
        </Text>
        {filteredTodos
          .filter((todo) => todo.status === status)
          .map((todo, index) => (
            <Draggable draggableId={todo.id} index={index} key={todo.id}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  bg="white"
                  p={3}
                  mb={2}
                  borderRadius="md"
                  boxShadow="md"
                  color="black" // <-- texto preto nos cards
                >
                  <Text fontWeight="bold">{todo.title}</Text>
                  <Text fontSize="sm">{todo.description}</Text>
                  <Box mt={2} display="flex" gap={2}>
                    <Badge colorScheme="red" cursor="pointer" onClick={() => handleTodoDelete(todo.id)}>
                      <FaTrash />
                    </Badge>
                    <Badge colorScheme="green" cursor="pointer" onClick={() => handleEditTask(todo)}>
                      <FaEdit />
                    </Badge>
                  </Box>
                </Box>
              )}
            </Draggable>
          ))}
        {provided.placeholder}
      </Box>
    )}
  </Droppable>
))}
        </Box>
      </DragDropContext>

      {editingTask && (
        <TaskEditor
          isOpen={!!editingTask}
          onClose={handleCloseEditor}
          task={editingTask}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </Box>
  );
};

export default TodoListeditUser;
