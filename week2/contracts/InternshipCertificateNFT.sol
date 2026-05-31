// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InternshipCertificateNFT {
    string public name = "Internship Certificate NFT";
    string public symbol = "ICNFT";
    address public owner;
    uint256 public tokenCounter;

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public getApproved;
    mapping(address => mapping(address => bool)) public isApprovedForAll;
    mapping(uint256 => string) public tokenURI;
    mapping(uint256 => string) public certificateData;

    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 indexed tokenId
    );
    event Approval(
        address indexed owner, 
        address indexed approved, 
        uint256 indexed tokenId
    );
    event CertificateMinted(
        uint256 tokenId, 
        address recipient, 
        string internName
    );

    constructor() {
        owner = msg.sender;
        tokenCounter = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function mintCertificate(
        address recipient,
        string memory internName,
        string memory completionDate,
        string memory uri
    ) public onlyOwner {
        tokenCounter++;
        uint256 tokenId = tokenCounter;
        ownerOf[tokenId] = recipient;
        balanceOf[recipient]++;
        tokenURI[tokenId] = uri;
        certificateData[tokenId] = string(
            abi.encodePacked(
                "Intern: ", internName,
                " | Completed: ", completionDate
            )
        );
        emit Transfer(address(0), recipient, tokenId);
        emit CertificateMinted(tokenId, recipient, internName);
    }

    function transfer(address to, uint256 tokenId) public {
        require(ownerOf[tokenId] == msg.sender, 
            "Not token owner");
        require(to != address(0), "Invalid address");
        balanceOf[msg.sender]--;
        balanceOf[to]++;
        ownerOf[tokenId] = to;
        emit Transfer(msg.sender, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        require(ownerOf[tokenId] == msg.sender, 
            "Not token owner");
        getApproved[tokenId] = to;
        emit Approval(msg.sender, to, tokenId);
    }

    function getCertificate(
        uint256 tokenId
    ) public view returns (
        address, string memory, string memory
    ) {
        return (
            ownerOf[tokenId],
            tokenURI[tokenId],
            certificateData[tokenId]
        );
    }

    function getTotalMinted() public view returns (uint256) {
        return tokenCounter;
    }
}
