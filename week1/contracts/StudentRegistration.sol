// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistration {
    struct Student {
        uint id;
        string name;
        string course;
        uint age;
        bool isRegistered;
    }

    mapping(address => Student) public students;
    mapping(uint => address) public studentIds;
    uint public studentCount;
    address public admin;

    event StudentRegistered(
        uint id, 
        string name, 
        string course, 
        address studentAddress
    );

    constructor() {
        admin = msg.sender;
        studentCount = 0;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    function registerStudent(
        string memory name, 
        string memory course, 
        uint age
    ) public {
        require(!students[msg.sender].isRegistered, "Already registered");
        studentCount++;
        students[msg.sender] = Student(
            studentCount, name, course, age, true
        );
        studentIds[studentCount] = msg.sender;
        emit StudentRegistered(studentCount, name, course, msg.sender);
    }

    function getStudent(address studentAddress) 
        public view returns (
            uint, string memory, string memory, uint, bool
        ) 
    {
        Student memory s = students[studentAddress];
        return (s.id, s.name, s.course, s.age, s.isRegistered);
    }

    function getTotalStudents() public view returns (uint) {
        return studentCount;
    }
}
