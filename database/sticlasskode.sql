-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2024 at 10:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sticlasskode`
--

-- --------------------------------------------------------

--
-- Table structure for table `jnc_course-program`
--

CREATE TABLE `jnc_course-program` (
  `CourseID` varchar(10) NOT NULL,
  `ProgramID` varchar(10) NOT NULL,
  `LevelID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_facultymember-course`
--

CREATE TABLE `jnc_facultymember-course` (
  `FacultyMemberID` varchar(10) NOT NULL,
  `CourseID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_facultymember-program`
--

CREATE TABLE `jnc_facultymember-program` (
  `FacultyMemberID` varchar(10) NOT NULL,
  `ProgramID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_schoolfacility-type`
--

CREATE TABLE `jnc_schoolfacility-type` (
  `SchoolFacilityID` varchar(10) NOT NULL,
  `FacilityTypeID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_student-level`
--

CREATE TABLE `jnc_student-level` (
  `StudentID` varchar(10) NOT NULL,
  `LevelID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_student-program`
--

CREATE TABLE `jnc_student-program` (
  `StudentID` varchar(10) NOT NULL,
  `ProgramID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_studentsection`
--

CREATE TABLE `jnc_studentsection` (
  `StudentID` varchar(10) NOT NULL,
  `SectionID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jnc_studentsection`
--

INSERT INTO `jnc_studentsection` (`StudentID`, `SectionID`) VALUES
('STD1', 'SCT1'),
('STD2', 'SCT1'),
('STD1', 'SCT2'),
('STD3', 'SCT1'),
('STD4', 'SCT1'),
('STD5', 'SCT1'),
('STD6', 'SCT1'),
('STD7', 'SCT1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE `tbl_course` (
  `CourseID` varchar(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`CourseID`, `Name`, `Description`, `Status`) VALUES
('CRS1', 'Sample Course', 'Sample Description', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facilitytype`
--

CREATE TABLE `tbl_facilitytype` (
  `FacilityTypeID` varchar(10) NOT NULL,
  `Type` enum('Laboratory','Regular Classroom','Audio Visual Room','Others') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facultymember`
--

CREATE TABLE `tbl_facultymember` (
  `FacultyMemberID` varchar(10) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `FacultyMemberType` enum('Fulltime','Parttime','','') NOT NULL,
  `Email` varchar(255) NOT NULL,
  `ContactNumber` varchar(11) NOT NULL,
  `FacebookLink` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Status` enum('Active','Archived','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_facultymember`
--

INSERT INTO `tbl_facultymember` (`FacultyMemberID`, `FirstName`, `MiddleName`, `LastName`, `FacultyMemberType`, `Email`, `ContactNumber`, `FacebookLink`, `Address`, `DateCreated`, `Status`) VALUES
('FCT1', 'Sample', 'FacultyMember', 'Name', 'Fulltime', 'SampleFacultyMemberName@mail.com', '00000000000', 'facebook/SampleFacultyMemberName', 'Sample Address', '2024-02-25 16:07:43', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_level`
--

CREATE TABLE `tbl_level` (
  `LevelID` varchar(10) NOT NULL,
  `Level` enum('Grade 11','Grade 12','First Year','Second Year','Third Year','Fourth Year') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_program`
--

CREATE TABLE `tbl_program` (
  `ProgramID` varchar(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Abbrev` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schoolfacility`
--

CREATE TABLE `tbl_schoolfacility` (
  `SchoolFacilityID` varchar(10) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `Status` enum('Active','Archived','','') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_schoolfacility`
--

INSERT INTO `tbl_schoolfacility` (`SchoolFacilityID`, `Name`, `Capacity`, `Status`) VALUES
('SCF1', 'Sample Facility', 45, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_section`
--

CREATE TABLE `tbl_section` (
  `SectionID` varchar(10) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Status` enum('Active','Archive','','') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_section`
--

INSERT INTO `tbl_section` (`SectionID`, `Name`, `Status`) VALUES
('SCT1', 'Sample101', 'Active'),
('SCT2', 'Sample201', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student`
--

CREATE TABLE `tbl_student` (
  `StudentID` varchar(10) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `StudentType` enum('Regular','Irregular','Working','') NOT NULL,
  `Email` varchar(255) NOT NULL,
  `ContactNumber` varchar(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`StudentID`, `FirstName`, `MiddleName`, `LastName`, `StudentType`, `Email`, `ContactNumber`, `Address`, `DateCreated`, `Status`) VALUES
('STD1', 'Mark Limuel', 'Lopez', 'Lape', 'Regular', 'SampleStudentName@email.com', '00000000000', 'Sample Address', '2024-02-25 15:55:28', 'Active'),
('STD2', 'Yranimez', 'Romano', 'Repil', 'Regular', 'StudentTwo@gmail.com', '00000000000', 'Sample Address 2', '2024-02-26 22:00:14', 'Active'),
('STD3', 'James Bernard', 'Oplado', 'Gereña', 'Regular', 'ABC@email.com', '00000000000', 'ABC Address', '2024-02-26 22:05:38', 'Active'),
('STD4', 'Christian Kobe', '-', 'Malonzo', 'Regular', 'ABC1@email.com', '00000000000', 'ABC1 Address', '2024-02-26 22:05:38', 'Active'),
('STD5', 'Emman Isaac', '-', 'Conggas', 'Regular', 'ABC2@email.com', '00000000000', 'ABC2 Address', '2024-02-26 22:05:38', 'Active'),
('STD6', 'Kyle Carlos', '-', 'Agullana', 'Regular', 'ABC3@email.com', '00000000000', 'ABC3 Address', '2024-02-26 22:05:38', 'Active'),
('STD7', 'Kian', '-', 'Dela Cruz', 'Regular', 'ABC4@email.com', '00000000000', 'ABC4 Address', '2024-02-26 22:05:38', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `UserID` varchar(10) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UserID`, `FirstName`, `LastName`, `Email`, `Password`) VALUES
('USR1', 'Mark', 'Lape', 'lapemark11@gmail.com', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jnc_course-program`
--
ALTER TABLE `jnc_course-program`
  ADD KEY `CourseID` (`CourseID`,`ProgramID`),
  ADD KEY `ProgramID` (`ProgramID`),
  ADD KEY `LevelID` (`LevelID`);

--
-- Indexes for table `jnc_facultymember-course`
--
ALTER TABLE `jnc_facultymember-course`
  ADD KEY `FacultyMemberID` (`FacultyMemberID`,`CourseID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `jnc_facultymember-program`
--
ALTER TABLE `jnc_facultymember-program`
  ADD KEY `FacultyMemberID` (`FacultyMemberID`,`ProgramID`),
  ADD KEY `ProgramID` (`ProgramID`);

--
-- Indexes for table `jnc_schoolfacility-type`
--
ALTER TABLE `jnc_schoolfacility-type`
  ADD KEY `SchoolFacilityID` (`SchoolFacilityID`,`FacilityTypeID`),
  ADD KEY `FacilityTypeID` (`FacilityTypeID`);

--
-- Indexes for table `jnc_student-level`
--
ALTER TABLE `jnc_student-level`
  ADD KEY `StudentID` (`StudentID`,`LevelID`),
  ADD KEY `LevelID` (`LevelID`);

--
-- Indexes for table `jnc_student-program`
--
ALTER TABLE `jnc_student-program`
  ADD KEY `StudentID` (`StudentID`,`ProgramID`),
  ADD KEY `ProgramID` (`ProgramID`);

--
-- Indexes for table `jnc_studentsection`
--
ALTER TABLE `jnc_studentsection`
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `SectionID` (`SectionID`);

--
-- Indexes for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD PRIMARY KEY (`CourseID`);

--
-- Indexes for table `tbl_facilitytype`
--
ALTER TABLE `tbl_facilitytype`
  ADD PRIMARY KEY (`FacilityTypeID`);

--
-- Indexes for table `tbl_facultymember`
--
ALTER TABLE `tbl_facultymember`
  ADD PRIMARY KEY (`FacultyMemberID`);

--
-- Indexes for table `tbl_level`
--
ALTER TABLE `tbl_level`
  ADD PRIMARY KEY (`LevelID`);

--
-- Indexes for table `tbl_program`
--
ALTER TABLE `tbl_program`
  ADD PRIMARY KEY (`ProgramID`);

--
-- Indexes for table `tbl_schoolfacility`
--
ALTER TABLE `tbl_schoolfacility`
  ADD PRIMARY KEY (`SchoolFacilityID`);

--
-- Indexes for table `tbl_section`
--
ALTER TABLE `tbl_section`
  ADD PRIMARY KEY (`SectionID`),
  ADD KEY `SectionID` (`SectionID`);

--
-- Indexes for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD PRIMARY KEY (`StudentID`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`UserID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jnc_course-program`
--
ALTER TABLE `jnc_course-program`
  ADD CONSTRAINT `jnc_course-program_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `tbl_course` (`CourseID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_course-program_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_course-program_ibfk_3` FOREIGN KEY (`LevelID`) REFERENCES `tbl_level` (`LevelID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `jnc_facultymember-course`
--
ALTER TABLE `jnc_facultymember-course`
  ADD CONSTRAINT `jnc_facultymember-course_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `tbl_course` (`CourseID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_facultymember-course_ibfk_2` FOREIGN KEY (`FacultyMemberID`) REFERENCES `tbl_facultymember` (`FacultyMemberID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `jnc_facultymember-program`
--
ALTER TABLE `jnc_facultymember-program`
  ADD CONSTRAINT `jnc_facultymember-program_ibfk_1` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_facultymember-program_ibfk_2` FOREIGN KEY (`FacultyMemberID`) REFERENCES `tbl_facultymember` (`FacultyMemberID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `jnc_schoolfacility-type`
--
ALTER TABLE `jnc_schoolfacility-type`
  ADD CONSTRAINT `jnc_schoolfacility-type_ibfk_1` FOREIGN KEY (`SchoolFacilityID`) REFERENCES `tbl_schoolfacility` (`SchoolFacilityID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_schoolfacility-type_ibfk_2` FOREIGN KEY (`FacilityTypeID`) REFERENCES `tbl_facilitytype` (`FacilityTypeID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `jnc_student-level`
--
ALTER TABLE `jnc_student-level`
  ADD CONSTRAINT `jnc_student-level_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `tbl_student` (`StudentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_student-level_ibfk_2` FOREIGN KEY (`LevelID`) REFERENCES `tbl_level` (`LevelID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `jnc_student-program`
--
ALTER TABLE `jnc_student-program`
  ADD CONSTRAINT `jnc_student-program_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `tbl_student` (`StudentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_student-program_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `jnc_studentsection`
--
ALTER TABLE `jnc_studentsection`
  ADD CONSTRAINT `jnc_studentsection_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `tbl_student` (`StudentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_studentsection_ibfk_2` FOREIGN KEY (`SectionID`) REFERENCES `tbl_section` (`SectionID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
