function TodoCompleted({ clearCompletedTodos, clearCompletedStyle }) {
  return (
    <button
      className="clear-completed"
      style={clearCompletedStyle}
      onClick={(e) => {
        clearCompletedTodos();
      }}
    >
      Clear completed
    </button>
  );
}
export default TodoCompleted;
