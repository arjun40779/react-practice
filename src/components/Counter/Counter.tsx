import { Link } from "react-router";
import {
  decrement,
  increment,
  redo,
  undo,
} from "../../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.present);
  const canUndo = useAppSelector((state) => state.counter.past.length > 0);
  const canRedo = useAppSelector((state) => state.counter.future.length > 0);
  return (
    <section className="counter-card" aria-labelledby="counter-title">
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span> All apps
      </Link>
      <header className="counter-header">
        <p className="eyebrow">COUNTER</p>
        <h1 id="counter-title">One count at a time.</h1>
        <p className="todo-description">
          A simple counter with a little room to change your mind.
        </p>
      </header>
      <output className="counter-value" aria-live="polite" aria-label="Count">
        {count}
      </output>
      <div className="counter-adjustments" aria-label="Adjust count">
        <button
          className="counter-adjust-button"
          type="button"
          onClick={() => dispatch(decrement())}
          aria-label="Decrease count"
        >
          −
        </button>
        <button
          className="counter-adjust-button counter-increment"
          type="button"
          onClick={() => dispatch(increment())}
          aria-label="Increase count"
        >
          +
        </button>
      </div>
      <div className="counter-history">
        <button
          className="button button-quiet"
          type="button"
          disabled={!canUndo}
          onClick={() => dispatch(undo())}
        >
          <span aria-hidden="true">↶</span> Undo
        </button>
        <button
          className="button button-quiet"
          type="button"
          disabled={!canRedo}
          onClick={() => dispatch(redo())}
        >
          Redo <span aria-hidden="true">↷</span>
        </button>
      </div>
    </section>
  );
};

export default Counter;
