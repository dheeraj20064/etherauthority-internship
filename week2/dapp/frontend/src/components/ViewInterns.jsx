import { useState, useEffect } from "react"
import { getAllInterns } from "../services/api"

export default function ViewInterns() {
    const [interns, setInterns] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchInterns()
    }, [])

    const fetchInterns = async () => {
        try {
            setLoading(true)
            const result = await getAllInterns()
            setInterns(result.data)
        } catch (err) {
            setError("Failed to fetch interns")
        } finally {
            setLoading(false)
        }
    }

    const shortAddress = (addr) =>
        `${addr.slice(0, 6)}...${addr.slice(-4)}`

    if (loading) return (
        <div className="loading">Loading interns...</div>
    )

    if (error) return (
        <div className="error">{error}</div>
    )

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
            }}>
                <h2 style={{ color: "#7c3aed" }}>
                    Registered Interns ({interns.length})
                </h2>
                <button
                    className="btn"
                    style={{ width: "auto", padding: "8px 16px" }}
                    onClick={fetchInterns}
                >
                    Refresh
                </button>
            </div>

            {interns.length === 0 ? (
                <p style={{ color: "#888", textAlign: "center" }}>
                    No interns registered yet
                </p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Wallet</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interns.map(intern => (
                            <tr key={intern._id}>
                                <td>{intern.name}</td>
                                <td>{intern.email}</td>
                                <td>{shortAddress(intern.walletAddress)}</td>
                                <td>{intern.course}</td>
                                <td>
                                    <span className={`badge badge-${intern.status}`}>
                                        {intern.status}
                                    </span>
                                </td>
                                <td>{intern.tasksCompleted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}