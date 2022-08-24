import TodoItemsLeft from "./TodoItemsLeft";
import TodoFilter from "./TodoFilter";
import TodoCompleted from "./TodoCompleted";

export default function TodoFooter({
  filter,
  updateFilter,
  activeTodosCount,
  clearCompletedTodos,
  clearCompletedStyle,
  footerStyle
}) {
  return (
    <footer style={footerStyle} className="footer">
      <TodoItemsLeft activeTodosCount={activeTodosCount} />
      <TodoFilter filter={filter} updateFilter={updateFilter} />
      <TodoCompleted
        clearCompletedStyle={clearCompletedStyle}
        clearCompletedTodos={clearCompletedTodos}
      />
    </footer>
  );
}
