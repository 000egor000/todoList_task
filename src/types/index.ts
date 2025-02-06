import { ReactNode } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: {
    add: string | number;
    delete: string | number;
    update: string | number;
    todosAll: string | number;
  };
  error: string | null;
}

export type MessageProviderProps = {
  children: ReactNode;
};

export type MessageType = "success" | "error" | "warning" | "info";

export interface TodoForm {
  text: string;
  completed: boolean;
}

export type handleChangeT =
  | React.ChangeEvent<HTMLTextAreaElement>
  | CheckboxChangeEvent;

export interface TodoAddProps {
  handleAddTodo: () => void;
  newForm: { text: string; completed: boolean };
  change: (newState: { text: string; completed: boolean }) => void;
  disabled: boolean;
  loading: {
    add: string | number;
    delete: string | number;
    update: string | number;
    todosAll: string | number;
  };
  msgError: (message: string) => void;
}

export interface TodoListProps {
  data: Todo[];
  disabled: boolean;
  loading: {
    add: string | number;
    delete: string | number;
    update: string | number;
    todosAll: string | number;
  };
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
}
