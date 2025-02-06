import { Todo } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = async (): Promise<Todo[]> => {
  await delay(1000);
  return [
    { id: "1", text: "Learn React", completed: false },
    { id: "2", text: "Learn Redux", completed: false },
    { id: "3", text: "Learn TypeScript", completed: false },
  ];
};

export const createTodo = async (todo: Todo): Promise<Todo> => {
  await delay(1000);
  return todo;
};

export const updateTodo = async (id: string): Promise<string> => {
  await delay(1000);
  return id;
};

export const deleteTodo = async (id: string): Promise<string> => {
  await delay(1000);
  return id;
};
