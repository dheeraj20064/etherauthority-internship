import { useState } from "react"
import Navbar from "./components/Navbar"
import ConnectWallet from "./components/ConnectWallet"
import RegisterIntern from "./components/RegisterIntern"
import ViewInterns from "./components/ViewInterns"
import MintToken from "./components/MintToken"
import IssueCertificate from "./components/IssueCertificate"
import "./App.css"

export default function App() {
    const [walletAddress, setWalletAddress] = useState("")
    const [activeTab, setActiveTab] = useState("register")

    return (
        <div className="app">
            <header className="header">
                <h1>🎓 Intern Management DApp</h1>
                <p>Powered by EtherAuthority on SecureChain</p>
                <ConnectWallet
                    walletAddress={walletAddress}
                    setWalletAddress={setWalletAddress}
                />
            </header>

            {walletAddress ? (
                <>
                    <Navbar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <main className="main">
                        {activeTab === "register" && (
                            <RegisterIntern
                                walletAddress={walletAddress}
                            />
                        )}
                        {activeTab === "view" && (
                            <ViewInterns />
                        )}
                        {activeTab === "mint" && (
                            <MintToken
                                walletAddress={walletAddress}
                            />
                        )}
                        {activeTab === "certificate" && (
                            <IssueCertificate
                                walletAddress={walletAddress}
                            />
                        )}
                    </main>
                </>
            ) : (
                <div className="connect-prompt">
                    <h2>Connect your wallet to continue</h2>
                    <p>You need MetaMask to use this DApp</p>
                </div>
            )}
        </div>
    )
}