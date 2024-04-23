-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2024 at 11:45 AM
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
-- Table structure for table `zbts_st`
--

CREATE TABLE `zbts_st` (
  `id` int(11) NOT NULL,
  `zbtno` varchar(11) DEFAULT NULL COMMENT 'Bill Tracking Number',
  `rerdat` date DEFAULT NULL COMMENT 'Registration Created On',
  `rerzet` time DEFAULT NULL COMMENT 'Registration Entry time',
  `rernam` varchar(12) DEFAULT NULL COMMENT 'Registration: Name of Person Who Created the Object',
  `rlaeda` date DEFAULT NULL COMMENT 'Registration Date of Last Change',
  `rctime` time DEFAULT NULL COMMENT 'Registration Time of Last Change',
  `raenam` varchar(12) DEFAULT NULL COMMENT 'Registration Name of person who changed object',
  `lifnr` varchar(10) DEFAULT NULL COMMENT 'Account Number of Supplier',
  `zvbno` varchar(40) DEFAULT NULL COMMENT 'Vendor Bill Number',
  `ven_bill_date` date DEFAULT NULL COMMENT 'Vendor Bill Date',
  `ebeln` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `dpernr1` int(8) DEFAULT NULL COMMENT 'Department MAN No',
  `drerdat1` date DEFAULT NULL COMMENT 'Department Receive Created on',
  `drerzet1` time DEFAULT NULL COMMENT 'Department Received Entry Time',
  `drernam1` varchar(12) DEFAULT NULL COMMENT 'Department Received Person who Created the object',
  `dpernr2` int(8) DEFAULT NULL COMMENT 'Previous Department MAN No',
  `drerdat2` date DEFAULT NULL COMMENT 'Previous Department Received Created on',
  `drerzet2` time DEFAULT NULL COMMENT 'Previous Department Received Entry Time',
  `drernam2` varchar(12) DEFAULT NULL COMMENT 'Previous Department Received Person who created object',
  `daerdat` date DEFAULT NULL COMMENT 'Department Approval Created On',
  `daerzet` time DEFAULT NULL COMMENT 'Department Approval Entry Time',
  `daernam` varchar(12) DEFAULT NULL COMMENT 'Department Approval Name of Person Who Created the Object',
  `dalaeda` date DEFAULT NULL COMMENT 'Department Approval Date of Last Change',
  `daaenam` varchar(12) DEFAULT NULL COMMENT 'Department Approval Name of person who changed object',
  `deerdat` date DEFAULT NULL COMMENT 'Department Rejected On',
  `deerzet` time DEFAULT NULL COMMENT 'Department Rejected Entry Time',
  `deernam` varchar(12) DEFAULT NULL COMMENT 'Department Rejected Name of Person Who Created the Object',
  `delaeda` date DEFAULT NULL COMMENT 'Department Rejected Date of Last Change',
  `deaenam` varchar(12) DEFAULT NULL COMMENT 'Department Rejected Name of person who changed object',
  `dferdat` date DEFAULT NULL COMMENT 'Department Forward Created On',
  `dferzet` time DEFAULT NULL COMMENT 'Department Forward Entry Time',
  `dfernam` varchar(12) DEFAULT NULL COMMENT 'Department Forward Name of Person Who Created the Object',
  `dflaeda` date DEFAULT NULL COMMENT 'Dept Forward Date of Last Change',
  `dfaenam` varchar(12) DEFAULT NULL COMMENT 'Department Forward Name of person who changed object',
  `zrmk1` varchar(140) DEFAULT NULL COMMENT 'Remarks of Vendor Bill Registration',
  `dstatus` varchar(1) DEFAULT NULL COMMENT 'Department Status',
  `fpernr1` int(8) DEFAULT NULL COMMENT 'Forwarded Finance MAN No',
  `zrmk2` varchar(140) DEFAULT NULL COMMENT 'Remarks of Department',
  `fpernr2` int(8) DEFAULT NULL COMMENT 'Forwarded Banking Section MAN No',
  `zdcomment` varchar(255) DEFAULT NULL COMMENT 'Department Comment',
  `zrmk3` varchar(140) DEFAULT NULL COMMENT 'Remarks of Finance Dept',
  `zrmk4` varchar(140) DEFAULT NULL COMMENT 'Remarks of Banking Section',
  `zfcomment` varchar(255) DEFAULT NULL COMMENT 'Finance Dept Comments',
  `fstatus` varchar(1) DEFAULT NULL COMMENT 'Finance Status',
  `bstatus` varchar(1) DEFAULT NULL COMMENT 'Banking Section Status',
  `unitno` varchar(4) DEFAULT NULL COMMENT 'GRSE Unit Number',
  `comno` varchar(3) DEFAULT NULL COMMENT 'Computer No per Plant',
  `frerdat` date DEFAULT NULL COMMENT 'Finance Receive Created On',
  `frerzet` time DEFAULT NULL COMMENT 'Finance Receive Entry Time',
  `frernam` varchar(12) DEFAULT NULL COMMENT 'Finance Receive Name of Person Who Created the Object',
  `frlaeda` date DEFAULT NULL COMMENT 'Finance Receive Date of Last Change',
  `fraenam` varchar(12) DEFAULT NULL COMMENT 'Finance Receive Name of person who changed object',
  `faerdat` date DEFAULT NULL COMMENT 'Finance Approval Created On',
  `faerzet` time DEFAULT NULL COMMENT 'Finance Approval Entry Time',
  `faernam` varchar(12) DEFAULT NULL COMMENT 'Finance Approval Name of Person Who Created the Object',
  `falaeda` date DEFAULT NULL COMMENT 'Finance Approval Date of Last Change',
  `faaenam` varchar(12) DEFAULT NULL COMMENT 'Finance Approval Name of person who changed object',
  `feerdat` date DEFAULT NULL COMMENT 'Finance Rejected On',
  `feerzet` time DEFAULT NULL COMMENT 'Finance Rejected Time',
  `feernam` varchar(12) DEFAULT NULL COMMENT 'Finance Rejected Name of Person Who Created the Object',
  `felaeda` date DEFAULT NULL COMMENT 'Finance Rejected Date of Last Change',
  `feaenam` varchar(12) DEFAULT NULL COMMENT 'Finance Rejected Name of person who changed object',
  `fperdat` date DEFAULT NULL COMMENT 'Finance Forward Created On',
  `fperzet` time DEFAULT NULL COMMENT 'Finance Forward Entry Time',
  `fpernam` varchar(12) DEFAULT NULL COMMENT 'Finance Forward Name of Person Who Created the Object',
  `fplaeda` date DEFAULT NULL COMMENT 'Finance Forward Date of Last Change',
  `fpaenam` varchar(12) DEFAULT NULL COMMENT 'Finance Payment Name of person who changed object',
  `bperdat` date DEFAULT NULL COMMENT 'Banking Section Payment Created on',
  `bperzet` time DEFAULT NULL COMMENT 'Banking Section Payment Entry Time',
  `bpernam` varchar(12) DEFAULT NULL COMMENT 'Banking Section Payment who created the object',
  `bplaeda` date DEFAULT NULL COMMENT 'Banking Section Payment Date of Last Change',
  `bpaenam` varchar(12) DEFAULT NULL COMMENT 'Banking Section Payment Changed Person',
  `hold` varchar(1) DEFAULT NULL COMMENT 'BTS Hold',
  `alert_gm` varchar(1) DEFAULT NULL COMMENT 'Alert Status GM',
  `alert_dir` varchar(1) DEFAULT NULL COMMENT 'Alert Status DIR',
  `alert_agm_dgm` varchar(1) DEFAULT NULL COMMENT 'Alert Status AGM / DGM'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zbts_st`
--
ALTER TABLE `zbts_st`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `zbts_st`
--
ALTER TABLE `zbts_st`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
