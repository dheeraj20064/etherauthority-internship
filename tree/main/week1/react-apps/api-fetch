import { useState, useEffect } from "react";

export default function APIFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      maxWidth: "600px", margin: "50px auto",
      fontFamily: "Arial", padding: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      borderRadius: "8px"
    }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>
        API Fetch Example
      </h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%", padding: "10px",
          borderRadius: "4px", border: "1px solid #ddd",
          fontSize: "16px", marginBottom: "20px",
          boxSizing: "border-box"
        }}
      />

      <button
        onClick={fetchUsers}
        style={{
          padding: "10px 20px", background: "#007bff",
          color: "white", border: "none",
          borderRadius: "4px", cursor: "pointer",
          marginBottom: "20px", fontSize: "16px"
        }}
      >
        Refresh Data
      </button>

      {loading && (
        <p style={{ textAlign: "center", color: "#999" }}>
          Loading...
        </p>
      )}

      {error && (
        <p style={{ textAlign: "center", color: "red" }}>
          {error}
        </p>
      )}

      {filteredUsers.map(user => (
        <div
          key={user.id}
          style={{
            padding: "15px", border: "1px solid #eee",
            borderRadius: "4px", marginBottom: "10px",
            background: "#f9f9f9"
          }}
        >
          <h3 style={{ margin: "0 0 5px", color: "#333" }}>
            {user.name}
          </h3>
          <p style={{ margin: "0 0 3px", color: "#666" }}>
            📧 {user.email}
          </p>
          <p style={{ margin: "0 0 3px", color: "#666" }}>
            🌐 {user.website}
          </p>
          <p style={{ margin: "0", color: "#666" }}>
            🏢 {user.company.name}
          </p>
        </div>
      ))}

      <p style={{ textAlign: "center", color: "#999" }}>
        Showing {filteredUsers.length} of {users.length} users
      </p>
    </div>
  );
}
