// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Deployed on SecureChain Mainnet (Chain ID: 34)
// Contract Address: 0xA5481D98F9ae3267B06D993E0bA03bda4069181E

contract HelloWorld {
    string public message;

    constructor() {
        message = "Hello, World!";
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
