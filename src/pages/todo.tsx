import AddTodo from "../components/Todo/AddTodo";
import TodoList from "../components/Todo/TodoList";
import { Link } from "react-router";

const TodoPage = () => {
  return (
    <main className="todo-page">
      <section className="todo-card" aria-labelledby="todo-title">
        <Link className="back-link todo-back-link" to="/">
          <span aria-hidden="true">←</span> All apps
        </Link>
        <header className="todo-header">
          <p className="eyebrow">YOUR SPACE</p>
          <h1 id="todo-title">Tasks, made simple.</h1>
          <p className="todo-description">
            A little progress adds up. Keep track of what matters.
          </p>
        </header>
        <AddTodo />
        <TodoList />
      </section>
    </main>
  );
};
export default TodoPage;
