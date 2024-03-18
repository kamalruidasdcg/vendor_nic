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
-- Table structure for table `zmm_gate_entry_h`
--

CREATE TABLE `zmm_gate_entry_h` (
  `C_PKEY` varchar(20) NOT NULL,
  `ENTRY_NO` varchar(13) NOT NULL COMMENT 'Gate Entry Number',
  `W_YEAR` int(4) DEFAULT NULL COMMENT 'Fiscal Year',
  `ENTRY_DATE` date DEFAULT NULL COMMENT 'Gate Entry No. Date',
  `ENTRY_TIME` time DEFAULT NULL COMMENT 'Time of gate entry document',
  `CHALAN_NO` varchar(40) DEFAULT NULL COMMENT 'Chalan number',
  `CHALAN_DATE` date DEFAULT NULL COMMENT 'Challan date',
  `DELIV_NO` varchar(12) DEFAULT NULL COMMENT 'Delivery order no.',
  `DELIV_DATE` date DEFAULT NULL COMMENT 'Delivery order date',
  `TRANS_NO` varchar(10) DEFAULT NULL COMMENT 'Account Number of Supplier',
  `TRAN_NAME` varchar(40) DEFAULT NULL COMMENT 'Transporter vendor name',
  `LR_NO` varchar(20) DEFAULT NULL COMMENT 'L.R. no',
  `LR_DATE` date DEFAULT NULL COMMENT 'L.R. date',
  `EXNUM` varchar(10) DEFAULT NULL COMMENT 'Excise Invoice No.',
  `EXDAT` date DEFAULT NULL COMMENT 'Excise Document Date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zmm_gate_entry_h`
--

INSERT INTO `zmm_gate_entry_h` (`C_PKEY`, `ENTRY_NO`, `W_YEAR`, `ENTRY_DATE`, `ENTRY_TIME`, `CHALAN_NO`, `CHALAN_DATE`, `DELIV_NO`, `DELIV_DATE`, `TRANS_NO`, `TRAN_NAME`, `LR_NO`, `LR_DATE`, `EXNUM`, `EXDAT`) VALUES
('GT121313-2024', 'GT121313', 2024, '2024-03-04', NULL, '3446327339393', '2024-03-04', NULL, NULL, 'WB02AZ9867', 'SMD TRANSPORT', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zmm_gate_entry_h`
--
ALTER TABLE `zmm_gate_entry_h`
  ADD PRIMARY KEY (`C_PKEY`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
