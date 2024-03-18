-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2024 at 10:59 AM
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
-- Table structure for table `zmm_gate_entry_d`
--

CREATE TABLE `zmm_gate_entry_d` (
  `C_PKEY` varchar(36) NOT NULL,
  `ENTRY_NO` varchar(13) NOT NULL COMMENT 'Gate Entry Number',
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document Number',
  `EBELP` int(5) NOT NULL COMMENT 'Item Number of Purchasing Document',
  `W_YEAR` int(4) NOT NULL COMMENT 'Fiscal Year',
  `CH_QTY` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `MATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `TXZ01` varchar(40) DEFAULT NULL COMMENT 'Short Text',
  `GROSS_WT` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `TIER_WT` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `NET_WT` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `CH_NETWT` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `ZQLTYSAMP` varchar(3) DEFAULT NULL COMMENT 'Qlty Sample Taken.',
  `ZUNLOADNO` varchar(10) DEFAULT NULL COMMENT 'Unloading Point',
  `ZSTRLOCTN` varchar(4) DEFAULT NULL COMMENT 'Storage Location',
  `GRWTDT` date DEFAULT NULL COMMENT 'Gate Entry No. Date',
  `GRWTTM` time DEFAULT NULL COMMENT 'Time of gate entry document',
  `TAWTDT` date DEFAULT NULL COMMENT 'Gate Entry No. Date',
  `TAWTTM` time DEFAULT NULL COMMENT 'Time of gate entry document',
  `ZUNLDDT` date DEFAULT NULL COMMENT 'Gate Entry No. Date',
  `ZUNLDTM` time DEFAULT NULL COMMENT 'Time of gate entry document',
  `ZUNLD_IN` varchar(1) DEFAULT NULL COMMENT 'General Flag',
  `ZUNLD_OUT` varchar(1) DEFAULT NULL COMMENT 'General Flag',
  `ZUNLDDT_OUT` date DEFAULT NULL COMMENT 'Gate Entry No. Date',
  `ZUNLDTM_OUT` time DEFAULT NULL COMMENT 'Time of gate entry document',
  `GRWTTERM` varchar(36) DEFAULT NULL COMMENT 'Terminal',
  `TAWTTERM` varchar(36) DEFAULT NULL COMMENT 'Terminal',
  `UNLDTERM` varchar(36) DEFAULT NULL COMMENT 'Terminal',
  `ZLASTDATE` date DEFAULT NULL COMMENT 'Gate Entry No. Date',
  `ZLASTTERM` varchar(36) DEFAULT NULL COMMENT 'Terminal',
  `ZUSNAME` varchar(12) DEFAULT NULL COMMENT 'User Name in User Master Record',
  `ZREASON` varchar(40) DEFAULT NULL COMMENT 'Reason for Modification',
  `MIGOSTATUS` varchar(1) DEFAULT NULL COMMENT 'Single-Character Flag',
  `STATUS` varchar(15) DEFAULT NULL COMMENT 'Char 15',
  `TUNAME` varchar(30) DEFAULT NULL COMMENT 'Name of user within the company',
  `GUNAME` varchar(30) DEFAULT NULL COMMENT 'Name of user within the company',
  `MBLNR` varchar(10) DEFAULT NULL COMMENT 'Number of Material Document',
  `VBELN_D` varchar(10) DEFAULT NULL COMMENT 'Delivery',
  `FLG` varchar(1) DEFAULT NULL COMMENT 'General Flag',
  `BATCH` varchar(5) DEFAULT NULL COMMENT 'Batch Flag',
  `MENGE_OPEN` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `RECV_FLG` varchar(1) DEFAULT NULL COMMENT 'General Flag',
  `LAST_RECV` varchar(1) DEFAULT NULL COMMENT 'Last Unloaded item',
  `WERKS` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `UNUSER` varchar(30) DEFAULT NULL COMMENT 'Name of user within the company',
  `ZTCODE` varchar(20) DEFAULT NULL COMMENT 'Transaction Code',
  `UTYPE` varchar(10) DEFAULT NULL COMMENT 'Tare User Type',
  `MIGOSTAT` varchar(10) DEFAULT NULL COMMENT 'Migo Status',
  `TKNO` varchar(6) DEFAULT NULL COMMENT 'Tare KantaNo',
  `GKNO` varchar(6) DEFAULT NULL COMMENT 'Gross KantaNo',
  `RSREM` varchar(40) DEFAULT NULL COMMENT 'Remarks',
  `RSUSER` varchar(30) DEFAULT NULL COMMENT 'Name of user within the company',
  `GUTYPE` varchar(10) DEFAULT NULL COMMENT 'Gross User Type',
  `HOLDID` varchar(10) DEFAULT NULL COMMENT 'Hold Ref Number',
  `PRCH_QTY` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `ZRMK1` varchar(40) DEFAULT NULL COMMENT 'Remarks',
  `MJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `RSTNO` varchar(10) DEFAULT NULL COMMENT 'RST NO',
  `UNCLEARED_QTY` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `ZMBLNR` varchar(10) DEFAULT NULL COMMENT 'Number of Material Document',
  `VBELN` varchar(10) DEFAULT NULL COMMENT 'Delivery',
  `POSNR` int(6) DEFAULT NULL COMMENT 'Delivery Item',
  `ZMJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `ZEILE` int(4) DEFAULT NULL COMMENT 'Item in Material Document'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zmm_gate_entry_d`
--
ALTER TABLE `zmm_gate_entry_d`
  ADD PRIMARY KEY (`C_PKEY`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
