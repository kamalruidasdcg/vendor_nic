-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2024 at 11:47 AM
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
-- Table structure for table `zbtsm_st`
--

CREATE TABLE `zbtsm_st` (
  `id` int(11) NOT NULL,
  `zbtno` varchar(11) DEFAULT NULL COMMENT 'Bill Tracking Number',
  `srno` varchar(2) DEFAULT NULL COMMENT 'Serial No',
  `manno` int(8) DEFAULT NULL COMMENT 'GRSE MAN NO',
  `zsection` varchar(1) DEFAULT NULL COMMENT 'GRSE BTS SECTION',
  `rmk` varchar(140) DEFAULT NULL COMMENT 'Remarks',
  `erdat` date DEFAULT NULL COMMENT 'Date on Which Record Was Created',
  `erzet` time DEFAULT NULL COMMENT 'Entry time',
  `ernam` varchar(12) DEFAULT NULL COMMENT 'Name of Person Responsible for Creating the Object',
  `dretseq` varchar(1) DEFAULT NULL COMMENT 'Department Return Sequence',
  `alert_status` varchar(1) DEFAULT NULL COMMENT 'BTS Email Alert Status'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zbtsm_st`
--
ALTER TABLE `zbtsm_st`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `zbtsm_st`
--
ALTER TABLE `zbtsm_st`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
