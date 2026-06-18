import { ethers } from "ethers"
import { CONTRACTS, NETWORK } from "../config/contracts"

export const getProvider = () => {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed")
    }
    return new ethers.BrowserProvider(window.ethereum)
}

export const getSigner = async () => {
    const provider = getProvider()
    return await provider.getSigner()
}

export const checkNetwork = async () => {
    const provider = getProvider()
    const network = await provider.getNetwork()
    if (Number(network.chainId) !== NETWORK.chainId) {
        throw new Error(
            `Wrong network. Switch to ${NETWORK.name}`
        )
    }
    return true
}

// Get IRT token balance
export const getTokenBalance = async (address) => {
    const provider = getProvider()
    const contract = new ethers.Contract(
        CONTRACTS.InternRewardToken.address,
        CONTRACTS.InternRewardToken.abi,
        provider
    )
    const balance = await contract.balanceOf(address)
    return ethers.formatUnits(balance, 18)
}

// Approve staking contract to spend tokens
export const approveStaking = async (amount) => {
    await checkNetwork()
    const signer = await getSigner()
    const contract = new ethers.Contract(
        CONTRACTS.InternRewardToken.address,
        CONTRACTS.InternRewardToken.abi,
        signer
    )
    const parsedAmount = ethers.parseUnits(
        amount.toString(), 18
    )
    const tx = await contract.approve(
        CONTRACTS.StakingContract.address,
        parsedAmount
    )
    await tx.wait()
    return tx
}

// Stake tokens
export const stakeTokens = async (amount) => {
    await checkNetwork()
    const signer = await getSigner()
    const contract = new ethers.Contract(
        CONTRACTS.StakingContract.address,
        CONTRACTS.StakingContract.abi,
        signer
    )
    const parsedAmount = ethers.parseUnits(
        amount.toString(), 18
    )
    const tx = await contract.stake(parsedAmount)
    await tx.wait()
    return tx
}

// Get stake info
export const getStakeInfo = async (address) => {
    const provider = getProvider()
    const contract = new ethers.Contract(
        CONTRACTS.StakingContract.address,
        CONTRACTS.StakingContract.abi,
        provider
    )
    const info = await contract.getStakeInfo(address)
    return {
        amount: ethers.formatUnits(info[0], 18),
        startTime: Number(info[1]),
        reward: ethers.formatUnits(info[2], 18),
        isStaking: info[3]
    }
}

// Withdraw tokens
export const withdrawTokens = async () => {
    await checkNetwork()
    const signer = await getSigner()
    const contract = new ethers.Contract(
        CONTRACTS.StakingContract.address,
        CONTRACTS.StakingContract.abi,
        signer
    )
    const tx = await contract.withdraw()
    await tx.wait()
    return tx
}

// Claim reward only
export const claimReward = async () => {
    await checkNetwork()
    const signer = await getSigner()
    const contract = new ethers.Contract(
        CONTRACTS.StakingContract.address,
        CONTRACTS.StakingContract.abi,
        signer
    )
    const tx = await contract.claimReward()
    await tx.wait()
    return tx
}

// Get total staked in contract
export const getTotalStaked = async () => {
    const provider = getProvider()
    const contract = new ethers.Contract(
        CONTRACTS.StakingContract.address,
        CONTRACTS.StakingContract.abi,
        provider
    )
    const total = await contract.totalStaked()
    return ethers.formatUnits(total, 18)
}

export const parseError = (err) => {
    const message = err.message || err.reason || ""

    if (message.includes("Insufficient balance")) {
        return "The contract doesn't have enough tokens right now. Please contact the admin to top up the reward pool."
    }
    if (message.includes("Already staking")) {
        return "You're already staking. Withdraw your current stake before staking again."
    }
    if (message.includes("Not staking")) {
        return "You don't have any active stake to claim or withdraw."
    }
    if (message.includes("Amount must be greater than 0")) {
        return "Please enter an amount greater than 0."
    }
    if (message.includes("Not owner")) {
        return "Only the contract owner can perform this action."
    }
    if (message.includes("user rejected") || message.includes("ACTION_REJECTED")) {
        return "Transaction was cancelled."
    }
    if (message.includes("insufficient funds")) {
        return "You don't have enough SCAI to pay for gas fees."
    }

    return "Something went wrong. Please try again."
}