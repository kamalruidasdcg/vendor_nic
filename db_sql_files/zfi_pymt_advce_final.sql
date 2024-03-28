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
-- Table structure for table `zfi_pymt_advce_final`
--

CREATE TABLE `zfi_pymt_advce_final` (
  `id` int(11) NOT NULL,
  `sgtxt` varchar(50) DEFAULT NULL COMMENT 'Item Text',
  `belnr` varchar(10) DEFAULT NULL COMMENT 'Document Number of an Accounting Document',
  `gross` varchar(13) DEFAULT NULL COMMENT 'Amount in document currency',
  `retention` varchar(13) DEFAULT NULL COMMENT 'Amount in document currency',
  `tds` varchar(13) DEFAULT NULL COMMENT 'Amount in document currency',
  `net` varchar(13) DEFAULT NULL COMMENT 'Amount in document currency',
  `augbl` varchar(10) DEFAULT NULL COMMENT 'Document Number of the Clearing Document',
  `line_amt` varchar(13) DEFAULT NULL COMMENT 'Amount in document currency',
  `row2` varchar(1) DEFAULT NULL COMMENT 'Single-Character Flag',
  `vblnr` varchar(10) DEFAULT NULL COMMENT 'Document Number of the Payment Document'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zfi_pymt_advce_final`
--

INSERT INTO `zfi_pymt_advce_final` (`id`, `sgtxt`, `belnr`, `gross`, `retention`, `tds`, `net`, `augbl`, `line_amt`, `row2`, `vblnr`) VALUES
(1, '1', 'b', '', '', '', '', '', '', '', ''),
(2, '2', 'c', '', '', '', '', '', '', '', ''),
(3, '1', 'b', '5272', '', '', '', '', '', '', ''),
(4, '2', 'c', '', '', '', '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zfi_pymt_advce_final`
--
ALTER TABLE `zfi_pymt_advce_final`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `zfi_pymt_advce_final`
--
ALTER TABLE `zfi_pymt_advce_final`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
