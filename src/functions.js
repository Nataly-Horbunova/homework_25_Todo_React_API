// export function createTodo(title) {
//   return { _id: new Date().getTime(), value: title, checked: false };
// }

// export function addTodo(todos, title) {
//   return [...todos, createTodo(title)];
// }

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo._id !== id);
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => {
    if (todo._id === id) {
      return { ...todo, checked: !todo.checked };
    }

    return todo;
  });
}

export function toggleTodos(todos, checked) {
  return todos.map((todo) => ({ ...todo, checked }));
}

export function clearCompletedTodos(todos) {
  return todos.filter((todo) => !todo.checked);
}

export function updateTodo(todos, id, todo) {
  return todos.map((eachTodo) => {
    if (eachTodo._id === id) {
      return { ...eachTodo, ...todo };
    }

    return eachTodo;
  });
}

export function filterTodos(todos, filter) {
  if (filter === "active") {
    return todos.filter((todo) => !todo.checked);
  }

  if (filter === "completed") {
    return todos.filter((todo) => todo.checked);
  }

  return todos;
}

export function countActiveTodos(todos) {
  return todos.reduce((count, todo) => {
    if (!todo.checked) count++;
    return count;
  }, 0);
}
