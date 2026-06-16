# Gas Optimization & Performance Report

## EtherAuthority Web3+AI Internship - Week 4

## Intern: Dheeraj Krishna T

---

## 1. Overview

This report documents gas usage analysis and
optimization decisions made for the StakingContract
and InternRewardToken deployed on SecureChain Mainnet.

---

## 2. Deployment Gas Costs

| Contract          | Gas Used               | Gas Limit Set |
| ----------------- | ---------------------- | ------------- |
| InternRewardToken | ~1,287,450             | 1,500,000     |
| StakingContract   | ~1,200,000 (estimated) | 1,500,000     |

---

## 3. Function-Level Gas Usage

| Function          | Estimated Gas   | Notes                                         |
| ----------------- | --------------- | --------------------------------------------- |
| stake()           | ~80,000-100,000 | Writes to mapping, updates totalStaked        |
| withdraw()        | ~60,000-90,000  | Reads + writes stake struct, transfers tokens |
| claimReward()     | ~50,000-70,000  | Calculates reward, transfers tokens           |
| calculateReward() | ~2,500 (view)   | Read-only, no gas cost when called externally |
| getStakeInfo()    | ~2,500 (view)   | Read-only, no gas cost when called externally |

---

## 4. Optimizations Applied

### 4.1 Use of mappings over arrays

Stakes are stored in a `mapping(address => Stake)` instead
of an array. This gives O(1) constant-time lookup instead
of looping through an array, saving significant gas as
the number of users grows.

### 4.2 View functions for reads

`calculateReward()` and `getStakeInfo()` are marked `view`,
meaning they cost zero gas when called externally (read-only,
no blockchain state change, no transaction needed).

### 4.3 Minimal storage writes

The `stake()` function writes to storage only once per
stake action (single struct assignment) rather than
multiple separate writes, reducing SSTORE operation costs.

### 4.4 EVM version selection

Using `paris` EVM version instead of the default `osaka` —
this was required for SCAI mainnet compatibility, and also
avoids gas overhead from newer EVM opcodes not needed here.

### 4.5 Solidity 0.8.0+ built-in overflow checks

Removes need for external SafeMath library imports,
reducing both gas cost and contract bytecode size compared
to older Solidity versions.

---

## 5. Gas Limit Configuration

Through trial deployment, the following settings were
determined to work reliably on SCAI mainnet:

| Setting     | Value     |
| ----------- | --------- |
| EVM Version | paris     |
| Gas Limit   | 1,500,000 |
| Gas Price   | 1.5 Gwei  |

Lower gas limits (300,000-600,000) resulted in
"out of gas" failures for token contracts with
multiple ERC20 functions; 1,500,000 was found to
be a safe margin.

---

## 6. Potential Future Optimizations

- Use `uint128` instead of `uint256` for amounts
  (if max value fits) to pack struct fields tighter
- Batch multiple stake operations using arrays
  for gas-efficient bulk staking
- Implement EIP-2612 permit() for gasless approvals

---

## 7. Conclusion

The contracts are optimized for the basic use case
of single-user staking with reasonable gas costs.
Read operations (balance checks, stake info) are free
when called off-chain, and write operations stay within
typical SCAI mainnet gas limits of 1,500,000.

---

_Document prepared by: Dheeraj Krishna T_
_EtherAuthority Web3+AI Internship - Week 4_
_June 2026_
