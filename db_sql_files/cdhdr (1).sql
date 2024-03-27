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
-- Table structure for table `cdhdr`
--

CREATE TABLE `cdhdr` (
  `C_PKEY` text NOT NULL,
  `objectclas` varchar(15) DEFAULT NULL COMMENT 'Object class',
  `objectid` varchar(90) DEFAULT NULL COMMENT 'Object Value',
  `changenr` varchar(10) DEFAULT NULL COMMENT 'Change Number of Document',
  `username` varchar(12) DEFAULT NULL COMMENT 'User Name of Person Making Change in Change Document',
  `udate` date DEFAULT NULL COMMENT 'Creation date of the change document',
  `utime` time DEFAULT NULL COMMENT 'Time changed',
  `tcode` varchar(20) DEFAULT NULL COMMENT 'Transaction in which a change was made',
  `planchngnr` varchar(12) DEFAULT NULL COMMENT 'Planned change number',
  `act_chngno` varchar(10) DEFAULT NULL COMMENT 'Change number of the document created by this change',
  `was_plannd` varchar(1) DEFAULT NULL COMMENT 'Flag: Change created from planned changes',
  `change_ind` varchar(1) DEFAULT NULL COMMENT 'Application object change type (U, I, E, D)',
  `langu` varchar(1) DEFAULT NULL COMMENT 'Language Key',
  `version` varchar(3) DEFAULT NULL COMMENT '3-Byte field',
  `_dataaging` date DEFAULT NULL COMMENT 'Data Filter Value for Data Aging'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
