import { useState } from "react"
import { 
    getTokenBalance, 
    approveStaking, 
    stakeTokens 
} from "../services/blockchain"

export default function StakeTokens({ 
    walletAddress, 
    onSuccess 
}) {
    const [amount, setAmount] = useState("")
    const [balance, setBalance] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const fetchBalance = async () => {
        try {
            const bal = await getTokenBalance(walletAddress)
            setBalance(bal)
        } catch (err) {
            setError("Failed to fetch balance")
        }
    }

    const handleStake = async () => {
        try {
            setLoading(true)
            setError("")
            setSuccess("")

            if (!amount || Number(amount) <= 0) {
                setError("Enter valid amount")
                return
            }

            setStep("Step 1/2: Approving tokens...")
            await approveStaking(amount)

            setStep("Step 2/2: Staking tokens...")
            const tx = await stakeTokens(amount)

            setSuccess(
                `✅ Successfully staked ${amount} IRT tokens!
                 TX: ${tx.hash.slice(0, 20)}...`
            )
            setAmount("")
            setStep("")
            onSuccess()
        } catch (err) {
            setError(err.message || "Staking failed")
            setStep("")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 style={{ marginBottom: "20px", color: "#7c3aed" }}>
                Stake IRT Tokens
            </h2>

            <div className="info-card">
                <div className="info-row">
                    <span className="info-label">
                        Your IRT Balance
                    </span>
                    <span className="info-value">
                        {balance || "---"} IRT
                    </span>
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={fetchBalance}
                    style={{ marginTop: "10px" }}
                >
                    Check Balance
                </button>
            </div>

            <div className="form-group">
                <label>Amount to Stake (IRT)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>

            <div style={{
                background: "#0a0a1a",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "13px",
                color: "#888"
            }}>
                ℹ️ Staking requires 2 MetaMask confirmations:
                <br />1. Approve tokens
                <br />2. Stake tokens
            </div>

            {step && (
                <div style={{
                    color: "#7c3aed",
                    marginBottom: "10px",
                    fontSize: "14px"
                }}>
                    ⏳ {step}
                </div>
            )}

            <button
                className="btn"
                onClick={handleStake}
                disabled={loading}
            >
                {loading ? "Processing..." : "Stake Tokens"}
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