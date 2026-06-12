import { useState } from "react"
import ConnectWallet from "./components/ConnectWallet"
import StakeTokens from "./components/StakeTokens"
import StakeInfo from "./components/StakeInfo"
import WithdrawReward from "./components/WithdrawReward"
import "./App.css"

export default function App() {
    const [walletAddress, setWalletAddress] = useState("")
    const [activeTab, setActiveTab] = useState("stake")
    const [refresh, setRefresh] = useState(0)

    const triggerRefresh = () => setRefresh(r => r + 1)

    return (
        <div className="app">
            <header className="header">
                <h1>🏦 IRT Staking DApp</h1>
                <p>Stake IRT tokens and earn rewards</p>
                <p className="network">
                    Network: SecureChain Mainnet
                </p>
                <ConnectWallet
                    walletAddress={walletAddress}
                    setWalletAddress={setWalletAddress}
                />
            </header>

            {walletAddress ? (
                <>
                    <nav className="nav">
                        <button
                            className={activeTab === "stake" ? "active" : ""}
                            onClick={() => setActiveTab("stake")}
                        >
                            Stake Tokens
                        </button>
                        <button
                            className={activeTab === "info" ? "active" : ""}
                            onClick={() => setActiveTab("info")}
                        >
                            My Stake
                        </button>
                        <button
                            className={activeTab === "withdraw" ? "active" : ""}
                            onClick={() => setActiveTab("withdraw")}
                        >
                            Withdraw
                        </button>
                    </nav>

                    <main className="main">
                        {activeTab === "stake" && (
                            <StakeTokens
                                walletAddress={walletAddress}
                                onSuccess={triggerRefresh}
                            />
                        )}
                        {activeTab === "info" && (
                            <StakeInfo
                                walletAddress={walletAddress}
                                refresh={refresh}
                            />
                        )}
                        {activeTab === "withdraw" && (
                            <WithdrawReward
                                walletAddress={walletAddress}
                                onSuccess={triggerRefresh}
                            />
                        )}
                    </main>
                </>
            ) : (
                <div className="connect-prompt">
                    <h2>Connect your wallet to start staking</h2>
                    <p>You need MetaMask on SecureChain Mainnet</p>
                </div>
            )}
        </div>
    )
}