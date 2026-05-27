// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherTransfer {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        // anyone can send SCAI to this contract
    }

    function withdraw(uint amount) public {
        require(msg.sender == owner, "Not the owner");
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner).transfer(amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function transferTo(address payable recipient, uint amount) public {
        require(msg.sender == owner, "Not the owner");
        require(address(this).balance >= amount, "Insufficient balance");
        recipient.transfer(amount);
    }
}
