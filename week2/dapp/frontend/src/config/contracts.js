// Contract addresses deployed on SecureChain Mainnet
// Chain ID: 34

export const CONTRACTS = {

    InternRewardToken: {
        address: "0x9f11C08da4030676d9234B49FD9A374af22e7145",
        abi: [
            {
                "inputs": [{"internalType": "uint256","name": "initialSupply","type": "uint256"}],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],
                "name": "approve",
                "outputs": [{"internalType": "bool","name": "","type": "bool"}],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "uint256","name": "value","type": "uint256"}],
                "name": "burn",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],
                "name": "mint",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],
                "name": "transfer",
                "outputs": [{"internalType": "bool","name": "","type": "bool"}],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],
                "name": "transferFrom",
                "outputs": [{"internalType": "bool","name": "","type": "bool"}],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"}],
                "name": "allowance",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "","type": "address"}],
                "name": "balanceOf",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [{"internalType": "uint8","name": "","type": "uint8"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [{"internalType": "string","name": "","type": "string"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [{"internalType": "address","name": "","type": "address"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [{"internalType": "string","name": "","type": "string"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    },

    InternshipCertificateNFT: {
        address: "0x02d8f4b535F57d7b2ABc529abACBB4e1Ff51eDE9",
        abi: [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "recipient","type": "address"},{"internalType": "string","name": "internName","type": "string"},{"internalType": "string","name": "completionDate","type": "string"},{"internalType": "string","name": "uri","type": "string"}],
                "name": "mintCertificate",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],
                "name": "transfer",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "","type": "address"}],
                "name": "balanceOf",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "name": "certificateData",
                "outputs": [{"internalType": "string","name": "","type": "string"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],
                "name": "getCertificate",
                "outputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "string","name": "","type": "string"},{"internalType": "string","name": "","type": "string"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getTotalMinted",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [{"internalType": "string","name": "","type": "string"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [{"internalType": "address","name": "","type": "address"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "name": "ownerOf",
                "outputs": [{"internalType": "address","name": "","type": "address"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [{"internalType": "string","name": "","type": "string"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "tokenCounter",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "name": "tokenURI",
                "outputs": [{"internalType": "string","name": "","type": "string"}],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    }
}

// Network config
export const NETWORK = {
    chainId: 34,
    name: "SecureChain Mainnet",
    explorer: "https://explorer.securechain.ai"
}

// Backend API URL
export const API_URL = "http://localhost:3001"