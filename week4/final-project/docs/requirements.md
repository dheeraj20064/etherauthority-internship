# DeFi Staking Platform - Requirements & Use Cases
## EtherAuthority Web3+AI Internship - Week 4
## Intern: Dheeraj Krishna T

---

## 1. Project Overview

A decentralized staking platform built on SecureChain 
Mainnet where users stake IRT tokens and earn rewards 
automatically through smart contracts.

---

## 2. Problem Statement

Traditional banking gives very low interest rates 
(1-3% per year). DeFi staking offers higher rewards 
(10% APY) without banks or middlemen. Smart contracts 
handle everything automatically and transparently.

---

## 3. Target Users

| User | Role |
|------|------|
| Intern | Stakes IRT tokens earned from tasks |
| Admin | Funds reward pool, manages platform |
| Token Holder | Anyone holding IRT tokens |

---

## 4. Functional Requirements

### Must Have:
- Connect MetaMask wallet
- View IRT token balance
- Stake IRT tokens
- View staking info (amount, duration, reward)
- Claim rewards without withdrawing
- Withdraw tokens + rewards
- View total staked in platform

### Nice to Have:
- APY calculator
- Staking history
- Multiple staking periods
- Emergency pause

---

## 5. Use Cases

### Use Case 1 — Stake Tokens
Actor: Intern
Steps:
1. Connect MetaMask wallet
2. Check IRT balance
3. Enter amount to stake
4. Approve staking contract
5. Stake tokens
6. Tokens locked in contract
Result: Intern earning 10% APY rewards

### Use Case 2 — Claim Reward
Actor: Intern
Steps:
1. Connect wallet
2. View earned rewards
3. Click Claim Reward
4. Confirm in MetaMask
Result: Rewards sent to wallet, staking continues

### Use Case 3 — Withdraw
Actor: Intern
Steps:
1. Connect wallet
2. Click Withdraw All
3. Confirm in MetaMask
Result: Staked tokens + all rewards returned

### Use Case 4 — Fund Reward Pool
Actor: Admin
Steps:
1. Connect admin wallet
2. Enter amount to fund
3. Confirm in MetaMask
Result: Reward pool funded for paying rewards

---

## 6. Similar Existing Protocols

| Protocol | Network | APY | Similar Feature |
|----------|---------|-----|----------------|
| Aave | Ethereum | 2-8% | Deposit and earn |
| Compound | Ethereum | 3-5% | Supply tokens earn interest |
| PancakeSwap | BSC | 10-50% | Stake LP tokens |
| Our Platform | SCAI | 10% | Stake IRT tokens |

---

## 7. Technical Requirements

| Technology | Purpose |
|------------|---------|
| Solidity 0.8.0+ | Smart contracts |
| React + Vite | Frontend |
| ethers.js | Blockchain connection |
| MetaMask | Wallet |
| SecureChain Mainnet | Blockchain network |
| Vercel | Frontend deployment |

---

## 8. Non-Functional Requirements

- Transaction confirmation under 5 seconds on SCAI
- Mobile responsive UI
- Clear error messages for failed transactions
- Real-time reward calculation display

---

*Document prepared by: Dheeraj Krishna T*
*EtherAuthority Web3+AI Internship - Week 4*
*June 2026*
