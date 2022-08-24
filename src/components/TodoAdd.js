import { useState } from "react";

export default function TodoAdd({ addTodo }) {
  const [value, setValue] = useState("");

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter" && value.trim()) {
          e.preventDefault();
          addTodo(value);
          setValue("");
        }
      }}
      onBlur={(e) => {
        if (value.trim()) {
          addTodo(value);
          setValue("");
        }
      }}
    />
  );
}
