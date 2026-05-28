// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleVoting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidateCount;
    address public admin;
    bool public votingOpen;

    event Voted(address indexed voter, uint candidateId);
    event CandidateAdded(uint id, string name);

    constructor() {
        admin = msg.sender;
        votingOpen = true;
        
        // Add default candidates
        addCandidate("Alice");
        addCandidate("Bob");
        addCandidate("Charlie");
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    function addCandidate(string memory name) public onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate(
            candidateCount, name, 0
        );
        emit CandidateAdded(candidateCount, name);
    }

    function vote(uint candidateId) public {
        require(votingOpen, "Voting is closed");
        require(!hasVoted[msg.sender], "Already voted");
        require(
            candidateId > 0 && candidateId <= candidateCount, 
            "Invalid candidate"
        );
        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount++;
        emit Voted(msg.sender, candidateId);
    }

    function getCandidate(uint candidateId) 
        public view returns (uint, string memory, uint) 
    {
        Candidate memory c = candidates[candidateId];
        return (c.id, c.name, c.voteCount);
    }

    function closeVoting() public onlyAdmin {
        votingOpen = false;
    }

    function getWinner() public view returns (string memory) {
        uint winningVoteCount = 0;
        uint winnerId = 0;
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winnerId = i;
            }
        }
        return candidates[winnerId].name;
    }
}
