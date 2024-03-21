-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2024 at 04:36 PM
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
-- Database: `db_sticlasskode`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_coach`
--

CREATE TABLE `tbl_coach` (
  `CCHID` varchar(25) NOT NULL,
  `SCLID` varchar(25) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `MiddleInitial` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Type` enum('Fulltime','Parttime') NOT NULL,
  `Units` varchar(5) NOT NULL,
  `DPTID` varchar(25) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `ContactNumber` varchar(11) NOT NULL,
  `Facebook` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Deleted` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE `tbl_course` (
  `CRSID` varchar(25) NOT NULL,
  `CourseCode` varchar(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Units` int(1) NOT NULL,
  `Lecture` enum('True','False') NOT NULL DEFAULT 'False',
  `Laboratory` enum('True','False') NOT NULL DEFAULT 'False',
  `Practical` enum('True','False') NOT NULL DEFAULT 'False',
  `PRGID` varchar(25) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Deleted` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_curriculum`
--

CREATE TABLE `tbl_curriculum` (
  `CRRID` varchar(25) NOT NULL,
  `AcademicYear` varchar(25) NOT NULL,
  `Start` varchar(4) NOT NULL,
  `End` varchar(4) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Deleted` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_department`
--

CREATE TABLE `tbl_department` (
  `DPTID` varchar(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Abbrev` varchar(25) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Deleted` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_permission`
--

CREATE TABLE `tbl_permission` (
  `PRMID` varchar(25) NOT NULL,
  `UID` varchar(25) NOT NULL,
  `File_Maintainance` enum('True','False') NOT NULL DEFAULT 'False',
  `Access_View` enum('True','False') NOT NULL DEFAULT 'False',
  `Access_Edit` enum('True','False') NOT NULL DEFAULT 'False',
  `Access_Insert` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_program`
--

CREATE TABLE `tbl_program` (
  `PRGID` varchar(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Abbrev` varchar(25) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `DPTID` varchar(25) NOT NULL,
  `CRRID` varchar(25) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Deleted` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_room`
--

CREATE TABLE `tbl_room` (
  `RMID` varchar(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Capacity` int(5) NOT NULL,
  `Type` enum('Regular Room','Laboratory','Audio Visual Room','Practical Area','Others') NOT NULL,
  `Building` enum('Main','Annex-A','Annex-B') NOT NULL,
  `Floor` enum('First Floor','Second Floor','Third Floor') NOT NULL,
  `DateCreated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_section`
--

CREATE TABLE `tbl_section` (
  `SCTID` varchar(25) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Population` int(5) NOT NULL,
  `Year` enum('Grade 11','Grade 12','First Year','Second Year','Third Year','Fourth Year') NOT NULL,
  `Semester` enum('First Semester','Second Semester') NOT NULL,
  `PRGID` varchar(25) NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Deleted` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `UID` varchar(25) NOT NULL,
  `SCHLID` varchar(25) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UserType` enum('Admin','Coach','Student') NOT NULL DEFAULT 'Student',
  `DateCreated` datetime NOT NULL,
  `Deleted` enum('True','False') NOT NULL DEFAULT 'False'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UID`, `SCHLID`, `FirstName`, `LastName`, `Email`, `Password`, `UserType`, `DateCreated`, `Deleted`) VALUES
('02000000001', '', 'adsa', 'ds', 'sdadas', 'dasda', 'Student', '2024-03-16 15:47:18', 'False'),
('02000000002', '', 'fddsf', 'dsfsd', 'fsdf', 'sdf', 'Student', '2024-03-16 15:47:41', 'False');

--
-- Triggers `tbl_user`
--
DELIMITER $$
CREATE TRIGGER `ID` BEFORE INSERT ON `tbl_user` FOR EACH ROW BEGIN
	IF New.UserType = 'Admin' THEN
        SET New.UID = CONCAT('00000', LPAD((SELECT COUNT(*) FROM tbl_user) + 1, 6, "0"));
    END IF;
    
    IF New.UserType = 'Coach' THEN
        SET New.UID = CONCAT('01000', LPAD((SELECT COUNT(*) FROM tbl_user) + 1, 6, "0"));
    END IF;
    
    IF New.UserType = 'Student' THEN
        SET New.UID = CONCAT('02000', LPAD((SELECT COUNT(*) FROM tbl_user) + 1, 6, "0"));
    END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_coach`
--
ALTER TABLE `tbl_coach`
  ADD PRIMARY KEY (`CCHID`),
  ADD UNIQUE KEY `SCLID` (`SCLID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `ContactNumber` (`ContactNumber`),
  ADD UNIQUE KEY `Facebook` (`Facebook`),
  ADD KEY `DPTID` (`DPTID`);

--
-- Indexes for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD PRIMARY KEY (`CRSID`),
  ADD UNIQUE KEY `CourseCode` (`CourseCode`),
  ADD KEY `PRGID` (`PRGID`);

--
-- Indexes for table `tbl_curriculum`
--
ALTER TABLE `tbl_curriculum`
  ADD PRIMARY KEY (`CRRID`),
  ADD UNIQUE KEY `AcademicYear` (`AcademicYear`);

--
-- Indexes for table `tbl_department`
--
ALTER TABLE `tbl_department`
  ADD PRIMARY KEY (`DPTID`);

--
-- Indexes for table `tbl_permission`
--
ALTER TABLE `tbl_permission`
  ADD PRIMARY KEY (`PRMID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `tbl_program`
--
ALTER TABLE `tbl_program`
  ADD PRIMARY KEY (`PRGID`),
  ADD KEY `CRRID` (`CRRID`),
  ADD KEY `DPTID` (`DPTID`);

--
-- Indexes for table `tbl_room`
--
ALTER TABLE `tbl_room`
  ADD PRIMARY KEY (`RMID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `tbl_section`
--
ALTER TABLE `tbl_section`
  ADD PRIMARY KEY (`SCTID`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD KEY `PRGID` (`PRGID`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Password` (`Password`),
  ADD KEY `SchoolID` (`SCHLID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_coach`
--
ALTER TABLE `tbl_coach`
  ADD CONSTRAINT `tbl_coach_ibfk_1` FOREIGN KEY (`DPTID`) REFERENCES `tbl_department` (`DPTID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD CONSTRAINT `tbl_course_ibfk_1` FOREIGN KEY (`PRGID`) REFERENCES `tbl_program` (`PRGID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_permission`
--
ALTER TABLE `tbl_permission`
  ADD CONSTRAINT `tbl_permission_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `tbl_user` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_program`
--
ALTER TABLE `tbl_program`
  ADD CONSTRAINT `tbl_program_ibfk_1` FOREIGN KEY (`CRRID`) REFERENCES `tbl_curriculum` (`CRRID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_program_ibfk_2` FOREIGN KEY (`DPTID`) REFERENCES `tbl_department` (`DPTID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_section`
--
ALTER TABLE `tbl_section`
  ADD CONSTRAINT `tbl_section_ibfk_1` FOREIGN KEY (`PRGID`) REFERENCES `tbl_program` (`PRGID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
