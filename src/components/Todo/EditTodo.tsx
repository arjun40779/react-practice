import { useState } from "react";
import { updateTodo } from "../../features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const EditTodo = ({
  id,
  setEditId,
}: {
  id: number;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) =>
    state.todos.find((todo) => todo.id === id),
  );
  const [text, setText] = useState(currentTodo?.text ?? "");
  const [complete, setComplete] = useState(currentTodo?.completed ?? false);

  const handleUpdateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      updateTodo({
        id,
        text: text.trim(),
        completed: complete,
      }),
    );
    setEditId(null);
  };
  return (
    <form className="edit-panel" onSubmit={handleUpdateTodo}>
      <label className="edit-field">
        <span>Task name</span>
        <input
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </label>
      <label className="edit-completed">
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => setComplete(e.target.checked)}
        />
        Completed
      </label>
      <div className="edit-actions">
        <button
          className="button button-quiet"
          type="button"
          onClick={() => setEditId(null)}
        >
          Cancel
        </button>
        <button className="button button-primary" type="submit">
          Save changes
        </button>
      </div>
    </form>
  );
};
export default EditTodo;
