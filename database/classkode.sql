-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2024 at 05:05 PM
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
-- Database: `classkode`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_year`
--

CREATE TABLE `academic_year` (
  `Academic_Year_ID` varchar(12) NOT NULL,
  `Academic_Year` varchar(255) NOT NULL,
  `Start` varchar(255) NOT NULL,
  `End` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academic_year`
--

INSERT INTO `academic_year` (`Academic_Year_ID`, `Academic_Year`, `Start`, `End`) VALUES
('AY2324', 'A.Y. 2023-2024', 'September 14', 'January 20'),
('AY2425', 'A.Y. 2024-2025', 'Septermber 14', 'January 20');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `Course_ID` int(11) NOT NULL,
  `Course_Name` varchar(255) NOT NULL,
  `Program_ID` varchar(12) NOT NULL,
  `Level` enum('First Year','Second Year','Third Year','Fourth Year') NOT NULL,
  `Term` enum('First Term','Second Term','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `Program_ID` varchar(12) NOT NULL,
  `Program_Name` varchar(255) NOT NULL,
  `Program_Category` enum('Information & Communications Technology','Arts & Sciences','Business & Management','Hospitality Management','Tourism Management') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`Program_ID`, `Program_Name`, `Program_Category`) VALUES
('INF-CS-001', 'Bachelor of Science in Computer Science', 'Information & Communications Technology');

--
-- Triggers `program`
--
DELIMITER $$
CREATE TRIGGER `Program_ID` BEFORE INSERT ON `program` FOR EACH ROW BEGIN
    DECLARE in_position INT;
    DECLARE first_word_letter VARCHAR(1);
    DECLARE last_word_first_letter VARCHAR(1);

    SET in_position = LOCATE('in', NEW.Program_Name);
    IF in_position > 0 THEN
        SET first_word_letter = SUBSTRING(NEW.Program_Name, in_position + 3, 1);  -- Get first letter of word after 'in'
    ELSE
        SET first_word_letter = SUBSTRING(NEW.Program_Name, 1, 1);  -- If there is no 'in', gets the first letter of the first word
    END IF;

    SET last_word_first_letter = LEFT(SUBSTRING_INDEX(NEW.Program_Name, ' ', -1), 1);  -- Gets first letter of last word

    SET NEW.Program_ID = CONCAT(
        				 UPPER(LEFT(NEW.Program_Category, 3)), '-',
        					first_word_letter, last_word_first_letter, '-',
        				 LPAD(COALESCE((SELECT COUNT(*) + 1
                       		FROM program
                       		WHERE Program_Category = NEW.Program_Category), 1), 3, '0')  -- Increment based on total courses in category
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `Section_ID` varchar(20) NOT NULL,
  `Program_ID` varchar(12) NOT NULL,
  `Term` enum('First Term','Second Term','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`Section_ID`, `Program_ID`, `Term`) VALUES
('BS101', 'INF-CS-001', 'First Term');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `User_ID` varchar(12) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`User_ID`, `Name`, `Email`, `Password`) VALUES
('User00000001', 'Mark', 'lapemark11@gmail.com', '12345');

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `User_ID` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
    SET NEW.User_ID = CONCAT(
        				 'User',
        				 LPAD(COALESCE((SELECT COUNT(*) + 1
                       		FROM user
                       		WHERE User_ID = NEW.User_ID), 1), 8, '0')  -- Increment based on total courses in category
    );
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`Course_ID`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`Program_ID`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`Section_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `Course_ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
