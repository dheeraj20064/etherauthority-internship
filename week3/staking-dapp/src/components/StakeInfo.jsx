import { useState, useEffect } from "react"
import { getStakeInfo, getTotalStaked } from "../services/blockchain"

export default function StakeInfo({ walletAddress, refresh }) {
    const [info, setInfo] = useState(null)
    const [totalStaked, setTotalStaked] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchInfo()
    }, [walletAddress, refresh])

    const fetchInfo = async () => {
        try {
            setLoading(true)
            const stakeInfo = await getStakeInfo(walletAddress)
            const total = await getTotalStaked()
            setInfo(stakeInfo)
            setTotalStaked(total)
        } catch (err) {
            setError("Failed to fetch stake info")
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return "---"
        return new Date(timestamp * 1000).toLocaleDateString()
    }

    if (loading) return (
        <div className="loading">Loading stake info...</div>
    )

    if (error) return (
        <div className="error">{error}</div>
    )

    return (
        <div>
            <h2 style={{ marginBottom: "20px", color: "#7c3aed" }}>
                My Stake Information
            </h2>

            <div className="info-card">
                <div className="info-row">
                    <span className="info-label">Status</span>
                    <span>
                        {info?.isStaking ? (
                            <span className="badge-staking">
                                🟢 Staking
                            </span>
                        ) : (
                            <span className="badge-not-staking">
                                🔴 Not Staking
                            </span>
                        )}
                    </span>
                </div>
                <div className="info-row">
                    <span className="info-label">
                        Staked Amount
                    </span>
                    <span className="info-value">
                        {info?.amount || "0"} IRT
                    </span>
                </div>
                <div className="info-row">
                    <span className="info-label">
                        Staking Since
                    </span>
                    <span className="info-value">
                        {formatDate(info?.startTime)}
                    </span>
                </div>
                <div className="info-row">
                    <span className="info-label">
                        Earned Reward
                    </span>
                    <span className="info-value">
                        {Number(info?.reward).toFixed(6)} IRT
                    </span>
                </div>
                <div className="info-row">
                    <span className="info-label">
                        Reward Rate
                    </span>
                    <span className="info-value">10% APY</span>
                </div>
            </div>

            <div className="info-card">
                <div className="info-row">
                    <span className="info-label">
                        Total IRT Staked in Contract
                    </span>
                    <span className="info-value">
                        {totalStaked} IRT
                    </span>
                </div>
            </div>

            <button
                className="btn btn-secondary"
                onClick={fetchInfo}
            >
                Refresh Info
            </button>
        </div>
    )
}