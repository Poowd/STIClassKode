-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2024 at 04:55 PM
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
-- Table structure for table `jnc_sectionprogram`
--

CREATE TABLE `jnc_sectionprogram` (
  `SectionID` varchar(10) NOT NULL,
  `ProgramID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jnc_student-program`
--

CREATE TABLE `jnc_student-program` (
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
('Stdn000001', 'Sect000001');

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
('Cors000001', 'Computer Programming 1', 'INF-CP1-001', 'Major', '', 'Information & Communications Technology', 'Active');

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
('Fclt000001', 'User000003', '02000257907', 'Joshua Rhey', '', 'Oliveros', 'Fulltime', 'Oliveros.257907@munoz.sti.edu.ph', '', '', '', '2024-03-11 19:36:32', 'Active', '');

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
('Prgm000001', 'Bachelor of Science in Computer Science', 'INF-BS-001', '', 'Information & Communications Technology', 'Active');

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
('0000000001', 'Sect000001', 'Cors000001', 'Scft000001', 'Fclt000001', '7:00 AM', '10:00 AM', 3, '2024', '2025', 'Active');

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
  `Status` enum('Active','Archived','','') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_schoolfacility`
--

INSERT INTO `tbl_schoolfacility` (`SchoolFacilityID`, `Name`, `Capacity`, `Type`, `Building`, `Status`) VALUES
('Scft000001', 'Laboratory 1', 45, 'Laboratory', 'Main', 'Active');

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
('Sect000008', 'CS801', 'Fourth Year', 'Second Semester', 'Active');

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
('Stdn000001', 'User000002', '02000257907', 'Mark Limuel', 'Lopez', 'Lape', 'Regular', 'Lape.257907@munoz.sti.edu.ph', '09682349311', 'BLOCK 72 LOT 15 Villa Zaragoza Subd. Brgy. Turo, Bocaue, Bulacan, Philippines', '2024-03-11 19:28:47', 'Active', '');

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
  `UserLevel` enum('Student','Coach','Admin','') NOT NULL,
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`UserID`, `SchoolID`, `FirstName`, `LastName`, `Email`, `Password`, `Birthday`, `UserLevel`, `Status`) VALUES
('User000001', '0000000000', 'STI College', 'Admin', 'admin@edu.com', 'admin', '0000-00-00', 'Admin', 'Active'),
('User000002', '02000257907', 'Mark Limuel', 'Lape', 'Lape.257907@munoz.sti.edu.ph', 'Lape.257907_2002', '2002-11-18', 'Student', 'Active'),
('User000003', '02000257907', 'Joshua Rhey', 'Oliveros', 'Oliveros.257907@munoz.sti.edu.ph', 'Oliveros.257907_2002', '2002-11-18', 'Coach', 'Active');

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
    SET New.Password = CONCAT(New.LastName, ".", SUBSTRING(NEW.SchoolID, -6, 6), "_", EXTRACT(YEAR FROM New.Birthday));
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `User_ID` BEFORE INSERT ON `tbl_user` FOR EACH ROW BEGIN
    SET New.UserID = CONCAT('User', LPAD((SELECT COUNT(*) FROM tbl_user) + 1, 6, "0"));
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
-- Indexes for table `jnc_sectionprogram`
--
ALTER TABLE `jnc_sectionprogram`
  ADD KEY `SectionID` (`SectionID`,`ProgramID`),
  ADD KEY `SectionID_2` (`SectionID`,`ProgramID`),
  ADD KEY `ProgramID` (`ProgramID`);

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
-- Indexes for table `tbl_facultymember`
--
ALTER TABLE `tbl_facultymember`
  ADD PRIMARY KEY (`FacultyMemberID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `Status` (`Status`);

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
-- Constraints for table `jnc_facultymember-course`
--
ALTER TABLE `jnc_facultymember-course`
  ADD CONSTRAINT `jnc_facultymember-course_ibfk_1` FOREIGN KEY (`FacultyMemberID`) REFERENCES `tbl_facultymember` (`FacultyMemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_facultymember-course_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `tbl_course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jnc_facultymember-program`
--
ALTER TABLE `jnc_facultymember-program`
  ADD CONSTRAINT `jnc_facultymember-program_ibfk_1` FOREIGN KEY (`FacultyMemberID`) REFERENCES `tbl_facultymember` (`FacultyMemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_facultymember-program_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jnc_sectionprogram`
--
ALTER TABLE `jnc_sectionprogram`
  ADD CONSTRAINT `jnc_sectionprogram_ibfk_1` FOREIGN KEY (`SectionID`) REFERENCES `tbl_section` (`SectionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_sectionprogram_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jnc_student-program`
--
ALTER TABLE `jnc_student-program`
  ADD CONSTRAINT `jnc_student-program_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `tbl_student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jnc_student-program_ibfk_2` FOREIGN KEY (`ProgramID`) REFERENCES `tbl_program` (`ProgramID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `tbl_schedules`
--
ALTER TABLE `tbl_schedules`
  ADD CONSTRAINT `tbl_schedules_ibfk_3` FOREIGN KEY (`Course`) REFERENCES `tbl_course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_schedules_ibfk_4` FOREIGN KEY (`Room`) REFERENCES `tbl_schoolfacility` (`SchoolFacilityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_schedules_ibfk_5` FOREIGN KEY (`FacultyMember`) REFERENCES `tbl_facultymember` (`FacultyMemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_schedules_ibfk_6` FOREIGN KEY (`Section`) REFERENCES `tbl_section` (`SectionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD CONSTRAINT `tbl_student_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tbl_user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
