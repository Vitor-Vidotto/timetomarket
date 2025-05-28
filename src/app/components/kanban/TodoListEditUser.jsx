import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Text,
  useToast,
  Badge,
} from "@chakra-ui/react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { DroppableColumn } from "./droppablecolumn";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from '@dnd-kit/utilities';

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { deleteTodo, toggleTodoStatus } from "../../api/send/todo";
import useAuth from "../../hook/useAuth";
import { FaTrash, FaEdit } from "react-icons/fa";
import TaskEditor from "./TaskEditor";

const statusColumns = [
  "Backlog",
  "Para fazer",
  "Fazendo",
  "Testando",
  "Finalizado",
];

const statusColors = {
  "Backlog": "gray.100",
  "Para fazer": "red.100",
  "Fazendo": "yellow.100",
  "Testando": "blue.100",
  "Finalizado": "green.100",
};
export function prioritizeColumnCollision(args) {
  const { droppableContainers, collisionRect } = args;

  // Filtra todas as colunas visíveis (com bounding box)
  const columnContainers = droppableContainers.filter(container =>
    statusColumns.includes(container.id)
  );

  // Se alguma coluna for detectada como colisão, retorna ela
  if (columnContainers.length > 0) {
    return closestCenter({ ...args, droppableContainers: columnContainers });
  }

  // Se nenhuma coluna estiver colidindo (ex: coluna vazia sem bounding box), tenta com tudo
  return closestCenter(args);
}

function SortableItem({ todo, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: "white",
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    color: "black",
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Text fontWeight="bold">{todo.title}</Text>
      <Text
  fontSize="sm"
  sx={{
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }}
>
  {todo.description}
</Text>

      <Box mt={2} display="flex" gap={2}>
        <Badge colorScheme="red" cursor="pointer" onClick={() => onDelete(todo.id)}>
          <FaTrash />
        </Badge>
        <Badge colorScheme="green" cursor="pointer" onClick={() => onEdit(todo)}>
          <FaEdit />
        </Badge>
      </Box>
    </Box>
  );
}

const TodoListeditUser = () => {
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuth();
  const toast = useToast();
  const [searchText, setSearchText] = useState("");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "todo"), where("userEmail", "==", user.email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let ar = [];
      querySnapshot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) return;

    const draggedTodo = todos.find((todo) => todo.id === active.id);
    if (!draggedTodo) return;

    if (statusColumns.includes(over.id)) {
      const newStatus = over.id;

      if (draggedTodo.status !== newStatus) {
        await toggleTodoStatus({ docId: draggedTodo.id, status: newStatus });
        toast({
          title: `Movido para ${newStatus}`,
          status: "info",
        });
      }
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
    <Box data-tauri-drag-region>
    
      <Input
            placeholder="Buscar tarefa"
            value={searchText}
            maxWidth="250px"
            onChange={(e) => setSearchText(e.target.value)}
            mb={4}
          />
      <DndContext
  sensors={sensors}
  collisionDetection={prioritizeColumnCollision}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
>
  <Box overflowX="auto" w="100vw">
  <Box
    display="flex"
    gap={4}
    flexWrap="nowrap"   // Impede quebra de linha
    minWidth={`${statusColumns.length * 250 + (statusColumns.length - 1) * 16}px`} 
    // Largura mínima é a soma das larguras das colunas + gaps (gap 4 = 16px)
  >
    {statusColumns.map((status) => {
      const todosInStatus = filteredTodos.filter((todo) => todo.status === status);

      return (
        <Box
          key={status}
          minW="250px"
          maxW="250px"
          flexShrink={0} // Não encolhe
        >
          <DroppableColumn
  id={status}
  p={4}
  bg={statusColors[status]}
  borderRadius="md"
  color="black"
  minHeight="300px" // já tem
  display="flex"
  flexDirection="column"
  justifyContent="flex-start" // garante que os filhos fiquem no topo
>
            <Text fontWeight="bold" mb={2}>{status}</Text>
            <SortableContext
              items={todosInStatus.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              {todosInStatus.map((todo) => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleTodoDelete}
                  onEdit={handleEditTask}
                />
              ))}
            </SortableContext>
          </DroppableColumn>
        </Box>
      );
    })}
  </Box>
</Box>
        <DragOverlay>
          {activeId ? (
            <Box
              p={3}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              color="black"
            >
              {todos.find((todo) => todo.id === activeId)?.title || ""}
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>

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
