import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useToast,
  Input,
  TableContainer,
} from "@chakra-ui/react";
import styles from "./TodolistEditor.module.css"
import useAuth from "../../hook/useAuth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../../api/send/todo";
import TaskEditorAdmin from "./Admin/TaskEditorAdmin";
import ReactPaginate from "react-paginate";

const TodoListedit = () => {
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useAuth();
  const toast = useToast();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 12;

  const [filteredTodos, setFilteredTodos] = useState([]);

  const refreshData = () => {
    const q = query(collection(db, "todo"));
    onSnapshot(q, (querySnapshot) => {
      let ar = [];
      querySnapshot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
      setFilteredTodos(ar);
    });
  };

  
  useEffect(() => {
    refreshData();
  }, [user]);

  const handleSearch = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(event.target.value);
  
    const filtered = todos.filter((todo) => {
      return (
        todo.userEmail?.toLowerCase().includes(text) ||
        todo.title?.toLowerCase().includes(text) ||
        todo.description?.toLowerCase().includes(text) ||
        todo.status?.toLowerCase().includes(text) ||
        todo.displayDate?.toLowerCase().includes(text)
      );
    });
  
    setFilteredTodos(filtered);
  };
  

  const pageCount = Math.ceil(filteredTodos.length / todosPerPage);

  const getPaginatedData = () => {
    const offset = pageNumber * todosPerPage;
    return filteredTodos.slice(offset, offset + todosPerPage);
  };

  const handleTodoDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      deleteTodo(id);
      toast({ title: "Deletado com Sucesso!", status: "success" });
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCloseEditor = () => {
    setEditingTask(null);
  };
 

  const handleUpdateTask = (updatedTask) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === updatedTask.id) {
          return updatedTask;
        }
        return todo;
      });
    });
  };

  const statusColors = {
    "Backlog": "gray.100",
    "Para fazer": "red.100",
    "Fazendo": "yellow.100",
    "Testando": "blue.100",
    "Finalizado": "green.100",
  };
  
  const getColorByStatus = (status) => {
    return statusColors[status] || "gray.50";
  };
  

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };

  return (
    <Box  display="flex" flexDirection="column" width="100%">
     <Input
  placeholder="Buscar tarefa"
  value={searchText}
  maxWidth="250px"
  onChange={handleSearch}
  mb={4}
/>

    <Box
    mt={5} display="relative" flexDirection="column"
    justifyContent="start" maxWidth="100%"
    >
      <TableContainer display="flex"
  flexDirection="column"
  alignContent="center"
  width="100%"
  overflowX="auto" >
      <Table  variant="simple">
        <Thead >
          <Tr>
            <Th>Tarefa</Th>
            <Th>Descrição</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Data de Realização</Th>
            <Th>Observação</Th>
          </Tr>
        </Thead>
        <Tbody
        >
          {getPaginatedData().map((todo) => (
            <Tr bg={getColorByStatus(todo.status)} key={todo.id} color="black">

              <Td>{todo.title}</Td>
              <Td>{todo.description}</Td>
              <Td>{todo.userEmail}</Td>
              <Td>{todo.status}</Td>
              <Td>{todo.displayDate}</Td>
              <Td>{todo.observation}</Td>
              <Td alignItems="center">
                <Box display="flex">

                <Badge
                  color="red.900"
                  transition="0.2s"
                  _hover={{
                    bg: "red",
                    transform: "scale(1.2)",
                  }}
                  cursor="pointer"
                  onClick={() => user && handleTodoDelete(todo.id)}
                >
                  {user && <FaTrash />}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={"green"}
                  ml={2}
                  transition="0.2s"
                  _hover={{
                    transform: "scale(1.2)",
                  }}
                  cursor="pointer"
                  onClick={() => handleEditTask(todo)}
                >
                  <FaEdit />
                </Badge>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
      </Box>
      {editingTask && (
        <TaskEditorAdmin
        isOpen={!!editingTask}
          onClose={handleCloseEditor}
          task={editingTask}
          onUpdateTask={handleUpdateTask}
          />
      )}
      {pageCount > 1 && (
        <ReactPaginate
  pageCount={pageCount}
  pageRangeDisplayed={5}
  marginPagesDisplayed={6}
  previousLabel={"Anterior"}
  nextLabel={"Próxima"}
  breakLabel={"..."}
  onPageChange={handlePageClick}
  containerClassName={styles.pagination}
  activeClassName={styles.active}
  previousClassName={styles.pagination_previous}
  nextClassName={styles.pagination_next}
  breakClassName={styles.pagination_break}
  pageClassName={styles.pagination_page}
  pageLinkClassName={styles.pagination_link}
/>

      )}
    </Box>
  );
};

export default TodoListedit;