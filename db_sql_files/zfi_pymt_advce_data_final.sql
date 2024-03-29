-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2024 at 08:58 AM
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
-- Table structure for table `zfi_pymt_advce_data_final`
--

CREATE TABLE `zfi_pymt_advce_data_final` (
  `id` int(11) NOT NULL,
  `zlsch` varchar(1) DEFAULT NULL COMMENT 'Payment Method',
  `bldat` date DEFAULT NULL COMMENT 'Document Date in Document',
  `chect` varchar(13) DEFAULT NULL COMMENT 'Check number',
  `hbkid` varchar(5) DEFAULT NULL COMMENT 'Short Key for a House Bank',
  `pridt` date DEFAULT NULL COMMENT 'Print Date',
  `lifnr` varchar(10) DEFAULT NULL COMMENT 'Account Number of Supplier',
  `adrnr` varchar(10) DEFAULT NULL COMMENT 'Address',
  `bank_desc` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `pay_type` varchar(15) DEFAULT NULL COMMENT 'Char 15',
  `vblnr` varchar(10) DEFAULT NULL COMMENT 'Document Number of the Payment Document'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zfi_pymt_advce_data_final`
--

INSERT INTO `zfi_pymt_advce_data_final` (`id`, `zlsch`, `bldat`, `chect`, `hbkid`, `pridt`, `lifnr`, `adrnr`, `bank_desc`, `pay_type`, `vblnr`) VALUES
(1, 't', '2024-03-22', 't', '', NULL, '', '', '', '', ''),
(2, 't', '2024-03-22', 't', '', NULL, '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zfi_pymt_advce_data_final`
--
ALTER TABLE `zfi_pymt_advce_data_final`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `zfi_pymt_advce_data_final`
--
ALTER TABLE `zfi_pymt_advce_data_final`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
