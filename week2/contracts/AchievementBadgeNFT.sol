// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AchievementBadgeNFT {
    string public name = "Achievement Badge NFT";
    string public symbol = "ABNFT";
    address public owner;
    uint256 public tokenCounter;

    enum BadgeType {
        Beginner,
        Intermediate,
        Advanced,
        Expert,
        Master
    }

    struct Badge {
        string badgeName;
        string description;
        BadgeType badgeType;
        uint256 awardedDate;
        address awardedTo;
    }

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => string) public tokenURI;
    mapping(uint256 => Badge) public badges;
    mapping(address => uint256[]) public userBadges;
    mapping(address => mapping(uint256 => bool)) 
        public hasBadgeType;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    event BadgeAwarded(
        uint256 tokenId,
        address recipient,
        string badgeName,
        BadgeType badgeType
    );

    constructor() {
        owner = msg.sender;
        tokenCounter = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function awardBadge(
        address recipient,
        string memory badgeName,
        string memory description,
        BadgeType badgeType,
        string memory uri
    ) public onlyOwner {
        tokenCounter++;
        uint256 tokenId = tokenCounter;

        ownerOf[tokenId] = recipient;
        balanceOf[recipient]++;
        tokenURI[tokenId] = uri;
        badges[tokenId] = Badge(
            badgeName,
            description,
            badgeType,
            block.timestamp,
            recipient
        );
        userBadges[recipient].push(tokenId);
        hasBadgeType[recipient][uint256(badgeType)] = true;

        emit Transfer(address(0), recipient, tokenId);
        emit BadgeAwarded(
            tokenId, recipient, badgeName, badgeType
        );
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

    function getBadge(
        uint256 tokenId
    ) public view returns (
        string memory, string memory,
        BadgeType, uint256, address
    ) {
        Badge memory b = badges[tokenId];
        return (
            b.badgeName, b.description,
            b.badgeType, b.awardedDate, b.awardedTo
        );
    }

    function getUserBadges(
        address user
    ) public view returns (uint256[] memory) {
        return userBadges[user];
    }

    function getTotalBadges() public view returns (uint256) {
        return tokenCounter;
    }
}
