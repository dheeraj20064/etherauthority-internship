# DeFi Staking Platform — System Architecture

**EtherAuthority Web3+AI Internship — Week 4**
**Intern:** Dheeraj Krishna T
**Network:** SecureChain Mainnet (Chain ID: 34)

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture Layers](#2-architecture-layers)
3. [Smart Contract Architecture](#3-smart-contract-architecture)
4. [User Flow Diagrams](#4-user-flow-diagrams)
5. [Frontend Component Architecture](#5-frontend-component-architecture)
6. [Data Flow](#6-data-flow)
7. [Security Architecture](#7-security-architecture)
8. [Deployment Architecture](#8-deployment-architecture)

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     USER BROWSER                        │
│                                                         │
│   ┌──────────────────────────────────────────────────┐  │
│   │            React Frontend (Vercel)               │  │
│   │                                                  │  │
│   │   ┌─────────────┐      ┌──────────────────────┐  │  │
│   │   │  MetaMask   │      │      ethers.js       │  │  │
│   │   │  Extension  │      │   (Web3 Library)     │  │  │
│   │   └──────┬──────┘      └──────────┬───────────┘  │  │
│   └──────────┼──────────────────────  ┼ ─────────────┘  │
└──────────────┼──────────────────────  ┼ ────────────────┘
               │                        │
               └──────────┬─────────────┘
                          │
                          ▼
          ┌───────────────────────────────┐
          │   SecureChain Mainnet         │
          │   Chain ID: 34                │
          │   Explorer: explorer.         │
          │   securechain.ai              │
          │                               │
          │  ┌─────────────────────────┐  │
          │  │   InternRewardToken     │  │
          │  │   (ERC20 — IRT)         │  │
          │  │   0x9f11C08da403...     │  │
          │  └─────────────────────────┘  │
          │                               │
          │  ┌─────────────────────────┐  │
          │  │   StakingContract       │  │
          │  │   (Core Logic)          │  │
          │  └─────────────────────────┘  │
          └───────────────────────────────┘
```

---

## 2. Architecture Layers

### Layer 1 — Frontend

| Property | Detail |
|----------|--------|
| Framework | React + Vite |
| Deployment | Vercel |
| Web3 Library | ethers.js v6 |
| Wallet Interface | `window.ethereum` (MetaMask) |

- Handles all UI rendering and user interactions
- Calls smart contract functions via ethers.js
- Reads on-chain state and displays it in real time

---

### Layer 2 — Wallet (MetaMask)

| Property | Detail |
|----------|--------|
| Type | Browser Extension |
| Network | SecureChain Mainnet (Chain ID: 34) |
| Role | Signs all transactions, holds private key |

- User never exposes private key to the frontend
- Every state-changing action requires explicit MetaMask confirmation

---

### Layer 3 — Blockchain (SecureChain Mainnet)

| Property | Detail |
|----------|--------|
| Chain ID | 34 |
| Explorer | [explorer.securechain.ai](https://explorer.securechain.ai) |
| Consensus | EVM-compatible |

- Stores all staking data permanently on-chain
- Executes smart contract logic trustlessly

---

### Layer 4 — Smart Contracts

| Contract | Role |
|----------|------|
| `InternRewardToken` | ERC20 token used for staking and rewards |
| `StakingContract` | Core staking logic — lock, reward, withdraw |

---

## 3. Smart Contract Architecture

### 3.1 InternRewardToken (ERC20)

**Deployed Address:** `0x9f11C08da4030676d9234B49FD9A374af22e7145`

```solidity
// Standard ERC20 functions
function transfer(address to, uint256 amount) external returns (bool)
function approve(address spender, uint256 amount) external returns (bool)
function transferFrom(address from, address to, uint256 amount) external returns (bool)
function balanceOf(address account) external view returns (uint256)

// Owner-only functions
function mint(address to, uint256 amount) external onlyOwner
function burn(uint256 amount) external
```

---

### 3.2 StakingContract

**State Variables:**

```solidity
IERC20 public stakingToken;        // IRT token reference
uint256 public rewardRate = 10;    // 10% annual reward rate
uint256 public totalStaked;        // Total tokens locked in contract
mapping(address => Stake) public stakes;
```

**Stake Struct:**

```solidity
struct Stake {
    uint256 amount;       // Amount of IRT staked
    uint256 startTime;    // UNIX timestamp of stake start
    uint256 reward;       // Accumulated reward
    bool isStaking;       // Whether user is actively staking
}
```

**Functions:**

```solidity
// User-facing
function stake(uint256 amount) external
function withdraw() external
function claimReward() external
function calculateReward(address user) public view returns (uint256)
function getStakeInfo(address user) external view returns (Stake memory)

// Owner-only
function fundRewardPool(uint256 amount) external onlyOwner
function setRewardRate(uint256 rate) external onlyOwner
```

**Reward Formula:**

```
reward = (stakedAmount × rewardRate × durationInSeconds)
         ─────────────────────────────────────────────────
                    100 × 365 × 24 × 3600
```

---

## 4. User Flow Diagrams

### 4.1 Staking Flow

```
User opens DApp
      │
      ▼
Click "Connect Wallet"
      │
      ▼
MetaMask popup → Approve connection
      │
      ▼
Enter stake amount
      │
      ▼
Click "Stake"
      │
      ├──► MetaMask Popup #1 → Approve IRT spending
      │         (calls approve() on InternRewardToken)
      │
      ├──► MetaMask Popup #2 → Confirm stake transaction
      │         (calls stake() on StakingContract)
      │
      ▼
Tokens locked in StakingContract
Rewards begin accumulating
UI updates: stake info displayed
```

---

### 4.2 Claim Reward Flow

```
Time passes after staking
      │
      ▼
Contract accumulates reward:
reward = (amount × rate × duration) / (100 × 365 days)
      │
      ▼
User clicks "Claim Reward"
      │
      ▼
MetaMask → Confirm claimReward() transaction
      │
      ▼
IRT rewards transferred to user wallet
Staking continues (principal stays locked)
UI updates: reward balance shown
```

---

### 4.3 Withdrawal Flow

```
User clicks "Withdraw All"
      │
      ▼
MetaMask → Confirm withdraw() transaction
      │
      ▼
Contract sends: staked amount + accumulated rewards
      │
      ▼
isStaking = false
User wallet balance updated
User can stake again
```

---

## 5. Frontend Component Architecture

```
App.jsx
│
├── Navbar.jsx
│   └── Displays wallet address, network info
│
├── ConnectWallet.jsx
│   └── blockchain.js → connectWallet()
│
├── StakeTokens.jsx
│   ├── blockchain.js → approveStaking(amount)
│   └── blockchain.js → stakeTokens(amount)
│
├── StakeInfo.jsx
│   ├── blockchain.js → getStakeInfo(userAddress)
│   └── blockchain.js → getTotalStaked()
│
└── WithdrawReward.jsx
    ├── blockchain.js → claimReward()
    └── blockchain.js → withdrawTokens()
```

**`blockchain.js`** acts as the service layer — it holds contract ABIs, provider setup, and all ethers.js calls. Components never call ethers.js directly.

---

## 6. Data Flow

```
User Action (click button)
        │
        ▼
React Component
        │
        ▼
blockchain.js (service layer)
        │
        ▼
ethers.js (formats calldata, gas estimate)
        │
        ▼
MetaMask (user signs / approves)
        │
        ▼
SecureChain Mainnet (transaction broadcast)
        │
        ▼
Smart Contract executes on-chain
        │
        ▼
Transaction receipt / event emitted
        │
        ▼
blockchain.js returns result
        │
        ▼
React Component updates state
        │
        ▼
UI re-renders with new data
```

---

## 7. Security Architecture

| Threat | Mitigation |
|--------|-----------|
| Unauthorized owner functions | `onlyOwner` modifier on `mint`, `fundRewardPool`, `setRewardRate` |
| Reentrancy attack on withdraw | Checks-Effects-Interactions pattern; state updated before transfer |
| Integer overflow/underflow | Solidity 0.8.0+ built-in overflow protection |
| Invalid stake amounts | Input validation: `require(amount > 0)` |
| Double-withdraw | `isStaking` flag checked before every withdraw/claim |
| Unlimited token spending | Two-step approve+stake flow; user controls allowance |

---

## 8. Deployment Architecture

| Component | Platform | Details |
|-----------|----------|---------|
| Frontend | Vercel | Auto-deploy from GitHub `main` branch |
| InternRewardToken | SCAI Mainnet | `0x9f11C08da4030676d9234B49FD9A374af22e7145` |
| StakingContract | SCAI Mainnet | `0x3C22C41Ff00ce7Fd02d67C99c57062D04E3Ec30D` |
| Source Code | GitHub | [github.com/dheeraj20064/etherauthority-internship](https://github.com/dheeraj20064/etherauthority-internship) |
| Block Explorer | SecureChain | [explorer.securechain.ai](https://explorer.securechain.ai) |

---

*Document prepared by: Dheeraj Krishna T*
*EtherAuthority Web3+AI Internship — Week 4 Final Project*
*June 2026*
