import { useState } from "react"
import { transferTokens, getTokenBalance } from "../services/blockchain"

export default function MintToken({ walletAddress }) {
    const [form, setForm] = useState({
        internWallet: "",
        amount: ""
    })
    const [balance, setBalance] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const checkBalance = async () => {
        try {
            const bal = await getTokenBalance(walletAddress)
            setBalance(bal)
        } catch (err) {
            setError("Failed to fetch balance")
        }
    }

    const handleMint = async () => {
        try {
            setLoading(true)
            setError("")
            setSuccess("")

            if (!form.internWallet || !form.amount) {
                setError("All fields are required")
                return
            }

            const tx = await transferTokens(
                form.internWallet,
                form.amount
            )

            setSuccess(
                `✅ ${form.amount} IRT tokens sent!
                 TX: ${tx.hash.slice(0, 20)}...`
            )
            setForm({ internWallet: "", amount: "" })

        } catch (err) {
            setError(err.message || "Token transfer failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 style={{ marginBottom: "20px", color: "#7c3aed" }}>
                Mint Reward Tokens
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
                    Your IRT Balance: {balance || "---"}
                </span>
                <button
                    className="btn"
                    style={{ width: "auto", padding: "6px 12px" }}
                    onClick={checkBalance}
                >
                    Check Balance
                </button>
            </div>

            <div className="form-group">
                <label>Intern Wallet Address</label>
                <input
                    name="internWallet"
                    value={form.internWallet}
                    onChange={handleChange}
                    placeholder="0x..."
                />
            </div>

            <div className="form-group">
                <label>Amount (IRT)</label>
                <input
                    name="amount"
                    type="number"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="100"
                />
            </div>

            <button
                className="btn"
                onClick={handleMint}
                disabled={loading}
            >
                {loading ? "Sending..." : "Send Tokens"}
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