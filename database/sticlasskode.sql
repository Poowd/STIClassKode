-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2024 at 04:37 PM
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
  `ProgramID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_facultymembercourse`
--

CREATE TABLE `jnc_facultymembercourse` (
  `FacultyMemberID` varchar(10) NOT NULL,
  `CourseID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_facultymemberprogram`
--

CREATE TABLE `jnc_facultymemberprogram` (
  `FacultyMemberID` varchar(10) NOT NULL,
  `ProgramID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_sectionprogram`
--

CREATE TABLE `jnc_sectionprogram` (
  `SectionID` varchar(10) NOT NULL,
  `ProgramID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_studentprogram`
--

CREATE TABLE `jnc_studentprogram` (
  `StudentID` varchar(15) NOT NULL,
  `ProgramID` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_studentsection`
--

CREATE TABLE `jnc_studentsection` (
  `StudentID` varchar(15) NOT NULL,
  `SectionID` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jnc_studentsection`
--

INSERT INTO `jnc_studentsection` (`StudentID`, `SectionID`) VALUES
('Stdn000001', 'Sect000001'),
('Stdn000002', 'Sect000001'),
('Stdn000003', 'Sect000001'),
('Stdn000004', 'Sect000001'),
('Stdn000005', 'Sect000001'),
('Stdn000006', 'Sect000001'),
('Stdn000007', 'Sect000001'),
('Stdn000008', 'Sect000001'),
('Stdn000009', 'Sect000001'),
('Stdn000010', 'Sect000009'),
('Stdn000011', 'Sect000009');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE `tbl_course` (
  `CourseID` varchar(15) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `CourseCode` varchar(20) NOT NULL,
  `Type` enum('Minor','Major','','') NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Category` enum('Information & Communications Technology','Business & Management','Hospitality Management','Tourism Management','Engineering','Arts & Sciences','General Studies','Other') NOT NULL,
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`CourseID`, `Name`, `CourseCode`, `Type`, `Description`, `Category`, `Status`) VALUES
('Cors000001', 'Computer Programming 1', 'INF-CP1-001', 'Major', '', 'Information & Communications Technology', 'Active'),
('Cors000002', 'Euthenics 1', 'GEN-EUTH1-001', 'Minor', '', 'General Studies', 'Active'),
('Cors000003', 'The Contemporary World', 'GEN-TCW-002', 'Minor', '', 'General Studies', 'Active'),
('Cors000004', 'Introduction to Computing', 'INF-ITC-002', 'Major', '', 'Information & Communications Technology', 'Active'),
('Cors000005', 'Understanding the Self', 'GEN-UTS-003', 'Minor', '', 'General Studies', 'Active'),
('Cors000006', 'Mathematics in the Modern World', 'GEN-MMW-004', 'Minor', '', 'General Studies', 'Active'),
('Cors000007', 'Physical Education 1', 'GEN-PE1-005', 'Minor', '', 'General Studies', 'Active'),
('Cors000008', 'National Service Training Program 1', 'OTH-NSTP1-001', 'Minor', '', 'Other', 'Active'),
('Cors000009', 'Purposive Communication', 'GEN-PC-006', 'Minor', '', 'General Studies', 'Active'),
('Cors000010', 'Computer Programming 2', 'INF-CP2-003', 'Major', '', 'Information & Communications Technology', 'Active'),
('Cors000011', 'Science, Technology, and Society', 'GEN-STS-007', 'Minor', '', 'General Studies', 'Active'),
('Cors000012', 'Art Appreciation', 'GEN-AAPP-008', 'Minor', '', 'General Studies', 'Active'),
('Cors000013', 'National Service Training Program 2', 'OTH-NSTP2-002', 'Minor', '', 'Other', 'Active'),
('Cors000014', 'Discrete Structures 1', 'GEN-DST1-009', 'Minor', '', 'General Studies', 'Active'),
('Cors000015', 'Physical Education 2', 'GEN-PE2-010', 'Minor', '', 'General Studies', 'Active'),
('Cors000016', 'College Calculus', 'GEN-CC-011', 'Minor', '', 'General Studies', 'Active'),
('Cors000017', 'Discrete Structures 2', 'GEN-DST2-012', 'Minor', '', 'General Studies', 'Active'),
('Cors000018', 'Readings in Philippine History', 'GEN-RPH-013', 'Minor', '', 'General Studies', 'Active'),
('Cors000019', 'The Entrepreneurial Mind', 'GEN-ENTREP-014', 'Minor', '', 'General Studies', 'Active'),
('Cors000020', 'Rizal\'s Life and Works', 'GEN-RLW-015', 'Minor', '', 'General Studies', 'Active'),
('Cors000021', 'Data Structures and Algorithms', 'INF-DSALGO-004', 'Major', '', 'Information & Communications Technology', 'Active'),
('Cors000022', 'Computer Programming 3', 'INF-CP3-005', 'Major', '', 'Information & Communications Technology', 'Active'),
('Cors000023', 'Physical Education 3', 'GEN-PE3-016', 'Minor', '', 'General Studies', 'Active');

--
-- Triggers `tbl_course`
--
DELIMITER $$
CREATE TRIGGER `Course_Code` BEFORE INSERT ON `tbl_course` FOR EACH ROW BEGIN
     SET NEW.CourseCode = CONCAT(
        UPPER(LEFT(NEW.Category, 3)), '-',
        UPPER(New.CourseCode), '-',
        LPAD(COALESCE((SELECT COUNT(*) + 1
                       FROM tbl_course
                       WHERE Category = NEW.Category), 1), 3, '0')  -- Increment based on total courses in category
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Course_ID` BEFORE INSERT ON `tbl_course` FOR EACH ROW BEGIN
    SET New.CourseID = CONCAT('Cors', LPAD((SELECT COUNT(*) FROM tbl_course) + 1, 6, "0"));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_facultymember`
--

CREATE TABLE `tbl_facultymember` (
  `FacultyMemberID` varchar(15) NOT NULL,
  `UserID` varchar(15) NOT NULL,
  `SchoolFacultyMemberID` varchar(20) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `FacultyMemberType` enum('Fulltime','Parttime','','') NOT NULL,
  `Email` varchar(255) NOT NULL,
  `ContactNumber` varchar(11) NOT NULL,
  `FacebookLink` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `Status` enum('Active','Archived','','') NOT NULL DEFAULT 'Active',
  `Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_facultymember`
--

INSERT INTO `tbl_facultymember` (`FacultyMemberID`, `UserID`, `SchoolFacultyMemberID`, `FirstName`, `MiddleName`, `LastName`, `FacultyMemberType`, `Email`, `ContactNumber`, `FacebookLink`, `Address`, `DateCreated`, `Status`, `Image`) VALUES
('Fclt000001', 'User000002', '01000000001', 'John', '', 'Macaraig', 'Fulltime', 'Macaraig.000001@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:42:42', 'Active', ''),
('Fclt000002', 'User000003', '01000000002', 'Hazel', '', 'Bangagan', 'Fulltime', 'Bangagan.000002@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:43:16', 'Active', ''),
('Fclt000003', 'User000004', '01000000003', 'Mark Lester', '', 'Felipe', 'Fulltime', 'Felipe.000003@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:43:32', 'Active', ''),
('Fclt000004', 'User000005', '01000000004', 'Jhayen', '', 'Mañas', 'Fulltime', 'Mañas.000004@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:44:39', 'Active', ''),
('Fclt000005', 'User000006', '01000000005', 'Flojane', '', 'Taleon', 'Fulltime', 'Taleon.000005@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:45:11', 'Active', ''),
('Fclt000006', 'User000007', '01000000006', 'Edmar', '', 'Umpad', 'Fulltime', 'Umpad.000006@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:45:25', 'Active', ''),
('Fclt000007', 'User000008', '01000000007', 'Argel', '', 'Barrientos', 'Fulltime', 'Barrientos.000007@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:45:44', 'Active', ''),
('Fclt000008', 'User000009', '01000000008', 'Suesherie', '', 'Balao', 'Fulltime', 'Balao.000008@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:46:04', 'Active', ''),
('Fclt000009', 'User000010', '01000000009', 'Ricardo', '', 'Banquil', 'Fulltime', 'Banquil.000009@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:46:20', 'Active', ''),
('Fclt000010', 'User000011', '01000000010', 'Josue', '', 'Lacudine', 'Fulltime', 'Lacudine.000010@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:46:40', 'Active', ''),
('Fclt000011', 'User000012', '01000000011', 'Leah', '', 'Jimeno', 'Fulltime', 'Jimeno.000011@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:47:00', 'Active', ''),
('Fclt000012', 'User000013', '01000000012', 'Jorel', '', 'Fernandez', 'Fulltime', 'Fernandez.000012@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:47:16', 'Active', ''),
('Fclt000013', 'User000014', '01000000013', 'Ralph', '', 'Alberto', 'Fulltime', 'Alberto.000013@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:47:35', 'Active', ''),
('Fclt000014', 'User000015', '01000000014', 'Jesca', '', 'Velasco', 'Fulltime', 'Velasco.000014@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:47:49', 'Active', ''),
('Fclt000015', 'User000016', '01000000015', 'Jomar', '', 'Manlapaz', 'Fulltime', 'Manlapaz.000015@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:48:23', 'Active', ''),
('Fclt000016', 'User000017', '01000000016', 'Jann', '', 'Del Rosario', 'Fulltime', 'Del Rosario.000016@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:48:54', 'Active', ''),
('Fclt000017', 'User000018', '01000000017', 'Joshua Rhey', '', 'Oliveros', 'Fulltime', 'Oliveros.000017@munoz.sti.edu.ph', '', '', '', '2024-03-14 22:49:16', 'Active', '');

--
-- Triggers `tbl_facultymember`
--
DELIMITER $$
CREATE TRIGGER `FacultyMember_ID` BEFORE INSERT ON `tbl_facultymember` FOR EACH ROW BEGIN
    SET New.FacultyMemberID = CONCAT('Fclt', LPAD((SELECT COUNT(*) FROM tbl_facultymember) + 1, 6, "0"));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_permissions`
--

CREATE TABLE `tbl_permissions` (
  `PermissionID` varchar(15) NOT NULL,
  `User` varchar(15) NOT NULL,
  `UserLevel` enum('Admin','Coach','Student','') NOT NULL,
  `File_Management` enum('True','False') NOT NULL,
  `Access_View` enum('True','False') NOT NULL,
  `Access_Edit` enum('True','False') NOT NULL,
  `Access_Insert` enum('True','False') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_permissions`
--

INSERT INTO `tbl_permissions` (`PermissionID`, `User`, `UserLevel`, `File_Management`, `Access_View`, `Access_Edit`, `Access_Insert`) VALUES
('PRM000001', 'User000001', 'Admin', 'True', 'True', 'True', 'True'),
('PRM000002', 'User000002', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000003', 'User000003', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000004', 'User000004', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000005', 'User000005', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000006', 'User000006', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000007', 'User000007', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000008', 'User000008', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000009', 'User000009', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000010', 'User000010', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000011', 'User000011', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000012', 'User000012', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000013', 'User000013', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000014', 'User000014', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000015', 'User000015', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000016', 'User000016', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000017', 'User000017', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000018', 'User000018', 'Coach', 'False', 'True', 'False', 'False'),
('PRM000019', 'User000019', 'Student', 'False', 'True', 'False', 'False'),
('PRM000020', 'User000020', 'Student', 'False', 'True', 'False', 'False'),
('PRM000021', 'User000021', 'Student', 'False', 'True', 'False', 'False'),
('PRM000022', 'User000022', 'Student', 'False', 'True', 'False', 'False'),
('PRM000023', 'User000023', 'Student', 'False', 'True', 'False', 'False'),
('PRM000024', 'User000024', 'Student', 'False', 'True', 'False', 'False'),
('PRM000025', 'User000025', 'Student', 'False', 'True', 'False', 'False'),
('PRM000026', 'User000026', 'Student', 'False', 'True', 'False', 'False'),
('PRM000027', 'User000027', 'Student', 'False', 'True', 'False', 'False'),
('PRM000028', 'User000028', 'Student', 'False', 'True', 'False', 'False'),
('PRM000029', 'User000029', 'Student', 'False', 'True', 'False', 'False');

--
-- Triggers `tbl_permissions`
--
DELIMITER $$
CREATE TRIGGER `Permission_ID` BEFORE INSERT ON `tbl_permissions` FOR EACH ROW BEGIN
    SET New.PermissionID = CONCAT('PRM', LPAD((SELECT COUNT(*) FROM tbl_permissions) + 1, 6, "0"));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_program`
--

CREATE TABLE `tbl_program` (
  `ProgramID` varchar(15) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `ProgramCode` varchar(15) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Category` enum('Information & Communications Technology','Business & Management','Hospitality Management','Tourism Management','Engineering','Arts & Sciences','General Studies') NOT NULL,
  `Status` enum('Active','Archive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_program`
--

INSERT INTO `tbl_program` (`ProgramID`, `Name`, `ProgramCode`, `Description`, `Category`, `Status`) VALUES
('Prgm000001', 'Bachelor of Science in Computer Science', 'INF-BS-001', '', 'Information & Communications Technology', 'Active'),
('Prgm000002', 'Bachelor of Science in Computer Engineering', 'ENG-CPE-001', '', 'Engineering', 'Active'),
('Prgm000003', 'Bachelor of Science in Information Technology', 'INF-IT-002', '', 'Information & Communications Technology', 'Active'),
('Prgm000004', 'Bachelor of Science in Accounting Information System', 'BUS-AIS-001', '', 'Business & Management', 'Active'),
('Prgm000005', 'Bachelor of Science in Tourism Management', 'TOU-TM-001', '', 'Tourism Management', 'Active'),
('Prgm000006', 'Bachelor in Multimedia Arts ', 'ART-MMA-001', '', 'Arts & Sciences', 'Active');

--
-- Triggers `tbl_program`
--
DELIMITER $$
CREATE TRIGGER `Create_Section` AFTER INSERT ON `tbl_program` FOR EACH ROW BEGIN
	DECLARE in_position INT;
    DECLARE first_word_letter VARCHAR(1);
    DECLARE last_word_first_letter VARCHAR(1);
    DECLARE Acro VARCHAR(10);

    SET in_position = LOCATE('in', NEW.Name);
    IF in_position > 0 THEN
        SET first_word_letter = SUBSTRING(NEW.Name, in_position + 3, 1);  -- Get first letter of word after 'in'
    ELSE
        SET first_word_letter = SUBSTRING(NEW.Name, 1, 1);  -- If there is no 'in', gets the first letter of the first word
    END IF;

   
    SET last_word_first_letter = SUBSTRING_INDEX(NEW.Name, ' ', -1);  -- Gets last word in Course_Name
    SET last_word_first_letter = LEFT(last_word_first_letter, 1);  -- Gets first letter of last word

     SET Acro = CONCAT(
        first_word_letter, last_word_first_letter
    );


    INSERT INTO tbl_section (Name, Level, Semester)
        VALUES 	(CONCAT(Acro, "101"), "First Year", "First Semester"),
        		(CONCAT(Acro, "201"), "First Year", "Second Semester"),
                (CONCAT(Acro, "301"), "Second Year", "First Semester"),
                (CONCAT(Acro, "401"), "Second Year", "Second Semester"),
                (CONCAT(Acro, "501"), "Third Year", "First Semester"),
                (CONCAT(Acro, "601"), "Third Year", "Second Semester"),
                (CONCAT(Acro, "701"), "Fourth Year", "First Semester"),
                (CONCAT(Acro, "801"), "Fourth Year", "Second Semester");
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Program_Code` BEFORE INSERT ON `tbl_program` FOR EACH ROW BEGIN
     SET NEW.ProgramCode = CONCAT(
        UPPER(LEFT(NEW.Category, 3)), '-',
        UPPER(NEW.ProgramCode), '-',
        LPAD(COALESCE((SELECT COUNT(*) + 1
                       FROM tbl_program
                       WHERE Category = NEW.Category), 1), 3, '0')  -- Increment based on total courses in category
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Program_ID` BEFORE INSERT ON `tbl_program` FOR EACH ROW BEGIN
    SET New.ProgramID = CONCAT('Prgm', LPAD((SELECT COUNT(*) FROM tbl_program) + 1, 6, "0"));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schedules`
--

CREATE TABLE `tbl_schedules` (
  `ScheduleID` varchar(15) NOT NULL,
  `Section` varchar(255) NOT NULL,
  `Course` varchar(255) NOT NULL,
  `Room` varchar(255) NOT NULL,
  `FacultyMember` varchar(255) NOT NULL,
  `TimeStart` enum('7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM') NOT NULL,
  `TimeEnd` enum('7:00 AM','7:30 AM','8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM') NOT NULL,
  `Units` int(1) NOT NULL,
  `AYStart` varchar(4) NOT NULL,
  `AYEnd` varchar(4) NOT NULL,
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_schedules`
--

INSERT INTO `tbl_schedules` (`ScheduleID`, `Section`, `Course`, `Room`, `FacultyMember`, `TimeStart`, `TimeEnd`, `Units`, `AYStart`, `AYEnd`, `Status`) VALUES
('0000000001', 'Sect000001', 'Computer Programming 1', '301M', 'Oliveros, Joshua Rhey', '7:00 AM', '10:00 AM', 3, '2024', '2025', 'Active'),
('0000000002', 'Sect000001', 'Computer Programming 2', '303M', 'Oliveros, Joshua Rhey', '10:00 AM', '1:00 PM', 3, '2024', '2025', 'Active'),
('0000000003', 'Sect000001', 'Computer Programming 3', '106B', 'Oliveros, Joshua Rhey', '1:00 PM', '3:00 PM', 3, '2024', '2025', 'Active'),
('0000000004', 'Sect000009', 'Understanding the Self', '103B', 'Mañas, Jhayen', '4:30 PM', '6:30 PM', 2, '2024', '2025', 'Active');

--
-- Triggers `tbl_schedules`
--
DELIMITER $$
CREATE TRIGGER `Schedule_ID` BEFORE INSERT ON `tbl_schedules` FOR EACH ROW BEGIN
    SET New.ScheduleID = CONCAT(LPAD((SELECT COUNT(*) FROM tbl_schedules) + 1, 10, "0"));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schoolfacility`
--

CREATE TABLE `tbl_schoolfacility` (
  `SchoolFacilityID` varchar(15) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `Type` enum('Regular Room','Laboratory','Audio Visual Room','Outdoor','Others') NOT NULL,
  `Building` enum('Main','Annex A','Annex B','') NOT NULL,
  `Status` enum('Active','Archive','','') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_schoolfacility`
--

INSERT INTO `tbl_schoolfacility` (`SchoolFacilityID`, `Name`, `Capacity`, `Type`, `Building`, `Status`) VALUES
('Scft000001', '301M', 45, 'Regular Room', 'Main', 'Active'),
('Scft000002', '302M', 45, 'Regular Room', 'Main', 'Active'),
('Scft000003', '303M', 40, 'Regular Room', 'Main', 'Active'),
('Scft000004', '304M', 40, 'Regular Room', 'Main', 'Active'),
('Scft000005', 'Engineering', 40, 'Laboratory', 'Annex A', 'Active'),
('Scft000006', 'Science Lab', 40, 'Laboratory', 'Annex A', 'Active'),
('Scft000007', '103B', 50, 'Regular Room', 'Annex B', 'Active'),
('Scft000008', '104B', 45, 'Regular Room', 'Annex B', 'Active'),
('Scft000009', '105B', 25, 'Regular Room', 'Annex B', 'Active'),
('Scft000010', '106B', 40, 'Regular Room', 'Annex B', 'Active'),
('Scft000011', '107B', 40, 'Regular Room', 'Annex B', 'Active'),
('Scft000012', '204B', 45, 'Regular Room', 'Annex B', 'Active'),
('Scft000013', '205B', 40, 'Regular Room', 'Annex B', 'Active'),
('Scft000014', '206B', 40, 'Regular Room', 'Annex B', 'Active'),
('Scft000015', '101B', 40, 'Regular Room', 'Annex B', 'Active'),
('Scft000016', '102', 20, 'Regular Room', 'Annex B', 'Active'),
('Scft000017', '201B', 45, 'Regular Room', 'Annex B', 'Active'),
('Scft000018', '202B', 45, 'Regular Room', 'Annex B', 'Active'),
('Scft000019', '203B', 45, 'Regular Room', 'Annex B', 'Active'),
('Scft000020', 'AVR-1', 50, 'Audio Visual Room', 'Annex B', 'Active'),
('Scft000021', 'AVR-2', 50, 'Audio Visual Room', 'Annex B', 'Active'),
('Scft000022', 'AVR-3', 50, 'Audio Visual Room', 'Annex B', 'Active');

--
-- Triggers `tbl_schoolfacility`
--
DELIMITER $$
CREATE TRIGGER `SchoolFacility_ID` BEFORE INSERT ON `tbl_schoolfacility` FOR EACH ROW BEGIN
    SET New.SchoolFacilityID = CONCAT('Scft', LPAD((SELECT COUNT(*) FROM tbl_schoolfacility) + 1, 6, "0"));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_section`
--

CREATE TABLE `tbl_section` (
  `SectionID` varchar(15) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Level` enum('First Year','Second Year','Third Year','Fourth Year') NOT NULL,
  `Semester` enum('First Semester','Second Semester') NOT NULL,
  `Status` enum('Active','Archive','','') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_section`
--

INSERT INTO `tbl_section` (`SectionID`, `Name`, `Level`, `Semester`, `Status`) VALUES
('Sect000001', 'CS101', 'First Year', 'First Semester', 'Active'),
('Sect000002', 'CS201', 'First Year', 'Second Semester', 'Active'),
('Sect000003', 'CS301', 'Second Year', 'First Semester', 'Active'),
('Sect000004', 'CS401', 'Second Year', 'Second Semester', 'Active'),
('Sect000005', 'CS501', 'Third Year', 'First Semester', 'Active'),
('Sect000006', 'CS601', 'Third Year', 'Second Semester', 'Active'),
('Sect000007', 'CS701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000008', 'CS801', 'Fourth Year', 'Second Semester', 'Active'),
('Sect000009', 'CE101', 'First Year', 'First Semester', 'Active'),
('Sect000010', 'CE201', 'First Year', 'Second Semester', 'Active'),
('Sect000011', 'CE301', 'Second Year', 'First Semester', 'Active'),
('Sect000012', 'CE401', 'Second Year', 'Second Semester', 'Active'),
('Sect000013', 'CE501', 'Third Year', 'First Semester', 'Active'),
('Sect000014', 'CE601', 'Third Year', 'Second Semester', 'Active'),
('Sect000015', 'CE701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000016', 'CE801', 'Fourth Year', 'Second Semester', 'Active'),
('Sect000017', 'IT101', 'First Year', 'First Semester', 'Active'),
('Sect000018', 'IT201', 'First Year', 'Second Semester', 'Active'),
('Sect000019', 'IT301', 'Second Year', 'First Semester', 'Active'),
('Sect000020', 'IT401', 'Second Year', 'Second Semester', 'Active'),
('Sect000021', 'IT501', 'Third Year', 'First Semester', 'Active'),
('Sect000022', 'IT601', 'Third Year', 'Second Semester', 'Active'),
('Sect000023', 'IT701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000024', 'IT801', 'Fourth Year', 'Second Semester', 'Active'),
('Sect000025', 'AS101', 'First Year', 'First Semester', 'Active'),
('Sect000026', 'AS201', 'First Year', 'Second Semester', 'Active'),
('Sect000027', 'AS301', 'Second Year', 'First Semester', 'Active'),
('Sect000028', 'AS401', 'Second Year', 'Second Semester', 'Active'),
('Sect000029', 'AS501', 'Third Year', 'First Semester', 'Active'),
('Sect000030', 'AS601', 'Third Year', 'Second Semester', 'Active'),
('Sect000031', 'AS701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000032', 'AS801', 'Fourth Year', 'Second Semester', 'Active'),
('Sect000033', 'TM101', 'First Year', 'First Semester', 'Active'),
('Sect000034', 'TM201', 'First Year', 'Second Semester', 'Active'),
('Sect000035', 'TM301', 'Second Year', 'First Semester', 'Active'),
('Sect000036', 'TM401', 'Second Year', 'Second Semester', 'Active'),
('Sect000037', 'TM501', 'Third Year', 'First Semester', 'Active'),
('Sect000038', 'TM601', 'Third Year', 'Second Semester', 'Active'),
('Sect000039', 'TM701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000040', 'TM801', 'Fourth Year', 'Second Semester', 'Active'),
('Sect000041', 'M101', 'First Year', 'First Semester', 'Active'),
('Sect000042', 'M201', 'First Year', 'Second Semester', 'Active'),
('Sect000043', 'M301', 'Second Year', 'First Semester', 'Active'),
('Sect000044', 'M401', 'Second Year', 'Second Semester', 'Active'),
('Sect000045', 'M501', 'Third Year', 'First Semester', 'Active'),
('Sect000046', 'M601', 'Third Year', 'Second Semester', 'Active'),
('Sect000047', 'M701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000048', 'M801', 'Fourth Year', 'Second Semester', 'Active');

--
-- Triggers `tbl_section`
--
DELIMITER $$
CREATE TRIGGER `Section_ID` BEFORE INSERT ON `tbl_section` FOR EACH ROW BEGIN
    SET New.SectionID = CONCAT('Sect', LPAD((SELECT COUNT(*) FROM tbl_section) + 1, 6, "0"));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student`
--

CREATE TABLE `tbl_student` (
  `StudentID` varchar(15) NOT NULL,
  `UserID` varchar(15) DEFAULT NULL,
  `SchoolStudentID` varchar(20) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `StudentType` enum('Regular','Irregular','Working','') NOT NULL DEFAULT 'Regular',
  `Email` varchar(255) NOT NULL,
  `ContactNumber` varchar(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active',
  `Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`StudentID`, `UserID`, `SchoolStudentID`, `FirstName`, `MiddleName`, `LastName`, `StudentType`, `Email`, `ContactNumber`, `Address`, `DateCreated`, `Status`, `Image`) VALUES
('Stdn000001', 'User000019', '02000257907', 'Mark Limuel', '', 'Lape', 'Regular', 'Lape.257907@munoz.sti.edu.ph', '', '', '2024-03-14 22:58:23', 'Active', ''),
('Stdn000002', 'User000020', '02000000002', 'Yranimez', '', 'Repil', 'Regular', 'Repil.000002@munoz.sti.edu.ph', '', '', '2024-03-14 22:58:41', 'Active', ''),
('Stdn000003', 'User000021', '02000000003', 'James Bernard', '', 'Gereña', 'Regular', 'Gereña.000003@munoz.sti.edu.ph', '', '', '2024-03-14 22:59:00', 'Active', ''),
('Stdn000004', 'User000022', '02000000004', 'Christian Kobe', '', 'Malonzo', 'Regular', 'Malonzo.000004@munoz.sti.edu.ph', '', '', '2024-03-14 22:59:22', 'Active', ''),
('Stdn000005', 'User000023', '02000000005', 'Emman Isaac', '', 'Conggas', 'Regular', 'Conggas.000005@munoz.sti.edu.ph', '', '', '2024-03-14 22:59:35', 'Active', ''),
('Stdn000006', 'User000024', '02000000006', 'Kyle Carlos', '', 'Agullana', 'Regular', 'Agullana.000006@munoz.sti.edu.ph', '', '', '2024-03-14 22:59:51', 'Active', ''),
('Stdn000007', 'User000025', '02000000007', 'Kian', '', 'Dela Cruz', 'Regular', 'Dela Cruz.000007@munoz.sti.edu.ph', '', '', '2024-03-14 23:00:17', 'Active', ''),
('Stdn000008', 'User000026', '02000000008', 'Alexander', '', 'Acojido', 'Regular', 'Acojido.000008@munoz.sti.edu.ph', '', '', '2024-03-14 23:00:48', 'Active', ''),
('Stdn000009', 'User000027', '02000000009', 'Carmen', '', 'Johnson', 'Regular', 'Johnson.000009@munoz.sti.edu.ph', '', '', '2024-03-14 23:01:19', 'Active', ''),
('Stdn000010', 'User000028', '02000000010', 'Christian', '', 'Petalcorin', 'Regular', 'Petalcorin.000010@munoz.sti.edu.ph', '', '', '2024-03-14 23:01:44', 'Active', ''),
('Stdn000011', 'User000029', '020000000011', 'Godwin', '', 'Fedelson', 'Regular', 'Fedelson.000011@munoz.sti.edu.ph', '', '', '2024-03-14 23:01:59', 'Active', '');

--
-- Triggers `tbl_student`
--
DELIMITER $$
CREATE TRIGGER `Student_ID` BEFORE INSERT ON `tbl_student` FOR EACH ROW BEGIN
    SET New.StudentID = CONCAT('Stdn', LPAD((SELECT COUNT(*) FROM tbl_student) + 1, 6, "0"));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `UserID` varchar(15) NOT NULL,
  `SchoolID` varchar(20) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Birthday` date DEFAULT NULL,
  `UserLevel` enum('Student','Coach','Admin','') NOT NULL DEFAULT 'Student',
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UserID`, `SchoolID`, `FirstName`, `LastName`, `Email`, `Password`, `Birthday`, `UserLevel`, `Status`) VALUES
('User000001', '00000000000', 'STI College', 'Admin', 'admin@a.a', 'admin', '2002-11-06', 'Admin', 'Active'),
('User000002', '01000000001', 'John', 'Macaraig', 'Macaraig.000001@munoz.sti.edu.ph', 'Macaraig_User000002', '0000-00-00', 'Coach', 'Active'),
('User000003', '01000000002', 'Hazel', 'Bangagan', 'Bangagan.000002@munoz.sti.edu.ph', 'Bangagan_User000003', '0000-00-00', 'Coach', 'Active'),
('User000004', '01000000003', 'Mark Lester', 'Felipe', 'Felipe.000003@munoz.sti.edu.ph', 'Felipe_User000004', '0000-00-00', 'Coach', 'Active'),
('User000005', '01000000004', 'Jhayen', 'Mañas', 'Mañas.000004@munoz.sti.edu.ph', 'Mañas_User000005', '0000-00-00', 'Coach', 'Active'),
('User000006', '01000000005', 'Flojane', 'Taleon', 'Taleon.000005@munoz.sti.edu.ph', 'Taleon_User000006', '0000-00-00', 'Coach', 'Active'),
('User000007', '01000000006', 'Edmar', 'Umpad', 'Umpad.000006@munoz.sti.edu.ph', 'Umpad_User000007', '0000-00-00', 'Coach', 'Active'),
('User000008', '01000000007', 'Argel', 'Barrientos', 'Barrientos.000007@munoz.sti.edu.ph', 'Barrientos_User000008', '0000-00-00', 'Coach', 'Active'),
('User000009', '01000000008', 'Suesherie', 'Balao', 'Balao.000008@munoz.sti.edu.ph', 'Balao_User000009', '0000-00-00', 'Coach', 'Active'),
('User000010', '01000000009', 'Ricardo', 'Banquil', 'Banquil.000009@munoz.sti.edu.ph', 'Banquil_User000010', '0000-00-00', 'Coach', 'Active'),
('User000011', '01000000010', 'Josue', 'Lacudine', 'Lacudine.000010@munoz.sti.edu.ph', 'Lacudine_User000011', '0000-00-00', 'Coach', 'Active'),
('User000012', '01000000011', 'Leah', 'Jimeno', 'Jimeno.000011@munoz.sti.edu.ph', 'Jimeno_User000012', '0000-00-00', 'Coach', 'Active'),
('User000013', '01000000012', 'Jorel', 'Fernandez', 'Fernandez.000012@munoz.sti.edu.ph', 'Fernandez_User000013', '0000-00-00', 'Coach', 'Active'),
('User000014', '01000000013', 'Ralph', 'Alberto', 'Alberto.000013@munoz.sti.edu.ph', 'Alberto_User000014', '0000-00-00', 'Coach', 'Active'),
('User000015', '01000000014', 'Jesca', 'Velasco', 'Velasco.000014@munoz.sti.edu.ph', 'Velasco_User000015', '0000-00-00', 'Coach', 'Active'),
('User000016', '01000000015', 'Jomar', 'Manlapaz', 'Manlapaz.000015@munoz.sti.edu.ph', 'Manlapaz_User000016', '0000-00-00', 'Coach', 'Active'),
('User000017', '01000000016', 'Jann', 'Del Rosario', 'Del Rosario.000016@munoz.sti.edu.ph', 'Del Rosario_User000017', '0000-00-00', 'Coach', 'Active'),
('User000018', '01000000017', 'Joshua Rhey', 'Oliveros', 'Oliveros.000017@munoz.sti.edu.ph', 'Oliveros_User000018', '0000-00-00', 'Coach', 'Active'),
('User000019', '02000257907', 'Mark Limuel', 'Lape', 'Lape.257907@munoz.sti.edu.ph', 'Lape_User000019', '2002-11-18', 'Student', 'Active'),
('User000020', '02000000002', 'Yranimez', 'Repil', 'Repil.000002@munoz.sti.edu.ph', 'Repil_User000020', '0000-00-00', 'Student', 'Active'),
('User000021', '02000000003', 'James Bernard', 'Gereña', 'Gereña.000003@munoz.sti.edu.ph', 'Gereña_User000021', '0000-00-00', 'Student', 'Active'),
('User000022', '02000000004', 'Christian Kobe', 'Malonzo', 'Malonzo.000004@munoz.sti.edu.ph', 'Malonzo_User000022', '0000-00-00', 'Student', 'Active'),
('User000023', '02000000005', 'Emman Isaac', 'Conggas', 'Conggas.000005@munoz.sti.edu.ph', 'Conggas_User000023', '0000-00-00', 'Student', 'Active'),
('User000024', '02000000006', 'Kyle Carlos', 'Agullana', 'Agullana.000006@munoz.sti.edu.ph', 'Agullana_User000024', '0000-00-00', 'Student', 'Active'),
('User000025', '02000000007', 'Kian', 'Dela Cruz', 'DelaCruz.000007@munoz.sti.edu.ph', 'DelaCruz_User000025', '0000-00-00', 'Student', 'Active'),
('User000026', '02000000008', 'Alexander', 'Acojido', 'Acojido.000008@munoz.sti.edu.ph', 'Acojido_User000026', '0000-00-00', 'Student', 'Active'),
('User000027', '02000000009', 'Carmen', 'Johnson', 'Johnson.000009@munoz.sti.edu.ph', 'Johnson_User000027', '0000-00-00', 'Student', 'Active'),
('User000028', '02000000010', 'Christian', 'Petalcorin', 'Petalcorin.000010@munoz.sti.edu.ph', 'Petalcorin_User000028', '0000-00-00', 'Student', 'Active'),
('User000029', '020000000011', 'Godwin', 'Fedelson', 'Fedelson.000011@munoz.sti.edu.ph', 'Fedelson_User000029', '0000-00-00', 'Student', 'Active');

--
-- Triggers `tbl_user`
--
DELIMITER $$
CREATE TRIGGER `Set_User_Details` AFTER INSERT ON `tbl_user` FOR EACH ROW BEGIN
    IF NEW.UserLevel = 'Student' THEN
        INSERT INTO tbl_student (SchoolStudentID, FirstName, LastName, Email, UserID)
        VALUES (NEW.SchoolID, NEW.FirstName, NEW.LastName, NEW.Email, New.UserID);
    END IF;
    
    IF New.UserLevel = 'Coach' THEN
    	INSERT INTO tbl_facultymember (SchoolFacultyMemberID, FirstName, LastName, Email, UserID)
        VALUES (NEW.SchoolID, NEW.FirstName, NEW.LastName, NEW.Email, New.UserID);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Update_Status` AFTER UPDATE ON `tbl_user` FOR EACH ROW BEGIN
    IF NEW.UserLevel = 'Student' THEN
        UPDATE tbl_student SET Status = New.Status WHERE UserID = New.UserID;
    END IF;
    
    IF New.UserLevel = 'Coach' THEN
        UPDATE tbl_facultymember SET Status = New.Status WHERE UserID = New.UserID;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Update_User_Details` AFTER UPDATE ON `tbl_user` FOR EACH ROW BEGIN
    IF NEW.UserLevel = 'Student' THEN
        UPDATE tbl_student SET SchoolStudentID = NEW.SchoolID, FirstName = NEW.FirstName, LastName = NEW.LastName WHERE UserID = New.UserID;
    END IF;
    
    IF New.UserLevel = 'Coach' THEN
        UPDATE tbl_facultymember SET SchoolFacultyMemberID = NEW.SchoolID, FirstName = NEW.FirstName, LastName = NEW.LastName WHERE UserID = New.UserID;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `User_Email` BEFORE INSERT ON `tbl_user` FOR EACH ROW BEGIN
    SET New.Email = CONCAT(New.LastName, ".", SUBSTRING(NEW.SchoolID, -6, 6), "@munoz.sti.edu.ph");
    SET New.Password = CONCAT(New.LastName, "_", New.UserID);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `User_ID` BEFORE INSERT ON `tbl_user` FOR EACH ROW BEGIN
    SET New.UserID = CONCAT('User', LPAD((SELECT COUNT(*) FROM tbl_user) + 1, 6, "0"));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `User_Permissions` AFTER INSERT ON `tbl_user` FOR EACH ROW BEGIN
    IF NEW.UserLevel = 'Student' THEN
        INSERT INTO tbl_permissions (User, 
                                     UserLevel, 
                                     File_Management,
                                     Access_View,
                                     Access_Edit,
                                     Access_Insert)
        					 VALUES (NEW.UserID, 
                                     NEW.UserLevel, 
                                     "False", 
                                     "True", 
                                     "False", 
                                     "False");
    END IF;
    
    IF New.UserLevel = 'Coach' THEN
        INSERT INTO tbl_permissions (User, 
                                     UserLevel, 
                                     File_Management,
                                     Access_View,
                                     Access_Edit,
                                     Access_Insert)
        					 VALUES (NEW.UserID, 
                                     NEW.UserLevel, 
                                     "False", 
                                     "True", 
                                     "False", 
                                     "False");
    END IF;
    
    IF NEW.UserLevel = 'Admin' THEN
        INSERT INTO tbl_permissions (User, 
                                     UserLevel, 
                                     File_Management,
                                     Access_View,
                                     Access_Edit,
                                     Access_Insert)
        					 VALUES (NEW.UserID, 
                                     NEW.UserLevel,  
                                     "True", 
                                     "True",  
                                     "True",   
                                     "True");
    END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jnc_course-program`
--
ALTER TABLE `jnc_course-program`
  ADD KEY `CourseID` (`CourseID`,`ProgramID`),
  ADD KEY `ProgramID` (`ProgramID`);

--
-- Indexes for table `jnc_facultymembercourse`
--
ALTER TABLE `jnc_facultymembercourse`
  ADD KEY `FacultyMemberID` (`FacultyMemberID`,`CourseID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `jnc_facultymemberprogram`
--
ALTER TABLE `jnc_facultymemberprogram`
  ADD KEY `FacultyMemberID` (`FacultyMemberID`,`ProgramID`),
  ADD KEY `ProgramID` (`ProgramID`);

--
-- Indexes for table `jnc_sectionprogram`
--
ALTER TABLE `jnc_sectionprogram`
  ADD KEY `SectionID` (`SectionID`,`ProgramID`),
  ADD KEY `SectionID_2` (`SectionID`,`ProgramID`),
  ADD KEY `ProgramID` (`ProgramID`);

--
-- Indexes for table `jnc_studentprogram`
--
ALTER TABLE `jnc_studentprogram`
  ADD KEY `StudentID` (`StudentID`,`ProgramID`),
  ADD KEY `ProgramID` (`ProgramID`);

--
-- Indexes for table `jnc_studentsection`
--
ALTER TABLE `jnc_studentsection`
  ADD UNIQUE KEY `StudentID_2` (`StudentID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `SectionID` (`SectionID`);

--
-- Indexes for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD PRIMARY KEY (`CourseID`);

--
-- Indexes for table `tbl_facultymember`
--
ALTER TABLE `tbl_facultymember`
  ADD PRIMARY KEY (`FacultyMemberID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `Status` (`Status`);

--
-- Indexes for table `tbl_permissions`
--
ALTER TABLE `tbl_permissions`
  ADD PRIMARY KEY (`PermissionID`),
  ADD KEY `User` (`User`);

--
-- Indexes for table `tbl_program`
--
ALTER TABLE `tbl_program`
  ADD PRIMARY KEY (`ProgramID`);

--
-- Indexes for table `tbl_schedules`
--
ALTER TABLE `tbl_schedules`
  ADD PRIMARY KEY (`ScheduleID`),
  ADD KEY `Course` (`Course`) USING BTREE,
  ADD KEY `Section` (`Section`),
  ADD KEY `Room` (`Room`),
  ADD KEY `FacultyMember` (`FacultyMember`);

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
  ADD KEY `SectionID` (`SectionID`),
  ADD KEY `Name` (`Name`);

--
-- Indexes for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD PRIMARY KEY (`StudentID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `Status` (`Status`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `SchoolID` (`SchoolID`),
  ADD UNIQUE KEY `SchoolID_2` (`SchoolID`),
  ADD KEY `Status` (`Status`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jnc_course-program`
--
ALTER TABLE `jnc_course-program`
  ADD CONSTRAINT `jnc_course-program_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `tbl_course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_course-program_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jnc_facultymembercourse`
--
ALTER TABLE `jnc_facultymembercourse`
  ADD CONSTRAINT `jnc_facultymembercourse_ibfk_1` FOREIGN KEY (`FacultyMemberID`) REFERENCES `tbl_facultymember` (`FacultyMemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_facultymembercourse_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `tbl_course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jnc_facultymemberprogram`
--
ALTER TABLE `jnc_facultymemberprogram`
  ADD CONSTRAINT `jnc_facultymemberprogram_ibfk_1` FOREIGN KEY (`FacultyMemberID`) REFERENCES `tbl_facultymember` (`FacultyMemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_facultymemberprogram_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jnc_sectionprogram`
--
ALTER TABLE `jnc_sectionprogram`
  ADD CONSTRAINT `jnc_sectionprogram_ibfk_1` FOREIGN KEY (`SectionID`) REFERENCES `tbl_section` (`SectionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_sectionprogram_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jnc_studentprogram`
--
ALTER TABLE `jnc_studentprogram`
  ADD CONSTRAINT `jnc_studentprogram_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `tbl_student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_studentprogram_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jnc_studentsection`
--
ALTER TABLE `jnc_studentsection`
  ADD CONSTRAINT `jnc_studentsection_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `tbl_student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_studentsection_ibfk_2` FOREIGN KEY (`SectionID`) REFERENCES `tbl_section` (`SectionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_facultymember`
--
ALTER TABLE `tbl_facultymember`
  ADD CONSTRAINT `tbl_facultymember_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tbl_user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_permissions`
--
ALTER TABLE `tbl_permissions`
  ADD CONSTRAINT `tbl_permissions_ibfk_1` FOREIGN KEY (`User`) REFERENCES `tbl_user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD CONSTRAINT `tbl_student_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tbl_user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
