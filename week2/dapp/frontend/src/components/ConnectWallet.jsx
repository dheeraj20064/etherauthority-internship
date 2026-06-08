import { useState } from "react"
import { ethers } from "ethers"
import { NETWORK } from "../config/contracts"

export default function ConnectWallet({ 
    walletAddress, 
    setWalletAddress 
}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const connectWallet = async () => {
        try {
            setLoading(true)
            setError("")

            if (!window.ethereum) {
                setError("MetaMask not installed")
                return
            }

            const provider = new ethers.BrowserProvider(
                window.ethereum
            )

            const accounts = await provider.send(
                "eth_requestAccounts", []
            )

            const network = await provider.getNetwork()
            if (Number(network.chainId) !== NETWORK.chainId) {
                setError(
                    `Wrong network. Switch to ${NETWORK.name}`
                )
                return
            }

            setWalletAddress(accounts[0])

        } catch (err) {
            setError("Connection failed. Try again.")
        } finally {
            setLoading(false)
        }
    }

    const shortAddress = (addr) =>
        `${addr.slice(0, 6)}...${addr.slice(-4)}`

    return (
        <div style={{ marginTop: "15px" }}>
            {walletAddress ? (
                <div style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    background: "#064e3b",
                    border: "1px solid #10b981",
                    borderRadius: "8px",
                    color: "#10b981",
                    fontSize: "14px"
                }}>
                    ✅ {shortAddress(walletAddress)}
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    disabled={loading}
                    style={{
                        padding: "10px 24px",
                        background: "#7c3aed",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                >
                    {loading ? "Connecting..." : "Connect Wallet"}
                </button>
            )}
            {error && (
                <div className="error" style={{ marginTop: "10px" }}>
                    {error}
                </div>
            )}
        </div>
    )
}