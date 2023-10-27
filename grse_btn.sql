-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2023 at 12:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

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
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `auth_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(85) NOT NULL,
  `vendor_id` varchar(25) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`auth_id`, `username`, `password`, `name`, `email`, `vendor_id`, `datetime`) VALUES
(1, 'admin', 'admin@213', 'Mrinmoy Ghosh', 'mrinmoygh081@gmail.com', '00000105', '2023-09-12 10:25:51');

-- --------------------------------------------------------

--
-- Table structure for table `billing_officers`
--

CREATE TABLE `billing_officers` (
  `officer_id` varchar(10) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(85) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `billing_officers`
--

INSERT INTO `billing_officers` (`officer_id`, `first_name`, `last_name`, `email`) VALUES
('00006369', 'Jayanta', 'Sarkar', 'aabhinit96@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `bill_registration`
--

CREATE TABLE `bill_registration` (
  `id` int(11) NOT NULL,
  `po` varchar(15) NOT NULL,
  `vendor_id` varchar(25) NOT NULL,
  `invoice` varchar(55) NOT NULL,
  `bill_date` datetime NOT NULL,
  `bill_submitted` varchar(85) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `file_name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `bill_registration`
--

INSERT INTO `bill_registration` (`id`, `po`, `vendor_id`, `invoice`, `bill_date`, `bill_submitted`, `remarks`, `file_name`) VALUES
(56, '210000006', '00000105', 'afsaf', '2023-09-13 18:30:00', 'abhinit96@gmail.com', 'afdsvsadfsdgv', '1694683104557-grsc.jpg'),
(57, '123', '00006007', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', '1694494082388-user.jpg'),
(58, '210000007', '00006007', 'dfdsfdsf', '2023-09-13 18:30:00', 'mrinmoyghosh102@gmail.com', 'fdsvsdvsdv', '1694683519215-images.png'),
(59, '210000006', '00000105', 'sdfadsaf', '2023-09-13 18:30:00', 'mrinmoyghosh102@gmail.com', 'dfcadsfvds', '1694683529526-images.png'),
(60, '123', '00006007', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', '1694494082388-user.jpg'),
(61, '210000006', '00000105', 'test', '2023-09-13 18:30:00', 'mrinmoyghosh102@gmail.com', 'efwf', '1694683577254-images.png'),
(62, '123', '00006007', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', '1694494082388-user.jpg'),
(63, '123', '00006007', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', '1694494082388-user.jpg'),
(64, '210000006', '00000105', 'INV001', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'TEST1', '1694684134354-images.png'),
(65, '210000006', '00000105', 'INV0ICE2345', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'ABHINKIT', 'null'),
(66, '210000006', '00000105', 'ABHINI234678', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'RWST', 'null'),
(67, '210000006', '00000105', 'ABHINI234456789', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'swqdwqd', '1694685873751-images.png'),
(68, '210000006', '00000105', 'cvcxf', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'vbxbxb', '1694685879280-images.png'),
(69, '210000006', '00000105', 'ABHINI234zdfvds', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'fgttyyyy', '1694686066056-images.png');

-- --------------------------------------------------------

--
-- Table structure for table `po`
--

CREATE TABLE `po` (
  `po_id` varchar(10) NOT NULL,
  `vendor_id` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `po`
--

INSERT INTO `po` (`po_id`, `vendor_id`) VALUES
('210000006', '00000105'),
('210000007', '00006007');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendor_id` varchar(25) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(86) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`vendor_id`, `first_name`, `last_name`, `email`) VALUES
('00000105', 'Mrinmoy', 'Ghosh', 'mrinmoygh081@gmail.com'),
('00006007', 'Abhinit', 'Anand', 'abhinit.anand@datacoresystems.co.in');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`auth_id`);

--
-- Indexes for table `billing_officers`
--
ALTER TABLE `billing_officers`
  ADD PRIMARY KEY (`officer_id`);

--
-- Indexes for table `bill_registration`
--
ALTER TABLE `bill_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `po`
--
ALTER TABLE `po`
  ADD PRIMARY KEY (`po_id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bill_registration`
--
ALTER TABLE `bill_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;




-- --------------------------------------------------------

--
-- Table structure for table `ZBTSM`
--




CREATE TABLE `grse_btn`.`zbtsm` (`MANTD` VARCHAR(3) NOT NULL , `ZBTNO` VARCHAR(11) NOT NULL , `SRNO` VARCHAR(2) NOT NULL , `MANNO` INT(8) NOT NULL , `ZSECTION` VARCHAR(1) NOT NULL , `RMK` VARCHAR(140) NOT NULL , `ERDAT` DATE NOT NULL , `ERZET` TIME(6) NOT NULL , `ERNAM` VARCHAR(12) NOT NULL , `DRETSEQ` VARCHAR(10) NOT NULL , `ALERT_STATUS` VARCHAR(1) NOT NULL , PRIMARY KEY (`ZBTNO`(11)), UNIQUE (`SRNO`)) ENGINE = InnoDB COMMENT = 'ZBTSM table (SAP TABLE COPY)';


CREATE TABLE `grse_btn`.`ekko` (`EBELN` VARCHAR(10) NOT NULL COMMENT 'Purchasing Document Number' , `BUKRS` VARCHAR(4) NOT NULL COMMENT 'Company Code' , `BSTYP` VARCHAR(1) NOT NULL COMMENT 'Purchasing Document Category' , `BSART` VARCHAR(4) NOT NULL COMMENT 'Purchasing Document Type' , `LOEKZ` VARCHAR(1) NOT NULL COMMENT ' Deletion Indicator in Purchasing Document' , `AEDAT` DATE NOT NULL COMMENT ' Date on Which Record Was Created' , `LIFNR` VARCHAR(10) NOT NULL COMMENT 'Vendor Account Number' , `EKORG` VARCHAR(4) NOT NULL COMMENT 'Purchasing Organization' ) ENGINE = InnoDB COMMENT = 'Purchasing Document Header';


CREATE TABLE `grse_btn`.`zbtsi` (`ZBTNO` VARCHAR(11) NOT NULL COMMENT 'Bill Tracking Number' , `ZGRNO` VARCHAR(2) NOT NULL COMMENT 'Vendor BTS GR or Service No' , `ZIVNO` VARCHAR(2) NOT NULL COMMENT ' Vendor BTS Invoice Verification No' , `BELNR` VARCHAR(10) NOT NULL COMMENT 'Document Number of an Invoice Document' , `GJAHR` INT(4) NOT NULL COMMENT 'Fiscal Year' , `AUGBL` VARCHAR(10) NOT NULL COMMENT 'Document Number of the Clearing Document' , PRIMARY KEY (`ZBTNO`), UNIQUE (`ZGRNO`)) ENGINE = InnoDB COMMENT = 'Not Used Vendor Bill Tracking MIRO and Invoice Verification';
CREATE TABLE `grse_btn`.`zbtsd` (`SRNO` VARCHAR(2) NOT NULL COMMENT 'Serial No' , `MANNO` INT(8) NOT NULL COMMENT 'GRSE MAN NO' ) ENGINE = InnoDB;
CREATE TABLE `grse_btn`.`pa0000` (`PERNR` INT(8) NOT NULL COMMENT 'Key for HR Master Data' , `SUBTY` VARCHAR(4) NOT NULL COMMENT 'Subtype' , `OBJPS` VARCHAR(2) NOT NULL COMMENT 'Object Identification' , `SPRPS` VARCHAR(1) NOT NULL COMMENT 'Lock Indicator for HR Master Data Record' , `ENDDA` DATE NOT NULL COMMENT 'Start Date' , `BEGDA` DATE NOT NULL COMMENT 'End Date' , `SEQNR` INT(3) NOT NULL COMMENT 'Number of Infotype Record With Same Key' , `AEDTM` DATE NOT NULL COMMENT 'Changed On' , `UNAME` VARCHAR(12) NOT NULL COMMENT 'Name of Person Who Changed Object' , `MASSN` VARCHAR(2) NOT NULL COMMENT 'Action Type' , `MASSG` VARCHAR(2) NOT NULL COMMENT 'Reason for Action' , `STAT1` VARCHAR(1) NOT NULL COMMENT 'Customer-Specific Status' , `STAT2` VARCHAR(1) NOT NULL COMMENT 'Employment Status' , `STAT3` VARCHAR(1) NOT NULL COMMENT 'Special Payment Status' ) ENGINE = InnoDB COMMENT = 'HR Master Record: Infotype 0000 (Actions)';
CREATE TABLE `grse_btn`.`pa0105` (`PERNR` INT(8) NOT NULL COMMENT 'Personnel Number' , `SUBTY` VARCHAR(4) NOT NULL COMMENT 'Subtype' , `OBJPS` VARCHAR(2) NOT NULL COMMENT 'Object Identification' , `SPRPS` VARCHAR(1) NOT NULL COMMENT 'Lock Indicator for HR Master Data Record' , `ENDDA` DATE NOT NULL COMMENT 'End Date' , `BEGDA` DATE NOT NULL COMMENT 'Start Date' , `SEQNR` INT(3) NOT NULL COMMENT 'Number of Infotype Record with Same Key' , `AEDTM` DATE NOT NULL COMMENT 'Changed On' , `UNAME` VARCHAR(12) NOT NULL COMMENT 'Name of Person Who Changed Object' , `USRTY` VARCHAR(4) NOT NULL COMMENT 'Communication Type' , `USRID` VARCHAR(30) NOT NULL COMMENT 'Communication ID/Number' , `USRID_LONG` VARCHAR(241) NOT NULL COMMENT 'Communication: Long\r\n Identification/Number' ) ENGINE = InnoDB COMMENT = 'HR Master Record: Infotype 0105 (Communications)';
CREATE TABLE `grse_btn`.`pa0002` (`PERNR` INT(8) NOT NULL COMMENT 'Personnel Number' , `SUBTY` VARCHAR(4) NOT NULL COMMENT 'Subtype' , `OBJPS` VARCHAR(2) NOT NULL COMMENT 'Object\r\n Identification' , `SPRPS` VARCHAR(1) NOT NULL COMMENT 'Lock Indicator for\r\n HR Master Data\r\n Record' , `ENDDA` DATE NOT NULL COMMENT 'End Date' , `BEGDA` DATE NOT NULL COMMENT 'Start Date' , `SEQNR` INT(3) NOT NULL COMMENT 'Number of Infotype\r\n Record with Same\r\n Key' , `AEDTM` DATE NOT NULL COMMENT 'Changed On' , `UNAME` VARCHAR(12) NOT NULL COMMENT 'Name of Person Who Changed Object' , `CNAME` VARCHAR(80) NOT NULL COMMENT 'Complete Name' , `GESCH` VARCHAR(1) NOT NULL COMMENT 'Gender' , `GBDAT` DATE NOT NULL COMMENT 'Date of Birth' , `NATIO` VARCHAR(3) NOT NULL COMMENT 'Nationality' ) ENGINE = InnoDB COMMENT = ': HR Master Record: Infotype 0002 (Personal Data)';