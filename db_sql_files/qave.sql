-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2024 at 06:58 AM
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
-- Database: `grse_btn2`
--

-- --------------------------------------------------------

--
-- Table structure for table `qave`
--

CREATE TABLE `qave` (
  `c_pkey` varchar(25) NOT NULL,
  `prueflos` bigint(12) DEFAULT NULL COMMENT 'Inspection Lot Number',
  `kzart` varchar(1) DEFAULT NULL COMMENT 'Inspection Lot, Partial Lot, Single Unit, Interval',
  `zaehler` varchar(6) DEFAULT NULL COMMENT 'Counter for Usage Decision',
  `vkatart` varchar(1) DEFAULT NULL COMMENT 'Catalog',
  `vwerks` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `vauswahlmg` varchar(8) DEFAULT NULL COMMENT 'Selected Set of the Usage Decision',
  `vcodegrp` varchar(8) DEFAULT NULL COMMENT 'Code Group of the Usage Decision',
  `vcode` varchar(4) DEFAULT NULL COMMENT 'Usage Decision Code',
  `versionam` varchar(6) DEFAULT NULL COMMENT 'Version Number of the Selected Set Record',
  `versioncd` varchar(6) DEFAULT NULL COMMENT 'Version Number of the Code Record',
  `vbewertung` varchar(1) DEFAULT NULL COMMENT 'Code Valuation',
  `dbewertung` varchar(1) DEFAULT NULL COMMENT 'Dynamic Modif. Valuation According to Worst Case Principle',
  `vfolgeakti` varchar(8) DEFAULT NULL COMMENT 'Follow-Up Action',
  `qkennzahl` decimal(3,3) DEFAULT NULL COMMENT 'Quality Score',
  `ltextkz` varchar(1) DEFAULT NULL COMMENT 'Long Text for Usage Decision',
  `vname` varchar(12) DEFAULT NULL COMMENT 'Person who Made the Usage Decision',
  `vdatum` date DEFAULT NULL COMMENT 'Date of Code Used for Usage Decision',
  `vezeiterf` time DEFAULT NULL COMMENT 'Time when Usage Decision Was Recorded',
  `vaename` varchar(12) DEFAULT NULL COMMENT 'Person who Changed the Usage Decision',
  `vaedatum` date DEFAULT NULL COMMENT 'Change Date of Usage Decision',
  `vezeitaen` time DEFAULT NULL COMMENT 'Time when Usage Decision Changed',
  `stafo` varchar(6) DEFAULT NULL COMMENT 'Update group for statistics update',
  `teillos` int(6) DEFAULT NULL COMMENT 'Partial lot number',
  `vorglfnr` int(8) DEFAULT NULL COMMENT 'Current Node Number from Order Counter APLZL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qave`
--

INSERT INTO `qave` (`c_pkey`, `prueflos`, `kzart`, `zaehler`, `vkatart`, `vwerks`, `vauswahlmg`, `vcodegrp`, `vcode`, `versionam`, `versioncd`, `vbewertung`, `dbewertung`, `vfolgeakti`, `qkennzahl`, `ltextkz`, `vname`, `vdatum`, `vezeiterf`, `vaename`, `vaedatum`, `vezeitaen`, `stafo`, `teillos`, `vorglfnr`) VALUES
('1000001009-kk-u', 1000001009, 'k', 'u', 'u', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001009-jj-m', 1000001009, 'j', 'm', 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
