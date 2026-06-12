import { useState } from "react"
import { withdrawTokens, claimReward } from "../services/blockchain"
import { NETWORK } from "../config/contracts"

export default function WithdrawReward({ 
    walletAddress, 
    onSuccess 
}) {
    const [loading, setLoading] = useState(false)
    const [action, setAction] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleWithdraw = async () => {
        try {
            setLoading(true)
            setAction("withdraw")
            setError("")
            setSuccess("")

            const tx = await withdrawTokens()

            setSuccess(
                `✅ Withdrawn successfully! Tokens + rewards returned.
                 TX: ${tx.hash.slice(0, 20)}...
                 View: ${NETWORK.explorer}/tx/${tx.hash}`
            )
            onSuccess()
        } catch (err) {
            setError(err.message || "Withdrawal failed")
        } finally {
            setLoading(false)
            setAction("")
        }
    }

    const handleClaimReward = async () => {
        try {
            setLoading(true)
            setAction("claim")
            setError("")
            setSuccess("")

            const tx = await claimReward()

            setSuccess(
                `✅ Rewards claimed successfully!
                 TX: ${tx.hash.slice(0, 20)}...
                 View: ${NETWORK.explorer}/tx/${tx.hash}`
            )
            onSuccess()
        } catch (err) {
            setError(err.message || "Claim failed")
        } finally {
            setLoading(false)
            setAction("")
        }
    }

    return (
        <div>
            <h2 style={{ marginBottom: "20px", color: "#7c3aed" }}>
                Withdraw & Rewards
            </h2>

            <div style={{
                background: "#0a0a1a",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "13px",
                color: "#888"
            }}>
                <p style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#7c3aed" }}>
                        Claim Reward:
                    </strong>
                    {" "}Collect earned rewards while keeping
                    tokens staked.
                </p>
                <p>
                    <strong style={{ color: "#ef4444" }}>
                        Withdraw:
                    </strong>
                    {" "}Get all staked tokens + rewards back.
                    Stops staking.
                </p>
            </div>

            <button
                className="btn btn-secondary"
                onClick={handleClaimReward}
                disabled={loading}
            >
                {loading && action === "claim"
                    ? "Claiming..."
                    : "Claim Reward Only"
                }
            </button>

            <button
                className="btn btn-danger"
                onClick={handleWithdraw}
                disabled={loading}
            >
                {loading && action === "withdraw"
                    ? "Withdrawing..."
                    : "Withdraw All (Tokens + Rewards)"
                }
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