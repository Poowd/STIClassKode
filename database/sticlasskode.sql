-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2024 at 06:01 PM
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
('Stdn000001', 'Sect000001'),
('Stdn000002', 'Sect000001'),
('Stdn000003', 'Sect000001');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE `tbl_course` (
  `CourseID` varchar(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `CourseCode` varchar(20) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Category` enum('Information & Communications Technology','Business & Management','Hospitality Management','Tourism Management','Engineering','Arts & Sciences','General Studies') NOT NULL,
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`CourseID`, `Name`, `CourseCode`, `Description`, `Category`, `Status`) VALUES
('Cors000001', 'Intermediate Web Programming', 'INF-INTPROG-001', 'Focuses on using PHP', 'Information & Communications Technology', 'Active'),
('Cors000002', 'Fundamentals of Web Program', 'INF-WEBPROG-002', 'Fundamentals', 'Information & Communications Technology', 'Active'),
('Cors000003', 'Readings in Philippine History', 'GEN-RPH-001', 'Filipino Ako', 'General Studies', 'Active');

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
  `FacultyMemberID` varchar(10) NOT NULL,
  `UserID` varchar(10) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `FacultyMemberType` enum('Fulltime','Parttime','','') NOT NULL,
  `Email` varchar(255) NOT NULL,
  `ContactNumber` varchar(11) NOT NULL,
  `FacebookLink` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `Status` enum('Active','Archived','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_facultymember`
--

INSERT INTO `tbl_facultymember` (`FacultyMemberID`, `UserID`, `FirstName`, `MiddleName`, `LastName`, `FacultyMemberType`, `Email`, `ContactNumber`, `FacebookLink`, `Address`, `DateCreated`, `Status`) VALUES
('Fclt000001', 'User000005', 'Joshua Rhey', '', 'Oliveros', 'Fulltime', 'Oliveros@munoz.sti.edu.ph', '', '', '', '0000-00-00 00:00:00', 'Active'),
('Fclt000002', 'User000011', 'John Rexon', '', 'Insigne', 'Fulltime', 'Insigne@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:07:08', 'Active'),
('Fclt000003', 'User000012', 'Jesca', '', 'Velasco', 'Fulltime', 'Velasco@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:07:28', 'Active'),
('Fclt000004', 'User000013', 'Edmar', '', 'Umpad', 'Fulltime', 'Umpad@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:07:46', 'Active'),
('Fclt000005', 'User000014', 'Eddie Wilson', '', 'Broqueza', 'Fulltime', 'Broqueza@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:08:20', 'Active'),
('Fclt000006', 'User000015', 'RG', '', 'Alberto', 'Fulltime', 'Alberto@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:09:15', 'Active'),
('Fclt000007', 'User000016', 'Micheal', '', 'Qiuambao', 'Fulltime', 'Qiuambao@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:09:54', 'Active'),
('Fclt000008', 'User000017', 'Aiman', '', 'Lazaro', 'Fulltime', 'Lazaro@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:10:09', 'Active'),
('Fclt000009', 'User000018', 'Cristylen', '', 'Esporsado', 'Fulltime', 'Esporsado@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:11:52', 'Active'),
('Fclt000010', 'User000019', 'Josue Demdem', '', 'Lacudine', 'Fulltime', 'Lacudine@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:14:05', 'Active'),
('Fclt000011', 'User000020', 'Jomar', '', 'Manlapaz', 'Fulltime', 'Manlapaz@munoz.sti.edu.ph', '', '', '', '2024-03-02 19:24:14', 'Active');

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
  `ProgramID` varchar(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `ProgramCode` varchar(10) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Category` enum('Information & Communications Technology','Business & Management','Hospitality Management','Tourism Management','Engineering','Arts & Sciences','General Studies') NOT NULL,
  `Status` enum('Active','Archive') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_program`
--

INSERT INTO `tbl_program` (`ProgramID`, `Name`, `ProgramCode`, `Description`, `Category`, `Status`) VALUES
('Prgm000001', 'Bachelor of Science in Computer Science', 'INF-CS-001', 'Computer Science Major', 'Information & Communications Technology', 'Active'),
('Prgm000002', 'Bachelor of Science in Information Technology', 'INF-IT-002', 'Information Technology Specialist', 'Information & Communications Technology', 'Active'),
('Prgm000003', 'Bachelor of Science in Accounting Information System', 'BUS-AS-001', 'Accounting Information System Specialist', 'Business & Management', 'Active'),
('Prgm000004', 'Bachelor of Science in Business Administration', 'BUS-BA-002', 'eqwe', 'Business & Management', 'Active');

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
-- Table structure for table `tbl_schoolfacility`
--

CREATE TABLE `tbl_schoolfacility` (
  `SchoolFacilityID` varchar(10) NOT NULL,
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
('Scft000001', '303M', 40, 'Regular Room', 'Main', 'Active'),
('Scft000002', '105B', 15, 'Regular Room', 'Annex B', 'Active');

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
  `SectionID` varchar(10) NOT NULL,
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
('Sect000009', 'IT101', 'First Year', 'First Semester', 'Active'),
('Sect000010', 'IT201', 'First Year', 'Second Semester', 'Active'),
('Sect000011', 'IT301', 'Second Year', 'First Semester', 'Active'),
('Sect000012', 'IT401', 'Second Year', 'Second Semester', 'Active'),
('Sect000013', 'IT501', 'Third Year', 'First Semester', 'Active'),
('Sect000014', 'IT601', 'Third Year', 'Second Semester', 'Active'),
('Sect000015', 'IT701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000016', 'IT801', 'Fourth Year', 'Second Semester', 'Active'),
('Sect000017', 'AS101', 'First Year', 'First Semester', 'Active'),
('Sect000018', 'AS201', 'First Year', 'Second Semester', 'Active'),
('Sect000019', 'AS301', 'Second Year', 'First Semester', 'Active'),
('Sect000020', 'AS401', 'Second Year', 'Second Semester', 'Active'),
('Sect000021', 'AS501', 'Third Year', 'First Semester', 'Active'),
('Sect000022', 'AS601', 'Third Year', 'Second Semester', 'Active'),
('Sect000023', 'AS701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000024', 'AS801', 'Fourth Year', 'Second Semester', 'Active'),
('Sect000025', 'BA101', 'First Year', 'First Semester', 'Active'),
('Sect000026', 'BA201', 'First Year', 'Second Semester', 'Active'),
('Sect000027', 'BA301', 'Second Year', 'First Semester', 'Active'),
('Sect000028', 'BA401', 'Second Year', 'Second Semester', 'Active'),
('Sect000029', 'BA501', 'Third Year', 'First Semester', 'Active'),
('Sect000030', 'BA601', 'Third Year', 'Second Semester', 'Active'),
('Sect000031', 'BA701', 'Fourth Year', 'First Semester', 'Active'),
('Sect000032', 'BA801', 'Fourth Year', 'Second Semester', 'Active');

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
  `StudentID` varchar(10) NOT NULL,
  `UserID` varchar(10) DEFAULT NULL,
  `FirstName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `StudentType` enum('Regular','Irregular','Working','') NOT NULL DEFAULT 'Regular',
  `Email` varchar(255) NOT NULL,
  `ContactNumber` varchar(11) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `Status` enum('Active','Archive','','') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`StudentID`, `UserID`, `FirstName`, `MiddleName`, `LastName`, `StudentType`, `Email`, `ContactNumber`, `Address`, `DateCreated`, `Status`) VALUES
('Stdn000001', 'User000002', 'Mark', 'Lopez', 'Lape', 'Regular', 'Lape@munoz.sti.edu.ph', '09682349311', 'BLOCK 72 LOT 15 Villa Zaragoza Subd. Brgy. Turo, Bocaue, Bulacan, Philippines', '0000-00-00 00:00:00', 'Active'),
('Stdn000002', 'User000003', 'Yranimez', 'Romano', 'Repil', 'Regular', 'Repil@munoz.sti.edu.ph', '09682349311', 'BLOCK 72 LOT 15 Villa Zaragoza Subd. Brgy. Turo, Bocaue, Bulacan, Philippines', '0000-00-00 00:00:00', 'Active'),
('Stdn000003', 'User000004', 'James Bernard', '', 'Gereña', 'Irregular', 'Gereña@munoz.sti.edu.ph', '', '', '0000-00-00 00:00:00', 'Active'),
('Stdn000004', 'User000006', 'Joy', '', 'Lacadman', 'Irregular', 'Lacadman@munoz.sti.edu.ph', '', '', '0000-00-00 00:00:00', 'Active'),
('Stdn000005', 'User000007', 'Christian Kobe', '', 'Malonzo', 'Irregular', 'Malonzo@munoz.sti.edu.ph', '', '', '2024-03-02 19:05:59', 'Active'),
('Stdn000006', 'User000008', 'Kian', '', 'Dela Cruz', 'Irregular', 'Dela Cruz@munoz.sti.edu.ph', '', '', '2024-03-02 19:06:07', 'Active'),
('Stdn000007', 'User000009', 'Emman Isaac', '', 'Conggas', 'Irregular', 'Conggas@munoz.sti.edu.ph', '', '', '2024-03-02 19:06:24', 'Active'),
('Stdn000008', 'User000010', 'Kyle Carlos', '', 'Agullana', 'Irregular', 'Agullana@munoz.sti.edu.ph', '', '', '2024-03-02 19:06:37', 'Active');

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
  `UserID` varchar(10) NOT NULL,
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

INSERT INTO `tbl_user` (`UserID`, `FirstName`, `LastName`, `Email`, `Password`, `Birthday`, `UserLevel`, `Status`) VALUES
('User000001', '', 'admin', 'admin@munoz.sti.edu.ph', '12345', '2024-03-01', 'Admin', 'Active'),
('User000002', 'Mark', 'Lape', 'Lape@munoz.sti.edu.ph', '123', '2024-03-01', 'Student', 'Active'),
('User000003', 'Yranimez', 'Repil', 'Repil@munoz.sti.edu.ph', '123', '2024-03-01', 'Student', 'Active'),
('User000004', 'James Bernard', 'Gereña', 'Gereña@munoz.sti.edu.ph', '123', '2024-03-01', 'Student', 'Active'),
('User000005', 'Joshua Rhey', 'Oliveros', 'Oliveros@munoz.sti.edu.ph', '123', '2024-03-01', 'Coach', 'Active'),
('User000006', 'Joy', 'Lacadman', 'Lacadman@munoz.sti.edu.ph', '112002', '2002-11-06', 'Student', 'Active'),
('User000007', 'Christian Kobe', 'Malonzo', 'Malonzo@munoz.sti.edu.ph', 'Malonzo112002', '2002-11-18', 'Student', 'Active'),
('User000008', 'Kian', 'Dela Cruz', 'Dela Cruz@munoz.sti.edu.ph', 'Dela Cruz112002', '2002-11-18', 'Student', 'Active'),
('User000009', 'Emman Isaac', 'Conggas', 'Conggas@munoz.sti.edu.ph', 'Conggas112002', '2002-11-18', 'Student', 'Active'),
('User000010', 'Kyle Carlos', 'Agullana', 'Agullana@munoz.sti.edu.ph', 'Agullana112002', '2002-11-18', 'Student', 'Active'),
('User000011', 'John Rexon', 'Insigne', 'Insigne@munoz.sti.edu.ph', 'Insigne112002', '2002-11-18', 'Coach', 'Active'),
('User000012', 'Jesca', 'Velasco', 'Velasco@munoz.sti.edu.ph', 'Velasco112002', '2002-11-18', 'Coach', 'Active'),
('User000013', 'Edmar', 'Umpad', 'Umpad@munoz.sti.edu.ph', 'Umpad112002', '2002-11-18', 'Coach', 'Active'),
('User000014', 'Eddie Wilson', 'Broqueza', 'Broqueza@munoz.sti.edu.ph', 'Broqueza112002', '2002-11-18', 'Coach', 'Active'),
('User000015', 'RG', 'Alberto', 'Alberto@munoz.sti.edu.ph', 'Alberto112002', '2002-11-18', 'Coach', 'Active'),
('User000016', 'Micheal', 'Qiuambao', 'Qiuambao@munoz.sti.edu.ph', 'Qiuambao112002', '2002-11-18', 'Coach', 'Active'),
('User000017', 'Aiman', 'Lazaro', 'Lazaro@munoz.sti.edu.ph', 'Lazaro112002', '2002-11-18', 'Coach', 'Active'),
('User000018', 'Cristylen', 'Esporsado', 'Esporsado@munoz.sti.edu.ph', 'Esporsado112002', '2002-11-18', 'Coach', 'Active'),
('User000019', 'Josue Demdem', 'Lacudine', 'Lacudine@munoz.sti.edu.ph', 'Lacudine112002', '2002-11-18', 'Coach', 'Active'),
('User000020', 'Jomar', 'Manlapaz', 'Manlapaz@munoz.sti.edu.ph', 'Manlapaz112002', '2002-11-18', 'Coach', 'Active');

--
-- Triggers `tbl_user`
--
DELIMITER $$
CREATE TRIGGER `Set_User_Details` AFTER INSERT ON `tbl_user` FOR EACH ROW BEGIN
    IF NEW.UserLevel = 'Student' THEN
        INSERT INTO tbl_student (FirstName, LastName, Email, UserID)
        VALUES (NEW.FirstName, NEW.LastName, NEW.Email, New.UserID);
    END IF;
    
    IF New.UserLevel = 'Coach' THEN
    	INSERT INTO tbl_facultymember (FirstName, LastName, Email, UserID)
        VALUES (NEW.FirstName, NEW.LastName, NEW.Email, New.UserID);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `User_Email` BEFORE INSERT ON `tbl_user` FOR EACH ROW BEGIN
    SET New.Email = CONCAT(New.LastName, "@munoz.sti.edu.ph");
    SET New.Password = CONCAT(New.LastName, EXTRACT(MONTH FROM New.Birthday), EXTRACT(YEAR FROM New.Birthday));
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
  ADD KEY `UserID` (`UserID`);

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
  ADD PRIMARY KEY (`StudentID`),
  ADD KEY `UserID` (`UserID`);

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
-- Constraints for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD CONSTRAINT `tbl_student_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tbl_user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
