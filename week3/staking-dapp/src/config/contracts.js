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
                "inputs": [{"internalType": "address","name": "","type": "address"}],
                "name": "balanceOf",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
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
                "inputs": [],
                "name": "decimals",
                "outputs": [{"internalType": "uint8","name": "","type": "uint8"}],
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

    StakingContract: {
        address: "0x8c082162B3A6372491Ef417037b763F0D53d5053",
        abi: [
            {
                "inputs": [{"internalType": "address","name": "_stakingToken","type": "address"}],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],
                "name": "stake",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "claimReward",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "user","type": "address"}],
                "name": "calculateReward",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "user","type": "address"}],
                "name": "getStakeInfo",
                "outputs": [
                    {"internalType": "uint256","name": "amount","type": "uint256"},
                    {"internalType": "uint256","name": "startTime","type": "uint256"},
                    {"internalType": "uint256","name": "reward","type": "uint256"},
                    {"internalType": "bool","name": "isStaking","type": "bool"}
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "address","name": "","type": "address"}],
                "name": "stakes",
                "outputs": [
                    {"internalType": "uint256","name": "amount","type": "uint256"},
                    {"internalType": "uint256","name": "startTime","type": "uint256"},
                    {"internalType": "uint256","name": "reward","type": "uint256"},
                    {"internalType": "bool","name": "isStaking","type": "bool"}
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "rewardRate",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalStaked",
                "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            }
        ]
    }
}

export const NETWORK = {
    chainId: 34,
    name: "SecureChain Mainnet",
    explorer: "https://explorer.securechain.ai"
}