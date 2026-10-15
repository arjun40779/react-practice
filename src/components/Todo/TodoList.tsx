import { useState } from "react";
import { removeTodo } from "../../features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import EditTodo from "./EditTodo";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const [editId, setEditId] = useState<number | null>(null);

  if (todos.length === 0) {
    return (
      <div className="todo-empty" role="status">
        <span className="empty-icon" aria-hidden="true">
          ✓
        </span>
        <p>Nothing on your list yet.</p>
        <span>Add a task above to get started.</span>
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-label="Tasks">
      {todos.map((todo, index) => (
        <li
          className={`todo-item${todo.completed ? " is-complete" : ""}`}
          key={todo.id}
        >
          <span className="todo-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="todo-item-content">
            <span className="todo-text">{todo.text}</span>
            {todo.completed && <span className="todo-status">Completed</span>}
          </div>
          <div className="todo-actions">
            <button
              className="button button-quiet"
              type="button"
              onClick={() => setEditId(todo.id)}
              aria-label={`Edit ${todo.text}`}
            >
              Edit
            </button>
            <button
              className="button button-quiet button-danger"
              type="button"
              onClick={() => dispatch(removeTodo(todo.id))}
              aria-label={`Remove ${todo.text}`}
            >
              Remove
            </button>
          </div>
          {editId === todo.id && (
            <EditTodo id={todo.id} setEditId={setEditId} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
