import { useState } from "react"
import { mintCertificate, getTotalCertificates } from "../services/blockchain"
import { NETWORK } from "../config/contracts"

export default function IssueCertificate({ walletAddress }) {
    const [form, setForm] = useState({
        recipientWallet: "",
        internName: "",
        completionDate: "",
        grade: "A"
    })
    const [totalMinted, setTotalMinted] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const checkTotal = async () => {
        try {
            const total = await getTotalCertificates()
            setTotalMinted(total)
        } catch (err) {
            setError("Failed to fetch total")
        }
    }

    const handleIssue = async () => {
        try {
            setLoading(true)
            setError("")
            setSuccess("")

            if (!form.recipientWallet || !form.internName || !form.completionDate) {
                setError("All fields are required")
                return
            }

            const uri = "https://etherauthority.io/certificate"

            const tx = await mintCertificate(
                form.recipientWallet,
                form.internName,
                form.completionDate,
                uri
            )

            setSuccess(
                `✅ Certificate NFT issued to ${form.internName}!
                 TX: ${tx.hash.slice(0, 20)}...
                 View: ${NETWORK.explorer}/tx/${tx.hash}`
            )
            setForm({
                recipientWallet: "",
                internName: "",
                completionDate: "",
                grade: "A"
            })

        } catch (err) {
            setError(err.message || "Certificate issuance failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 style={{ marginBottom: "20px", color: "#7c3aed" }}>
                Issue Certificate NFT
            </h2>

            <div style={{
                background: "#0a0a1a",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <span style={{ color: "#888" }}>
                    Total Certificates: {totalMinted || "---"}
                </span>
                <button
                    className="btn"
                    style={{ width: "auto", padding: "6px 12px" }}
                    onClick={checkTotal}
                >
                    Check Total
                </button>
            </div>

            <div className="form-group">
                <label>Recipient Wallet Address</label>
                <input
                    name="recipientWallet"
                    value={form.recipientWallet}
                    onChange={handleChange}
                    placeholder="0x..."
                />
            </div>

            <div className="form-group">
                <label>Intern Name</label>
                <input
                    name="internName"
                    value={form.internName}
                    onChange={handleChange}
                    placeholder="Enter intern name"
                />
            </div>

            <div className="form-group">
                <label>Completion Date</label>
                <input
                    name="completionDate"
                    type="date"
                    value={form.completionDate}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Grade</label>
                <select
                    name="grade"
                    value={form.grade}
                    onChange={handleChange}
                >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>

            <button
                className="btn"
                onClick={handleIssue}
                disabled={loading}
            >
                {loading ? "Issuing..." : "Issue Certificate NFT"}
            </button>

            {success && (
                <div className="success">
                    {success.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </div>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    )
}