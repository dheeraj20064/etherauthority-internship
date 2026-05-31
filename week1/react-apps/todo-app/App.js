import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { 
      id: Date.now(), 
      text: input, 
      completed: false 
    }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? 
      { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={{ 
      maxWidth: "500px", margin: "50px auto", 
      fontFamily: "Arial", padding: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderRadius: "8px"
    }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Todo List
      </h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new task..."
          style={{ 
            flex: 1, padding: "10px", 
            borderRadius: "4px", border: "1px solid #ddd",
            fontSize: "16px"
          }}
        />
        <button
          onClick={addTodo}
          style={{ 
            padding: "10px 20px", background: "#4CAF50",
            color: "white", border: "none", 
            borderRadius: "4px", cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Add
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["all", "active", "completed"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "5px 15px",
              background: filter === f ? "#007bff" : "#eee",
              color: filter === f ? "white" : "#333",
              border: "none", borderRadius: "4px",
              cursor: "pointer", textTransform: "capitalize"
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <p style={{ textAlign: "center", color: "#999" }}>
          No tasks found
        </p>
      )}

      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          style={{
            display: "flex", alignItems: "center",
            gap: "10px", padding: "10px",
            border: "1px solid #eee", borderRadius: "4px",
            marginBottom: "8px",
            background: todo.completed ? "#f9f9f9" : "white"
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            style={{ width: "18px", height: "18px" }}
          />
          <span style={{
            flex: 1, fontSize: "16px",
            textDecoration: todo.completed ? 
            "line-through" : "none",
            color: todo.completed ? "#999" : "#333"
          }}>
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            style={{
              padding: "5px 10px", background: "#ff4444",
              color: "white", border: "none",
              borderRadius: "4px", cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <p style={{ textAlign: "center", color: "#999", marginTop: "20px" }}>
        {todos.filter(t => !t.completed).length} tasks remaining
      </p>
    </div>
  );
}
