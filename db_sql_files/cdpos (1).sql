-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2024 at 11:54 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grse_btn`
--

-- --------------------------------------------------------

--
-- Table structure for table `cdpos`
--

CREATE TABLE `cdpos` (
  `C_PKEY` text NOT NULL,
  `objectclas` varchar(15) DEFAULT NULL COMMENT 'Object class',
  `objectid` varchar(90) DEFAULT NULL COMMENT 'Object value',
  `changenr` varchar(10) DEFAULT NULL COMMENT 'Document change number',
  `tabname` varchar(30) DEFAULT NULL COMMENT 'Table Name',
  `tabkey` varchar(70) DEFAULT NULL COMMENT 'Changed table record key',
  `fname` varchar(30) DEFAULT NULL COMMENT 'Field Name',
  `chngind` varchar(1) DEFAULT NULL COMMENT 'Change Type (U, I, S, D)',
  `text_case` varchar(1) DEFAULT NULL COMMENT 'Flag: X=Text change',
  `unit_old` varchar(3) DEFAULT NULL COMMENT 'Change documents, unit referenced',
  `unit_new` varchar(3) DEFAULT NULL COMMENT 'Change documents, unit referenced',
  `cuky_old` varchar(5) DEFAULT NULL COMMENT 'Change documents, referenced currency',
  `cuky_new` varchar(5) DEFAULT NULL COMMENT 'Change documents, referenced currency',
  `value_new` varchar(254) DEFAULT NULL COMMENT 'New contents of changed field',
  `value_old` varchar(254) DEFAULT NULL COMMENT 'Old contents of changed field',
  `_dataaging` date DEFAULT NULL COMMENT 'Data Filter Value for Data Aging'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
