import { ethers } from "ethers"
import { CONTRACTS, NETWORK } from "../config/contracts"

// ─── GET PROVIDER AND SIGNER ───────────────────

// Provider = reads from blockchain (no transaction)
// Signer = writes to blockchain (needs MetaMask)

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

// ─── CHECK NETWORK ─────────────────────────────

export const checkNetwork = async () => {
    const provider = getProvider()
    const network = await provider.getNetwork()
    
    if (Number(network.chainId) !== NETWORK.chainId) {
        throw new Error(
            `Wrong network. Please switch to ${NETWORK.name}`
        )
    }
    return true
}

// ─── INTERN REWARD TOKEN (ERC20) ───────────────

// Get token balance of any wallet
export const getTokenBalance = async (walletAddress) => {
    const provider = getProvider()
    const contract = new ethers.Contract(
        CONTRACTS.InternRewardToken.address,
        CONTRACTS.InternRewardToken.abi,
        provider
    )
    const balance = await contract.balanceOf(walletAddress)
    return ethers.formatUnits(balance, 18)
}

// Transfer tokens to intern wallet
export const transferTokens = async (
    toAddress, 
    amount
) => {
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
    const tx = await contract.transfer(
        toAddress, 
        parsedAmount
    )
    await tx.wait()
    return tx
}

// ─── INTERNSHIP CERTIFICATE NFT (ERC721) ───────

// Mint certificate NFT to intern wallet
export const mintCertificate = async (
    recipientAddress,
    internName,
    completionDate,
    uri
) => {
    await checkNetwork()
    const signer = await getSigner()
    
    const contract = new ethers.Contract(
        CONTRACTS.InternshipCertificateNFT.address,
        CONTRACTS.InternshipCertificateNFT.abi,
        signer
    )
    
    const tx = await contract.mintCertificate(
        recipientAddress,
        internName,
        completionDate,
        uri
    )
    await tx.wait()
    return tx
}

// Get total certificates minted
export const getTotalCertificates = async () => {
    const provider = getProvider()
    const contract = new ethers.Contract(
        CONTRACTS.InternshipCertificateNFT.address,
        CONTRACTS.InternshipCertificateNFT.abi,
        provider
    )
    const total = await contract.getTotalMinted()
    return total.toString()
}

// Get certificate details by tokenId
export const getCertificateDetails = async (tokenId) => {
    const provider = getProvider()
    const contract = new ethers.Contract(
        CONTRACTS.InternshipCertificateNFT.address,
        CONTRACTS.InternshipCertificateNFT.abi,
        provider
    )
    const result = await contract.getCertificate(tokenId)
    return {
        owner: result[0],
        tokenURI: result[1],
        certificateData: result[2]
    }
}