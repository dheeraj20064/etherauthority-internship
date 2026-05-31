import { useState } from "react";

// Reusable Card Component
function Card({ title, description, color, icon }) {
  return (
    <div style={{
      padding: "20px",
      borderRadius: "8px",
      border: `2px solid ${color}`,
      marginBottom: "15px",
      background: `${color}11`
    }}>
      <h3 style={{ color: color, margin: "0 0 10px" }}>
        {icon} {title}
      </h3>
      <p style={{ color: "#666", margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

// Reusable Button Component
function Button({ label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        background: color,
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        margin: "5px",
        fontSize: "14px"
      }}
    >
      {label}
    </button>
  );
}

// Reusable Badge Component
function Badge({ text, color }) {
  return (
    <span style={{
      padding: "4px 12px",
      background: color,
      color: "white",
      borderRadius: "20px",
      fontSize: "12px",
      margin: "4px",
      display: "inline-block"
    }}>
      {text}
    </span>
  );
}

// Reusable Alert Component
function Alert({ message, type }) {
  const colors = {
    success: "#4CAF50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196F3"
  };
  return (
    <div style={{
      padding: "12px 20px",
      background: `${colors[type]}22`,
      border: `1px solid ${colors[type]}`,
      borderRadius: "4px",
      color: colors[type],
      marginBottom: "10px"
    }}>
      {message}
    </div>
  );
}

// Main App using all reusable components
export default function ComponentReuse() {
  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState(null);

  const showAlert = (type) => {
    const messages = {
      success: "Task completed successfully!",
      error: "Something went wrong!",
      warning: "Please check your input!",
      info: "New update available!"
    };
    setAlert({ message: messages[type], type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div style={{
      maxWidth: "600px", margin: "50px auto",
      fontFamily: "Arial", padding: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderRadius: "8px"
    }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Component Reuse Example
      </h1>

      {alert && (
        <Alert message={alert.message} type={alert.type} />
      )}

      <h2 style={{ color: "#555" }}>Reusable Cards</h2>
      <Card
        title="Blockchain"
        description="Decentralized ledger technology for secure transactions."
        color="#007bff"
        icon="⛓️"
      />
      <Card
        title="Smart Contracts"
        description="Self-executing contracts stored on the blockchain."
        color="#4CAF50"
        icon="📄"
      />
      <Card
        title="Web3"
        description="The next generation of the internet powered by blockchain."
        color="#9c27b0"
        icon="🌐"
      />

      <h2 style={{ color: "#555" }}>Reusable Buttons</h2>
      <Button label="Success" color="#4CAF50" 
        onClick={() => showAlert("success")} />
      <Button label="Error" color="#f44336" 
        onClick={() => showAlert("error")} />
      <Button label="Warning" color="#ff9800" 
        onClick={() => showAlert("warning")} />
      <Button label="Info" color="#2196F3" 
        onClick={() => showAlert("info")} />

      <h2 style={{ color: "#555" }}>Reusable Badges</h2>
      <Badge text="Solidity" color="#007bff" />
      <Badge text="React" color="#61dafb" />
      <Badge text="Web3" color="#9c27b0" />
      <Badge text="Blockchain" color="#4CAF50" />
      <Badge text="ERC20" color="#ff9800" />

      <h2 style={{ color: "#555" }}>Counter Component</h2>
      <div style={{ textAlign: "center", padding: "20px",
        border: "1px solid #eee", borderRadius: "8px" }}>
        <h3 style={{ fontSize: "48px", margin: "0 0 20px" }}>
          {count}
        </h3>
        <Button label="+" color="#4CAF50" 
          onClick={() => setCount(count + 1)} />
        <Button label="-" color="#f44336" 
          onClick={() => setCount(count - 1)} />
        <Button label="Reset" color="#607d8b" 
          onClick={() => setCount(0)} />
      </div>
    </div>
  );
}
