// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskStatus {
    enum Status { Pending, InProgress, Completed, Cancelled }

    struct Task {
        uint id;
        string name;
        Status status;
        address assignedTo;
        uint createdAt;
    }

    mapping(uint => Task) public tasks;
    uint public taskCount;
    address public admin;

    event TaskCreated(uint id, string name, address assignedTo);
    event TaskUpdated(uint id, Status newStatus);

    constructor() {
        admin = msg.sender;
        taskCount = 0;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    function createTask(
        string memory name, 
        address assignedTo
    ) public onlyAdmin {
        taskCount++;
        tasks[taskCount] = Task(
            taskCount,
            name,
            Status.Pending,
            assignedTo,
            block.timestamp
        );
        emit TaskCreated(taskCount, name, assignedTo);
    }

    function updateStatus(uint taskId, Status newStatus) public {
        require(taskId > 0 && taskId <= taskCount, "Invalid task");
        require(
            msg.sender == admin || 
            msg.sender == tasks[taskId].assignedTo,
            "Not authorized"
        );
        tasks[taskId].status = newStatus;
        emit TaskUpdated(taskId, newStatus);
    }

    function getTask(uint taskId) 
        public view returns (
            uint, string memory, Status, address, uint
        ) 
    {
        Task memory t = tasks[taskId];
        return (t.id, t.name, t.status, t.assignedTo, t.createdAt);
    }

    function getTotalTasks() public view returns (uint) {
        return taskCount;
    }
}
