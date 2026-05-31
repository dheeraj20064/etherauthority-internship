// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttendanceToken {
    string public name = "Attendance Token";
    string public symbol = "ATT";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => uint256) public attendanceCount;
    mapping(address => uint256) public lastAttendance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event AttendanceMarked(address indexed intern, uint256 day, uint256 reward);

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

    function markAttendance(address intern) 
        public onlyOwner {
        require(
            block.timestamp >= lastAttendance[intern] + 1 days,
            "Attendance already marked today"
        );
        uint256 reward = 10 * 10 ** decimals;
        require(balanceOf[owner] >= reward,
            "Insufficient reward balance");
        balanceOf[owner] -= reward;
        balanceOf[intern] += reward;
        attendanceCount[intern]++;
        lastAttendance[intern] = block.timestamp;
        emit AttendanceMarked(
            intern, attendanceCount[intern], reward
        );
        emit Transfer(owner, intern, reward);
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

    function getAttendance(
        address intern
    ) public view returns (uint256) {
        return attendanceCount[intern];
    }
}
