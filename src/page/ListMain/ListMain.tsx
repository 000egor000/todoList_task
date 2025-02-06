import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchTodosAsync,
  createTodoAsync,
  updateTodoAsync,
  deleteTodoAsync,
} from "../../features/todos/todoSlice";
import { MessageContext } from "../../context/MessageContext";
import useMessage from "../../hooks/useMessage";
import { TodoAdd } from "../../components/TodoAdd";
import { TodoList } from "../../components/TodoList";

import { TodoForm } from "../../types";

const initNewForm: TodoForm = {
  text: "",
  completed: false,
};

const ListMain: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const [newForm, setNewForm] = useState<TodoForm>(initNewForm);
  const contextValue = useContext(MessageContext);
  const { success, error } = useMessage(contextValue);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const handleAsyncAction = async <T,>(
    action: () => Promise<T>,
    successMsg: string
  ) => {
    try {
      await action();
      success(successMsg);
    } catch (errorMsg) {
      const message =
        (errorMsg as { message?: string })?.message || "Произошла ошибка.";
      error(message);
    }
  };

  const handleAddTodo = useCallback(() => {
    handleAsyncAction(
      () => dispatch(createTodoAsync(newForm)),
      "Элемент добавлен!"
    );
    setNewForm(initNewForm);
  }, [dispatch, newForm]);

  const handleUpdateTodo = useCallback(
    (id: string) => {
      handleAsyncAction(
        () => dispatch(updateTodoAsync(id)),
        "Элемент обновлен!"
      );
    },
    [dispatch]
  );

  const handleDeleteTodo = useCallback(
    (id: string) => {
      handleAsyncAction(() => dispatch(deleteTodoAsync(id)), "Элемент удален!");
    },
    [dispatch]
  );

  const disabledAndLoading = useMemo(
    () =>
      !!(loading.add || loading.delete || loading.update || loading.todosAll),
    [loading]
  );

  return (
    <>
      <TodoAdd
        handleAddTodo={handleAddTodo}
        newForm={newForm}
        change={setNewForm}
        disabled={disabledAndLoading}
        loading={loading}
        msgError={error}
      />
      <TodoList
        data={todos}
        disabled={disabledAndLoading}
        loading={loading}
        handleUpdate={handleUpdateTodo}
        handleDelete={handleDeleteTodo}
      />
    </>
  );
};

export default ListMain;
