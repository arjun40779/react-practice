import { useState } from "react";
import { useTodoContext } from "../../context/TodoContext";

const AddTodo = () => {
  const [inputValue, setInputValue] = useState("");
  const { addNewTodo } = useTodoContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    addNewTodo({
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    });
    setInputValue("");
  };

  return (
    <form className="todo-form" onSubmit={handleAddTodo}>
      <input
        className="todo-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="What needs to get done?"
        aria-label="New task"
      />
      <button className="button button-primary" type="submit">
        Add task
      </button>
    </form>
  );
};
export default AddTodo;
