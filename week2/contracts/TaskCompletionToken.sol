// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskCompletionToken {
    string public name = "Task Completion Token";
    string public symbol = "TCT";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => uint256) public tasksCompleted;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event TaskRewarded(address indexed intern, uint256 amount);

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        totalSupply = initialSupply * 10 ** decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function transfer(address to, uint256 value) 
        public returns (bool) {
        require(balanceOf[msg.sender] >= value, 
            "Insufficient balance");
        require(to != address(0), "Invalid address");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) 
        public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(
        address from, address to, uint256 value
    ) public returns (bool) {
        require(balanceOf[from] >= value, 
            "Insufficient balance");
        require(allowance[from][msg.sender] >= value, 
            "Insufficient allowance");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function rewardIntern(
        address intern, uint256 amount
    ) public onlyOwner {
        require(balanceOf[owner] >= amount, 
            "Insufficient balance");
        balanceOf[owner] -= amount;
        balanceOf[intern] += amount;
        tasksCompleted[intern]++;
        emit TaskRewarded(intern, amount);
        emit Transfer(owner, intern, amount);
    }

    function mint(address to, uint256 value) 
        public onlyOwner {
        totalSupply += value;
        balanceOf[to] += value;
        emit Transfer(address(0), to, value);
    }

    function burn(uint256 value) public {
        require(balanceOf[msg.sender] >= value, 
            "Insufficient balance");
        totalSupply -= value;
        balanceOf[msg.sender] -= value;
        emit Transfer(msg.sender, address(0), value);
    }

    function getTasksCompleted(
        address intern
    ) public view returns (uint256) {
        return tasksCompleted[intern];
    }
}
