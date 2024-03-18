-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2024 at 11:01 AM
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
-- Table structure for table `rkpf`
--

CREATE TABLE `rkpf` (
  `RSNUM` int(10) NOT NULL COMMENT 'Number of reservation/dependent requirements',
  `RSDAT` date DEFAULT NULL COMMENT 'Base date for reservation',
  `USNAM` varchar(12) DEFAULT NULL COMMENT 'User Name',
  `BWART` varchar(3) DEFAULT NULL COMMENT 'Movement Type (Inventory Management)',
  `WEMPF` varchar(12) DEFAULT NULL COMMENT 'Goods recipient',
  `KOSTL` varchar(10) DEFAULT NULL COMMENT 'Cost Center',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchase order number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `UMWRK` varchar(4) DEFAULT NULL COMMENT 'Receiving plant/issuing plant',
  `UMLGO` varchar(4) DEFAULT NULL COMMENT 'Receiving/issuing storage location',
  `PS_PSP_PNR` int(8) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rkpf`
--

INSERT INTO `rkpf` (`RSNUM`, `RSDAT`, `USNAM`, `BWART`, `WEMPF`, `KOSTL`, `EBELN`, `EBELP`, `UMWRK`, `UMLGO`, `PS_PSP_PNR`) VALUES
(345678998, '2024-03-06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rkpf`
--
ALTER TABLE `rkpf`
  ADD PRIMARY KEY (`RSNUM`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
