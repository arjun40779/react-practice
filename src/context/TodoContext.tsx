import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoContextValue = {
  todos: Todo[];
  addNewTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const items = localStorage.getItem("todos") ?? null;
    const todos = items ? JSON.parse(items) : [];
    return todos;
  });

  const addNewTodo = useCallback((todo: Todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }, [todos]);

  const updateTodo = useCallback((newTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }, [todos]);

  const removeTodo = useCallback((id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }, [todos]);

  const value = useMemo(
    () => ({ todos, updateTodo, removeTodo, addNewTodo }),
    [todos, updateTodo, removeTodo, addNewTodo],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useTodoContext must be used within a TodoContext.Provider",
    );
  }
  return context;
};

export { TodoProvider, useTodoContext };
