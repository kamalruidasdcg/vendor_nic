-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2023 at 07:31 AM
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
-- Table structure for table `add_drawing`
--

CREATE TABLE `add_drawing` (
  `drawing_id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `add_drawing`
--

INSERT INTO `add_drawing` (`drawing_id`, `purchasing_doc_no`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '2100010812', '1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', '1', 'VENDOR', 1699252952514, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(2, '7800000040', '1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'Uploading Drawing', '1', 'VENDOR', 1699253015750, 'XYZ Pvt. Ltd.', 'XYZ@gmai.com'),
(3, '4700013227', '1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', '3', 'VENDOR', 1699253037643, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(4, '34567876556', '1699598638506-sample.pdf', '23114', 'uploads\\drawing\\1699598638506-sample.pdf', NULL, '1', 'GRSE', 1699598638509, 'Abhinit ', '6380'),
(5, '34567876556', '1699599207479-sample.pdf', '23114', 'uploads\\drawing\\1699599207479-sample.pdf', NULL, '1', 'GRSE', 1699599207483, 'Abhinit ', '6380'),
(6, '34567876583', '1699599251462-sample.pdf', '23114', 'uploads\\drawing\\1699599251462-sample.pdf', NULL, '1', 'GRSE', 1699599251463, 'Abhinit ', '6380'),
(7, '34567876525', '1699599351531-sample.pdf', '23114', 'uploads\\drawing\\1699599351531-sample.pdf', NULL, '1', 'GRSE', 1699599351532, 'Abhinit ', '6380'),
(8, '4700013227', '1700634056066-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1700634056066-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'C', 'VENDOR', 1700634056077, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(9, '4700013227', '1700647547365-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1700647547365-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'S', 'VENDOR', 1700647547376, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(15, '4700013227', '1700653524564-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1700653524564-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'SUBMITTED', 'VENDOR', 1700653524612, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(16, '4700013227', '1700653579972-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1700653579972-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'SUBMITTED', 'VENDOR', 1700653580027, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(17, '4700013227', '1700653728961-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1700653728961-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'SUBMITTED', 'VENDOR', 1700653729009, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(18, '4700013227', '1700653934032-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1700653934032-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'APPROVED', 'VENDOR', 1700653934081, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com');

-- --------------------------------------------------------

--
-- Table structure for table `adr6`
--

CREATE TABLE `adr6` (
  `ADDRNUMBER` varchar(10) NOT NULL COMMENT 'Address Number',
  `PERSNUMBER` varchar(10) NOT NULL COMMENT 'Person number',
  `DATE_FROM` date NOT NULL COMMENT 'Valid-from date - in current Release only 00010101 possible',
  `CONSNUMBER` int(3) NOT NULL COMMENT 'Sequence number',
  `FLGDEFAULT` varchar(1) DEFAULT NULL COMMENT 'Flag: this address is the default address',
  `FLG_NOUSE` varchar(1) DEFAULT NULL COMMENT 'Flag: This Communication Number is Not Used',
  `HOME_FLAG` varchar(1) DEFAULT NULL COMMENT 'Recipient address in this communication type (mail sys.grp)',
  `SMTP_ADDR` varchar(241) NOT NULL COMMENT 'E-Mail Address',
  `SMTP_SRCH` varchar(20) NOT NULL COMMENT 'E-Mail Address Search Field',
  `DFT_RECEIV` varchar(1) NOT NULL COMMENT 'Flag: Recipient is standard recipient for this address',
  `R3_USER` varchar(1) NOT NULL COMMENT 'Flag: Connected to an SAP System',
  `ENCODE` varchar(1) NOT NULL COMMENT 'Desired Data Coding (E-Mail)',
  `TNEF` varchar(1) NOT NULL COMMENT 'Flag: Receiver can receive TNEF coding via SMTP',
  `VALID_FROM` varchar(14) NOT NULL COMMENT '		Communication Data: Valid From (YYYYMMDDHHMMSS)Communication Data: Valid From (YYYYMMDDHHMMSS)',
  `VALID_TO` varchar(14) NOT NULL COMMENT 'Communication Data: Valid To (YYYYMMDDHHMMSS)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=' E-Mail Addresses (Business Address Services)';

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `auth_id` int(11) NOT NULL,
  `user_type` int(3) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(85) NOT NULL,
  `vendor_code` varchar(25) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login_time` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`auth_id`, `user_type`, `username`, `password`, `name`, `email`, `vendor_code`, `datetime`, `last_login_time`) VALUES
(1, 5, 'admin', 'admin@213', 'Mrinmoy Ghosh', 'mrinmoygh081@gmail.com', '00000105', '2023-09-12 10:25:51', NULL),
(2, 1, 'vendor', 'vendor', 'Vendor1', 'vendor@vendor.com', '50007545', '2023-10-12 15:55:23', NULL),
(3, 2, 'grse_department', 'grse_department', 'grse department', 'grse_department@grse.com', '50000437', '2023-10-12 15:56:56', NULL),
(4, 3, 'grse_banking', 'grse_banking', 'grse banking', 'grse_banking@grse.com', '50005041', '2023-10-12 15:57:39', NULL),
(5, 4, 'grse_finance', 'grse_finance', 'grse finance', 'grse_finance@grse.com', '', '2023-10-12 15:58:16', NULL);

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
(69, '210000006', '00000105', 'ABHINI234zdfvds', '2023-09-13 18:30:00', 'aabhinit96@gmail.com', 'fgttyyyy', '1694686066056-images.png'),
(70, '210000006', '00000105', 'ABHINI234456789', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'test1test1test1test1', '1694754979532-images.png'),
(71, '210000006', '00000105', 'INVOICE0909', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'WEDAR', '1694758395582-grsc.jpg'),
(72, '210000006', '00000105', 'xxxxx', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'xfds', '1694768578586-images.png'),
(73, '123', 'undefined', 'fdsa', '0000-00-00 00:00:00', 'fdsaf', 'Mrinmoy', 'undefined'),
(74, '210000006', '00000105', 'bk', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'fesrgsrgsdv', 'undefined'),
(75, '210000006', '00000105', 'sdasfasdf', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'fesdfsdfsf', 'undefined'),
(76, '210000006', '00000105', 'sdasfasdf', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'fesdfsdfsf', 'undefined'),
(77, '210000006', '00000105', 'abhinit123456', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'dfdvd abhinitrttttt', '1694781797265-images.png'),
(78, '210000006', '00000105', 'abhinitanand', '2023-09-14 18:30:00', 'aabhinit96@gmail.com', 'kolkata', '1694781916351-images.png'),
(79, '210000006', '00000105', 'tetinghhhhhhh', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'treeeeeee', '1695013678848-images.png'),
(80, '210000006', '00000105', 'gk', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'retryutfdfdfg', '1695013765166-grsc.jpg'),
(81, '210000006', '00000105', 'INVICE9009', '2023-09-19 18:30:00', 'aabhinit96@gmail.com', 'REFEFEWFEF', '1695015396700-grsc.jpg'),
(82, '210000006', '00000105', 'INVOICE7777', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'EDEFEF', '1695015638160-images.png'),
(83, '210000006', '00000105', 'abhinit0101', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', '3rewfwfwf', '1695015936385-images.png'),
(84, '210000006', '00000105', 'testing1233445555556', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'ty67', '1695019996428-images.png'),
(85, '210000006', '00000105', 'bk1', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'er', '1695020730970-grsc.jpg'),
(86, '210000006', '00000105', 'WDWEFWEFWEF', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', 'TYOPP', '1695032719058-images.png'),
(87, '210000006', '00000105', 'CDCDCDC', '2023-09-17 18:30:00', 'aabhinit96@gmail.com', '', '1695032997845-images.png'),
(88, '210000006', '00000105', 'ABHINI234', '2023-09-18 18:30:00', 'aabhinit96@gmail.com', 'recod', '1695105182795-abhi.png'),
(89, '210000006', '00000105', 'free', '2023-09-19 18:30:00', 'aabhinit96@gmail.com', 'wfwf', '1695210670268-abhi.png'),
(90, '210000006', '00000105', 'bk12', '2023-09-19 18:30:00', 'aabhinit96@gmail.com', '2qe3rwrt', '1695210884205-abhi.png'),
(91, '210000006', '00000105', 'rttttt', '2023-09-20 18:30:00', 'aabhinit96@gmail.com', 'today', '1695277061510-abhi.png'),
(92, '210000006', '00000105', 'INVOICE60009', '2023-09-20 18:30:00', 'aabhinit96@gmail.com', 'kkkkkkkkkkkk', '1695278021712-abhi.png'),
(93, '210000006', '00000105', 'dfwfg', '2023-09-20 18:30:00', 'aabhinit96@gmail.com', 'gggggggggggg', 'undefined'),
(94, '210000006', '00000105', 'ABC', '2023-09-20 18:30:00', 'aabhinit96@gmail.com', 'DSD', '1695292722734-abhi.png'),
(95, '7800000040', '50007545', 'afdfsgdrgesrg', '2023-09-25 18:30:00', 'aabhinit96@gmail.com', 'grfgergerg', '1695723989731-abhi.png'),
(96, '7800000040', '50007545', 'frrrrrrrrrrrrrr', '2023-09-26 18:30:00', 'aabhinit96@gmail.com', 'dsadsadasdasdadadad', '1695791365926-abhi.png');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` varchar(10) NOT NULL COMMENT 'Department Id',
  `department_name` varchar(50) NOT NULL COMMENT 'Department Name',
  `department_code` varchar(6) NOT NULL COMMENT 'Department Code'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='department table';

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`, `department_code`) VALUES
('D1', 'Material', 'MTRL'),
('D1', 'Finance', 'FNC'),
('D3', 'Testing', 'TST'),
('1', 'BTS Reg Center', 'BTS_RE'),
('2', 'Department', 'DEPT'),
('3', 'Finance Section', 'FNC'),
('4', 'Banking Section', 'BNKG');

-- --------------------------------------------------------

--
-- Table structure for table `ekbe`
--

CREATE TABLE `ekbe` (
  `EBELN` varchar(10) NOT NULL COMMENT ' Document Number',
  `EBELP` int(5) NOT NULL COMMENT 'Item Number of\r\n Purchasing\r\n Document',
  `GJAHR` int(4) NOT NULL COMMENT 'Material Document\r\n Year',
  `BELNR` varchar(10) NOT NULL COMMENT 'Number of\r\n Material\r\n Document'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=' History per Purchasing Document';

--
-- Dumping data for table `ekbe`
--

INSERT INTO `ekbe` (`EBELN`, `EBELP`, `GJAHR`, `BELNR`) VALUES
('7800000040', 10, 2022, '5000231739'),
('7800000040', 10, 2022, '5000231739'),
('7800000040', 10, 2022, '5000231740'),
('7800000040', 10, 2022, '5000231741'),
('7800000040', 10, 2022, '5000231742');

-- --------------------------------------------------------

--
-- Table structure for table `eket`
--

CREATE TABLE `eket` (
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document\r\n Number',
  `EBELP` int(5) NOT NULL COMMENT 'Item Number of\r\n Purchasing Document',
  `ETENR` int(4) NOT NULL COMMENT 'Delivery Schedule\r\n Line Counter',
  `EINDT` bigint(20) NOT NULL COMMENT 'Item Delivery Date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ekko`
--

CREATE TABLE `ekko` (
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document Number',
  `BUKRS` varchar(4) NOT NULL COMMENT 'Company Code',
  `BSTYP` varchar(1) DEFAULT NULL COMMENT 'Purchasing Document Category',
  `BSART` varchar(4) DEFAULT NULL COMMENT 'Purchasing Document Type',
  `LOEKZ` varchar(1) DEFAULT NULL COMMENT '	Deletion Indicator in Purchasing Document',
  `AEDAT` date DEFAULT NULL COMMENT '	Date on Which Record Was Created',
  `ERNAM` varchar(12) DEFAULT NULL COMMENT 'Name Of Person Who Created Object',
  `LIFNR` varchar(10) DEFAULT NULL COMMENT 'Vendor Account Number',
  `EKORG` varchar(4) DEFAULT NULL COMMENT 'Purchasing Organization',
  `EKGRP` varchar(3) DEFAULT NULL COMMENT 'Puchasing Group'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Purchasing Document Header';

--
-- Dumping data for table `ekko`
--

INSERT INTO `ekko` (`EBELN`, `BUKRS`, `BSTYP`, `BSART`, `LOEKZ`, `AEDAT`, `ERNAM`, `LIFNR`, `EKORG`, `EKGRP`) VALUES
('4700013227', 'GRSE', 'F', 'ZDM', NULL, '2015-02-12', 'ERPDM', '50005041', 'GRSE', 'ERP'),
('4700013553', 'GRSE', 'F', 'ZDM', NULL, '2015-03-27', 'ERPDM', '50005041', 'GRSE', 'ERP'),
('4700016027', 'GRSE', 'F', 'ZDM', NULL, '2016-01-29', '487412', '50005041', 'GRSE', 'ERP'),
('4800001795', 'GRSE', 'F', 'ZDM', NULL, '2012-11-28', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800003580', 'GRSE', 'F', 'ZDM', NULL, '2014-03-18', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800004078', 'GRSE', 'F', 'ZDM', NULL, '2014-06-25', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800005422', 'GRSE', 'F', 'ZDM', NULL, '2015-03-19', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800007095', 'GRSE', 'F', 'ZDM', NULL, '2015-09-11', '487412', '50005041', 'GRSE', 'ERP'),
('4800008195', 'GRSE', 'F', 'ZDM', NULL, '2016-03-31', '487412', '50005041', 'GRSE', 'ERP'),
('4800011669', 'GRSE', 'F', 'ZDM', NULL, '2017-05-15', '487412', '50005041', 'GRSE', 'ERP'),
('4800011727', 'GRSE', 'F', 'ZDM', NULL, '2017-05-22', '600229', '50005041', 'GRSE', 'ERP'),
('4800011728', 'GRSE', 'F', 'ZDM', NULL, '2017-05-22', '600229', '50005041', 'GRSE', 'ERP'),
('4800011745', 'GRSE', 'F', 'ZDM', NULL, '2017-05-24', '600229', '50005041', 'GRSE', 'ERP'),
('4800013770', 'GRSE', 'F', 'ZDM', NULL, '2017-12-04', '600229', '50005041', 'GRSE', 'ERP'),
('4800019411', 'GRSE', 'F', 'ZDM', NULL, '2020-06-12', '493916', '50005041', 'GRSE', 'ERP'),
('4800022399', 'GRSE', 'F', 'ZDM', NULL, '2022-04-23', '493916', '50005041', 'GRSE', 'DP3'),
('4800022835', 'GRSE', 'F', 'ZDM', NULL, '2022-09-13', '491646', '50005041', 'GRSE', 'DP3'),
('7800000040', 'GRSE', 'F', 'ZGSR', NULL, '0000-00-00', '493834', '50007545', 'GRSE', 'DP3'),
('7800000041', 'GRSE', 'F', 'ZGSR', NULL, '0000-00-00', '493834', '50007545', 'GRSE', 'DP3'),
('7800000047', 'GRSE', 'F', 'ZDM', NULL, '2022-06-28', '485838', '50005041', 'GRSE', 'DP3'),
('QQ00013227', '5788', 'S', 'ABCD', 'W', '2023-11-07', '34567656787', '1234567890', '1234', '123');

-- --------------------------------------------------------

--
-- Table structure for table `ekpo`
--

CREATE TABLE `ekpo` (
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document\r\n Number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of\r\n Purchasing Document',
  `LOEKZ` varchar(1) DEFAULT NULL COMMENT 'Deletion Indicator in\r\n Purchasing Document',
  `STATU` varchar(1) DEFAULT NULL COMMENT 'RFQ status',
  `AEDAT` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document\r\n Item Change Date',
  `TXZ01` varchar(40) DEFAULT NULL COMMENT 'Material Number',
  `MATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `BUKRS` varchar(4) DEFAULT NULL COMMENT 'Company Code',
  `WERKS` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `LGORT` varchar(4) DEFAULT NULL COMMENT 'Storage Location',
  `MATKL` varchar(9) DEFAULT NULL COMMENT 'Material Group',
  `KTMNG` int(13) DEFAULT NULL COMMENT 'Target Quantity',
  `MENGE` int(13) DEFAULT NULL COMMENT 'Purchase Order Quantity',
  `MEINS` varchar(4) DEFAULT NULL COMMENT 'Purchase Order Unit of\r\n Measure',
  `NETPR` varchar(11) DEFAULT NULL COMMENT 'Net Price in Purchasing\r\n Document (in Document\r\n Currency)',
  `NETWR` varchar(13) DEFAULT NULL COMMENT 'Net Order Value in PO\r\n Currency',
  `MWSKZ` varchar(2) DEFAULT NULL COMMENT 'Tax on sales/purchases\r\n code'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=': Purchasing Document Item';

--
-- Dumping data for table `ekpo`
--

INSERT INTO `ekpo` (`EBELN`, `EBELP`, `LOEKZ`, `STATU`, `AEDAT`, `TXZ01`, `MATNR`, `BUKRS`, `WERKS`, `LGORT`, `MATKL`, `KTMNG`, `MENGE`, `MEINS`, `NETPR`, `NETWR`, `MWSKZ`) VALUES
('2100010812', 10, '', '', '07.03.2014', 'IncomeTax Rectification in SAP Payroll', '', 'GRSE', '100', '', 'SE57', 1, 0, 'AU', '0', '0', ''),
('2100010812', 20, '', '', '07.03.2014', 'Modification of ZINC prog in SAP Payroll', '', 'GRSE', '100', '', 'SE57', 1, 0, 'AU', '0', '0', ''),
('4700013227', 10, '', '', '04.08.2015', 'Impl. of Asset Mgmt as per Co Act 13', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,200,000.0', '1,200,000.00', 'SG'),
('4700013553', 10, '', '', '22.03.2016', '1. Project Systems & Production Planning', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,813,063.0', '1,813,063.00', 'SU'),
('4700013553', 15, '', '', '12.01.2017', '1. Project Systems & Production Planning', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,557,165.0', '1,557,165.00', 'TV'),
('4700013553', 20, '', '', '22.03.2016', '2. Workflows', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '204,218.00', '204,218.00', 'SU'),
('4700013553', 30, '', '', '22.03.2016', '3. ABAP Reports', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '81,690.00', '81,690.00', '4S'),
('4700013553', 40, '', '', '12.01.2017', '4. Testing', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '163,376.00', '163,376.00', 'TV'),
('4700013553', 50, '', '', '12.01.2017', '5. Commissioning the system', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '81,688.00', '81,688.00', 'TV'),
('4700013553', 60, '', '', '20.06.2019', '6. Warranty Support', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '490,076.00', '490,076.00', 'TV'),
('4700013553', 70, '', '', '12.01.2017', '7. Training', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '81,687.00', '81,687.00', 'TV'),
('4700013553', 80, '', '', '12.01.2017', '8. Documentation', '', 'GRSE', '100', '', 'SE74', 0, 1, 'LS', '147,037.00', '147,037.00', 'TV'),
('4700016027', 10, '', '', '26.07.2019', 'Inclusion of QA functions in Projects', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,440,000.0', '1,440,000.00', '12'),
('4800001795', 10, '', '', '30.11.2012', 'SAP SYSTEM AUDIT & RELATED ACTIVITIES', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '4,004,984.0', '4,004,984.00', 'SG'),
('4800003580', 10, '', '', '18.03.2014', 'IncomeTax Rectification in SAP Payroll', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '302,100.00', '302,100.00', 'SG'),
('4800003580', 20, '', '', '18.03.2014', 'Modification of ZINC prog in SAP Payroll', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '127,200.00', '127,200.00', 'SG'),
('4800004078', 10, '', '', '25.06.2014', 'Implementing revised Perks inSAP-Payroll', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '2,190,000.0', '2,190,000.00', 'SG'),
('4800005422', 10, '', '', '19.03.2015', 'Impl. of Wage Revision in SAP Payroll', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '2,265,000.0', '2,265,000.00', 'SG'),
('4800007095', 10, '', '', '06.03.2018', 'Reporting for Senior Management of GRSE', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '3,333,000.0', '3,333,000.00', 'SU'),
('4800008195', 10, '', '', '11.01.2018', 'Sales through Stock transfer etc.', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '863,016.00', '863,016.00', 'TV'),
('4800008195', 20, '', '', '11.01.2018', 'Reverse Charge Service tax process', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '154,361.00', '154,361.00', 'TV'),
('4800008195', 30, '', '', '11.01.2018', 'TDS reconciliation', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '210,492.00', '210,492.00', 'TV'),
('4800008195', 40, '', '', '11.01.2018', 'Improvement of sales of B & D Spare', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '526,229.00', '526,229.00', '12'),
('4800008195', 50, '', '', '11.01.2018', 'Customized reports required by SLP', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,059,475.0', '1,059,475.00', '12'),
('4800008195', 60, '', '', '11.01.2018', 'Improvement in Salary & Wages & PF', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '280,656.00', '280,656.00', 'TV'),
('4800008195', 70, 'L', '', '31.10.2018', 'General Requirements of Finance', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '420,984.00', '420,984.00', '4S'),
('4800008195', 80, '', '', '26.09.2018', 'Purchase Order Release', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '554,295.00', '554,295.00', '12'),
('4800008195', 90, 'L', '', '31.10.2018', 'Inclusion of PWD rate in civil contracts', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '70,164.00', '70,164.00', '4S'),
('4800008195', 100, '', '', '10.02.2018', 'Documentation', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '70,164.00', '70,164.00', '12'),
('4800008195', 110, '', '', '10.02.2018', 'Training', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '70,164.00', '70,164.00', '12'),
('4800008195', 120, '', '', '10.02.2018', 'Impl of BB Prod facilities at DEP Ranchi', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,430,000.0', '1,430,000.00', '12'),
('4800011669', 10, '', '', '29.03.2018', 'Implementation of Tax INN for GRSE', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '2,409,420.0', '2,409,420.00', '12'),
('4800011669', 20, '', '', '29.03.2018', 'Implementation of GST for GRSE', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,938,406.0', '1,938,406.00', '12'),
('4800011727', 10, '', '', '19.02.2018', 'Amendments in PF Trust Rules in SAP', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '800,000.00', '800,000.00', '12'),
('4800011728', 10, '', '', '02.11.2018', 'Resolutions to HCM Audit Gaps', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '2,950,000.0', '2,950,000.00', 'TV'),
('4800011745', 10, '', '', '04.10.2017', 'Emp Attendance Reporting in Dashboard', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '291,000.00', '291,000.00', '12'),
('4800013770', 10, '', '', '04.12.2017', 'AMC of BI/BO Dashboard/Reports', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,100,000.0', '1,100,000.00', '12'),
('4800019411', 10, '', '', '12.06.2020', 'Devl & Impl of Proc Accelerator System', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '9,000,000.0', '9,000,000.00', '12'),
('4800022399', 10, '', '', '23.04.2022', 'REGULARISATION OF SUPPLEMENTARY PO', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '350,000.00', '350,000.00', '12'),
('4800022835', 10, '', '', '14.09.2022', 'PROJECT WIP PROCESS', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '211,864.40', '211,864.40', '12'),
('7800000040', 10, '', '', '18.11.2022', 'Technical Service for ERP Q1', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,436,475.0', '1,436,475.00', '12'),
('7800000047', 10, '', '', '29.06.2022', 'Implementation of Wage revision in SAP', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,800,000.0', '1,800,000.00', '12'),
('7800000047', 20, '', '', '02.01.2023', 'WageRevision forOA(non-ranchi)&RanchiEmp', '', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '1,000,000.0', '1,000,000.00', '12'),
('1234512354', 10023, 'W', '1', '07.03.2014', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('1234512354', 88, 'W', '1', '20.06.2019', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('QQ00013227', 10023, 'W', '1', '07.03.2014', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('QQ00013227', 88, 'W', '1', '20.06.2019', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG');

-- --------------------------------------------------------

--
-- Table structure for table `essr`
--

CREATE TABLE `essr` (
  `LBLNI` varchar(10) NOT NULL COMMENT 'Entry Sheet Number',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `EBELP` varchar(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT=' Service Entry Sheet Header Data';

--
-- Dumping data for table `essr`
--

INSERT INTO `essr` (`LBLNI`, `EBELN`, `EBELP`) VALUES
('1000127607', '7800000040', '10');

-- --------------------------------------------------------

--
-- Table structure for table `grse_personnel`
--

CREATE TABLE `grse_personnel` (
  `MANNO` int(8) NOT NULL,
  `NAME1` varchar(50) NOT NULL,
  `NAME2` varchar(50) NOT NULL,
  `EMAIL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='GRSE ';

--
-- Dumping data for table `grse_personnel`
--

INSERT INTO `grse_personnel` (`MANNO`, `NAME1`, `NAME2`, `EMAIL`) VALUES
(6317, 'SYAMAL', 'DUTTA', 'DUTTA.SYAMALKUMAR@GRSE.CO.IN'),
(6369, 'AMIYA', 'BHATTACHARYA', 'BHATTACHARYA.AK@GRSE.CO.IN');

-- --------------------------------------------------------

--
-- Table structure for table `inspection_call_letter`
--

CREATE TABLE `inspection_call_letter` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspection_call_letter`
--

INSERT INTO `inspection_call_letter` (`id`, `purchasing_doc_no`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '4700013227', '1700647390698-t.c.pdf', '09383HAL', 'uploads\\inspectionCallLetter\\1700647390698-t.c.pdf', 'BAHAMAS MISSILE DRAWING4', '1', 'VENDOR', 1700647390969, 'Hindustan Aeronautics Limited', '09383HAL');

-- --------------------------------------------------------

--
-- Table structure for table `lfa1`
--

CREATE TABLE `lfa1` (
  `LIFNR` varchar(10) NOT NULL COMMENT 'Account Number of Vendor or Creditor',
  `LAND1` varchar(3) DEFAULT NULL COMMENT 'Country Key',
  `NAME1` varchar(35) DEFAULT NULL COMMENT 'Name 1',
  `ORT01` varchar(35) DEFAULT NULL COMMENT 'City',
  `ORT02` varchar(35) DEFAULT NULL COMMENT 'District',
  `PFACH` varchar(10) DEFAULT NULL COMMENT 'PO Box',
  `REGIO` varchar(3) DEFAULT NULL COMMENT 'Region (State, Province, County)',
  `KTOKK` varchar(4) DEFAULT NULL COMMENT '	Vendor account group',
  `LOEVM_X` varchar(1) DEFAULT NULL COMMENT '	Central Deletion Flag for Master Record',
  `SPRAS` varchar(10) DEFAULT NULL COMMENT 'Language Key',
  `STCD1` varchar(16) DEFAULT NULL COMMENT 'Tax Number 1',
  `TELFX` varchar(31) DEFAULT NULL COMMENT 'Fax Number',
  `STCD3` varchar(18) DEFAULT NULL COMMENT 'Tax Number 3',
  `ZZVENVALDT` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `lfa1`
--

INSERT INTO `lfa1` (`LIFNR`, `LAND1`, `NAME1`, `ORT01`, `ORT02`, `PFACH`, `REGIO`, `KTOKK`, `LOEVM_X`, `SPRAS`, `STCD1`, `TELFX`, `STCD3`, `ZZVENVALDT`) VALUES
('50000437', 'IN', 'TATA STEEL LTD', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAAFA1890Q', '033 2282 1687', '24AAAFA1890Q1Z9', '0000-00-00'),
('50005041', 'IN', 'PriceWaterhouseCoopers Pvt Ltd', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AABCP9181H', NULL, '19AABCP9181H1Z1', '0000-00-00'),
('50007545', 'IN', 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `makt`
--

CREATE TABLE `makt` (
  `MANDT` int(3) NOT NULL COMMENT 'Client',
  `MATNR` char(18) NOT NULL COMMENT 'Material Number',
  `SPRAS` varchar(1) NOT NULL COMMENT 'Language Key',
  `MAKTX` char(40) NOT NULL COMMENT 'Material Description (Short Text)',
  `MAKTG` char(40) NOT NULL COMMENT 'Material description in upper case for matchcodes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `new_auth`
--

CREATE TABLE `new_auth` (
  `auth_id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(85) NOT NULL,
  `vendor_code` varchar(25) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `refreshToken` varchar(5000) NOT NULL COMMENT 'Refresh token'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `new_auth`
--

INSERT INTO `new_auth` (`auth_id`, `username`, `password`, `name`, `email`, `vendor_code`, `datetime`, `refreshToken`) VALUES
(1, 'admin', 'admin@213', 'Mrinmoy Ghosh', 'mrinmoygh081@gmail.com', '00000105', '2023-09-12 10:25:51', ''),
(2, 'kamalruidas', 'kamal', 'Kamal Ruidas', 'kamalruidas@gmail.com', '50007545', '2023-10-05 11:33:46', '5678987654567898qwe765567.76545678gfdfghj.oiuytdfghjkjhvc876545678.6r6'),
(3, 'u1', 'password', 'name1', 'kamalruidas@gmail.com', '23443242424', '2023-10-09 10:25:27', '5678987654567898qwe765567.76545678gfdfghj.oiuytdfghjkjhvc876545678.6r6');

-- --------------------------------------------------------

--
-- Table structure for table `new_bill_registration`
--

CREATE TABLE `new_bill_registration` (
  `zbtno` varchar(11) NOT NULL,
  `action_by_id` varchar(50) NOT NULL,
  `action_by_name` varchar(50) NOT NULL,
  `bill_submit_date` date NOT NULL,
  `bill_submit_to_email` varchar(50) NOT NULL,
  `bill_submit_to_name` varchar(50) NOT NULL,
  `bill_submit_time` time NOT NULL,
  `created_date` date NOT NULL DEFAULT current_timestamp(),
  `created_epoch_time` int(13) NOT NULL,
  `created_time` time NOT NULL DEFAULT current_timestamp(),
  `file_name` varchar(255) NOT NULL,
  `invoice_no` varchar(40) NOT NULL,
  `purchasing_doc_no` varchar(10) NOT NULL,
  `remarks` varchar(140) NOT NULL,
  `vendor_ac_no` varchar(10) NOT NULL,
  `vendor_email` varchar(50) NOT NULL,
  `vendor_name` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `new_bill_registration`
--

INSERT INTO `new_bill_registration` (`zbtno`, `action_by_id`, `action_by_name`, `bill_submit_date`, `bill_submit_to_email`, `bill_submit_to_name`, `bill_submit_time`, `created_date`, `created_epoch_time`, `created_time`, `file_name`, `invoice_no`, `purchasing_doc_no`, `remarks`, `vendor_ac_no`, `vendor_email`, `vendor_name`) VALUES
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '00:00:00', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '0000-00-00', 'kamal.ruidas@gmail.com', 'kmal ruidas', '00:00:00', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '0000-00-00', 'kamal.ruidas@gmail.com', 'kmal ruidas', '00:00:00', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927001', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927002', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927002', 'LOGGED IN USER ID', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927007', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927007', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927007', '00000105', 'Mrinmoy Ghosh', '2023-09-26', 'aabhinit96@gmail.com', 'Jayanta Sarkar', '16:36:28', '2023-09-27', 2147483647, '00:00:00', '1695812801280-abhi.png', 'dfdfdf', '7800000040', 'tyyyyyyyyyyybbb', '50007545', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927007', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927008', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927009', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927011', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927013', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927015', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927016', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927017', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927018', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927019', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927020', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927021', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927022', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927023', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927024', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927025', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-09-27', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230927026', '00000105', 'Mrinmoy Ghosh', '2023-09-26', 'aabhinit96@gmail.com', 'Jayanta Sarkar', '16:51:24', '2023-09-27', 2147483647, '00:00:00', '1695813698745-abhi.png', 'bksingh', '7800000040', 'trycatch', '50007545', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20230929001', '00000105', 'Mrinmoy Ghosh', '2023-09-13', 'aabhinit96@gmail.com', 'Jayanta Sarkar', '16:53:08', '2023-09-29', 2147483647, '00:00:00', '1695986602456-essr.pdf', '234543212345t', '7800000040', 'ee', '50007545', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20231123001', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-11-23', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos'),
('20231123002', 'kamal.ruidas@', 'LOGGED IN USER NAME', '2023-09-27', 'kamal.ruidas@gmail.com', 'kmal ruidas', '11:20:34', '2023-11-23', 2147483647, '00:00:00', 'newFile.jpg', '123232344', '8765678987', 'new gengrated bill', '50007523', 'mrinmoygh081@gmail.com', 'Mrinmoy Ghos');

-- --------------------------------------------------------

--
-- Table structure for table `new_payments`
--

CREATE TABLE `new_payments` (
  `sl_no` int(10) NOT NULL,
  `venor_code` varchar(10) DEFAULT NULL,
  `contactors_name` varchar(255) DEFAULT NULL,
  `po_no` varchar(20) DEFAULT NULL,
  `MAIN` int(7) DEFAULT NULL,
  `FOJ` int(7) DEFAULT NULL,
  `RBD` int(7) DEFAULT NULL,
  `COL_61P` int(7) DEFAULT NULL,
  `TU` int(7) DEFAULT NULL,
  `TTC` int(7) DEFAULT NULL,
  `G_HOUSE` int(7) DEFAULT NULL,
  `BELUR` int(7) DEFAULT NULL,
  `NSSY` int(7) DEFAULT NULL,
  `IHQ_DELHI` int(7) DEFAULT NULL,
  `WAGES_PAID_UPTO` datetime DEFAULT NULL,
  `PF_DEPOSIT_UPTO` datetime DEFAULT NULL,
  `ESI_DEPISIT_UPTO` datetime DEFAULT NULL,
  `REMARKS` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `created_by_name` varchar(255) DEFAULT NULL,
  `created_by_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by_name` varchar(255) DEFAULT NULL,
  `updated_by_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `new_payments`
--

INSERT INTO `new_payments` (`sl_no`, `venor_code`, `contactors_name`, `po_no`, `MAIN`, `FOJ`, `RBD`, `COL_61P`, `TU`, `TTC`, `G_HOUSE`, `BELUR`, `NSSY`, `IHQ_DELHI`, `WAGES_PAID_UPTO`, `PF_DEPOSIT_UPTO`, `ESI_DEPISIT_UPTO`, `REMARKS`, `created_at`, `created_by_name`, `created_by_id`, `status`, `updated_at`, `updated_by_name`, `updated_by_id`) VALUES
(92, 'v0909899', 'contactors_name 1', '121310', 121, 233, 245, 67876, 87878, 878987, 78787, 8787, 87678987, 878987, NULL, NULL, NULL, 'REMARKS _1', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(93, NULL, 'contactors_name 2', '121311', 122, 234, 246, 67877, 87879, 878987, 78787, 8788, 87678988, 878988, NULL, NULL, NULL, 'REMARKS _2', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(94, NULL, 'contactors_name 3', '121312', 123, 235, 247, 67878, 87880, 878987, 78788, 8789, 87678989, 878989, NULL, NULL, NULL, 'REMARKS _3', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(95, NULL, 'contactors_name 4', '121313', 124, 236, 248, 67879, 87881, 878987, 78789, 8790, 87678990, 878990, NULL, NULL, NULL, 'REMARKS _4', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(96, NULL, 'contactors_name 5', '121314', 125, 237, 249, 67880, 87882, 878987, 78790, 8791, 87678991, 878991, NULL, NULL, NULL, 'REMARKS _5', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(97, NULL, 'contactors_name 6', '121315', 126, 238, 250, 67881, 87883, 878987, 78791, 8792, 87678992, 878992, NULL, NULL, NULL, 'REMARKS _6', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `new_sdbg`
--

CREATE TABLE `new_sdbg` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `new_sdbg`
--

INSERT INTO `new_sdbg` (`id`, `purchasing_doc_no`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `bank_name`, `transaction_id`, `vendor_code`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '2100010812', '1699252992110-pa0105.pdf', 'uploads\\sdbg\\1699252992110-pa0105.pdf', 'REMARKS', '1', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699252992115, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(2, '7800000040', '1699253021629-pa0105.pdf', 'uploads\\sdbg\\1699253021629-pa0105.pdf', 'Uploding SDVG', '1', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699253021633, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'kamal.sspur@gmai.com'),
(3, '4700013227', '1699253035296-pa0105.pdf', 'uploads\\sdbg\\1699253035296-pa0105.pdf', 'REMARKS', '3', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699253035304, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(4, '2100010812', '1699254320543-marksheet.pdf', 'uploads\\sdbg\\1699254320543-marksheet.pdf', 'hello', '2', 'GRSE', NULL, NULL, NULL, 1699254320871, 'dgfghjhjghfgdf', '1234'),
(5, '2100010812', '1699254432586-marksheet.pdf', 'uploads\\sdbg\\1699254432586-marksheet.pdf', 'hello', '2', 'GRSE', NULL, NULL, NULL, 1699254432771, 'dgfghjhjghfgdf', '1234'),
(6, '2100010812', '1699254561136-marksheet.pdf', 'uploads\\sdbg\\1699254561136-marksheet.pdf', 'hello', '3', 'GRSE', NULL, NULL, NULL, 1699254561244, 'dgfghjhjghfgdf', '1234'),
(7, '4700013227', '1699255043424-pa0105.pdf', 'uploads\\sdbg\\1699255043424-pa0105.pdf', 'REMARKS', '2', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255043440, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(8, '4700013227', '1699255124185-pa0105.pdf', 'uploads\\sdbg\\1699255124185-pa0105.pdf', 'REMARKS', '2', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255124203, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(9, '4700013227', '1699255125107-pa0105.pdf', 'uploads\\sdbg\\1699255125107-pa0105.pdf', 'REMARKS', '2', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255125117, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(10, '4700013227', '1699255126091-pa0105.pdf', 'uploads\\sdbg\\1699255126091-pa0105.pdf', 'REMARKS', '2', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255126102, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(11, '4700013227', '1699255635431-pa0105.pdf', 'uploads\\sdbg\\1699255635431-pa0105.pdf', 'REMARKS', '2', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255635447, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(12, '4700013227', '1699255657899-pa0105.pdf', 'uploads\\sdbg\\1699255657899-pa0105.pdf', 'REMARKS', '2', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1699255657917, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(13, '2100010812', '1699332918868-marksheet.pdf', 'uploads\\sdbg\\1699332918868-marksheet.pdf', 'hello by md md', '3', 'GRSE', NULL, NULL, NULL, 1699332919001, 'by mainak dd', '1234'),
(14, '1234567810', '1699606302376-sample.pdf', 'uploads\\sdbg\\1699606302376-sample.pdf', 'cdvsv', '1', 'TATA STEEL LTD', '65432343545', '654367899876', '50000437', 1699606302380, 'TATA STEEL LTD', 'grse_department@grse.com'),
(15, '34567876525', '1699606470836-sample.pdf', 'uploads\\sdbg\\1699606470836-sample.pdf', NULL, '1', 'GRSE', NULL, NULL, '23114', 1699606470838, 'Abhinit ', '6380'),
(16, '1234567810', '1699606489000-sample.pdf', 'uploads\\sdbg\\1699606489000-sample.pdf', 'cdvsv', '1', 'TATA STEEL LTD', '65432343545', '654367899876', '50000437', 1699606489002, 'TATA STEEL LTD', 'grse_department@grse.com'),
(17, '1234567810', '1699606490515-sample.pdf', 'uploads\\sdbg\\1699606490515-sample.pdf', 'cdvsv', '1', 'TATA STEEL LTD', '65432343545', '654367899876', '50000437', 1699606490519, 'TATA STEEL LTD', 'grse_department@grse.com'),
(18, '1234567810', '1699606833987-sample.pdf', 'uploads\\sdbg\\1699606833987-sample.pdf', 'test76', '1', 'TATA STEEL LTD', 'state bank of india', '5678987654', '50000437', 1699606833990, 'TATA STEEL LTD', 'grse_department@grse.com'),
(19, '1234567810', '1699606947084-sample.pdf', 'uploads\\sdbg\\1699606947084-sample.pdf', 'test76', '1', 'TATA STEEL LTD', 'state bank of india', '5678987654', '50000437', 1699606947087, 'TATA STEEL LTD', 'grse_department@grse.com'),
(20, '1234567810', '1699607122187-sample.pdf', 'uploads\\sdbg\\1699607122187-sample.pdf', 'yup', '1', 'TATA STEEL LTD', 'axis bank', '9898787898656', '50000437', 1699607122189, 'TATA STEEL LTD', 'grse_department@grse.com'),
(21, '1234567810', '1699607141933-sample.pdf', 'uploads\\sdbg\\1699607141933-sample.pdf', 'yup', '1', 'TATA STEEL LTD', 'axis bank', '9898787898656', '50000437', 1699607141935, 'TATA STEEL LTD', 'grse_department@grse.com'),
(22, '1234567810', '1699607193012-abhi.png', 'uploads\\sdbg\\1699607193012-abhi.png', 'jk', '1', 'TATA STEEL LTD', 'ngcngv', '746747657868976', '50000437', 1699607193014, 'TATA STEEL LTD', 'grse_department@grse.com'),
(23, '1234567810', '1699607605468-abhi.png', 'uploads\\sdbg\\1699607605468-abhi.png', 'jk', '1', 'TATA STEEL LTD', 'ngcngv', '746747657868976', '50000437', 1699607605470, 'TATA STEEL LTD', 'grse_department@grse.com'),
(24, '1234567810', '1699607674540-abhi.png', 'uploads\\sdbg\\1699607674540-abhi.png', 'jk', '1', 'TATA STEEL LTD', 'ngcngv', '746747657868976', '50000437', 1699607674543, 'TATA STEEL LTD', 'grse_department@grse.com'),
(25, '1234567810', '1699607768983-abhi.png', 'uploads\\sdbg\\1699607768983-abhi.png', 'jk', '1', 'TATA STEEL LTD', 'ngcngv', '746747657868976', '50000437', 1699607768987, 'TATA STEEL LTD', 'grse_department@grse.com'),
(26, '1234567897', '1699610572931-sample.pdf', 'uploads\\sdbg\\1699610572931-sample.pdf', 'Uploading SDBG', '1', 'DCG DATA -CORE SYSTEMS (INDIA)', 'state bank of india', '78967689897897', '50007545', 1699610572938, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'vendor@vendor.com'),
(27, '34567876525', '1699616425614-sample.pdf', 'uploads\\sdbg\\1699616425614-sample.pdf', NULL, '1', 'GRSE', NULL, NULL, '23114', 1699616425616, 'Abhinit ', '6380'),
(28, '7800000040', '1699942575546-sample.pdf', 'uploads\\sdbg\\1699942575546-sample.pdf', 'Returning SDBG for correction', '1', 'DCG DATA -CORE SYSTEMS (INDIA)', 'State Bank of India', '45678986546789', '50007545', 1699942575550, 'GRSE', 'vendor@vendor.com'),
(29, '7800000040', '1699942929173-sample.pdf', 'uploads\\sdbg\\1699942929173-sample.pdf', 'Resubmitting corrected SDBG', '1', 'DCG DATA -CORE SYSTEMS (INDIA)', 'State Bank of India', '676554577876565', '50007545', 1699942929175, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'vendor@vendor.com'),
(30, '7800000040', '1699942990187-sample.pdf', 'uploads\\sdbg\\1699942990187-sample.pdf', 'SDBG receipt acknowledgement', '3', 'DCG DATA -CORE SYSTEMS (INDIA)', 'State Bank of India', '765787654657876', '50007545', 1699942990191, 'GRSE', 'vendor@vendor.com'),
(31, '4700013227', '1700657066327-pa0105.pdf', 'uploads\\sdbg\\1700657066327-pa0105.pdf', 'REMARKS', 'SUBMITTED', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1700657066425, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(32, '4700013227', '1700657458218-pa0105.pdf', 'uploads\\sdbg\\1700657458218-pa0105.pdf', 'REMARKS', 'RE_SUBMITTED', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1700657458270, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(33, '4700013227', '1700657598685-pa0105.pdf', 'uploads\\sdbg\\1700657598685-pa0105.pdf', 'REMARKS', 'ACKNOWLEDGED', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1700657598733, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(34, '4700013227', '1700657600595-pa0105.pdf', 'uploads\\sdbg\\1700657600595-pa0105.pdf', 'REMARKS', 'ACKNOWLEDGED', 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1700657600609, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com');

-- --------------------------------------------------------

--
-- Table structure for table `pa0000`
--

CREATE TABLE `pa0000` (
  `PERNR` varchar(8) NOT NULL COMMENT 'Key for HR Master Data',
  `SUBTY` varchar(4) DEFAULT NULL COMMENT 'Subtype',
  `OBJPS` varchar(2) DEFAULT NULL COMMENT 'Object Identification',
  `SPRPS` varchar(1) DEFAULT NULL COMMENT 'Lock Indicator for HR Master Data Record',
  `ENDDA` date DEFAULT NULL COMMENT 'Start Date',
  `BEGDA` date DEFAULT NULL COMMENT 'End Date',
  `SEQNR` int(3) DEFAULT NULL COMMENT 'Number of Infotype Record With Same Key',
  `AEDTM` date DEFAULT NULL COMMENT 'Changed On',
  `UNAME` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `MASSN` varchar(2) DEFAULT NULL COMMENT 'Action Type',
  `MASSG` varchar(2) DEFAULT NULL COMMENT 'Reason for Action',
  `STAT1` varchar(1) DEFAULT NULL COMMENT 'Customer-Specific Status',
  `STAT2` varchar(1) DEFAULT NULL COMMENT 'Employment Status',
  `STAT3` varchar(1) DEFAULT NULL COMMENT 'Special Payment Status'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='HR Master Record: Infotype 0000 (Actions)';

--
-- Dumping data for table `pa0000`
--

INSERT INTO `pa0000` (`PERNR`, `SUBTY`, `OBJPS`, `SPRPS`, `ENDDA`, `BEGDA`, `SEQNR`, `AEDTM`, `UNAME`, `MASSN`, `MASSG`, `STAT1`, `STAT2`, `STAT3`) VALUES
('600229', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600947', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1');

-- --------------------------------------------------------

--
-- Table structure for table `pa0001`
--

CREATE TABLE `pa0001` (
  `PERNR` int(8) NOT NULL COMMENT 'Personnel Number',
  `SUBTY` varchar(4) DEFAULT NULL COMMENT 'Subtype',
  `OBJPS` varchar(2) DEFAULT NULL COMMENT 'Object\r\n Identification',
  `SPRPS` varchar(1) DEFAULT NULL COMMENT 'Lock Indicator for\r\n HR Master Data\r\n Record',
  `ENDDA` date DEFAULT NULL COMMENT 'Start Date',
  `BEGDA` date DEFAULT NULL COMMENT 'End Date',
  `SEQNR` int(3) DEFAULT NULL COMMENT 'Number of Infotype\r\n Record with Same\r\n Key',
  `AEDTM` date DEFAULT NULL COMMENT 'Changed On',
  `UNAME` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `BUKRS` varchar(4) DEFAULT NULL COMMENT 'Company Code',
  `WERKS` varchar(4) DEFAULT NULL COMMENT 'Personnel Area',
  `PERSG` varchar(1) DEFAULT NULL COMMENT 'Employee Group',
  `PERSK` varchar(2) DEFAULT NULL COMMENT 'Employee Subgroup',
  `VDSK1` varchar(14) DEFAULT NULL COMMENT 'Organizational Key',
  `GSBER` varchar(4) DEFAULT NULL COMMENT 'Business Area',
  `BTRTL` varchar(4) DEFAULT NULL COMMENT 'Personnel Subarea',
  `ABKRS` varchar(2) DEFAULT NULL COMMENT 'Work Contract',
  `KOSTL` varchar(10) DEFAULT NULL COMMENT 'Cost Center',
  `ORGEH` int(8) DEFAULT NULL COMMENT 'Organizational Unit',
  `PLANS` int(8) DEFAULT NULL COMMENT 'Position'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT=' HR Master Record: Infotype 0001 (Org. Assignment)';

--
-- Dumping data for table `pa0001`
--

INSERT INTO `pa0001` (`PERNR`, `SUBTY`, `OBJPS`, `SPRPS`, `ENDDA`, `BEGDA`, `SEQNR`, `AEDTM`, `UNAME`, `BUKRS`, `WERKS`, `PERSG`, `PERSK`, `VDSK1`, `GSBER`, `BTRTL`, `ABKRS`, `KOSTL`, `ORGEH`, `PLANS`) VALUES
(600229, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600947, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060);

-- --------------------------------------------------------

--
-- Table structure for table `pa0002`
--

CREATE TABLE `pa0002` (
  `PERNR` int(8) NOT NULL COMMENT 'Personnel Number',
  `SUBTY` varchar(4) DEFAULT NULL COMMENT 'Subtype',
  `OBJPS` varchar(2) DEFAULT NULL COMMENT 'Object\r\n Identification',
  `SPRPS` varchar(1) DEFAULT NULL COMMENT 'Lock Indicator for\r\n HR Master Data\r\n Record',
  `ENDDA` date DEFAULT NULL COMMENT 'End Date',
  `BEGDA` date DEFAULT NULL COMMENT 'Start Date',
  `SEQNR` int(3) DEFAULT NULL COMMENT 'Number of Infotype\r\n Record with Same\r\n Key',
  `AEDTM` date DEFAULT NULL COMMENT 'Changed On',
  `UNAME` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `CNAME` varchar(80) DEFAULT NULL COMMENT 'Complete Name',
  `GESCH` varchar(1) DEFAULT NULL COMMENT 'Gender',
  `GBDAT` date DEFAULT NULL COMMENT 'Date of Birth',
  `NATIO` varchar(3) DEFAULT NULL COMMENT 'Nationality'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT=': HR Master Record: Infotype 0002 (Personal Data)';

--
-- Dumping data for table `pa0002`
--

INSERT INTO `pa0002` (`PERNR`, `SUBTY`, `OBJPS`, `SPRPS`, `ENDDA`, `BEGDA`, `SEQNR`, `AEDTM`, `UNAME`, `CNAME`, `GESCH`, `GBDAT`, `NATIO`) VALUES
(600229, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', 'HRAHRISOA1', 'RAJENDRA BANERJEE', '1', '0000-00-00', 'IN'),
(600947, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'TAMAL SEN', '1', '0000-00-00', 'IN');

-- --------------------------------------------------------

--
-- Table structure for table `pa0105`
--

CREATE TABLE `pa0105` (
  `PERNR` int(8) NOT NULL COMMENT 'Personnel Number',
  `SUBTY` varchar(4) DEFAULT NULL COMMENT 'Subtype',
  `OBJPS` varchar(2) DEFAULT NULL COMMENT 'Object Identification',
  `SPRPS` varchar(1) DEFAULT NULL COMMENT 'Lock Indicator for HR Master Data Record',
  `ENDDA` date DEFAULT NULL COMMENT 'End Date',
  `BEGDA` date DEFAULT NULL COMMENT 'Start Date',
  `SEQNR` int(3) DEFAULT NULL COMMENT 'Number of Infotype Record with Same Key',
  `AEDTM` date DEFAULT NULL COMMENT 'Changed On',
  `UNAME` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `USRTY` varchar(4) DEFAULT NULL COMMENT 'Communication Type',
  `USRID` varchar(30) DEFAULT NULL COMMENT 'Communication ID/Number',
  `USRID_LONG` varchar(241) DEFAULT NULL COMMENT 'Communication: Long\r\n Identification/Number'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='HR Master Record: Infotype 0105 (Communications)';

--
-- Dumping data for table `pa0105`
--

INSERT INTO `pa0105` (`PERNR`, `SUBTY`, `OBJPS`, `SPRPS`, `ENDDA`, `BEGDA`, `SEQNR`, `AEDTM`, `UNAME`, `USRTY`, `USRID`, `USRID_LONG`) VALUES
(600229, '0030', NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', 'ERPDM1', '10', NULL, 'BANERJEE.RAJENDRA@GRSE.CO.IN'),
(600229, '0010', NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'CEIL', '8584014353', NULL);

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
('210000006', '50007545'),
('210000007', '00006007');

-- --------------------------------------------------------

--
-- Table structure for table `qap_submission`
--

CREATE TABLE `qap_submission` (
  `drawing_id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `qap_submission`
--

INSERT INTO `qap_submission` (`drawing_id`, `purchasing_doc_no`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '2100010812', '1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', '1', 'VENDOR', 1699252952514, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(2, '4700013227', '1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', '1', 'VENDOR', 1699253015750, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(3, '4700013227', '1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\drawing\\1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', '3', 'VENDOR', 1699253037643, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(4, '4700013227', '1700716665928-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\qap\\1700716665928-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'SUBMITTED', 'VENDOR', 1700716665989, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(5, '4700013227', '1700716920317-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\qap\\1700716920317-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'RE_SUBMITTED', 'VENDOR', 1700716920377, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(6, '4700013227', '1700716922910-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\qap\\1700716922910-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'RE_SUBMITTED', 'VENDOR', 1700716922940, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(7, '4700013227', '1700716942327-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'V1', 'uploads\\qap\\1700716942327-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'APPROVED', 'VENDOR', 1700716942336, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com');

-- --------------------------------------------------------

--
-- Table structure for table `sdbg_acknowledgement`
--

CREATE TABLE `sdbg_acknowledgement` (
  `id` int(11) NOT NULL,
  `sdbg_id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(1) NOT NULL,
  `status_updated_at` bigint(20) NOT NULL,
  `status_updated_by_name` varchar(200) NOT NULL,
  `status_updated_by_id` int(11) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL,
  `create_at_datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at_datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

-- --------------------------------------------------------

--
-- Table structure for table `sdbg_return_submisson`
--

CREATE TABLE `sdbg_return_submisson` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_documents`
--

CREATE TABLE `shipping_documents` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(4) NOT NULL,
  `user_type_id` int(4) NOT NULL,
  `ven_bill_submit` smallint(1) NOT NULL,
  `ven_bill_show` smallint(1) NOT NULL,
  `ven_bill_edit` smallint(1) NOT NULL,
  `ven_bill_received` smallint(1) NOT NULL,
  `ven_bill_certified` smallint(1) NOT NULL,
  `ven_bill_forward` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_type_id`, `ven_bill_submit`, `ven_bill_show`, `ven_bill_edit`, `ven_bill_received`, `ven_bill_certified`, `ven_bill_forward`) VALUES
(1, 1, 1, 1, 1, 0, 0, 0),
(2, 2, 0, 0, 0, 1, 1, 1),
(3, 3, 0, 0, 0, 1, 1, 1),
(4, 4, 0, 0, 0, 1, 1, 1),
(5, 5, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(4) NOT NULL,
  `user_type` varchar(60) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `updated_at` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='user type';

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `user_type`, `created_at`, `updated_at`) VALUES
(1, 'VENDOR', 1697106743, 1697106743),
(2, 'GRSE_DEPARTMENT', 1697106743, 1697106743),
(3, 'GRSE_BANKING', 1697106743, 1697106743),
(4, 'GRSE_FINANCE', 1697106743, 1697106743),
(5, 'ADMIN', 1697192466, 1697192466);

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
('00006007', 'Abhinit', 'Anand', 'abhinit.anand@datacoresystems.co.in'),
('00006008', 'Kamal', 'Ruidas', 'kamal.ruidas@datacoresystems.co.in'),
('50007545', 'Mrinmoy', 'Ghosh', 'mrinmoygh081@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `wdc`
--

CREATE TABLE `wdc` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zbts`
--

CREATE TABLE `zbts` (
  `MANDT` varchar(3) DEFAULT NULL,
  `ZBTNO` varchar(11) NOT NULL,
  `RERDAT` date DEFAULT current_timestamp(),
  `RERZET` time DEFAULT current_timestamp(),
  `RERNAM` varchar(12) DEFAULT NULL,
  `RLAEDA` date DEFAULT NULL,
  `RCTIME` time DEFAULT NULL,
  `RAENAM` varchar(12) DEFAULT NULL,
  `LIFNR` varchar(10) DEFAULT NULL,
  `ZVBNO` varchar(40) DEFAULT NULL,
  `VEN_BILL_DATE` date DEFAULT NULL,
  `EBELN` varchar(10) DEFAULT NULL,
  `DPERNR1` int(8) DEFAULT NULL,
  `DRERDAT1` date DEFAULT NULL,
  `DRERZET1` time DEFAULT NULL,
  `DRERNAM1` varchar(12) DEFAULT NULL,
  `DPERNR2` int(8) DEFAULT NULL,
  `DRERDAT2` date DEFAULT NULL,
  `DRERZET2` time DEFAULT NULL,
  `DRERNAM2` varchar(12) DEFAULT NULL,
  `DAERDAT` date DEFAULT NULL,
  `DAERZET` time DEFAULT NULL,
  `DAERNAM` varchar(12) DEFAULT NULL,
  `DALAEDA` date DEFAULT NULL,
  `DAAENAM` varchar(12) DEFAULT NULL,
  `DEERDAT` date DEFAULT NULL,
  `DEERZET` time DEFAULT NULL,
  `DEERNAM` varchar(12) DEFAULT NULL,
  `DELAEDA` date DEFAULT NULL,
  `DEAENAM` varchar(12) DEFAULT NULL,
  `DFERDAT` date DEFAULT NULL,
  `DFERZET` time DEFAULT NULL,
  `DFERNAM` varchar(12) DEFAULT NULL,
  `DFLAEDA` date DEFAULT NULL,
  `DFAENAM` varchar(12) DEFAULT NULL,
  `ZRMK1` varchar(140) DEFAULT NULL,
  `DSTATUS` varchar(1) DEFAULT NULL,
  `FPERNR1` int(8) DEFAULT NULL,
  `ZRMK2` varchar(140) DEFAULT NULL,
  `FPERNR2` int(8) DEFAULT NULL,
  `ZDCOMMENT` varchar(255) DEFAULT NULL,
  `ZRMK3` varchar(140) DEFAULT NULL,
  `ZRMK4` varchar(140) DEFAULT NULL,
  `ZFCOMMENT` varchar(255) DEFAULT NULL,
  `FSTATUS` varchar(1) DEFAULT NULL,
  `BSTATUS` varchar(1) DEFAULT NULL,
  `UNITNO` varchar(4) DEFAULT NULL,
  `COMNO` varchar(3) DEFAULT NULL,
  `FRERDAT` date DEFAULT NULL,
  `FRERZET` time DEFAULT NULL,
  `FRERNAM` varchar(12) DEFAULT NULL,
  `FRLAEDA` date DEFAULT NULL,
  `FRAENAM` varchar(12) DEFAULT NULL,
  `FAERDAT` date DEFAULT NULL,
  `FAERZET` time DEFAULT NULL,
  `FAERNAM` varchar(12) DEFAULT NULL,
  `FALAEDA` date DEFAULT NULL,
  `FAAENAM` varchar(12) DEFAULT NULL,
  `FEERDAT` date DEFAULT NULL,
  `FEERZET` time DEFAULT NULL,
  `FEERNAM` varchar(12) DEFAULT NULL,
  `FELAEDA` date DEFAULT NULL,
  `FEAENAM` varchar(12) DEFAULT NULL,
  `FPERDAT` date DEFAULT NULL,
  `FPERZET` time DEFAULT NULL,
  `FPERNAM` varchar(12) DEFAULT NULL,
  `FPLAEDA` date DEFAULT NULL,
  `FPAENAM` varchar(12) DEFAULT NULL,
  `BPERDAT` date DEFAULT NULL,
  `BPERZET` time DEFAULT NULL,
  `BPERNAM` varchar(12) DEFAULT NULL,
  `BPLAEDA` date DEFAULT NULL,
  `BPAENAM` varchar(12) DEFAULT NULL,
  `HOLD` varchar(1) DEFAULT NULL,
  `ALERT_GM` varchar(1) DEFAULT NULL,
  `ALERT_DIR` varchar(1) DEFAULT NULL,
  `ALERT_AGM_DGM` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='BILL TRACKING SYSTEM';

--
-- Dumping data for table `zbts`
--

INSERT INTO `zbts` (`MANDT`, `ZBTNO`, `RERDAT`, `RERZET`, `RERNAM`, `RLAEDA`, `RCTIME`, `RAENAM`, `LIFNR`, `ZVBNO`, `VEN_BILL_DATE`, `EBELN`, `DPERNR1`, `DRERDAT1`, `DRERZET1`, `DRERNAM1`, `DPERNR2`, `DRERDAT2`, `DRERZET2`, `DRERNAM2`, `DAERDAT`, `DAERZET`, `DAERNAM`, `DALAEDA`, `DAAENAM`, `DEERDAT`, `DEERZET`, `DEERNAM`, `DELAEDA`, `DEAENAM`, `DFERDAT`, `DFERZET`, `DFERNAM`, `DFLAEDA`, `DFAENAM`, `ZRMK1`, `DSTATUS`, `FPERNR1`, `ZRMK2`, `FPERNR2`, `ZDCOMMENT`, `ZRMK3`, `ZRMK4`, `ZFCOMMENT`, `FSTATUS`, `BSTATUS`, `UNITNO`, `COMNO`, `FRERDAT`, `FRERZET`, `FRERNAM`, `FRLAEDA`, `FRAENAM`, `FAERDAT`, `FAERZET`, `FAERNAM`, `FALAEDA`, `FAAENAM`, `FEERDAT`, `FEERZET`, `FEERNAM`, `FELAEDA`, `FEAENAM`, `FPERDAT`, `FPERZET`, `FPERNAM`, `FPLAEDA`, `FPAENAM`, `BPERDAT`, `BPERZET`, `BPERNAM`, `BPLAEDA`, `BPAENAM`, `HOLD`, `ALERT_GM`, `ALERT_DIR`, `ALERT_AGM_DGM`) VALUES
('NAA', '20230920001', '2023-09-28', '13:23:49', 'DCG1', NULL, '08:45:00', NULL, '50007545', 'BILL-INV_001', '0000-00-00', '7800000040', 600947, '0000-00-00', '10:33:03', 'DCG1', 600947, '0000-00-00', '10:29:23', '600229', NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, '0000-00-00', '10:37:29', 'DCG1', NULL, NULL, NULL, '2', 600947, ' hjashjas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('NA', '20230920002', '0000-00-00', '13:23:15', 'DCG1', NULL, '00:00:00', NULL, '50007545', 'BILL-INV_002', '0000-00-00', '7800000040', 600229, NULL, '00:00:00', NULL, NULL, NULL, '00:00:00', NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('NA', '20230925001', '0000-00-00', '11:40:35', 'DCG1', NULL, '00:00:00', NULL, '50007545', 'BILL-INV_003', '0000-00-00', '7800000040', 600229, NULL, '00:00:00', NULL, NULL, NULL, '00:00:00', NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, '00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '', '0000-00-00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927001', NULL, NULL, 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927001', NULL, NULL, 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927001', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927002', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927002', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927007', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927008', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927009', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927009', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927011', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927011', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927013', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927013', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927015', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927016', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927017', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927018', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927019', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927020', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927021', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927022', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927023', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927024', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927025', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230927026', '2023-09-27', '00:00:00', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007545', 'bksingh', '2023-09-26', '7800000040', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'trycatch', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20230929001', '2023-09-29', '16:53:34', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007545', '234543212345t', '2023-09-13', '7800000040', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ee', '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231123001', '2023-11-23', '11:30:11', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231123002', '2023-11-23', '11:30:55', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zbtsd`
--

CREATE TABLE `zbtsd` (
  `SRNO` varchar(2) NOT NULL COMMENT 'Serial No',
  `MANNO` int(8) NOT NULL COMMENT 'GRSE MAN NO'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zbtsf`
--

CREATE TABLE `zbtsf` (
  `SRNO` varchar(2) NOT NULL COMMENT 'Serial No',
  `MANNO` int(8) NOT NULL COMMENT 'GRSE MAN NO'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Excemption List for Department Forward (Finanance MAN No)';

-- --------------------------------------------------------

--
-- Table structure for table `zbtsg`
--

CREATE TABLE `zbtsg` (
  `ZBTNO` varchar(11) NOT NULL COMMENT 'Bill Tracking Number',
  `ZGRNO` varchar(2) NOT NULL COMMENT 'Vendor BTS GR or Service No',
  `VGABE` varchar(1) DEFAULT NULL COMMENT 'Transaction/event type, purchase order history',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `MBLNR` varchar(10) DEFAULT NULL COMMENT 'Number of Material Document',
  `MJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `LBLNI` varchar(10) DEFAULT NULL COMMENT 'Entry Sheet Number',
  `AUGBL` varchar(10) DEFAULT NULL COMMENT 'Document Number of the Clearing Document',
  `OTHER` varchar(50) DEFAULT NULL COMMENT 'Other Receive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Vendor Bill Tracking GR, Service Sheet, MIRO';

--
-- Dumping data for table `zbtsg`
--

INSERT INTO `zbtsg` (`ZBTNO`, `ZGRNO`, `VGABE`, `EBELN`, `EBELP`, `MBLNR`, `MJAHR`, `LBLNI`, `AUGBL`, `OTHER`) VALUES
('20230929001', 'AB', 'X', '89293', 883, '003', 883, '9983', '7839', '3993'),
('20230929001', 'AB', 'X', '89293', 883, '003', 883, '9983', '7839', '3993'),
('20230929001', 'AB', 'X', '89293', 883, '003', 883, '9983', '7839', '3993'),
('20230929001', 'AB', 'X', '89293', 883, '003', 883, '9983', '7839', '3993'),
('5000231739', '', '', '7800000040', 10, '', 0, '1000127607', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `zbtsi`
--

CREATE TABLE `zbtsi` (
  `ZBTNO` varchar(11) NOT NULL COMMENT 'Bill Tracking Number',
  `ZGRNO` varchar(2) DEFAULT NULL COMMENT 'Vendor BTS GR or Service No',
  `ZIVNO` varchar(2) DEFAULT NULL COMMENT '	Vendor BTS Invoice Verification No',
  `BELNR` varchar(10) DEFAULT NULL COMMENT 'Document Number of an Invoice Document',
  `GJAHR` int(4) DEFAULT NULL COMMENT 'Fiscal Year',
  `AUGBL` varchar(10) DEFAULT NULL COMMENT 'Document Number of the Clearing Document'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Not Used Vendor Bill Tracking MIRO and Invoice Verification';

-- --------------------------------------------------------

--
-- Table structure for table `zbtsm`
--

CREATE TABLE `zbtsm` (
  `MANTD` varchar(3) DEFAULT NULL,
  `ZBTNO` varchar(11) NOT NULL COMMENT '	Bill Tracking Number',
  `SRNO` varchar(2) DEFAULT NULL COMMENT 'Serial No',
  `MANNO` int(8) DEFAULT NULL COMMENT 'GRSE MAN NO',
  `ZSECTION` varchar(1) DEFAULT NULL COMMENT 'GRSE BTS SECTION',
  `RMK` varchar(140) DEFAULT NULL COMMENT 'Remarks',
  `ERDAT` date DEFAULT current_timestamp() COMMENT 'Date on Which Record Was Created',
  `ERZET` time DEFAULT current_timestamp() COMMENT 'Entry time',
  `ERNAM` varchar(12) DEFAULT NULL COMMENT 'Name of Person who Created the Object',
  `DRETSEQ` varchar(10) DEFAULT NULL COMMENT '	Department Return Sequence',
  `ALERT_STATUS` varchar(1) DEFAULT NULL COMMENT 'BTS Email Alert Status'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='ZBTSM table (SAP TABLE COPY)';

--
-- Dumping data for table `zbtsm`
--

INSERT INTO `zbtsm` (`MANTD`, `ZBTNO`, `SRNO`, `MANNO`, `ZSECTION`, `RMK`, `ERDAT`, `ERZET`, `ERNAM`, `DRETSEQ`, `ALERT_STATUS`) VALUES
('NA', '20230920001', '1', 600229, '1', NULL, '0000-00-00', '13:23:49', 'DCG1', NULL, NULL),
('NA', '20230920001', '2', 600229, '2', NULL, '0000-00-00', '13:25:44', 'DCG1', NULL, NULL),
('NA', '20230920001', '3', 600229, '2', NULL, '0000-00-00', '10:28:08', 'DCG1', NULL, NULL),
('NA', '20230920001', '4', 600947, '2', NULL, '0000-00-00', '10:28:51', 'DCG1', NULL, NULL),
(NULL, '20230920001', 'N', 0, '1', 'REMARKS', '2023-10-03', '15:32:21', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', 'N/', 0, '1', 'REMARKS', '2023-10-03', '15:30:14', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:36:46', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:36:47', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:38:40', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:40:26', 'LOGIN USER N', '1', 'O'),
(NULL, '20230920001', '', 0, '1', 'REMARKS', '2023-10-03', '15:40:43', 'LOGIN USER N', '1', 'O');

-- --------------------------------------------------------

--
-- Table structure for table `zmilestone`
--

CREATE TABLE `zmilestone` (
  `MANDT` int(3) NOT NULL COMMENT 'Client',
  `MID` char(3) NOT NULL COMMENT 'Milestone Id',
  `MTEXT` char(60) NOT NULL COMMENT 'Milestone Text'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zpo_milestone`
--

CREATE TABLE `zpo_milestone` (
  `MANDT` int(3) NOT NULL COMMENT 'Client',
  `EBELN` char(10) NOT NULL COMMENT 'Purchasing Document Number',
  `MID` char(3) NOT NULL COMMENT 'Milestone Id',
  `MTEXT` char(60) NOT NULL COMMENT 'Milestone Text',
  `PLAN_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Plan Date',
  `MO` char(1) NOT NULL COMMENT 'Mandatory/optional'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zpo_milestone`
--

INSERT INTO `zpo_milestone` (`MANDT`, `EBELN`, `MID`, `MTEXT`, `PLAN_DATE`, `MO`) VALUES
(0, 'QQ00013227', '1', 'CONTRACTUAL SDBG/IB SUBMISSION DATE', '2023-11-01 18:30:00', 'M'),
(0, 'QQ00013227', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2023-11-02 18:30:00', 'O'),
(1, '4700013227', '1', 'CONTRACTUAL SDBG/IB SUBMISSION DATE', '2023-10-31 18:30:00', 'M'),
(1, '4700013227', '2', 'CONTRACTUAL DRAWING SUBMISSION DATE', '2023-11-08 18:30:00', 'M'),
(1, '4700013227', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2023-11-04 18:30:00', 'M'),
(1, '7800000040', '1', 'CONTRACTUAL SDBG/IB SUBMISSION DATE', '2023-10-31 18:30:00', 'M'),
(1, '7800000040', '2', 'CONTRACTUAL DRAWING SUBMISSION DATE', '2023-11-08 18:30:00', 'O'),
(1, '7800000040', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2023-11-04 18:30:00', 'M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_drawing`
--
ALTER TABLE `add_drawing`
  ADD PRIMARY KEY (`drawing_id`);

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
-- Indexes for table `ekko`
--
ALTER TABLE `ekko`
  ADD PRIMARY KEY (`EBELN`);

--
-- Indexes for table `inspection_call_letter`
--
ALTER TABLE `inspection_call_letter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lfa1`
--
ALTER TABLE `lfa1`
  ADD PRIMARY KEY (`LIFNR`);

--
-- Indexes for table `makt`
--
ALTER TABLE `makt`
  ADD PRIMARY KEY (`MANDT`,`MATNR`,`SPRAS`);

--
-- Indexes for table `new_auth`
--
ALTER TABLE `new_auth`
  ADD PRIMARY KEY (`auth_id`);

--
-- Indexes for table `new_payments`
--
ALTER TABLE `new_payments`
  ADD PRIMARY KEY (`sl_no`);

--
-- Indexes for table `new_sdbg`
--
ALTER TABLE `new_sdbg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `po`
--
ALTER TABLE `po`
  ADD PRIMARY KEY (`po_id`);

--
-- Indexes for table `qap_submission`
--
ALTER TABLE `qap_submission`
  ADD PRIMARY KEY (`drawing_id`);

--
-- Indexes for table `sdbg_acknowledgement`
--
ALTER TABLE `sdbg_acknowledgement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdbg_return_submisson`
--
ALTER TABLE `sdbg_return_submisson`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_documents`
--
ALTER TABLE `shipping_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendor_id`);

--
-- Indexes for table `wdc`
--
ALTER TABLE `wdc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zbtsi`
--
ALTER TABLE `zbtsi`
  ADD PRIMARY KEY (`ZBTNO`),
  ADD UNIQUE KEY `ZGRNO` (`ZGRNO`);

--
-- Indexes for table `zmilestone`
--
ALTER TABLE `zmilestone`
  ADD PRIMARY KEY (`MANDT`,`MID`);

--
-- Indexes for table `zpo_milestone`
--
ALTER TABLE `zpo_milestone`
  ADD PRIMARY KEY (`MANDT`,`EBELN`,`MID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_drawing`
--
ALTER TABLE `add_drawing`
  MODIFY `drawing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bill_registration`
--
ALTER TABLE `bill_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `inspection_call_letter`
--
ALTER TABLE `inspection_call_letter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `new_auth`
--
ALTER TABLE `new_auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `new_payments`
--
ALTER TABLE `new_payments`
  MODIFY `sl_no` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `new_sdbg`
--
ALTER TABLE `new_sdbg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `qap_submission`
--
ALTER TABLE `qap_submission`
  MODIFY `drawing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sdbg_acknowledgement`
--
ALTER TABLE `sdbg_acknowledgement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sdbg_return_submisson`
--
ALTER TABLE `sdbg_return_submisson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_documents`
--
ALTER TABLE `shipping_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wdc`
--
ALTER TABLE `wdc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
