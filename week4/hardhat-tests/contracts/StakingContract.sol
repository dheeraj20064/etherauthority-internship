// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakingContract {
    IERC20 public stakingToken;
    address public owner;
    uint256 public rewardRate = 10;
    uint256 public totalStaked;

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 reward;
        bool isStaking;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);

    constructor(address _stakingToken) {
        owner = msg.sender;
        stakingToken = IERC20(_stakingToken);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function stake(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        require(!stakes[msg.sender].isStaking, 
            "Already staking");

        stakingToken.transferFrom(
            msg.sender, address(this), amount
        );

        stakes[msg.sender] = Stake(
            amount,
            block.timestamp,
            0,
            true
        );
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function calculateReward(
        address user
    ) public view returns (uint256) {
        Stake memory userStake = stakes[user];
        if (!userStake.isStaking) return 0;

        uint256 stakingDuration = block.timestamp - 
            userStake.startTime;
        uint256 reward = (userStake.amount * 
            rewardRate * stakingDuration) / 
            (100 * 365 days);
        return reward;
    }

    function withdraw() public {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.isStaking, "Not staking");

        uint256 reward = calculateReward(msg.sender);
        uint256 amount = userStake.amount;

        userStake.isStaking = false;
        userStake.amount = 0;
        totalStaked -= amount;

        stakingToken.transfer(msg.sender, amount);

        if (reward > 0 && 
            stakingToken.balanceOf(address(this)) >= reward
        ) {
            stakingToken.transfer(msg.sender, reward);
            emit RewardClaimed(msg.sender, reward);
        }

        emit Withdrawn(msg.sender, amount);
    }

    function claimReward() public {
        require(stakes[msg.sender].isStaking, 
            "Not staking");
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No reward available");
        require(
            stakingToken.balanceOf(address(this)) >= reward,
            "Insufficient reward pool"
        );

        stakes[msg.sender].startTime = block.timestamp;
        stakingToken.transfer(msg.sender, reward);
        emit RewardClaimed(msg.sender, reward);
    }

    function getStakeInfo(
        address user
    ) public view returns (
        uint256 amount,
        uint256 startTime,
        uint256 reward,
        bool isStaking
    ) {
        Stake memory s = stakes[user];
        return (
            s.amount,
            s.startTime,
            calculateReward(user),
            s.isStaking
        );
    }

    function setRewardRate(
        uint256 newRate
    ) public onlyOwner {
        rewardRate = newRate;
    }

    function fundRewardPool(uint256 amount) public onlyOwner {
        stakingToken.transferFrom(
            msg.sender, address(this), amount
        );
    }
}

interface IERC20 {
    function transfer(
        address to, uint256 amount
    ) external returns (bool);
    function transferFrom(
        address from, address to, uint256 amount
    ) external returns (bool);
    function balanceOf(
        address account
    ) external view returns (uint256);
    function approve(
        address spender, uint256 amount
    ) external returns (bool);
}
