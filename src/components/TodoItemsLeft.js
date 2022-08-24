function TodoItemsLeft({ activeTodosCount }) {
  return (
    <span className="todo-count">
      <strong>{activeTodosCount}</strong> items left
    </span>
  );
}

export default TodoItemsLeft;
