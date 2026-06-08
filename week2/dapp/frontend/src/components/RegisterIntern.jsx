import { useState } from "react"
import { registerIntern } from "../services/api"

export default function RegisterIntern({ walletAddress }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        walletAddress: "",
        course: "Web3+AI"
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            setError("")
            setSuccess("")

            if (!form.name || !form.email || !form.walletAddress) {
                setError("All fields are required")
                return
            }

            const result = await registerIntern(form)
            setSuccess(
                `✅ ${result.data.name} registered successfully!`
            )
            setForm({
                name: "",
                email: "",
                walletAddress: "",
                course: "Web3+AI"
            })
        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed"
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 style={{ marginBottom: "20px", color: "#7c3aed" }}>
                Register New Intern
            </h2>

            <div className="form-group">
                <label>Full Name</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter intern name"
                />
            </div>

            <div className="form-group">
                <label>Email Address</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
            </div>

            <div className="form-group">
                <label>Wallet Address</label>
                <input
                    name="walletAddress"
                    value={form.walletAddress}
                    onChange={handleChange}
                    placeholder="0x..."
                />
            </div>

            <div className="form-group">
                <label>Course</label>
                <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                >
                    <option value="Web3+AI">Web3+AI</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="DeFi">DeFi</option>
                </select>
            </div>

            <button
                className="btn"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Registering..." : "Register Intern"}
            </button>

            {success && <div className="success">{success}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    )
}