import { useState } from "react";

export default function TodoItem({
  _id,
  value,
  checked,
  toggleTodo,
  removeTodo,
  updateTodo
}) {
  const [title, setTitle] = useState(value);
  const [edit, setEdit] = useState(false);

  const classNameEdit = edit ? "editing" : "";
  const classNameCompleted = checked ? "completed" : "";
  const className = `${classNameEdit} ${classNameCompleted}`;
  const cbRef = (element) => {
    if (element) element.focus();
  };

  return (
    <li className={className}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={checked}
          onChange={() => toggleTodo(_id)}
        />
        <label
          onDoubleClick={() => {
            setEdit(true);
          }}
        >
          {title}
        </label>
        <button className="destroy" onClick={() => removeTodo(_id)}></button>
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            updateTodo(_id, { value: title, checked: false });
            setEdit(false);
          }
        }}
        onBlur={(e) => {
          e.preventDefault();
          updateTodo(_id, { value: title, checked: false });
          setEdit(false);
        }}
        ref={cbRef}
      />
    </li>
  );
}
