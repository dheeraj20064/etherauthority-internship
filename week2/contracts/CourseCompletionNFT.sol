// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseCompletionNFT {
    string public name = "Course Completion NFT";
    string public symbol = "CCNFT";
    address public owner;
    uint256 public tokenCounter;

    struct CourseDetails {
        string courseName;
        string studentName;
        uint256 completionDate;
        uint256 score;
        string grade;
    }

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public getApproved;
    mapping(uint256 => string) public tokenURI;
    mapping(uint256 => CourseDetails) public courseDetails;
    mapping(address => uint256[]) public studentTokens;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    event CourseCertificateMinted(
        uint256 tokenId,
        address student,
        string courseName,
        string grade
    );

    constructor() {
        owner = msg.sender;
        tokenCounter = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function mintCourseNFT(
        address student,
        string memory courseName,
        string memory studentName,
        uint256 score,
        string memory uri
    ) public onlyOwner {
        tokenCounter++;
        uint256 tokenId = tokenCounter;

        string memory grade;
        if (score >= 90) grade = "A+";
        else if (score >= 80) grade = "A";
        else if (score >= 70) grade = "B";
        else if (score >= 60) grade = "C";
        else grade = "F";

        ownerOf[tokenId] = student;
        balanceOf[student]++;
        tokenURI[tokenId] = uri;
        courseDetails[tokenId] = CourseDetails(
            courseName,
            studentName,
            block.timestamp,
            score,
            grade
        );
        studentTokens[student].push(tokenId);

        emit Transfer(address(0), student, tokenId);
        emit CourseCertificateMinted(
            tokenId, student, courseName, grade
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

    function getCourseDetails(
        uint256 tokenId
    ) public view returns (
        string memory, string memory, 
        uint256, uint256, string memory
    ) {
        CourseDetails memory c = courseDetails[tokenId];
        return (
            c.courseName, c.studentName,
            c.completionDate, c.score, c.grade
        );
    }

    function getStudentTokens(
        address student
    ) public view returns (uint256[] memory) {
        return studentTokens[student];
    }

    function getTotalMinted() public view returns (uint256) {
        return tokenCounter;
    }
}
