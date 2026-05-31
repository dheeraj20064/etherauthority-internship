// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTMinting {
    string public name = "EtherAuthority NFT";
    string public symbol = "EANFT";
    address public owner;
    uint256 public tokenCounter;
    uint256 public mintPrice;
    uint256 public maxSupply;
    bool public mintingActive;

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public getApproved;
    mapping(address => mapping(address => bool)) 
        public isApprovedForAll;
    mapping(uint256 => string) public tokenURI;
    mapping(address => uint256[]) public ownedTokens;

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
    event NFTMinted(
        uint256 tokenId,
        address minter,
        string uri
    );
    event MintingStatusChanged(bool status);

    constructor(
        uint256 _mintPrice,
        uint256 _maxSupply
    ) {
        owner = msg.sender;
        mintPrice = _mintPrice;
        maxSupply = _maxSupply;
        mintingActive = true;
        tokenCounter = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier mintingIsActive() {
        require(mintingActive, "Minting is not active");
        _;
    }

    function mint(string memory uri) 
        public payable mintingIsActive {
        require(tokenCounter < maxSupply, 
            "Max supply reached");
        require(msg.value >= mintPrice, 
            "Insufficient payment");

        tokenCounter++;
        uint256 tokenId = tokenCounter;
        ownerOf[tokenId] = msg.sender;
        balanceOf[msg.sender]++;
        tokenURI[tokenId] = uri;
        ownedTokens[msg.sender].push(tokenId);

        emit Transfer(address(0), msg.sender, tokenId);
        emit NFTMinted(tokenId, msg.sender, uri);
    }

    function adminMint(
        address recipient,
        string memory uri
    ) public onlyOwner {
        require(tokenCounter < maxSupply,
            "Max supply reached");

        tokenCounter++;
        uint256 tokenId = tokenCounter;
        ownerOf[tokenId] = recipient;
        balanceOf[recipient]++;
        tokenURI[tokenId] = uri;
        ownedTokens[recipient].push(tokenId);

        emit Transfer(address(0), recipient, tokenId);
        emit NFTMinted(tokenId, recipient, uri);
    }

    function transfer(address to, uint256 tokenId) public {
        require(ownerOf[tokenId] == msg.sender,
            "Not token owner");
        require(to != address(0), "Invalid address");
        balanceOf[msg.sender]--;
        balanceOf[to]++;
        ownerOf[tokenId] = to;

        // update ownedTokens
        emit Transfer(msg.sender, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        require(ownerOf[tokenId] == msg.sender,
            "Not token owner");
        getApproved[tokenId] = to;
        emit Approval(msg.sender, to, tokenId);
    }

    function toggleMinting() public onlyOwner {
        mintingActive = !mintingActive;
        emit MintingStatusChanged(mintingActive);
    }

    function setMintPrice(
        uint256 newPrice
    ) public onlyOwner {
        mintPrice = newPrice;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner).transfer(balance);
    }

    function getOwnedTokens(
        address user
    ) public view returns (uint256[] memory) {
        return ownedTokens[user];
    }

    function getTotalMinted() public view returns (uint256) {
        return tokenCounter;
    }
}
