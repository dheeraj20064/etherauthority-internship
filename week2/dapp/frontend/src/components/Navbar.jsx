export default function Navbar({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "register", label: "Register Intern" },
        { id: "view", label: "View Interns" },
        { id: "mint", label: "Mint Token" },
        { id: "certificate", label: "Issue Certificate" }
    ]

    return (
        <nav className="nav">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={activeTab === tab.id ? "active" : ""}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    )
}