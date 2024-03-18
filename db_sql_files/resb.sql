-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2024 at 11:16 AM
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
-- Table structure for table `resb`
--

CREATE TABLE `resb` (
  `C_PKEY` varchar(20) NOT NULL,
  `RSNUM` int(10) DEFAULT NULL COMMENT 'Number of reservation/dependent requirements',
  `RSPOS` int(4) DEFAULT NULL COMMENT 'Item Number of Reservation / Dependent Requirements',
  `RSART` varchar(1) NOT NULL COMMENT 'Record type',
  `BDART` varchar(2) DEFAULT NULL COMMENT 'Requirement type',
  `RSSTA` varchar(1) DEFAULT NULL COMMENT 'Status of reservation',
  `KZEAR` varchar(1) DEFAULT NULL COMMENT 'Final Issue for Reservation',
  `MATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `WERKS` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `LGORT` varchar(4) DEFAULT NULL COMMENT 'Storage Location',
  `CHARG` varchar(10) DEFAULT NULL COMMENT 'Batch Number',
  `BDMNG` decimal(13,3) DEFAULT NULL COMMENT 'Requirement Quantity',
  `MEINS` varchar(3) DEFAULT NULL COMMENT 'Base Unit of Measure',
  `ENMNG` decimal(13,3) DEFAULT NULL COMMENT 'Quantity withdrawn',
  `BWART` varchar(3) DEFAULT NULL COMMENT 'Movement Type (Inventory Management)',
  `ERFMG` decimal(13,3) DEFAULT NULL COMMENT 'Quantity in Unit of Entry',
  `XWAOK` varchar(1) DEFAULT NULL COMMENT 'Goods Movement for Reservation Allowed',
  `XLOEK` varchar(1) DEFAULT NULL COMMENT '	Item is Deleted',
  `PSPEL` int(8) DEFAULT NULL COMMENT 'WBS Element',
  `BDTER` date DEFAULT NULL COMMENT 'Requirement Date for the Component'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `resb`
--
ALTER TABLE `resb`
  ADD PRIMARY KEY (`C_PKEY`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
