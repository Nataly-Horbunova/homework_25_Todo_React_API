import "./styles.css";
import { useState, useEffect } from "react";

import TodoHeader from "./components/TodoHeader.js";
import TodoToggleAll from "./components/TodoToggleAll";
import TodoFooter from "./components/TodoFooter";
import TodoList from "./components/TodoList";

import {
  filterTodos,
  toggleTodo,
  removeTodo,
  updateTodo,
  toggleTodos,
  clearCompletedTodos,
  countActiveTodos
} from "./functions";

import { api } from "./storage";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const filteredTodos = filterTodos(todos, filter);
  const clearCompletedStyle = todos.find((todo) => todo.checked === true)
    ? { display: "block" }
    : { display: "none" };

  const footerAndTodosStyle = todos.length
    ? { display: "block" }
    : { display: "none" };

  const activeTodo = todos.find((todo) => todo.checked === false)
    ? true
    : false;

  async function handleRequest(requestFn, ...args) {
    try {
      const response = await requestFn.call(api, ...args);
      if (response.ok) {
        setIsLoaded(true);
        return await response.json();
      } else {
        setIsLoaded(true);
        throw new Error(
          `${response.status}. An error occurred. Please try again`
        );
      }
    } catch (error) {
      setError(error);
    }
  }

  async function auth() {
    const ref = api.getToken();

    if (ref) {
      setIsLoaded(true);
    } else {
      const result = await handleRequest(api.auth);
      if (result) {
        const { access_token: accessToken } = result;
        api.setToken(accessToken);
      }
    }
  }

  useEffect(() => {
    (async () => {
      await auth();
      const result = await handleRequest(api.getAll);
      if (result) setTodos(result);
    })();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className="todoapp">
        <TodoHeader
          addTodo={async (title) => {
            const todo = await handleRequest(api.addTodo, title.trim());
            setTodos([...todos, todo]);
          }}
        />
        <section className="main" style={footerAndTodosStyle}>
          <TodoToggleAll
            toggleTodos={async () => {
              if (activeTodo) {
                todos.forEach(async (todo) => {
                  if (!todo.checked) {
                    await handleRequest(api.toggleTodo, todo._id);
                  }
                });
              } else {
                todos.forEach(async (todo) => {
                  await handleRequest(api.toggleTodo, todo._id);
                });
              }
              setTodos(toggleTodos(todos, activeTodo));
            }}
          />
          <TodoList
            todos={filteredTodos}
            toggleTodo={async (id) => {
              await handleRequest(api.toggleTodo, id);
              setTodos(toggleTodo(todos, id));
            }}
            removeTodo={async (id) => {
              await handleRequest(api.removeTodo, id);
              setTodos(removeTodo(todos, id));
            }}
            updateTodo={async (id, todo) => {
              await handleRequest(api.updateTodo, id, todo.value);
              setTodos(updateTodo(todos, id, todo));
            }}
          />
        </section>
        <TodoFooter
          footerStyle={footerAndTodosStyle}
          filter={filter}
          updateFilter={(filter) => {
            setFilter(filter);
          }}
          clearCompletedStyle={clearCompletedStyle}
          clearCompletedTodos={async () => {
            todos.forEach(async (todo) => {
              if (todo.checked) await handleRequest(api.removeTodo, todo._id);
            });
            setTodos(clearCompletedTodos(todos));
          }}
          activeTodosCount={countActiveTodos(todos)}
        />
      </section>
    );
  }
}
