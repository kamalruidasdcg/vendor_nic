-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2024 at 11:02 AM
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
-- Table structure for table `actualsubmissiondate`
--

CREATE TABLE `actualsubmissiondate` (
  `id` int(5) NOT NULL,
  `purchasing_doc_no` varchar(10) NOT NULL,
  `milestoneId` int(2) NOT NULL,
  `milestoneText` text NOT NULL,
  `actualSubmissionDate` bigint(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `actualsubmissiondate`
--

INSERT INTO `actualsubmissiondate` (`id`, `purchasing_doc_no`, `milestoneId`, `milestoneText`, `actualSubmissionDate`, `created_at`, `created_by_id`) VALUES
(1, '4000234569', 2, 'ACTUAL DRAWING SUBMISSION DATE', 1708757077577, 1708757092818, '600400'),
(2, '7800000047', 1, 'ACTUAL SDBG SUBMISSION DATE', 1708757077577, 1708757092818, '600400'),
(3, '7800000047', 3, 'ACTUAL QAP SUBMISSION DATE', 1708757077577, 1708757092818, '600400'),
(4, '7800000047', 4, 'ACTUAL ILMS SUBMISSION DATE', 1708757077577, 1708757092818, '600400');

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

--
-- Dumping data for table `adr6`
--

INSERT INTO `adr6` (`ADDRNUMBER`, `PERSNUMBER`, `DATE_FROM`, `CONSNUMBER`, `FLGDEFAULT`, `FLG_NOUSE`, `HOME_FLAG`, `SMTP_ADDR`, `SMTP_SRCH`, `DFT_RECEIV`, `R3_USER`, `ENCODE`, `TNEF`, `VALID_FROM`, `VALID_TO`) VALUES
('42033', '50000437', '2023-01-01', 1, NULL, NULL, NULL, 'kamal.ruidas@datacoresystems.co.in', 'mainak.dutta16@gmail', '', '', '', '', '2023-01-01', '2030-01-01'),
('65373', '50005041', '2023-01-01', 1, 'X', NULL, 'X', 'mainak.dutta@datacoresystems.co.in', 'mainak.dutta', 'X', '', '', '', '2023-01-01', '2030-01-01'),
('42033', '50007545', '2023-01-01', 2, NULL, NULL, NULL, 'mrinmoy.ghosh102@gmail.com', 'mrinmoy.ghosh102@gma', '', '', '', '', '2023-01-01', '2030-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `archive_emails`
--

CREATE TABLE `archive_emails` (
  `id` bigint(20) NOT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `email_to` varchar(255) NOT NULL,
  `email_subject` varchar(255) NOT NULL,
  `email_cc` varchar(255) DEFAULT NULL,
  `email_bcc` varchar(255) DEFAULT NULL,
  `email_body` varchar(4000) NOT NULL,
  `email_send_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(10) NOT NULL,
  `created_on` date NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(10) DEFAULT NULL,
  `modified_on` date DEFAULT NULL,
  `attachemnt_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='email_send table';

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `user_type` int(3) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `internal_role_id` int(11) DEFAULT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(45) NOT NULL,
  `vendor_code` varchar(25) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login_time` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `user_type`, `department_id`, `internal_role_id`, `username`, `password`, `name`, `vendor_code`, `datetime`, `last_login_time`) VALUES
(1, 5, 12, 3, 'admin', 'admin@213', 'Mrinmoy Ghosh', '600233', '2023-09-12 10:25:51', NULL),
(2, 1, 1, 1, 'vendor', '1234', 'Vendor1', '50007545', '2023-10-12 15:55:23', NULL),
(3, 1, 0, 0, 'vendor2', '1234', 'Vendor2', '50000435', '2023-10-12 15:56:56', NULL),
(4, 3, 3, 2, '600231', '1234', 'grse qap staff', '600231', '2023-10-12 15:57:39', NULL),
(5, 4, 3, 1, '600229', '1234', 'grse qap assigner', '600229', '2023-10-12 15:58:16', NULL),
(6, 6, 13, 4, 'super_admin', '0000', 'Kamal Ruidas', '600230', '2023-09-12 10:25:51', NULL),
(7, 2, 3, 2, '600947', '1234', 'grse qap staff', '600947', '2023-10-12 15:58:16', NULL),
(8, 2, 3, 2, '600948', '1234', 'grse qap staff', '600948', '2023-10-12 15:58:16', NULL),
(9, 2, 3, 2, '600232', '1234', 'grse qap staff', '600232', '2023-10-12 15:58:16', NULL),
(10, 2, 3, 2, '600233', '1234', 'grse qap staff', '600233', '2023-10-12 15:58:16', NULL),
(11, 2, 3, 2, '600949', '1234', 'grse qap staff', '600949', '2023-10-12 15:58:16', NULL),
(12, 2, 3, 2, '600951', '1234', 'grse qap staff', '600951', '2023-10-12 15:58:16', NULL),
(13, 2, 3, 2, '600953', '1234', 'grse qap staff', '600953', '2023-10-12 15:58:16', NULL),
(14, 2, 3, 2, '600950', '1234', 'grse qap staff', '600950', '2023-10-12 15:58:16', NULL),
(15, 2, 3, 2, '600252', '1234', 'grse qap staff', '600252', '2023-10-12 15:58:16', NULL),
(16, 0, 14, NULL, 'PPC user', '1234', 'ppc_user', '600100', '2024-01-15 14:08:08', NULL),
(18, 0, 15, 1, 'grse_FINANCE_ASSIGNER', '1234', 'grse_FINANCE_ASSIGNER', '600200', '2024-01-23 16:44:53', NULL),
(19, 0, 16, 0, 'RIC', '1234', 'grse_RIC', '600300', '2024-01-23 16:44:53', NULL),
(20, 0, 15, 2, 'grse_FINANCE_STAFF', '1234', 'grse_FINANCE_STAFF', '600201', '2024-01-23 16:44:53', NULL),
(21, 0, 17, 1, 'Po dealing officer', '1234', 'Po dealing officer', '493834', '2024-01-23 16:44:53', NULL),
(22, 2, 2, 1, 'CDO(drawing officer)', '1234', 'CDO(drawing officer)', '600400', '2024-01-23 16:44:53', NULL),
(23, 0, 15, 2, 'grse_FINANCE_STAFF', '1234', 'grse_FINANCE_STAFF', '600202', '2024-01-23 16:44:53', NULL),
(24, 0, 15, 2, 'grse_FINANCE_STAFF', '1234', 'grse_FINANCE_STAFF', '600203', '2024-01-23 16:44:53', NULL);

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
-- Table structure for table `department_wise_log`
--

CREATE TABLE `department_wise_log` (
  `id` int(11) NOT NULL,
  `user_id` int(8) NOT NULL,
  `vendor_code` varchar(10) DEFAULT NULL,
  `depertment` varchar(100) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `dept_table_id` int(11) DEFAULT NULL,
  `remarks` text NOT NULL,
  `purchasing_doc_no` varchar(10) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department_wise_log`
--

INSERT INTO `department_wise_log` (`id`, `user_id`, `vendor_code`, `depertment`, `action`, `dept_table_id`, `remarks`, `purchasing_doc_no`, `created_at`, `created_by_id`) VALUES
(7, 50007545, '50007545', '3', 'PENDING', 10, 'QAP uploaded . . ', '4800001795', 1704105973, '50007545'),
(8, 600229, '50007545', '1', 'ASSIGNED', 1, 'sdbg assingned', '4800001795', 1704537973, '600229'),
(9, 600231, '50007545', '3', 'REJECTED', 12, 'QAP  REJECTED', '4800001795', 1702987058141, '600231'),
(10, 50007545, '50007545', '3', 'RE_SUBMITTED', 13, 'QAP uploaded . . ', '4800001795', 1702987787360, '50007545'),
(11, 50007545, '50007545', '3', 'RE_SUBMITTED', 14, 'QAP uploaded . . ', '4800001795', 1702987790056, '50007545'),
(12, 50007545, '50007545', '3', 'RE_SUBMITTED', 15, 'QAP uploaded . . ', '4800001795', 1702987791069, '50007545'),
(13, 50007545, '50007545', '3', 'RE_SUBMITTED', 16, 'QAP uploaded . . ', '4800001795', 1702987791845, '50007545'),
(14, 50007545, '50007545', '3', 'RE_SUBMITTED', 17, 'QAP uploaded . . ', '4800001795', 1702987792569, '50007545'),
(15, 600231, '50007545', '3', 'ACCEPTED', 18, 'QAP ACCEPTED . . . . ', '4800001795', 1702988034657, '600231'),
(16, 600231, '50007545', '3', 'APPROVED', 19, 'QAP  APPROVED .......', '4800001795', 1702988098157, '600231'),
(17, 50007545, '50007545', '3', 'PENDING', 20, 'QAP uploaded . . ', '4800001795', 1703053565425, '50007545'),
(18, 50007545, '50007545', '3', 'PENDING', 24, 'QAP uploaded . . ', '4800001795', 1703054719006, '50007545'),
(19, 50007545, '50007545', '3', 'RE_SUBMITTED', 25, 'QAP uploaded . . ', '4800001795', 1703054735094, '50007545'),
(20, 50007545, '50007545', '3', 'RE_SUBMITTED', 26, 'QAP uploaded . . ', '4800001795', 1703056033021, '50007545'),
(21, 50007545, '50007545', '3', 'PENDING', 27, 'QAP uploaded . . ', '4800001795', 1703056044279, '50007545'),
(22, 50007545, '50007545', '3', 'PENDING', 28, 'QAP uploaded . . ', '4800001795', 1703057319647, '50007545'),
(23, 50007545, '50007545', '3', 'PENDING', 29, 'QAP uploaded . . ', '4800001795', 1703057344803, '50007545'),
(24, 50007545, '50007545', '3', 'PENDING', 30, 'QAP uploaded . . ', '4800001795', 1703057390217, '50007545'),
(25, 50007545, '50007545', '3', 'RE_SUBMITTED', 31, 'QAP uploaded . . ', '4800001795', 1703057483988, '50007545'),
(26, 50007545, '50007545', '3', 'PENDING', 32, 'QAP uploaded . . ', '4800001795', 1703064235003, '50007545'),
(27, 50007545, '50007545', '3', 'PENDING', 33, 'QAP uploaded . . ', '4800001795', 1703064364255, '50007545'),
(28, 50007545, '50007545', '3', 'PENDING', 34, 'QAP uploaded . . ', '4800001795', 1703064496500, '50007545'),
(29, 50007545, '50007545', '3', 'PENDING', 35, 'QAP uploaded . . ', '4800001795', 1703065452796, '50007545'),
(30, 50007545, '50007545', '3', 'PENDING', 4, 'QAP uploaded . . ', '4800001795', 1703132525947, '50007545'),
(31, 600229, '50007545', '3', 'ASSIGNED', 5, 'QAP ASSIGN ', '4800001795', 1703132550336, '600229'),
(32, 600229, '50007545', '3', 'ASSIGNED', 6, 'QAP ASSIGN ', '4800001795', 1703132618912, '600229'),
(33, 600229, '50007545', '3', 'ASSIGNED', 7, 'QAP ASSIGN ', '4800001795', 1703133868612, '600229'),
(34, 600229, '50007545', '3', 'ASSIGNED', 8, 'QAP ASSIGN ', '4800001795', 1703134836244, '600229'),
(35, 600231, '50007545', '3', 'REJECTED', 9, 'QAP  REJECTED', '4800001795', 1703135338176, '600231'),
(36, 50007545, '50007545', '3', 'RE_SUBMITTED', 11, 'QAP uploaded . . ', '4800001795', 1703135469587, '50007545'),
(37, 600229, '50007545', '3', 'ASSIGNED', 12, 'QAP ASSIGN ', '4800001795', 1703135706322, '600229'),
(38, 600229, '50007545', '3', 'ACCEPTED', 13, 'QAP ACCEPTED . . . . ', '4800001795', 1703135719932, '600229'),
(39, 600229, '50007545', '3', 'APPROVED', 14, 'QAP  APPROVED .......', '4800001795', 1703135744897, '600229'),
(40, 50007545, '50007545', '3', 'PENDING', 15, 'QAP uploaded . . ', '4800001795', 1703143894338, '50007545'),
(41, 50000435, '50005041', '3', 'PENDING', 16, 'Vendor upload sdbg', '4765476434', 1704272766110, '50000435'),
(42, 50000435, '50005041', '3', 'PENDING', 17, 'Vendor upload sdbg', '4765476434', 1704273023796, '50000435'),
(43, 50007545, '50007545', '3', 'PENDING', 18, 'QAP uploaded . . ', '4800001795', 1704450933032, '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `depertment_master`
--

CREATE TABLE `depertment_master` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `depertment_master`
--

INSERT INTO `depertment_master` (`id`, `name`) VALUES
(1, 'SDBG'),
(2, 'DRAWING'),
(3, 'QAP'),
(5, 'STORE'),
(6, 'USER'),
(7, 'OTH'),
(8, 'NCM'),
(9, 'PAYMENT_RECOMMENDATION'),
(10, 'VENDOR'),
(11, 'PAYMENT_VOUCHER'),
(12, 'ADMIN'),
(13, 'SUPER_ADMIN'),
(14, 'PPC'),
(15, 'FINANCE'),
(16, 'RIC'),
(17, 'PURCHASE');

-- --------------------------------------------------------

--
-- Table structure for table `drawing`
--

CREATE TABLE `drawing` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `actionTypeId` int(2) DEFAULT NULL,
  `actionType` varchar(100) DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `drawing`
--

INSERT INTO `drawing` (`id`, `purchasing_doc_no`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `actionTypeId`, `actionType`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '4000234569', '1708757077569-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50005041', 'uploads\\submitDrawing\\1708757077569-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', NULL, NULL, 'VENDOR', 1708757077577, '50005041'),
(2, '4000234569', '1708757092806-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50005041', 'uploads\\submitDrawing\\1708757092806-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'APPROVED', NULL, NULL, 'GRSE', 1708757092818, '600400');

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
  `EINDT` date NOT NULL COMMENT 'Item Delivery Date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eket`
--

INSERT INTO `eket` (`EBELN`, `EBELP`, `ETENR`, `EINDT`) VALUES
('2100010812', 10, 1, '2014-03-14'),
('2100010812', 20, 1, '2014-03-15'),
('4700013227', 10, 1, '2015-07-24'),
('4700013553', 10, 1, '2016-07-04'),
('4700013553', 15, 1, '2016-04-30'),
('4700013553', 20, 1, '2016-04-30'),
('4700013553', 30, 1, '2016-04-30'),
('4700013553', 40, 1, '2016-04-30'),
('4700013553', 50, 1, '2016-04-30'),
('4700016027', 10, 1, '2016-04-29'),
('4800001795', 10, 1, '2013-04-15'),
('4800003580', 10, 1, '2014-03-22'),
('4800003580', 20, 1, '2014-04-15');

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
('4000234569', '5788', 'S', 'ABCD', 'W', '2024-02-27', '34567656787', '50000437', '1234', '123');

-- --------------------------------------------------------

--
-- Table structure for table `ekpo`
--

CREATE TABLE `ekpo` (
  `C_PKEY` varchar(16) NOT NULL,
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document\r\n Number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of\r\n Purchasing Document',
  `LOEKZ` varchar(1) DEFAULT NULL COMMENT 'Deletion Indicator in\r\n Purchasing Document',
  `STATU` varchar(1) DEFAULT NULL COMMENT 'RFQ status',
  `AEDAT` date DEFAULT NULL COMMENT 'Purchasing Document\r\n Item Change Date',
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

INSERT INTO `ekpo` (`C_PKEY`, `EBELN`, `EBELP`, `LOEKZ`, `STATU`, `AEDAT`, `TXZ01`, `MATNR`, `BUKRS`, `WERKS`, `LGORT`, `MATKL`, `KTMNG`, `MENGE`, `MEINS`, `NETPR`, `NETWR`, `MWSKZ`) VALUES
('4000234569-10023', '4000234569', 10, 'W', '1', NULL, 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('4000234569-88', '4000234569', 20, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG');

-- --------------------------------------------------------

--
-- Table structure for table `emails`
--

CREATE TABLE `emails` (
  `id` int(11) NOT NULL COMMENT 'Mail Id',
  `event` varchar(255) NOT NULL,
  `sender` varchar(255) NOT NULL COMMENT 'Mail sender Mail Id',
  `subject` text NOT NULL COMMENT 'Mail Subject',
  `body` text NOT NULL COMMENT 'Mail Body',
  `status` varchar(20) NOT NULL COMMENT 'Mail Status',
  `message` text NOT NULL COMMENT 'success / error message',
  `created_at` bigint(20) NOT NULL COMMENT 'Created time (epoch time)',
  `creatd_by_name` varchar(255) NOT NULL COMMENT 'Creator Name',
  `created_by_id` varchar(255) NOT NULL COMMENT 'Creator Id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emp_department_list`
--

CREATE TABLE `emp_department_list` (
  `id` int(11) NOT NULL,
  `dept_name` varchar(20) NOT NULL,
  `dept_id` varchar(5) NOT NULL,
  `internal_role_id` int(11) DEFAULT NULL,
  `sub_dept_name` varchar(20) DEFAULT NULL,
  `sub_dept_id` varchar(20) DEFAULT NULL,
  `emp_id` varchar(8) NOT NULL,
  `privilege_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='department  and sub dept list table';

--
-- Dumping data for table `emp_department_list`
--

INSERT INTO `emp_department_list` (`id`, `dept_name`, `dept_id`, `internal_role_id`, `sub_dept_name`, `sub_dept_id`, `emp_id`, `privilege_id`) VALUES
(1, 'QAP', '3', 2, 'hull', '1', '600229', 5),
(2, 'QAP', '3', 2, 'electrical', '2', '600947', 5),
(3, 'QAP', '3', 2, 'hull', '1', '600231', 5),
(4, 'QAP', '3', 2, 'electrical', '2', '600948', 5),
(5, 'QAP', '3', 2, 'hull', '1', '600232', 5),
(7, 'QAP', '3', 2, 'machinery', '3', '600233', 5),
(8, 'QAP', '3', 2, 'electrical', '2', '600949', 5),
(9, 'QAP', '3', 2, 'plumbing', '4', '600951', 5),
(10, 'QAP', '3', 2, 'plumbing', '4', '600953', 5),
(11, 'QAP', '3', 2, 'plumbing', '4', '600950', 5),
(12, 'QAP', '3', 2, 'machinery', '3', '600252', 5),
(13, 'FINANCE', '15', 2, '', '', '600201', 0),
(14, 'FINANCE', '15', 2, '', '', '600202', 0),
(15, 'FINANCE', '15', 2, '', '', '600203', 5);

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
-- Table structure for table `gate_entry`
--

CREATE TABLE `gate_entry` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `document_type` varchar(40) NOT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gate_entry`
--

INSERT INTO `gate_entry` (`id`, `purchasing_doc_no`, `vendor_code`, `document_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '4700013229', '50000437', '', '1702463200499-sample.pdf', 'uploads\\gateentry\\1702463200499-sample.pdf', NULL, '', '', 1702463200503, 'A RAJA BANERJEE', '600231'),
(2, '8989898989', '50000437', '', '1704264556295-sample.pdf', 'uploads\\gateentry\\1704264556295-sample.pdf', NULL, '', '', 1704264556296, 'A RAJA BANERJEE', '600231'),
(3, '8989898989', '50000437', '', '1704265634708-sample.pdf', 'uploads\\gateentry\\1704265634708-sample.pdf', NULL, '', '', 1704265634710, 'A RAJA BANERJEE', '600231');

-- --------------------------------------------------------

--
-- Table structure for table `grn`
--

CREATE TABLE `grn` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `document_type` varchar(40) NOT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grn`
--

INSERT INTO `grn` (`id`, `purchasing_doc_no`, `vendor_code`, `document_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '4700013229', '50000437', '', '1702463128903-sample.pdf', 'uploads\\grn\\1702463128903-sample.pdf', NULL, '', '', 1702463128911, 'A RAJA BANERJEE', '600231'),
(2, '4700013229', '50000437', '', '1704264462977-sample.pdf', 'uploads\\grn\\1704264462977-sample.pdf', NULL, '', '', 1704264462979, 'A RAJA BANERJEE', '600231'),
(3, '4700013229', '50000437', '', '1704265637863-sample.pdf', 'uploads\\grn\\1704265637863-sample.pdf', NULL, '', '', 1704265637871, 'A RAJA BANERJEE', '600231'),
(4, '4700013229', '50000437', '', '1706515684131-setup ftp server in Linux server.pdf', 'uploads\\grn\\1706515684131-setup ftp server in Linux server.pdf', NULL, '', '', 1706515684142, 'A RAJA BANERJEE', '600231'),
(5, '4700013229', '50000437', '', '1706516032727-setup ftp server in Linux server.pdf', 'uploads\\grn\\1706516032727-setup ftp server in Linux server.pdf', NULL, '', '', 1706516032743, 'A RAJA BANERJEE', '600231');

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
-- Table structure for table `icgrn`
--

CREATE TABLE `icgrn` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `document_type` varchar(40) NOT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `icgrn`
--

INSERT INTO `icgrn` (`id`, `purchasing_doc_no`, `vendor_code`, `document_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '2100010812', 'V1', 'Gate In Entry', '1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'SUBMITTED', 'VENDOR', 1699252952514, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(2, '7800000040', 'V1', 'Goods Receipt', '1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'Uploading Drawing', 'SUBMITTED', 'VENDOR', 1699253015750, 'XYZ Pvt. Ltd.', 'XYZ@gmai.com'),
(3, '4700013227', 'V1', 'ICGRN Report', '1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'SUBMITTED', 'VENDOR', 1699253037643, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(4, '34567876556', '23114', 'Gate In Entry', '1699598638506-sample.pdf', 'uploads\\drawing\\1699598638506-sample.pdf', 'accepted', 'SUBMITTED', 'GRSE', 1699598638509, 'Abhinit ', '6380'),
(5, '4700013229', '50000437', '', '1702463162497-sample.pdf', 'uploads\\icgrn\\1702463162497-sample.pdf', NULL, '', '', 1702463162504, 'A RAJA BANERJEE', '600231'),
(6, '8989898989', '50000437', '', '1704264415313-sample.pdf', 'uploads\\icgrn\\1704264415313-sample.pdf', NULL, '', '', 1704264415316, 'A RAJA BANERJEE', '600231'),
(7, '8989898989', '50000437', '', '1704265641516-sample.pdf', 'uploads\\icgrn\\1704265641516-sample.pdf', NULL, '', '', 1704265641518, 'A RAJA BANERJEE', '600231');

-- --------------------------------------------------------

--
-- Table structure for table `ilms`
--

CREATE TABLE `ilms` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL,
  `updated_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

-- --------------------------------------------------------

--
-- Table structure for table `inspection_call_letter`
--

CREATE TABLE `inspection_call_letter` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_type_id` varchar(100) NOT NULL,
  `file_type_name` varchar(255) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspection_call_letter`
--

INSERT INTO `inspection_call_letter` (`id`, `purchasing_doc_no`, `file_name`, `file_type_id`, `file_type_name`, `vendor_code`, `file_path`, `remarks`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '4700013227', '1700647390698-t.c.pdf', '0', '', '09383HAL', 'uploads\\inspectionCallLetter\\1700647390698-t.c.pdf', 'BAHAMAS MISSILE DRAWING4', 'VENDOR', 1700647390969, '09383HAL'),
(8, '47654764345', '1704276529024-eket.pdf', '0', '', '50005041', 'uploads\\inspectionCallLetter\\1704276529024-eket.pdf', 'Vendor upload sdbg', 'GRSE', 1704276529126, '6804'),
(9, '13141411411', '1706505366118-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\1706505366118-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706505366130, '600232'),
(10, '13141411411', '1706505450498-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\1706505450498-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706505450510, '600232'),
(11, '13141411411', '1706505783390-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\1706505783390-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706505783396, '600232'),
(12, '13141411411', '1706506059315-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\inspectionCallLetter\\1706506059315-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706506059320, '600232'),
(13, '13141411411', '1706506095850-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\inspectionCallLetter\\1706506095850-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706506095851, '600232'),
(14, '13141411411', '1706517824595-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\inspectionCallLetter\\1706517824595-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706517824602, '600232'),
(15, '13141411411', '1706524822832-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\inspectionCallLetter\\1706524822832-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706524822841, '600232'),
(16, '13141411411', '1706594417130-setup ftp server in Linux server.pdf', '1', 'my file', '600232', 'uploads\\inspectionCallLetter\\1706594417130-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706594417135, '600232'),
(17, '13141411411', NULL, '1', 'my file', '600232', NULL, 'new', 'GRSE', 1706679523511, '600232'),
(18, '13141411411', NULL, '1', 'my file', '600252', NULL, 'new', 'GRSE', 1708756554370, '600252');

-- --------------------------------------------------------

--
-- Table structure for table `inspection_call_letter_file_type`
--

CREATE TABLE `inspection_call_letter_file_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspection_call_letter_file_type`
--

INSERT INTO `inspection_call_letter_file_type` (`id`, `name`) VALUES
(1, 'File type 1'),
(2, 'File type 2'),
(3, 'File type 3'),
(4, 'File type 4');

-- --------------------------------------------------------

--
-- Table structure for table `internal_role_master`
--

CREATE TABLE `internal_role_master` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `internal_role_master`
--

INSERT INTO `internal_role_master` (`id`, `name`) VALUES
(1, 'ASSIGNER'),
(2, 'STAFF'),
(3, 'ADMIN'),
(4, 'SUPER_ADMIN'),
(5, 'GENERAL');

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
  `ZZVENVALDT` date NOT NULL,
  `EMAIL` varchar(241) DEFAULT NULL,
  `PHONE` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `lfa1`
--

INSERT INTO `lfa1` (`LIFNR`, `LAND1`, `NAME1`, `ORT01`, `ORT02`, `PFACH`, `REGIO`, `KTOKK`, `LOEVM_X`, `SPRAS`, `STCD1`, `TELFX`, `STCD3`, `ZZVENVALDT`, `EMAIL`, `PHONE`) VALUES
('50000437', 'IN', 'TATA STEEL LTD', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAAFA1890Q', '033 2282 1687', '24AAAFA1890Q1Z9', '0000-00-00', NULL, NULL),
('50005041', 'IN', 'PriceWaterhouseCoopers Pvt Ltd', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AABCP9181H', NULL, '19AABCP9181H1Z1', '0000-00-00', NULL, NULL),
('50007545', 'IN', 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00', NULL, NULL),
('50007560', '900', 'dcg', 'ddd', 'jjdjd', 'kkkk', 'jjj', 'jeje', 'X', 'uuuu', '876545678', '9876789876', '6677882', '2024-02-24', NULL, NULL),
('50007561', '900', 'dcg', 'ddd', 'jjdjd', 'kkkk', 'jjj', 'jeje', 'y', 'AAAAA', '876545678', '9876789876', '6677882', '2024-02-24', NULL, NULL),
('50007562', '900', 'dcg', 'ddd', 'jjdjd', 'kkkk', 'jjj', 'jeje', 'y', 'uuuu', '876545678', '9876789876', '6677882', '2024-02-24', NULL, NULL),
('600229', 'IN', 'naskar sir', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `makt`
--

CREATE TABLE `makt` (
  `MATNR` char(18) NOT NULL COMMENT 'Material Number',
  `SPRAS` varchar(1) NOT NULL COMMENT 'Language Key',
  `MAKTX` char(40) NOT NULL COMMENT 'Material Description (Short Text)',
  `MAKTG` char(40) NOT NULL COMMENT 'Material description in upper case for matchcodes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `makt`
--

INSERT INTO `makt` (`MATNR`, `SPRAS`, `MAKTX`, `MAKTG`) VALUES
('XXXXX', '5', 'S', 'desctiption');

-- --------------------------------------------------------

--
-- Table structure for table `mara`
--

CREATE TABLE `mara` (
  `MATNR` varchar(18) NOT NULL COMMENT 'Material Number',
  `MTART` varchar(4) NOT NULL COMMENT 'Material Type'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Material General Table';

--
-- Dumping data for table `mara`
--

INSERT INTO `mara` (`MATNR`, `MTART`) VALUES
('000000015114117149', 'ZROH'),
('000000015128076737', 'ZROH'),
('9200MAT', 'ZDIN'),
('9200SPARE-28', 'ZDIN'),
('9200SPARE18', 'ZDIN'),
('SER08205', 'ZDIN'),
('SER08206', 'ZDIN'),
('XXXXX', 'ZDIN');

-- --------------------------------------------------------

--
-- Table structure for table `mkpf`
--

CREATE TABLE `mkpf` (
  `C_PKEY` varchar(15) NOT NULL,
  `MBLNR` varchar(10) NOT NULL COMMENT 'Number of Material Document',
  `MJAHR` int(4) NOT NULL COMMENT 'Material Document Year',
  `VGART` varchar(2) DEFAULT NULL COMMENT 'Transaction/Event Type',
  `BLART` varchar(2) DEFAULT NULL COMMENT 'Document Type',
  `BLAUM` varchar(2) DEFAULT NULL COMMENT 'Document type of revaluation document',
  `BLDAT` date DEFAULT NULL COMMENT 'Document Date in Document',
  `BUDAT` date DEFAULT NULL COMMENT 'Posting Date in the Document',
  `CPUDT` date DEFAULT NULL COMMENT 'Day On Which Accounting Document Was Entered',
  `CPUTM` time DEFAULT NULL COMMENT 'Time of Entry',
  `AEDAT` date DEFAULT NULL COMMENT 'Last Changed On',
  `USNAM` varchar(12) DEFAULT NULL COMMENT 'User Name',
  `TCODE` varchar(4) DEFAULT NULL COMMENT 'Not More Closely Defined Area, Possibly Used for Patchlevels',
  `XBLNR` varchar(16) DEFAULT NULL COMMENT 'Reference Document Number',
  `BKTXT` varchar(25) DEFAULT NULL COMMENT 'Document Header Text',
  `FRATH` varchar(13) DEFAULT NULL COMMENT 'Unplanned delivery costs',
  `FRBNR` varchar(16) DEFAULT NULL COMMENT 'Number of Bill of Lading at Time of Goods Receipt',
  `WEVER` varchar(1) DEFAULT NULL COMMENT 'Version for Printing GR/GI Slip',
  `XABLN` varchar(10) DEFAULT NULL COMMENT 'Goods Receipt/Issue Slip Number',
  `AWSYS` varchar(10) DEFAULT NULL COMMENT 'Logical System',
  `BLA2D` varchar(2) DEFAULT NULL COMMENT 'Doc. type for additional doc. in purchase account management',
  `TCODE2` varchar(20) DEFAULT NULL COMMENT 'Transaction Code',
  `BFWMS` varchar(1) DEFAULT NULL COMMENT 'Control posting for external WMS',
  `EXNUM` varchar(10) DEFAULT NULL COMMENT 'Number of foreign trade data in MM and SD documents',
  `SPE_BUDAT_UHR` time DEFAULT NULL COMMENT 'Time of Goods Issue (Local, Relating to a Plant)',
  `SPE_BUDAT_ZONE` varchar(6) DEFAULT NULL COMMENT 'Time Zone',
  `LE_VBELN` varchar(10) DEFAULT NULL COMMENT 'Delivery',
  `SPE_LOGSYS` varchar(10) DEFAULT NULL COMMENT 'Logical System of EWM Material Document',
  `SPE_MDNUM_EWM` varchar(16) DEFAULT NULL COMMENT 'Number of Material Document in EWM',
  `GTS_CUSREF_NO` varchar(35) DEFAULT NULL COMMENT 'Customs Reference Number for Scrapping',
  `FLS_RSTO` varchar(1) DEFAULT NULL COMMENT 'Store Return with Inbound and Outbound Delivery',
  `MSR_ACTIVE` varchar(1) DEFAULT NULL COMMENT 'Advanced Returns Management Active',
  `KNUMV` varchar(10) DEFAULT NULL COMMENT 'Number of the document condition'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mkpf`
--

INSERT INTO `mkpf` (`C_PKEY`, `MBLNR`, `MJAHR`, `VGART`, `BLART`, `BLAUM`, `BLDAT`, `BUDAT`, `CPUDT`, `CPUTM`, `AEDAT`, `USNAM`, `TCODE`, `XBLNR`, `BKTXT`, `FRATH`, `FRBNR`, `WEVER`, `XABLN`, `AWSYS`, `BLA2D`, `TCODE2`, `BFWMS`, `EXNUM`, `SPE_BUDAT_UHR`, `SPE_BUDAT_ZONE`, `LE_VBELN`, `SPE_LOGSYS`, `SPE_MDNUM_EWM`, `GTS_CUSREF_NO`, `FLS_RSTO`, `MSR_ACTIVE`, `KNUMV`) VALUES
('1000001009-2002', '1000001009', 2002, 'S', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001009-unde', '1000001009', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001010-2002', '1000001010', 2002, 'y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001010-unde', '1000001010', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mrs`
--

CREATE TABLE `mrs` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) DEFAULT NULL,
  `document_type` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mrs`
--

INSERT INTO `mrs` (`id`, `purchasing_doc_no`, `document_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '2233445', '1', NULL, NULL, 'new', 'SUBMIT', 'GRSE', 1706868184785, '493834'),
(2, '2233445', '1', NULL, NULL, 'new', 'SUBMIT', 'GRSE', 1706868301442, '493834'),
(3, '2233445', '1', NULL, NULL, 'new', 'SUBMIT', 'GRSE', 1706868454093, '493834'),
(4, '2233445', '1', '1706868465313-Flow chart- Service PO (1).pdf', 'uploads\\mrs\\1706868465313-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706868465319, '493834'),
(5, '2233445', '1', '1706871008838-Flow chart- Service PO (1).pdf', 'uploads\\mrs\\1706871008838-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871008840, '493834');

-- --------------------------------------------------------

--
-- Table structure for table `mseg`
--

CREATE TABLE `mseg` (
  `C_PKEY` varchar(20) NOT NULL,
  `MBLNR` varchar(10) NOT NULL COMMENT 'Number of Material Document',
  `MJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `ZEILE` int(4) DEFAULT NULL COMMENT 'Item in Material Document',
  `LINE_ID` int(6) DEFAULT NULL COMMENT 'Unique identification of document line',
  `PARENT_ID` int(6) DEFAULT NULL COMMENT 'Identifier of immediately superior line',
  `LINE_DEPTH` int(2) DEFAULT NULL COMMENT 'Hierarchy level of line in document',
  `MAA_URZEI` int(4) DEFAULT NULL COMMENT 'Original Line for Account Assignment Item in Material Doc.',
  `BWART` varchar(3) DEFAULT NULL COMMENT 'Movement Type (Inventory Management)',
  `XAUTO` varchar(1) DEFAULT NULL COMMENT 'Item automatically created',
  `MATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `WERKS` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `LGORT` varchar(4) DEFAULT NULL COMMENT 'Storage Location',
  `CHARG` varchar(10) DEFAULT NULL COMMENT 'Batch Number',
  `INSMK` varchar(1) DEFAULT NULL COMMENT 'Stock Type',
  `ZUSCH` varchar(1) DEFAULT NULL COMMENT 'Batch status key',
  `ZUSTD` varchar(1) DEFAULT NULL COMMENT 'Batch in Restricted-Use Stock',
  `SOBKZ` varchar(1) DEFAULT NULL COMMENT 'Special Stock Indicator',
  `LIFNR` varchar(10) DEFAULT NULL COMMENT 'Supplier''s Account Number',
  `KUNNR` varchar(10) DEFAULT NULL COMMENT 'Account number of customer',
  `KDAUF` varchar(10) DEFAULT NULL COMMENT 'Sales Order Number',
  `KDPOS` int(6) DEFAULT NULL COMMENT 'Item Number in Sales Order',
  `KDEIN` int(4) DEFAULT NULL COMMENT 'Delivery schedule for sales order',
  `PLPLA` varchar(10) DEFAULT NULL COMMENT 'Distribution of Differences',
  `SHKZG` varchar(1) DEFAULT NULL COMMENT 'Debit/Credit Indicator',
  `WAERS` varchar(5) DEFAULT NULL COMMENT 'Currency Key',
  `DMBTR` varchar(13) DEFAULT NULL COMMENT 'Amount in local currency',
  `BNBTR` varchar(13) DEFAULT NULL COMMENT 'Delivery costs in local currency',
  `BUALT` varchar(13) DEFAULT NULL COMMENT 'Amount Posted in Alternative Price Control',
  `SHKUM` varchar(1) DEFAULT NULL COMMENT 'Debit/credit indicator in revaluation',
  `DMBUM` varchar(13) DEFAULT NULL COMMENT 'Revaluation amount on back-posting to a previous period',
  `BWTAR` varchar(10) DEFAULT NULL COMMENT 'Valuation Type',
  `MENGE` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `MEINS` varchar(3) DEFAULT NULL COMMENT 'Base Unit of Measure',
  `ERFMG` bigint(13) DEFAULT NULL COMMENT 'Quantity in unit of entry',
  `ERFME` varchar(3) DEFAULT NULL COMMENT 'Unit of entry',
  `BPMNG` bigint(13) DEFAULT NULL COMMENT 'Quantity in Purchase Order Price Unit',
  `BPRME` varchar(3) DEFAULT NULL COMMENT 'Order Price Unit (Purchasing)',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchase order number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `LFBJA` int(4) DEFAULT NULL COMMENT 'Fiscal Year of a Reference Document',
  `LFBNR` varchar(10) DEFAULT NULL COMMENT 'Document No. of a Reference Document',
  `LFPOS` int(4) DEFAULT NULL COMMENT 'Item of a Reference Document',
  `SJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `SMBLN` varchar(10) DEFAULT NULL COMMENT 'Number of Material Document',
  `SMBLP` int(4) DEFAULT NULL COMMENT 'Item in Material Document',
  `ELIKZ` varchar(1) DEFAULT NULL COMMENT 'Delivery Completed Indicator',
  `SGTXT` varchar(50) DEFAULT NULL COMMENT 'Item Text',
  `EQUNR` varchar(18) DEFAULT NULL COMMENT 'Equipment Number',
  `WEMPF` varchar(12) DEFAULT NULL COMMENT 'Goods recipient',
  `ABLAD` varchar(25) DEFAULT NULL COMMENT 'Unloading Point',
  `GSBER` varchar(4) DEFAULT NULL COMMENT 'Business Area',
  `KOKRS` varchar(4) DEFAULT NULL COMMENT 'Controlling Area',
  `PARGB` varchar(4) DEFAULT NULL COMMENT 'Trading partner''s business area',
  `PARBU` varchar(4) DEFAULT NULL COMMENT 'Clearing company code',
  `KOSTL` varchar(10) DEFAULT NULL COMMENT 'Cost Center',
  `PROJN` varchar(16) DEFAULT NULL COMMENT 'Old: Project number : No longer used --> PS_POSNR',
  `AUFNR` varchar(12) DEFAULT NULL COMMENT 'Order Number',
  `ANLN1` varchar(12) DEFAULT NULL COMMENT 'Main Asset Number',
  `ANLN2` varchar(4) DEFAULT NULL COMMENT 'Asset Subnumber',
  `XSKST` varchar(1) DEFAULT NULL COMMENT 'Indicator: Statistical Posting to Cost Center',
  `XSAUF` varchar(1) DEFAULT NULL COMMENT 'Indicator: Posting to Order Is Statistical',
  `XSPRO` varchar(1) DEFAULT NULL COMMENT 'Indicator: Posting to Project Is Statistical',
  `XSERG` varchar(1) DEFAULT NULL COMMENT 'Indicator: Posting to Profitability Analysis Is Statistical',
  `GJAHR` int(4) DEFAULT NULL COMMENT 'Fiscal Year',
  `XRUEM` varchar(1) DEFAULT NULL COMMENT 'Allow Posting to Previous Period (Backposting)',
  `XRUEJ` varchar(1) DEFAULT NULL COMMENT 'Indicator: post to previous year',
  `BUKRS` varchar(4) DEFAULT NULL COMMENT 'Company Code',
  `BELNR` varchar(10) DEFAULT NULL COMMENT 'Document Number of an Accounting Document',
  `BUZEI` int(3) DEFAULT NULL COMMENT 'Number of Line Item Within Accounting Document',
  `BELUM` varchar(10) DEFAULT NULL COMMENT 'Document Number of an Accounting Document',
  `BUZUM` int(3) DEFAULT NULL COMMENT 'Number of Line Item Within Accounting Document',
  `RSNUM` int(10) DEFAULT NULL COMMENT 'Number of reservation/dependent requirements',
  `RSPOS` int(4) DEFAULT NULL COMMENT 'Item Number of Reservation / Dependent Requirements',
  `KZEAR` varchar(1) DEFAULT NULL COMMENT 'Final Issue for Reservation',
  `PBAMG` bigint(13) DEFAULT NULL COMMENT 'Quantity',
  `KZSTR` varchar(1) DEFAULT NULL COMMENT 'Transaction/event is relevant to statistics',
  `UMMAT` varchar(18) DEFAULT NULL COMMENT 'Receiving/Issuing Material',
  `UMWRK` varchar(4) DEFAULT NULL COMMENT 'Receiving plant/issuing plant',
  `UMLGO` varchar(4) DEFAULT NULL COMMENT 'Receiving/issuing storage location',
  `UMCHA` varchar(10) DEFAULT NULL COMMENT 'Receiving/Issuing Batch',
  `UMZST` varchar(1) DEFAULT NULL COMMENT 'Status of Transfer Batch',
  `UMZUS` varchar(1) DEFAULT NULL COMMENT 'Status key of transfer batch',
  `UMBAR` varchar(10) DEFAULT NULL COMMENT 'Valuation Type of Transfer Batch',
  `UMSOK` varchar(1) DEFAULT NULL COMMENT 'Special stock indicator for physical stock transfer',
  `KZBEW` varchar(1) DEFAULT NULL COMMENT 'Movement Indicator',
  `KZVBR` varchar(1) DEFAULT NULL COMMENT 'Consumption posting',
  `KZZUG` varchar(1) DEFAULT NULL COMMENT 'Receipt Indicator',
  `WEUNB` varchar(1) DEFAULT NULL COMMENT 'Goods Receipt, Non-Valuated',
  `PALAN` decimal(11,2) DEFAULT NULL COMMENT 'WMS Number of pallets',
  `LGNUM` varchar(3) DEFAULT NULL COMMENT 'Warehouse Number / Warehouse Complex',
  `LGTYP` varchar(3) DEFAULT NULL COMMENT 'Storage Type',
  `LGPLA` varchar(10) DEFAULT NULL COMMENT 'Storage Bin',
  `BESTQ` varchar(1) DEFAULT NULL COMMENT 'Stock Category in the Warehouse Management System',
  `BWLVS` int(3) DEFAULT NULL COMMENT 'Movement Type for Warehouse Management',
  `TBNUM` int(10) DEFAULT NULL COMMENT 'Transfer Requirement Number',
  `TBPOS` int(4) DEFAULT NULL COMMENT 'Transfer Requirement Item',
  `XBLVS` varchar(1) DEFAULT NULL COMMENT 'Indicator: posting in warehouse management system',
  `VSCHN` varchar(1) DEFAULT NULL COMMENT 'Ind: interim storage posting for source stor.type and bin',
  `NSCHN` varchar(1) DEFAULT NULL COMMENT 'Ind.: interim storage posting for dest.stor.type and bin',
  `DYPLA` varchar(1) DEFAULT NULL COMMENT 'Indicator: dynamic storage bin',
  `UBNUM` int(10) DEFAULT NULL COMMENT 'Posting Change Number',
  `TBPRI` varchar(1) DEFAULT NULL COMMENT 'Transfer Priority',
  `TANUM` int(10) DEFAULT NULL COMMENT 'Transfer Order Number',
  `WEANZ` int(3) DEFAULT NULL COMMENT 'Number of GR/GI Slips to Be Printed',
  `GRUND` int(4) DEFAULT NULL COMMENT 'Reason for Movement',
  `EVERS` varchar(2) DEFAULT NULL COMMENT 'Shipping Instructions',
  `EVERE` varchar(2) DEFAULT NULL COMMENT 'Compliance with Shipping Instructions',
  `IMKEY` varchar(8) DEFAULT NULL COMMENT 'Internal Key for Real Estate Object',
  `KSTRG` varchar(12) DEFAULT NULL COMMENT 'Cost Object',
  `PAOBJNR` int(10) DEFAULT NULL COMMENT 'Profitability Segment Number (CO-PA)',
  `PRCTR` varchar(10) DEFAULT NULL COMMENT 'Profit Center',
  `PS_PSP_PNR` int(8) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)',
  `NPLNR` varchar(12) DEFAULT NULL COMMENT 'Network Number for Account Assignment',
  `AUFPL` int(10) DEFAULT NULL COMMENT 'Routing number of operations in the order',
  `APLZL` int(8) DEFAULT NULL COMMENT 'Internal counter',
  `AUFPS` int(4) DEFAULT NULL COMMENT 'Order item number',
  `VPTNR` varchar(10) DEFAULT NULL COMMENT 'Partner account number',
  `FIPOS` varchar(14) DEFAULT NULL COMMENT 'Commitment Item',
  `SAKTO` varchar(10) DEFAULT NULL COMMENT 'G/L Account Number',
  `BSTMG` bigint(13) DEFAULT NULL COMMENT 'Goods receipt quantity in order unit',
  `BSTME` varchar(3) DEFAULT NULL COMMENT 'Purchase Order Unit of Measure',
  `XWSBR` varchar(1) DEFAULT NULL COMMENT 'Reversal of GR allowed for GR-based IV despite invoice',
  `EMLIF` varchar(10) DEFAULT NULL COMMENT 'Vendor to be supplied/who is to receive delivery',
  `EXBWR` varchar(13) DEFAULT NULL COMMENT 'Externally Entered Posting Amount in Local Currency',
  `VKWRT` varchar(13) DEFAULT NULL COMMENT 'Value at Sales Prices Including Value-Added Tax',
  `AKTNR` varchar(10) DEFAULT NULL COMMENT 'Promotion',
  `ZEKKN` int(2) DEFAULT NULL COMMENT 'Sequential Number of Account Assignment',
  `VFDAT` date DEFAULT NULL COMMENT 'Shelf Life Expiration or Best-Before Date',
  `CUOBJ_CH` bigint(18) DEFAULT NULL COMMENT 'Internal object number of the batch classification',
  `EXVKW` varchar(13) DEFAULT NULL COMMENT 'Externally Entered Sales Value in Local Currency',
  `PPRCTR` varchar(10) DEFAULT NULL COMMENT 'Partner Profit Center',
  `RSART` varchar(1) DEFAULT NULL COMMENT 'Record type',
  `GEBER` varchar(10) DEFAULT NULL COMMENT 'Fund',
  `FISTL` varchar(16) DEFAULT NULL COMMENT 'Funds Center',
  `MATBF` varchar(18) DEFAULT NULL COMMENT 'Material in Respect of Which Stock is Managed',
  `UMMAB` varchar(18) DEFAULT NULL COMMENT 'Receiving/Issuing Material',
  `BUSTM` varchar(4) DEFAULT NULL COMMENT 'Posting string for quantities',
  `BUSTW` varchar(4) DEFAULT NULL COMMENT 'Posting String for Values',
  `MENGU` varchar(1) DEFAULT NULL COMMENT 'Quantity Updating in Material Master Record',
  `WERTU` varchar(1) DEFAULT NULL COMMENT 'Value Updating in Material Master Record',
  `LBKUM` bigint(13) DEFAULT NULL COMMENT 'Total valuated stock before the posting',
  `SALK3` varchar(13) DEFAULT NULL COMMENT 'Value of total valuated stock before the posting',
  `VPRSV` varchar(1) DEFAULT NULL COMMENT 'Price control indicator',
  `FKBER` varchar(16) DEFAULT NULL COMMENT 'Functional Area',
  `DABRBZ` date DEFAULT NULL COMMENT 'Reference date for settlement',
  `VKWRA` date DEFAULT NULL COMMENT 'Value at sales prices excluding value-added tax',
  `DABRZ` date DEFAULT NULL COMMENT 'Reference date for settlement',
  `XBEAU` varchar(1) DEFAULT NULL COMMENT 'Purchase order created at time of goods receipt',
  `LSMNG` bigint(13) DEFAULT NULL COMMENT 'Quantity in Unit of Measure from Delivery Note',
  `LSMEH` varchar(3) DEFAULT NULL COMMENT 'Unit of Measure From Delivery Note',
  `KZBWS` varchar(1) DEFAULT NULL COMMENT 'Valuation of Special Stock',
  `QINSPST` varchar(1) DEFAULT NULL COMMENT 'Status of Goods Receipt Inspection',
  `URZEI` int(4) DEFAULT NULL COMMENT 'Original line in material document',
  `J_1BEXBASE` varchar(13) DEFAULT NULL COMMENT 'Alternate base amount in document currency',
  `MWSKZ` varchar(2) DEFAULT NULL COMMENT 'Tax on Sales/Purchases Code',
  `TXJCD` varchar(15) DEFAULT NULL COMMENT 'Tax Jurisdiction',
  `EMATN` varchar(18) DEFAULT NULL COMMENT 'Material number corresponding to manufacturer part number',
  `J_1AGIRUPD` varchar(1) DEFAULT NULL COMMENT 'Goods issue revaluation performed',
  `VKMWS` varchar(2) DEFAULT NULL COMMENT 'Tax on Sales/Purchases Code',
  `HSDAT` date DEFAULT NULL COMMENT 'Date of Manufacture',
  `BERKZ` varchar(1) DEFAULT NULL COMMENT 'Material Staging Indicator for Production Supply',
  `MAT_KDAUF` varchar(10) DEFAULT NULL COMMENT 'Sales order number of valuated sales order stock',
  `MAT_KDPOS` int(6) DEFAULT NULL COMMENT 'Sales Order Item of Valuated Sales Order Stock',
  `MAT_PSPNR` int(8) DEFAULT NULL COMMENT 'Valuated Sales Order Stock WBS Element',
  `XWOFF` varchar(1) DEFAULT NULL COMMENT 'Calculation of val. open',
  `BEMOT` varchar(2) DEFAULT NULL COMMENT 'Accounting Indicator',
  `PRZNR` varchar(12) DEFAULT NULL COMMENT 'Business Process',
  `LLIEF` varchar(10) DEFAULT NULL COMMENT 'Supplying Vendor',
  `LSTAR` varchar(6) DEFAULT NULL COMMENT 'Activity Type',
  `XOBEW` varchar(1) DEFAULT NULL COMMENT 'Vendor Stock Valuation Indicator',
  `GRANT_NBR` varchar(20) DEFAULT NULL COMMENT 'Grant',
  `ZUSTD_T156M` varchar(1) DEFAULT NULL COMMENT 'Stock Type Modification (Read from Table T156M)',
  `SPE_GTS_STOCK_TY` varchar(1) DEFAULT NULL COMMENT 'GTS Stock Type',
  `KBLNR` varchar(10) DEFAULT NULL COMMENT 'Document Number for Earmarked Funds',
  `KBLPOS` int(3) DEFAULT NULL COMMENT 'Earmarked Funds: Document Item',
  `XMACC` varchar(1) DEFAULT NULL COMMENT 'Multiple Account Assignment',
  `VGART_MKPF` varchar(2) DEFAULT NULL COMMENT 'Transaction/Event Type',
  `BUDAT_MKPF` date DEFAULT NULL COMMENT 'Posting Date in the Document',
  `CPUDT_MKPF` date DEFAULT NULL COMMENT 'Day On Which Accounting Document Was Entered',
  `CPUTM_MKPF` time DEFAULT NULL COMMENT 'Time of Entry',
  `USNAM_MKPF` varchar(12) DEFAULT NULL COMMENT 'User Name',
  `XBLNR_MKPF` varchar(16) DEFAULT NULL COMMENT 'Reference Document Number',
  `TCODE2_MKPF` varchar(20) DEFAULT NULL COMMENT 'Transaction Code',
  `VBELN_IM` varchar(10) DEFAULT NULL COMMENT 'Delivery',
  `VBELP_IM` int(6) DEFAULT NULL COMMENT 'Delivery Item',
  `SGT_SCAT` varchar(16) DEFAULT NULL COMMENT 'Stock Segment',
  `SGT_UMSCAT` varchar(16) DEFAULT NULL COMMENT 'Receiving/Issuing Stock Segment',
  `SGT_RCAT` varchar(16) DEFAULT NULL COMMENT 'Requirement Segment',
  `DISUB_OWNER` varchar(10) DEFAULT NULL COMMENT 'Owner of stock',
  `FSH_SEASON_YEAR` varchar(4) DEFAULT NULL COMMENT 'Season Year',
  `FSH_SEASON` varchar(4) DEFAULT NULL COMMENT 'Season',
  `FSH_COLLECTION` varchar(2) DEFAULT NULL COMMENT 'Fashion Collection',
  `FSH_THEME` varchar(4) DEFAULT NULL COMMENT 'Fashion Theme',
  `FSH_UMSEA_YR` varchar(4) DEFAULT NULL COMMENT 'Receiving/Issuing Season Year',
  `FSH_UMSEA` varchar(4) DEFAULT NULL COMMENT 'Receiving/Issuing Season',
  `FSH_UMCOLL` varchar(2) DEFAULT NULL COMMENT 'Receiving/Issuing Collection',
  `FSH_UMTHEME` varchar(4) DEFAULT NULL COMMENT 'Receiving/Issuing Theme',
  `SGT_CHINT` varchar(1) DEFAULT NULL COMMENT 'Discrete Batch Number',
  `FSH_DEALLOC_QTY` bigint(13) DEFAULT NULL COMMENT 'ARun Allocated Quantity',
  `OINAVNW` varchar(13) DEFAULT NULL COMMENT 'Non-deductible input tax',
  `OICONDCOD` varchar(2) DEFAULT NULL COMMENT 'Joint Venture Indicator (Condition Key)',
  `CONDI` varchar(2) DEFAULT NULL COMMENT 'Joint Venture Indicator (Condition Key)',
  `WRF_CHARSTC1` varchar(18) DEFAULT NULL COMMENT 'Characteristic Value 1',
  `WRF_CHARSTC2` varchar(18) DEFAULT NULL COMMENT 'Characteristic Value 2',
  `WRF_CHARSTC3` varchar(18) DEFAULT NULL COMMENT 'Characteristic Value 3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mseg`
--

INSERT INTO `mseg` (`C_PKEY`, `MBLNR`, `MJAHR`, `ZEILE`, `LINE_ID`, `PARENT_ID`, `LINE_DEPTH`, `MAA_URZEI`, `BWART`, `XAUTO`, `MATNR`, `WERKS`, `LGORT`, `CHARG`, `INSMK`, `ZUSCH`, `ZUSTD`, `SOBKZ`, `LIFNR`, `KUNNR`, `KDAUF`, `KDPOS`, `KDEIN`, `PLPLA`, `SHKZG`, `WAERS`, `DMBTR`, `BNBTR`, `BUALT`, `SHKUM`, `DMBUM`, `BWTAR`, `MENGE`, `MEINS`, `ERFMG`, `ERFME`, `BPMNG`, `BPRME`, `EBELN`, `EBELP`, `LFBJA`, `LFBNR`, `LFPOS`, `SJAHR`, `SMBLN`, `SMBLP`, `ELIKZ`, `SGTXT`, `EQUNR`, `WEMPF`, `ABLAD`, `GSBER`, `KOKRS`, `PARGB`, `PARBU`, `KOSTL`, `PROJN`, `AUFNR`, `ANLN1`, `ANLN2`, `XSKST`, `XSAUF`, `XSPRO`, `XSERG`, `GJAHR`, `XRUEM`, `XRUEJ`, `BUKRS`, `BELNR`, `BUZEI`, `BELUM`, `BUZUM`, `RSNUM`, `RSPOS`, `KZEAR`, `PBAMG`, `KZSTR`, `UMMAT`, `UMWRK`, `UMLGO`, `UMCHA`, `UMZST`, `UMZUS`, `UMBAR`, `UMSOK`, `KZBEW`, `KZVBR`, `KZZUG`, `WEUNB`, `PALAN`, `LGNUM`, `LGTYP`, `LGPLA`, `BESTQ`, `BWLVS`, `TBNUM`, `TBPOS`, `XBLVS`, `VSCHN`, `NSCHN`, `DYPLA`, `UBNUM`, `TBPRI`, `TANUM`, `WEANZ`, `GRUND`, `EVERS`, `EVERE`, `IMKEY`, `KSTRG`, `PAOBJNR`, `PRCTR`, `PS_PSP_PNR`, `NPLNR`, `AUFPL`, `APLZL`, `AUFPS`, `VPTNR`, `FIPOS`, `SAKTO`, `BSTMG`, `BSTME`, `XWSBR`, `EMLIF`, `EXBWR`, `VKWRT`, `AKTNR`, `ZEKKN`, `VFDAT`, `CUOBJ_CH`, `EXVKW`, `PPRCTR`, `RSART`, `GEBER`, `FISTL`, `MATBF`, `UMMAB`, `BUSTM`, `BUSTW`, `MENGU`, `WERTU`, `LBKUM`, `SALK3`, `VPRSV`, `FKBER`, `DABRBZ`, `VKWRA`, `DABRZ`, `XBEAU`, `LSMNG`, `LSMEH`, `KZBWS`, `QINSPST`, `URZEI`, `J_1BEXBASE`, `MWSKZ`, `TXJCD`, `EMATN`, `J_1AGIRUPD`, `VKMWS`, `HSDAT`, `BERKZ`, `MAT_KDAUF`, `MAT_KDPOS`, `MAT_PSPNR`, `XWOFF`, `BEMOT`, `PRZNR`, `LLIEF`, `LSTAR`, `XOBEW`, `GRANT_NBR`, `ZUSTD_T156M`, `SPE_GTS_STOCK_TY`, `KBLNR`, `KBLPOS`, `XMACC`, `VGART_MKPF`, `BUDAT_MKPF`, `CPUDT_MKPF`, `CPUTM_MKPF`, `USNAM_MKPF`, `XBLNR_MKPF`, `TCODE2_MKPF`, `VBELN_IM`, `VBELP_IM`, `SGT_SCAT`, `SGT_UMSCAT`, `SGT_RCAT`, `DISUB_OWNER`, `FSH_SEASON_YEAR`, `FSH_SEASON`, `FSH_COLLECTION`, `FSH_THEME`, `FSH_UMSEA_YR`, `FSH_UMSEA`, `FSH_UMCOLL`, `FSH_UMTHEME`, `SGT_CHINT`, `FSH_DEALLOC_QTY`, `OINAVNW`, `OICONDCOD`, `CONDI`, `WRF_CHARSTC1`, `WRF_CHARSTC2`, `WRF_CHARSTC3`) VALUES
('1000001009-5788-1002', '1000001009', 5788, 1002, 677677, NULL, NULL, NULL, '221', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001010-5788-1002', '1000001010', 5788, 1002, 677679, NULL, NULL, NULL, '221', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001011-5788-1002', '1000001011', 5788, 1002, 677677, 888888, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001012-5788-1002', '1000001012', 5788, 1002, 677679, 777777, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001013-5788-1002', '1000001013', 5788, 1002, 677679, 678909, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('1000001014-5788-1002', '1000001014', 5788, 1002, 677677, 888888, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `created_by_id` varchar(50) NOT NULL,
  `created_by_name` varchar(50) NOT NULL,
  `bill_submit_date` date NOT NULL,
  `bill_submit_to_email` varchar(50) NOT NULL,
  `bill_submit_to_name` varchar(50) NOT NULL,
  `bill_submit_time` time NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `invoice_no` varchar(40) NOT NULL,
  `purchasing_doc_no` varchar(10) NOT NULL,
  `remarks` varchar(140) NOT NULL,
  `vendor_code` varchar(10) NOT NULL,
  `vendor_email` varchar(50) NOT NULL,
  `vendor_name` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `new_bill_registration`
--

INSERT INTO `new_bill_registration` (`zbtno`, `created_by_id`, `created_by_name`, `bill_submit_date`, `bill_submit_to_email`, `bill_submit_to_name`, `bill_submit_time`, `created_at`, `file_name`, `file_path`, `invoice_no`, `purchasing_doc_no`, `remarks`, `vendor_code`, `vendor_email`, `vendor_name`) VALUES
('20231221006', 'KB', '6804', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 0, '1703155584999-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703155584999-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50000435', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221007', 'KB', '6804', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 0, '1703155625899-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703155625899-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50000435', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221008', 'KB', '6804', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 0, '1703155626996-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703155626996-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50000435', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221009', 'KB', '6804', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 0, '1703155627975-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703155627975-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50000435', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221010', 'KB', '6804', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 0, '1703155659136-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703155659136-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221011', 'KB', '6804', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 0, '1703155660202-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703155660202-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221012', 'KB', '6804', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 0, '1703155661225-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703155661225-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221013', 'KB', '6804', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 1703156604503, '1703156604487-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703156604487-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221014', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 1703157024317, '1703157024270-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703157024270-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221015', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 1703157051558, '1703157051511-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703157051511-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221016', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 1703157215590, '1703157215544-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703157215544-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20231221017', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'kamal ruidas', '11:20:34', 1703158032509, '1703158032453-ZFI_BGM_1.pdf', 'uploads\\invoice\\1703158032453-ZFI_BGM_1.pdf', '123232344', '8765678987', 'new gengrated bill', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240103003', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1704273977157, '1704273977151-sample.pdf', 'uploads\\invoice\\1704273977151-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240103004', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1704273989966, '1704273989959-sample.pdf', 'uploads\\invoice\\1704273989959-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125001', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161370995, '1706161370967-sample.pdf', 'uploads\\invoice\\1706161370967-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125502', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161533337, '1706161533164-sample.pdf', 'uploads\\invoice\\1706161533164-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125503', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161538244, '1706161538228-sample.pdf', 'uploads\\invoice\\1706161538228-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125504', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161545195, '1706161545172-sample.pdf', 'uploads\\invoice\\1706161545172-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125505', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161546879, '1706161546864-sample.pdf', 'uploads\\invoice\\1706161546864-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125506', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161548016, '1706161548006-sample.pdf', 'uploads\\invoice\\1706161548006-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125507', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161548985, '1706161548973-sample.pdf', 'uploads\\invoice\\1706161548973-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125508', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161549905, '1706161549877-sample.pdf', 'uploads\\invoice\\1706161549877-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125509', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161550882, '1706161550870-sample.pdf', 'uploads\\invoice\\1706161550870-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125510', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161551845, '1706161551832-sample.pdf', 'uploads\\invoice\\1706161551832-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125511', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161552731, '1706161552720-sample.pdf', 'uploads\\invoice\\1706161552720-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125512', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161553664, '1706161553644-sample.pdf', 'uploads\\invoice\\1706161553644-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125513', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161554420, '1706161554409-sample.pdf', 'uploads\\invoice\\1706161554409-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125514', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161555242, '1706161555232-sample.pdf', 'uploads\\invoice\\1706161555232-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125515', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161556040, '1706161556028-sample.pdf', 'uploads\\invoice\\1706161556028-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125516', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161566071, '1706161566050-sample.pdf', 'uploads\\invoice\\1706161566050-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125517', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161567406, '1706161567398-sample.pdf', 'uploads\\invoice\\1706161567398-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125518', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161568204, '1706161568193-sample.pdf', 'uploads\\invoice\\1706161568193-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125519', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161568846, '1706161568828-sample.pdf', 'uploads\\invoice\\1706161568828-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240125520', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1706161569761, '1706161569738-sample.pdf', 'uploads\\invoice\\1706161569738-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG'),
('20240219502', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1708322133179, '1708322133168-Flow chart- Service PO (1).pdf', 'uploads\\invoice\\1708322133168-Flow chart- Service PO (1).pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG');

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
(97, NULL, 'contactors_name 6', '121315', 126, 238, 250, 67881, 87883, 878987, 78791, 8792, 87678992, 878992, NULL, NULL, NULL, 'REMARKS _6', '2023-10-11 11:31:48', 'kamal', '2456789', '1', '2023-10-11 17:01:48', NULL, NULL),
(98, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:52:52', NULL, NULL, NULL, '2024-02-19 14:22:52', NULL, NULL),
(99, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:52:52', NULL, NULL, NULL, '2024-02-19 14:22:52', NULL, NULL),
(100, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:52:52', NULL, NULL, NULL, '2024-02-19 14:22:52', NULL, NULL),
(101, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:52:52', NULL, NULL, NULL, '2024-02-19 14:22:52', NULL, NULL),
(102, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:52:52', NULL, NULL, NULL, '2024-02-19 14:22:52', NULL, NULL),
(103, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:53:25', NULL, NULL, NULL, '2024-02-19 14:23:25', NULL, NULL),
(104, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:53:25', NULL, NULL, NULL, '2024-02-19 14:23:25', NULL, NULL),
(105, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:53:25', NULL, NULL, NULL, '2024-02-19 14:23:25', NULL, NULL),
(106, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:53:25', NULL, NULL, NULL, '2024-02-19 14:23:25', NULL, NULL),
(107, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:53:25', NULL, NULL, NULL, '2024-02-19 14:23:25', NULL, NULL),
(108, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:54:13', NULL, NULL, NULL, '2024-02-19 14:24:13', NULL, NULL),
(109, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:54:13', NULL, NULL, NULL, '2024-02-19 14:24:13', NULL, NULL),
(110, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:54:13', NULL, NULL, NULL, '2024-02-19 14:24:13', NULL, NULL),
(111, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:54:13', NULL, NULL, NULL, '2024-02-19 14:24:13', NULL, NULL),
(112, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-19 08:54:13', NULL, NULL, NULL, '2024-02-19 14:24:13', NULL, NULL);

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
  `isLocked` tinyint(1) NOT NULL COMMENT 'Locked Record',
  `updated_by` varchar(30) NOT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `assigned_from` varchar(100) NOT NULL,
  `assigned_to` varchar(100) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL,
  `updated_by_name` varchar(255) NOT NULL,
  `updated_by_id` varchar(255) NOT NULL,
  `updated_at` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `new_sdbg`
--

INSERT INTO `new_sdbg` (`id`, `purchasing_doc_no`, `file_name`, `file_path`, `remarks`, `status`, `isLocked`, `updated_by`, `bank_name`, `transaction_id`, `vendor_code`, `assigned_from`, `assigned_to`, `created_at`, `created_by_name`, `created_by_id`, `updated_by_name`, `updated_by_id`, `updated_at`) VALUES
(1, '4800007095', '1705483912454-pa0105.pdf', 'uploads\\sdbg\\1705483912454-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', '', '', 1705483912458, 'MAINAK DUTTA', '50007545', '', '', 0),
(2, '4800007095', '1705484034609-pa0105.pdf', 'uploads\\sdbg\\1705484034609-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', '', '', 1705484034612, 'MAINAK DUTTA', '50007545', '', '', 0);

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
('485838', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '485838', 'ZJ', '2', NULL, '3', '1'),
('600229', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600231', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600232', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600233', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600252', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'ZP', '2', NULL, '3', '1'),
('600947', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600948', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600949', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600950', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600951', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1'),
('600953', NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '474862', 'ZJ', '2', NULL, '3', '1');

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
(485838, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '485838', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600229, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600231, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600232, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060),
(600233, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600252, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600947, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060),
(600948, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060),
(600949, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '474862', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSM', 'NA', 'GRSM', 'GK', '1011172', 50000508, 50039060),
(600950, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600951, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678),
(600953, '0030', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'GRSE', 'GRSE', 'D', 'ZA', 'GRSE0001011170', 'NA', 'GRSM', 'GK', '1011170', 50000444, 50036678);

-- --------------------------------------------------------

--
-- Table structure for table `pa0002`
--

CREATE TABLE `pa0002` (
  `PERNR` int(8) NOT NULL COMMENT 'Personnel Number',
  `CNAME` varchar(80) DEFAULT NULL COMMENT 'Complete Name',
  `EMAIL` varchar(240) DEFAULT NULL,
  `PHONE` varchar(240) DEFAULT NULL,
  `PERSG` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT=': HR Master Record: Infotype 0002 (Personal Data)';

--
-- Dumping data for table `pa0002`
--

INSERT INTO `pa0002` (`PERNR`, `CNAME`, `EMAIL`, `PHONE`, `PERSG`) VALUES
(60020, 'TAPAS PAL', '', '', ''),
(485838, 'ABHINIT PAL', '', '', ''),
(493834, 'Naskar Sir', '', '', ''),
(600201, 'Rabi Teja', '', '', ''),
(600202, 'Mohit Kumar', '', '', ''),
(600203, 'Amit Sha', '', '', ''),
(600229, 'RAJENDRA BANERJEE', '', '', ''),
(600230, 'KAMAL RUIDAS', '', '', ''),
(600231, 'A RAJA BANERJEE', '', '', ''),
(600232, 'ABHINIT ANAND', '', '', ''),
(600233, 'MRINMOY GHOSH', '', '', ''),
(600947, 'TAMAL SEN', '', '', ''),
(600948, 'JUNIOR PC ROY', '', '', ''),
(600949, 'SR MRINMOY GHOSH', '', '', ''),
(600950, 'OM PRAKASH GHOSH', '', '', ''),
(600951, 'ABHINIT RAJ', '', '', ''),
(600952, 'MR. MRINMOY GHOSH', '', '', ''),
(600953, 'TAPAS PAL', '', '', ''),
(620009, NULL, 'rui@das.com', '9002888616', '');

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
(600229, '0010', NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'CEIL', '8584014353', NULL),
(600230, '0030', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'kamal.ruidas@datacoresystems.co.in'),
(600231, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'arajabanerjee@gmail.com'),
(600232, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'aabhnitandand@gmail.com'),
(600233, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'mrinmoyghosh102@gmail.com'),
(600947, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'tamalsen@gmail.com'),
(600948, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'juniorpcroy@gmail.com'),
(600949, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'srmrinoy@gmail.com'),
(600950, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'omprakash@gmail.com'),
(600951, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'aabhnitanand@gmail.com'),
(600952, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'mrinmoyghosh102@gmail.com'),
(600953, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'tapaspal_tapaspal@gmail.com'),
(600201, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'finance1@gmail.com'),
(600202, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'finance2@gmail.com'),
(600203, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'finance3@gmail.com'),
(485838, '0030', NULL, NULL, NULL, NULL, NULL, NULL, '485838', '4858', NULL, 'aabhinit@gmail.com'),
(493834, '0030', 'NA', 'N', '2024-02-29', NULL, NULL, NULL, NULL, NULL, NULL, 'kamal.ruidas@datacoresystems.co.in');

-- --------------------------------------------------------

--
-- Table structure for table `payment_advice`
--

CREATE TABLE `payment_advice` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `document_type` varchar(40) NOT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_advice`
--

INSERT INTO `payment_advice` (`id`, `purchasing_doc_no`, `vendor_code`, `document_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '2100010812', 'V1', 'Gate In Entry', '1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699252952506-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'SUBMITTED', 'VENDOR', 1699252952514, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(2, '7800000040', 'V1', 'Goods Receipt', '1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699253015741-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'Uploading Drawing', 'SUBMITTED', 'VENDOR', 1699253015750, 'XYZ Pvt. Ltd.', 'XYZ@gmai.com'),
(3, '4700013227', 'V1', 'ICGRN Report', '1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\drawing\\1699253037637-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'remarkssss', 'SUBMITTED', 'VENDOR', 1699253037643, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(4, '34567876556', '23114', 'Gate In Entry', '1699598638506-sample.pdf', 'uploads\\drawing\\1699598638506-sample.pdf', 'accepted', 'SUBMITTED', 'GRSE', 1699598638509, 'Abhinit ', '6380');

-- --------------------------------------------------------

--
-- Table structure for table `payment_advice2`
--

CREATE TABLE `payment_advice2` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `payment_advice2`
--

INSERT INTO `payment_advice2` (`id`, `purchasing_doc_no`, `file_name`, `file_path`, `vendor_code`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '4700013229', '1702452502399-sample.pdf', 'uploads\\voucher\\1702452502399-sample.pdf', '50000437', 1702452502411, 'A RAJA BANERJEE', '600231'),
(2, '4700013229', '1702457236213-sample.pdf', 'uploads\\voucher\\1702457236213-sample.pdf', '50000437', 1702457236222, 'A RAJA BANERJEE', '600231'),
(3, '4700013229', '1702457315327-sample.pdf', 'uploads\\voucher\\1702457315327-sample.pdf', '50000437', 1702457315337, 'A RAJA BANERJEE', '600231'),
(4, '4700013229', '1702459490239-sample.pdf', 'uploads\\advises\\1702459490239-sample.pdf', '50000437', 1702459490246, 'A RAJA BANERJEE', '600231'),
(5, '4700013229', '1702459542937-sample.pdf', 'uploads\\advise\\1702459542937-sample.pdf', '50000437', 1702459542945, 'A RAJA BANERJEE', '600231'),
(6, '4700013229', '1704264105136-ZFI_BGM_1.pdf', 'uploads\\advise\\1704264105136-ZFI_BGM_1.pdf', '50000437', 1704264105150, 'A RAJA BANERJEE', '600231'),
(7, '8989898989', '1704264176341-ZFI_BGM_1.pdf', 'uploads\\advise\\1704264176341-ZFI_BGM_1.pdf', '50000437', 1704264176349, 'A RAJA BANERJEE', '600231'),
(8, '8989898989', '1704265879330-ZFI_BGM_1.pdf', 'uploads\\advise\\1704265879330-ZFI_BGM_1.pdf', '50000437', 1704265879334, 'A RAJA BANERJEE', '600231');

-- --------------------------------------------------------

--
-- Table structure for table `payment_voucher`
--

CREATE TABLE `payment_voucher` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `payment_voucher`
--

INSERT INTO `payment_voucher` (`id`, `purchasing_doc_no`, `file_name`, `file_path`, `vendor_code`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '4700013229', '1702459455473-sample.pdf', 'uploads\\voucher\\1702459455473-sample.pdf', '50000437', 1702459455492, 'A RAJA BANERJEE', '600231'),
(2, '4700013229', '1702462957946-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'uploads\\voucher\\1702462957946-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50000437', 1702462957970, 'A RAJA BANERJEE', '600231'),
(3, '4700013229', '1704264275690-mseg.html', 'uploads\\voucher\\1704264275690-mseg.html', '50000437', 1704264275695, 'A RAJA BANERJEE', '600231'),
(4, '8989898989', '1704264302878-Milestones Activities and Gaps.pdf', 'uploads\\voucher\\1704264302878-Milestones Activities and Gaps.pdf', '50000437', 1704264302880, 'A RAJA BANERJEE', '600231'),
(5, '8989898989', '1704265630874-Milestones Activities and Gaps.pdf', 'uploads\\voucher\\1704265630874-Milestones Activities and Gaps.pdf', '50000437', 1704265630876, 'A RAJA BANERJEE', '600231');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `internal_role_id` int(11) NOT NULL,
  `screen_name` varchar(60) NOT NULL,
  `activity_type` varchar(50) NOT NULL,
  `activity_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`id`, `user_id`, `dept_id`, `internal_role_id`, `screen_name`, `activity_type`, `activity_status`) VALUES
(1, 600229, 3, 1, 'qap', 'UPDATE', 1),
(2, 600231, 3, 2, 'qap', 'ACCEPT', 1),
(3, 600229, 3, 1, 'qap', 'ASSIGN', 1),
(4, 600231, 3, 2, 'qap', 'REJECT', 1),
(5, 600231, 3, 2, 'qap', 'APPROVE', 1),
(6, 600230, 3, 1, 'ALL_ACCESS', 'SUPER_ADMIN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pf`
--

CREATE TABLE `pf` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `vendor_code` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pf`
--

INSERT INTO `pf` (`id`, `purchasing_doc_no`, `vendor_code`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '2233445', '121313134', '1706871027402-Flow chart- Service PO (1).pdf', 'uploads\\pf\\1706871027402-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871027407, '493834'),
(2, '2233445', '121313134', '1706871216924-Flow chart- Service PO (1).pdf', 'uploads\\pf\\1706871216924-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871216929, '493834'),
(3, '2233445', '121313134', '1706871219644-Flow chart- Service PO (1).pdf', 'uploads\\pf\\1706871219644-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871219651, '493834'),
(4, '2233445', '121313134', '1706871235176-Flow chart- Service PO (1).pdf', 'uploads\\pf\\1706871235176-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706871235179, '493834');

-- --------------------------------------------------------

--
-- Table structure for table `privilege`
--

CREATE TABLE `privilege` (
  `id` int(4) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department_id` int(11) NOT NULL,
  `internal_role_id` int(11) NOT NULL,
  `sdbg` varchar(2) NOT NULL,
  `drawing` varchar(2) NOT NULL,
  `qap` varchar(2) NOT NULL,
  `inspectionCallLetter` varchar(2) NOT NULL,
  `shippingDocuments` varchar(2) NOT NULL,
  `gateEntry` varchar(2) NOT NULL,
  `grn` varchar(2) NOT NULL,
  `icgrn` varchar(2) NOT NULL,
  `wdc` varchar(2) NOT NULL,
  `bpgCopy` varchar(2) NOT NULL,
  `checkList` varchar(2) NOT NULL,
  `billRegistration` varchar(2) NOT NULL,
  `paymentVoucher` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privilege`
--

INSERT INTO `privilege` (`id`, `name`, `department_id`, `internal_role_id`, `sdbg`, `drawing`, `qap`, `inspectionCallLetter`, `shippingDocuments`, `gateEntry`, `grn`, `icgrn`, `wdc`, `bpgCopy`, `checkList`, `billRegistration`, `paymentVoucher`) VALUES
(1, 'sdbg assigner', 1, 1, 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(2, 'sdbg staff', 1, 2, 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(3, 'drawing general', 2, 3, 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(4, 'qap assigner', 3, 1, 'R', 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(5, 'qap staff', 3, 2, 'R', 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(6, 'Inspection Call Letter', 3, 1, 'R', 'R', 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(7, 'shippingDocuments', 3, 1, 'R', 'R', 'R', 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'),
(8, 'Gate Entry', 3, 1, 'R', 'R', 'R', 'R', 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R');

-- --------------------------------------------------------

--
-- Table structure for table `qals`
--

CREATE TABLE `qals` (
  `PRUEFLOS` bigint(12) NOT NULL COMMENT 'Inspection Lot Number',
  `WERK` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `ART` varchar(8) DEFAULT NULL COMMENT 'Inspection Type',
  `HERKUNFT` varchar(2) DEFAULT NULL COMMENT 'Inspection Lot Origin',
  `OBJNR` varchar(22) DEFAULT NULL COMMENT 'Object number',
  `OBTYP` varchar(3) DEFAULT NULL COMMENT 'Object Category',
  `STSMA` varchar(8) DEFAULT NULL COMMENT 'Status Profile',
  `QMATAUTH` varchar(6) DEFAULT NULL COMMENT 'Material Authorization Group for Activities in QM',
  `STAT11` varchar(1) DEFAULT NULL COMMENT 'GR blocked stock',
  `INSMK` varchar(1) DEFAULT NULL COMMENT 'Quantity Is or Was in Inspection Stock',
  `STAT01` varchar(1) DEFAULT NULL COMMENT 'Inspection Lot is Created Automatically',
  `STAT02` varchar(1) DEFAULT NULL COMMENT 'Partial Lots Exist',
  `STAT04` varchar(1) DEFAULT NULL COMMENT 'Data Record Was Changed Using Customer Exit',
  `STAT06` varchar(1) DEFAULT NULL COMMENT 'Record Appraisal Costs in Individual QM Order',
  `STAT07` varchar(1) DEFAULT NULL COMMENT 'Inspection with Inspection Points',
  `STAT08` varchar(1) DEFAULT NULL COMMENT 'Automatic Usage Decision Planned',
  `STAT09` varchar(1) DEFAULT NULL COMMENT 'Source Inspection',
  `STAT10` varchar(1) DEFAULT NULL COMMENT 'Inspection Specifications from Configuration',
  `STAT14` varchar(1) DEFAULT NULL COMMENT 'Completion of Short-Term Inspection',
  `STAT16` varchar(1) DEFAULT NULL COMMENT 'Inspection Specifications from Batch Determination',
  `STAT18` varchar(1) DEFAULT NULL COMMENT 'Control of Inspection Lot Creation (Lot Summary)',
  `STAT19` varchar(1) DEFAULT NULL COMMENT 'Documentation Required for Inspection Lot',
  `STAT20` varchar(1) DEFAULT NULL COMMENT 'Inspection Plan Required',
  `STAT21` varchar(1) DEFAULT NULL COMMENT 'Enter Sample Manually',
  `STAT22` varchar(1) DEFAULT NULL COMMENT 'Inspect with Material Specification',
  `STAT23` varchar(1) DEFAULT NULL COMMENT 'Inspection Lot Approval',
  `STAT24` varchar(1) DEFAULT NULL COMMENT 'Digital Signature for Insp. Lot in Results Recording',
  `STAT25` varchar(1) DEFAULT NULL COMMENT 'Digital Signature for Insp. Lot when Usage Decision Made',
  `STAT29` varchar(1) DEFAULT NULL COMMENT 'Digital Signature for Confirmation of Phys.-Sample Drawing',
  `STAT26` varchar(1) DEFAULT NULL COMMENT 'Indicator: Approved batch record required',
  `STAT27` varchar(1) DEFAULT NULL COMMENT 'Inspection Lot is an R/2 Inspection Lot',
  `STAT28` varchar(1) DEFAULT NULL COMMENT 'Select Characteristics Manually',
  `STAT31` varchar(1) DEFAULT NULL COMMENT 'Trigger Sample Calculation Manually',
  `STAT34` varchar(1) DEFAULT NULL COMMENT 'Stock Postings Completed',
  `STAT35` varchar(1) DEFAULT NULL COMMENT 'Usage Decision Has Been Made',
  `STAT45` varchar(1) DEFAULT NULL COMMENT 'Material as Dynamic Modification Criterion',
  `STAT46` varchar(1) DEFAULT NULL COMMENT 'Vendor as Dynamic Modification Criterion',
  `STAT47` varchar(1) DEFAULT NULL COMMENT 'Manufacturer as Dynamic Modification Criterion',
  `STAT48` varchar(1) DEFAULT NULL COMMENT 'Customer as Dynamic Modification Criterion',
  `STAT49` varchar(1) DEFAULT NULL COMMENT 'Machine as Dynamic Modification Criterion',
  `STAT50` varchar(1) DEFAULT NULL COMMENT 'Project as Dynamic Modification Criterion',
  `KZSKIPLOT` varchar(1) DEFAULT NULL COMMENT 'Lot Skipped',
  `DYN` varchar(1) DEFAULT NULL COMMENT 'Skips Allowed',
  `HPZ` varchar(1) DEFAULT NULL COMMENT '100% Inspection',
  `EIN` varchar(1) DEFAULT NULL COMMENT 'Serial Number Management Possible',
  `ANZSN` int(10) DEFAULT NULL COMMENT 'Number of serial numbers',
  `KZDYNERF` varchar(1) DEFAULT NULL COMMENT 'Dynamic Modification Is Carried Out',
  `DYNHEAD` varchar(1) DEFAULT NULL COMMENT 'Level at Which Dynamic Modification Parameters Are Defined',
  `STPRVER` varchar(8) DEFAULT NULL COMMENT 'Sampling Procedure',
  `EXTNUM` varchar(1) DEFAULT NULL COMMENT 'External Numbering of Units to be Inspected',
  `STAFO` varchar(6) DEFAULT NULL COMMENT 'Update group for statistics update',
  `STAT30` varchar(1) DEFAULT NULL COMMENT 'Origin of Inspection Lot Unit of Measure for LIS Interface',
  `QINFSTATUS` varchar(8) DEFAULT NULL COMMENT 'QINF Status',
  `ENSTEHDAT` date DEFAULT NULL COMMENT 'Date of Lot Creation',
  `ENTSTEZEIT` time DEFAULT NULL COMMENT 'Time of Lot Creation',
  `ERSTELLER` varchar(12) DEFAULT NULL COMMENT 'Name of User Who Created the Data Record',
  `ERSTELDAT` date DEFAULT NULL COMMENT 'Date on Which the Data Record Was Created',
  `ERSTELZEIT` time DEFAULT NULL COMMENT 'Time of Lot Creation',
  `AENDERER` varchar(12) DEFAULT NULL COMMENT 'Name of User who Most Recently Changed the Data Record',
  `AENDERDAT` date DEFAULT NULL COMMENT 'Date on Which Data Record Was Changed',
  `AENDERZEIT` time DEFAULT NULL COMMENT 'Time of Lot Change',
  `PASTRTERM` date DEFAULT NULL COMMENT 'Inspection Start Date',
  `PASTRZEIT` time DEFAULT NULL COMMENT 'Inspection Start Time',
  `PAENDTERM` date DEFAULT NULL COMMENT 'End Date of the Inspection',
  `PAENDZEIT` time DEFAULT NULL COMMENT 'Inspection End Time',
  `PLNTY` varchar(1) DEFAULT NULL COMMENT 'Task List Type',
  `PLNNR` varchar(8) DEFAULT NULL COMMENT 'Key for Task List Group',
  `PPLVERW` varchar(3) DEFAULT NULL COMMENT 'Task list usage',
  `PLNAL` varchar(2) DEFAULT NULL COMMENT 'Group Counter',
  `ZAEHL` int(8) DEFAULT NULL COMMENT 'Internal counter',
  `ZKRIZ` int(7) DEFAULT NULL COMMENT 'Counter for additional criteria',
  `STAT15` varchar(1) DEFAULT NULL COMMENT 'Production Resource/Tool Saved for Insp. Lot',
  `SLWBEZ` varchar(3) DEFAULT NULL COMMENT 'Identification for the Inspection Point Field Combination',
  `STAT13` varchar(1) DEFAULT NULL COMMENT 'Inspection Point Type',
  `PPKZTLZU` varchar(1) DEFAULT NULL COMMENT 'Partial Lot Assignment in an Inspection During Production',
  `ZAEHL1` int(8) DEFAULT NULL COMMENT 'Internal counter',
  `PRBNAVERF` varchar(8) DEFAULT NULL COMMENT 'Sample-Drawing Procedure',
  `PRBNAVV` varchar(6) DEFAULT NULL COMMENT 'Version No. of the Sample-Drawing Procedure',
  `STAT12` varchar(1) DEFAULT NULL COMMENT 'Confirmation Required for Physical-Sample Drawing',
  `SELMATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `SELREVLV` varchar(2) DEFAULT NULL COMMENT 'Revision Level',
  `SELWERK` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `SELLIFNR` varchar(10) DEFAULT NULL COMMENT 'Supplier''s Account Number',
  `STAT17` varchar(1) DEFAULT NULL COMMENT 'Manufacturer Part No. Processing Active',
  `SELHERST` varchar(10) DEFAULT NULL COMMENT 'Number of Manufacturer',
  `SELKUNNR` varchar(10) DEFAULT NULL COMMENT 'Account number of customer',
  `SELPPLVERW` varchar(3) DEFAULT NULL COMMENT 'Task list usage',
  `GUELTIGAB` date DEFAULT NULL COMMENT 'Key Date for Selecting Records or Changing Task Lists',
  `AUFNR` varchar(12) DEFAULT NULL COMMENT 'Order Number',
  `AUFPL` int(10) DEFAULT NULL COMMENT 'Routing number of operations in the order',
  `CUOBJ` bigint(18) DEFAULT NULL COMMENT 'Configuration (internal object number)',
  `CUOBJ_CH` bigint(18) DEFAULT NULL COMMENT 'Internal object number of the batch classification',
  `VERID` varchar(4) DEFAULT NULL COMMENT 'Production Version',
  `SA_AUFNR` varchar(12) DEFAULT NULL COMMENT 'Run schedule header number',
  `KUNNR` varchar(10) DEFAULT NULL COMMENT 'Customer (Ship-To Party)',
  `LIFNR` varchar(10) DEFAULT NULL COMMENT 'Supplier''s Account Number',
  `HERSTELLER` varchar(10) DEFAULT NULL COMMENT 'Number of Manufacturer',
  `EMATNR` varchar(18) DEFAULT NULL COMMENT 'Material number corresponding to manufacturer part number',
  `MATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `REVLV` varchar(2) DEFAULT NULL COMMENT 'Revision Level',
  `XCHPF` varchar(1) DEFAULT NULL COMMENT 'Batch management requirement indicator',
  `CHARG` varchar(10) DEFAULT NULL COMMENT 'Batch Number',
  `LAGORTCHRG` varchar(4) DEFAULT NULL COMMENT 'Storage Location',
  `ZEUGNISBIS` date DEFAULT NULL COMMENT 'Valid-To Date for The Batch Certificate',
  `VFDAT` date DEFAULT NULL COMMENT 'Shelf Life Expiration or Best-Before Date',
  `LICHN` varchar(15) DEFAULT NULL COMMENT 'Vendor Batch Number',
  `SOBKZ` varchar(1) DEFAULT NULL COMMENT 'Special Stock Indicator',
  `PS_PSP_PNR` int(8) DEFAULT NULL COMMENT 'Valuated Sales Order Stock WBS Element',
  `KDAUF` varchar(10) DEFAULT NULL COMMENT 'Sales order number of valuated sales order stock',
  `KDPOS` int(6) DEFAULT NULL COMMENT 'Sales Order Item of Valuated Sales Order Stock',
  `EKORG` varchar(4) DEFAULT NULL COMMENT 'Purchasing Organization',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `ETENR` int(4) DEFAULT NULL COMMENT 'Delivery Schedule Line Counter',
  `BLART` varchar(2) DEFAULT NULL COMMENT 'Document Type',
  `MJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `MBLNR` varchar(10) DEFAULT NULL COMMENT 'Number of Material Document',
  `ZEILE` int(4) DEFAULT NULL COMMENT 'Item in Material Document',
  `BUDAT` date DEFAULT NULL COMMENT 'Posting Date in the Document',
  `BWART` varchar(3) DEFAULT NULL COMMENT 'Movement Type (Inventory Management)',
  `WERKVORG` varchar(4) DEFAULT NULL COMMENT 'Plant Where Stock for Inspection Lot Is Held',
  `LAGORTVORG` varchar(4) DEFAULT NULL COMMENT 'Storage Location for Inspection Lot Stock',
  `LGNUM` varchar(3) DEFAULT NULL COMMENT 'Warehouse Number / Warehouse Complex',
  `LGTYP` varchar(3) DEFAULT NULL COMMENT 'Storage Type',
  `LGPLA` varchar(10) DEFAULT NULL COMMENT 'Storage Bin',
  `LS_KDAUF` varchar(10) DEFAULT NULL COMMENT 'Sales Order Number',
  `LS_KDPOS` int(6) DEFAULT NULL COMMENT 'Item Number in Sales Order',
  `LS_VBELN` varchar(10) DEFAULT NULL COMMENT 'Delivery',
  `LS_POSNR` int(6) DEFAULT NULL COMMENT 'Delivery Item',
  `LS_ABRVW` varchar(3) DEFAULT NULL COMMENT 'Delivery Category',
  `LS_ROUTE` varchar(6) DEFAULT NULL COMMENT 'Route',
  `LS_LLAND` varchar(3) DEFAULT NULL COMMENT 'Country of Destination',
  `LS_KUNAG` varchar(10) DEFAULT NULL COMMENT 'Sold-To Party',
  `LS_VKORG` varchar(4) DEFAULT NULL COMMENT 'Sales Organization',
  `LS_KDMAT` varchar(35) DEFAULT NULL COMMENT 'Material belonging to the customer',
  `SPRACHE` varchar(1) DEFAULT NULL COMMENT 'Language Key',
  `KTEXTLOS` varchar(40) DEFAULT NULL COMMENT 'Short Text',
  `LTEXTKZ` varchar(1) DEFAULT NULL COMMENT 'Long Text Exists For Inspection Lot',
  `KTEXTMAT` varchar(40) DEFAULT NULL COMMENT 'Short Text for Inspection Object',
  `ZUSMKZAEHL` int(5) DEFAULT NULL COMMENT 'Number of Characteristics Recorded Additionally',
  `OFFENNLZMK` int(5) DEFAULT NULL COMMENT 'Number of Outstanding Short-Term Chars Which Require Conf.',
  `OFFEN_LZMK` int(5) DEFAULT NULL COMMENT 'Number of Outstanding Long-Term Chars Which Require Conf.',
  `LOSMENGE` bigint(13) DEFAULT NULL COMMENT 'Inspection Lot Quantity',
  `MENGENEINH` varchar(3) DEFAULT NULL COMMENT 'Base Unit of Measure for Inspection Lot Quantity',
  `ANZGEB` int(6) DEFAULT NULL COMMENT 'QM - No. of Containers',
  `GEBEH` varchar(3) DEFAULT NULL COMMENT 'Lot Container',
  `LVS_STIKZ` varchar(1) DEFAULT NULL COMMENT 'Indicator: what has happened to insp.sample (QM) in WM',
  `LVS_STIMG` bigint(13) DEFAULT NULL COMMENT 'Sample in base unit of measure provided by WM',
  `GESSTICHPR` bigint(13) DEFAULT NULL COMMENT 'Sample Size',
  `EINHPROBE` varchar(3) DEFAULT NULL COMMENT 'Base Unit of Measure for the Sample Unit',
  `DYNREGEL` varchar(3) DEFAULT NULL COMMENT 'Dynamic Modification Rule',
  `STAT44` varchar(1) DEFAULT NULL COMMENT 'Time of Dynamic Modification in Inspection Lot',
  `PRSTUFE` int(4) DEFAULT NULL COMMENT 'Inspection Stage',
  `PRSCHAERFE` int(3) DEFAULT NULL COMMENT 'Inspection Severity',
  `LMENGE01` bigint(13) DEFAULT NULL COMMENT 'Quantity Posted to Unrestricted-Use Stock',
  `LMENGE02` bigint(13) DEFAULT NULL COMMENT 'Quantity Posted to Scrap',
  `LMENGE03` bigint(13) DEFAULT NULL COMMENT 'Quantity Posted to Sample',
  `LMENGE04` bigint(13) DEFAULT NULL COMMENT 'Quantity Posted to Blocked Stock',
  `LMENGE05` bigint(13) DEFAULT NULL COMMENT 'Quantity Posted to Reserves',
  `LMENGE06` bigint(13) DEFAULT NULL COMMENT 'Quantity Posted to Another Material',
  `MATNRNEU` varchar(18) DEFAULT NULL COMMENT 'Material Number to Which the Quantity is Posted',
  `CHARGNEU` varchar(10) DEFAULT NULL COMMENT 'Batch to Which Goods Are Transferred',
  `LMENGE07` bigint(13) DEFAULT NULL COMMENT 'Quantity Returned to Vendor',
  `LMENGE08` bigint(13) DEFAULT NULL COMMENT 'Other Quantity Posted from Inspection Lot Stock',
  `LMENGE09` bigint(13) DEFAULT NULL COMMENT 'Other Quantity (2) Posted from Inspection Lot Stock',
  `LMENGEZUB` bigint(13) DEFAULT NULL COMMENT 'Quantity That Must Be Posted',
  `LMENGELZ` bigint(13) DEFAULT NULL COMMENT 'Sample Quantity for Long-Term Characteristics',
  `LMENGEPR` bigint(13) DEFAULT NULL COMMENT 'Quantity Actually Inspected',
  `LMENGEZER` bigint(13) DEFAULT NULL COMMENT 'Quantity Destroyed During Inspection',
  `LMENGEIST` bigint(13) DEFAULT NULL COMMENT 'Actual Lot Quantity',
  `LMENGESCH` bigint(13) DEFAULT NULL COMMENT 'Defective Quantity in Inspected Quantity',
  `LTEXTKZBB` varchar(1) DEFAULT NULL COMMENT 'Logs Exist for Usage Decision',
  `ANTEIL` varchar(16) DEFAULT NULL COMMENT 'Share of Scrap in Inspection Lot',
  `QKZVERF` varchar(2) DEFAULT NULL COMMENT 'Procedure for Calculating Quality Score',
  `STAT03` varchar(1) DEFAULT NULL COMMENT 'Usage Decision Mmode (UD Origin)',
  `QPMATLOS` varchar(16) DEFAULT NULL COMMENT 'Allowed Share of Scrap',
  `AUFNR_CO` varchar(12) DEFAULT NULL COMMENT 'Order Number for Recording Appraisal Costs',
  `KZVBR` varchar(1) DEFAULT NULL COMMENT 'Consumption posting',
  `KNTTP` varchar(1) DEFAULT NULL COMMENT 'Account Assignment Category',
  `PSTYP` varchar(1) DEFAULT NULL COMMENT 'Item category in purchasing document',
  `STAT05` varchar(1) DEFAULT NULL COMMENT 'Account Assignment Key: Inspection Lot',
  `KOSTL` varchar(10) DEFAULT NULL COMMENT 'Cost Center',
  `AUFPS` int(4) DEFAULT NULL COMMENT 'Item Number of Reservation / Dependent Requirements',
  `ANLN1` varchar(12) DEFAULT NULL COMMENT 'Main Asset Number',
  `ANLN2` varchar(4) DEFAULT NULL COMMENT 'Asset Subnumber',
  `KONT_PSPNR` int(8) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)',
  `NPLNR` varchar(12) DEFAULT NULL COMMENT 'Network Number for Account Assignment',
  `APLZL` int(8) DEFAULT NULL COMMENT 'Internal counter',
  `KONT_KDAUF` varchar(10) DEFAULT NULL COMMENT 'Sales Order Number',
  `KONT_KDPOS` int(6) DEFAULT NULL COMMENT 'Item Number in Sales Order',
  `IMKEY` varchar(8) DEFAULT NULL COMMENT 'Internal Key for Real Estate Object',
  `DABRZ` date DEFAULT NULL COMMENT 'Reference date for settlement',
  `KSTRG` varchar(12) DEFAULT NULL COMMENT 'Cost Object',
  `PAOBJNR` int(10) DEFAULT NULL COMMENT 'Profitability Segment Number (CO-PA)',
  `PRCTR` varchar(10) DEFAULT NULL COMMENT 'Profit Center',
  `GSBER` varchar(4) DEFAULT NULL COMMENT 'Business Area',
  `KONTO` varchar(10) DEFAULT NULL COMMENT 'G/L Account Number',
  `KOKRS` varchar(4) DEFAULT NULL COMMENT 'Controlling Area',
  `BUKRS` varchar(4) DEFAULT NULL COMMENT 'Company Code',
  `SERNP` varchar(4) DEFAULT NULL COMMENT 'Serial Number Profile',
  `LOS_REF` bigint(12) DEFAULT NULL COMMENT 'Inspection Lot Number Which Is Referenced',
  `PROJECT` varchar(24) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)',
  `ZZ_PO` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `ZZ_OTHERS` varchar(40) DEFAULT NULL COMMENT 'Character field of length 40',
  `ZZ_WRKCNTR` varchar(8) DEFAULT NULL COMMENT 'Work Center',
  `BEARBSTATU` varchar(2) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `STAT32` varchar(1) DEFAULT NULL COMMENT 'Inspection lot for stability study',
  `STAT33` varchar(1) DEFAULT NULL COMMENT 'Indicator: Multiple Specifications',
  `STAT36` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `STAT37` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `STAT38` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `STAT39` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `STAT40` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `STAT41` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `STAT42` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `STAT43` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `MENGU` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `KZPZADR` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `KZPRADR` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `ZUSCH` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `ZUSTD` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `KZERSTLIEF` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `KZERSTMUST` varchar(1) DEFAULT NULL COMMENT 'Field Not Used as of 3.0 Field Reserved for SAP',
  `ADDON_DUMMY` varchar(1) DEFAULT NULL COMMENT 'Dummy Field for ADDON Structures in QM',
  `WARPL` varchar(12) DEFAULT NULL COMMENT 'Maintenance Plan',
  `WAPOS` varchar(16) DEFAULT NULL COMMENT 'Maintenance Item',
  `ABNUM` int(10) DEFAULT NULL COMMENT 'Maintenance Plan Call Number',
  `STRAT` varchar(6) DEFAULT NULL COMMENT 'Maintenance strategy',
  `TRIALID` varchar(12) DEFAULT NULL COMMENT 'Trial Number',
  `RESPONSIBLE` varchar(45) DEFAULT NULL COMMENT 'Responsible',
  `INSP_DOC_NUMBER` varchar(30) DEFAULT NULL COMMENT 'Inspection Document Number from External System',
  `LOG_SYSTEM` varchar(10) DEFAULT NULL COMMENT 'Logical System',
  `GESSTICHPR_EXT` bigint(13) DEFAULT NULL COMMENT 'Sample Size from External System',
  `EINHPROBE_EXT` varchar(3) DEFAULT NULL COMMENT 'Unit of Measure of External Sample',
  `PRIO_PUNKTE` int(10) DEFAULT NULL COMMENT 'Priority Points',
  `SIGN_TYPE_RR` varchar(1) DEFAULT NULL COMMENT 'Signature Type: Inspection Lot Results Recording',
  `SIGN_TYPE_UD` varchar(1) DEFAULT NULL COMMENT 'Signature Type: Inspection Lot Usage Decision',
  `SIGN_TYPE_SM` varchar(1) DEFAULT NULL COMMENT 'Signature Type: Physical-Sample Drawing',
  `SIGNSTRAT_RR` varchar(8) DEFAULT NULL COMMENT 'Signature Strategy: Inspection Lot Results Recording',
  `SIGNSTRAT_UD` varchar(8) DEFAULT NULL COMMENT 'Signature Strategy with Individual Signature: Usage Decision',
  `SIGNSTRAT_SM` varchar(8) DEFAULT NULL COMMENT 'Signature Strategy w. Ind.Signature: Physical-Sample Drawing',
  `GATE_ENTRY_NO` varchar(10) DEFAULT NULL COMMENT 'Gate Entry Number'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qals`
--

INSERT INTO `qals` (`PRUEFLOS`, `WERK`, `ART`, `HERKUNFT`, `OBJNR`, `OBTYP`, `STSMA`, `QMATAUTH`, `STAT11`, `INSMK`, `STAT01`, `STAT02`, `STAT04`, `STAT06`, `STAT07`, `STAT08`, `STAT09`, `STAT10`, `STAT14`, `STAT16`, `STAT18`, `STAT19`, `STAT20`, `STAT21`, `STAT22`, `STAT23`, `STAT24`, `STAT25`, `STAT29`, `STAT26`, `STAT27`, `STAT28`, `STAT31`, `STAT34`, `STAT35`, `STAT45`, `STAT46`, `STAT47`, `STAT48`, `STAT49`, `STAT50`, `KZSKIPLOT`, `DYN`, `HPZ`, `EIN`, `ANZSN`, `KZDYNERF`, `DYNHEAD`, `STPRVER`, `EXTNUM`, `STAFO`, `STAT30`, `QINFSTATUS`, `ENSTEHDAT`, `ENTSTEZEIT`, `ERSTELLER`, `ERSTELDAT`, `ERSTELZEIT`, `AENDERER`, `AENDERDAT`, `AENDERZEIT`, `PASTRTERM`, `PASTRZEIT`, `PAENDTERM`, `PAENDZEIT`, `PLNTY`, `PLNNR`, `PPLVERW`, `PLNAL`, `ZAEHL`, `ZKRIZ`, `STAT15`, `SLWBEZ`, `STAT13`, `PPKZTLZU`, `ZAEHL1`, `PRBNAVERF`, `PRBNAVV`, `STAT12`, `SELMATNR`, `SELREVLV`, `SELWERK`, `SELLIFNR`, `STAT17`, `SELHERST`, `SELKUNNR`, `SELPPLVERW`, `GUELTIGAB`, `AUFNR`, `AUFPL`, `CUOBJ`, `CUOBJ_CH`, `VERID`, `SA_AUFNR`, `KUNNR`, `LIFNR`, `HERSTELLER`, `EMATNR`, `MATNR`, `REVLV`, `XCHPF`, `CHARG`, `LAGORTCHRG`, `ZEUGNISBIS`, `VFDAT`, `LICHN`, `SOBKZ`, `PS_PSP_PNR`, `KDAUF`, `KDPOS`, `EKORG`, `EBELN`, `EBELP`, `ETENR`, `BLART`, `MJAHR`, `MBLNR`, `ZEILE`, `BUDAT`, `BWART`, `WERKVORG`, `LAGORTVORG`, `LGNUM`, `LGTYP`, `LGPLA`, `LS_KDAUF`, `LS_KDPOS`, `LS_VBELN`, `LS_POSNR`, `LS_ABRVW`, `LS_ROUTE`, `LS_LLAND`, `LS_KUNAG`, `LS_VKORG`, `LS_KDMAT`, `SPRACHE`, `KTEXTLOS`, `LTEXTKZ`, `KTEXTMAT`, `ZUSMKZAEHL`, `OFFENNLZMK`, `OFFEN_LZMK`, `LOSMENGE`, `MENGENEINH`, `ANZGEB`, `GEBEH`, `LVS_STIKZ`, `LVS_STIMG`, `GESSTICHPR`, `EINHPROBE`, `DYNREGEL`, `STAT44`, `PRSTUFE`, `PRSCHAERFE`, `LMENGE01`, `LMENGE02`, `LMENGE03`, `LMENGE04`, `LMENGE05`, `LMENGE06`, `MATNRNEU`, `CHARGNEU`, `LMENGE07`, `LMENGE08`, `LMENGE09`, `LMENGEZUB`, `LMENGELZ`, `LMENGEPR`, `LMENGEZER`, `LMENGEIST`, `LMENGESCH`, `LTEXTKZBB`, `ANTEIL`, `QKZVERF`, `STAT03`, `QPMATLOS`, `AUFNR_CO`, `KZVBR`, `KNTTP`, `PSTYP`, `STAT05`, `KOSTL`, `AUFPS`, `ANLN1`, `ANLN2`, `KONT_PSPNR`, `NPLNR`, `APLZL`, `KONT_KDAUF`, `KONT_KDPOS`, `IMKEY`, `DABRZ`, `KSTRG`, `PAOBJNR`, `PRCTR`, `GSBER`, `KONTO`, `KOKRS`, `BUKRS`, `SERNP`, `LOS_REF`, `PROJECT`, `ZZ_PO`, `ZZ_OTHERS`, `ZZ_WRKCNTR`, `BEARBSTATU`, `STAT32`, `STAT33`, `STAT36`, `STAT37`, `STAT38`, `STAT39`, `STAT40`, `STAT41`, `STAT42`, `STAT43`, `MENGU`, `KZPZADR`, `KZPRADR`, `ZUSCH`, `ZUSTD`, `KZERSTLIEF`, `KZERSTMUST`, `ADDON_DUMMY`, `WARPL`, `WAPOS`, `ABNUM`, `STRAT`, `TRIALID`, `RESPONSIBLE`, `INSP_DOC_NUMBER`, `LOG_SYSTEM`, `GESSTICHPR_EXT`, `EINHPROBE_EXT`, `PRIO_PUNKTE`, `SIGN_TYPE_RR`, `SIGN_TYPE_UD`, `SIGN_TYPE_SM`, `SIGNSTRAT_RR`, `SIGNSTRAT_UD`, `SIGNSTRAT_SM`, `GATE_ENTRY_NO`) VALUES
(1000001009, '2024', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1234', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `qap_submission`
--

CREATE TABLE `qap_submission` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `assigned_from` varchar(100) DEFAULT NULL,
  `assigned_to` varchar(100) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) DEFAULT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `qap_submission`
--

INSERT INTO `qap_submission` (`id`, `purchasing_doc_no`, `file_name`, `vendor_code`, `assigned_from`, `assigned_to`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(4, '7800000040', '1703132525937-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', NULL, NULL, 'uploads\\qap\\1703132525937-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'PENDING', 'VENDOR', 1703132525947, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(8, '4800001795', NULL, '50007545', '600229', '600231', NULL, 'QAP ASSIGN ', 'ASSIGNED --ISSUE', 'GRSE', 1703134836244, 'KAMAL RUIDAS', '600229'),
(9, '4800001795', NULL, '50007545', '600229', '600231', NULL, 'QAP  REJECTED', 'REJECTED', 'GRSE', 1703135338176, 'KAMAL RUIDAS', '600231'),
(10, '4800001795', '1703135400202-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', '600229', '600231', 'uploads\\qap\\1703135400202-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'RE_SUBMITTED', 'VENDOR', 1703135400210, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(11, '4800001795', '1703135469577-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', '600229', '600231', 'uploads\\qap\\1703135469577-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'RE_SUBMITTED', 'VENDOR', 1703135469587, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(12, '4800001795', NULL, '50007545', '600229', '600231', NULL, 'QAP ASSIGN ', 'ASSIGNED', 'GRSE', 1703135706322, 'KAMAL RUIDAS', '600229'),
(13, '7800000047', NULL, '50007545', '600229', '600231', NULL, 'QAP ACCEPTED . . . . ', 'ACCEPTED', 'GRSE', 1703135719932, 'KAMAL RUIDAS', '600229'),
(14, '7800000047', '1703135744890-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', '600229', '600231', 'uploads\\qap\\1703135744890-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP  APPROVED .......', 'APPROVED', 'GRSE', 1703135744897, 'KAMAL RUIDAS', '600229'),
(15, '4800001795', '1703143894329-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', NULL, NULL, 'uploads\\qap\\1703143894329-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'PENDING', 'VENDOR', 1703143894338, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(16, '47654764345', NULL, '50005041', NULL, NULL, NULL, 'Vendor upload sdbg', 'PENDING', 'VENDOR', 1704272766110, 'KAMAL RUIDAS', '50000435'),
(17, '47654764345', '1704273023793-sample.pdf', '50005041', NULL, NULL, 'uploads\\qap\\1704273023793-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'VENDOR', 1704273023796, 'KAMAL RUIDAS', '50000435'),
(18, '4800001795', '1704450933023-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', NULL, NULL, 'uploads\\qap\\1704450933023-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'PENDING', 'VENDOR', 1704450933032, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545');

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

-- --------------------------------------------------------

--
-- Table structure for table `rkpf`
--

CREATE TABLE `rkpf` (
  `RSNUM` int(10) NOT NULL COMMENT 'Number of reservation/dependent requirements',
  `RSDAT` date DEFAULT NULL COMMENT 'Base date for reservation',
  `USNAM` varchar(12) DEFAULT NULL COMMENT 'User Name',
  `BWART` varchar(3) DEFAULT NULL COMMENT 'Movement Type (Inventory Management)',
  `WEMPF` varchar(12) DEFAULT NULL COMMENT 'Goods recipient',
  `KOSTL` varchar(10) DEFAULT NULL COMMENT 'Cost Center',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchase order number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `UMWRK` varchar(4) DEFAULT NULL COMMENT 'Receiving plant/issuing plant',
  `UMLGO` varchar(4) DEFAULT NULL COMMENT 'Receiving/issuing storage location',
  `PS_PSP_PNR` int(8) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rkpf`
--

INSERT INTO `rkpf` (`RSNUM`, `RSDAT`, `USNAM`, `BWART`, `WEMPF`, `KOSTL`, `EBELN`, `EBELP`, `UMWRK`, `UMLGO`, `PS_PSP_PNR`) VALUES
(345678998, '2024-03-06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sdbg`
--

CREATE TABLE `sdbg` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `actionTypeId` int(2) DEFAULT NULL,
  `actionType` varchar(100) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `assigned_from` varchar(100) DEFAULT NULL,
  `assigned_to` varchar(100) DEFAULT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) DEFAULT NULL,
  `created_by_id` varchar(200) NOT NULL,
  `updated_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='drawing table';

--
-- Dumping data for table `sdbg`
--

INSERT INTO `sdbg` (`id`, `purchasing_doc_no`, `file_name`, `file_path`, `remarks`, `status`, `actionTypeId`, `actionType`, `vendor_code`, `assigned_from`, `assigned_to`, `created_at`, `created_by_name`, `created_by_id`, `updated_by`) VALUES
(1, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707463959784, NULL, '50007545', 'VENDOR'),
(2, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707464270562, NULL, '50007545', 'VENDOR'),
(3, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707464341896, NULL, '50007545', 'VENDOR'),
(4, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707819781329, NULL, '50007545', 'VENDOR'),
(5, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707819878704, NULL, '50007545', 'VENDOR'),
(6, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820275284, NULL, '50007545', 'VENDOR'),
(7, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820385084, NULL, '50007545', 'VENDOR'),
(8, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820425495, NULL, '50007545', 'VENDOR'),
(9, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820535765, NULL, '50007545', 'VENDOR'),
(10, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820570575, NULL, '50007545', 'VENDOR'),
(11, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820675588, NULL, '50007545', 'VENDOR'),
(12, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820932262, NULL, '50007545', 'VENDOR'),
(13, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820936524, NULL, '50007545', 'VENDOR'),
(14, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820947403, NULL, '50007545', 'VENDOR'),
(15, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820950186, NULL, '50007545', 'VENDOR'),
(16, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820952392, NULL, '50007545', 'VENDOR'),
(17, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820953724, NULL, '50007545', 'VENDOR'),
(18, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820977168, NULL, '50007545', 'VENDOR'),
(19, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820981324, NULL, '50007545', 'VENDOR'),
(20, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820983800, NULL, '50007545', 'VENDOR'),
(21, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820985627, NULL, '50007545', 'VENDOR'),
(22, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820986983, NULL, '50007545', 'VENDOR'),
(23, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707820988491, NULL, '50007545', 'VENDOR'),
(24, '7800000047', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707821001725, NULL, '50007545', 'VENDOR'),
(25, '7800000047', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707821003913, NULL, '50007545', 'VENDOR'),
(26, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707821005417, NULL, '50007545', 'VENDOR'),
(27, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707821006679, NULL, '50007545', 'VENDOR'),
(28, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707821007767, NULL, '50007545', 'VENDOR'),
(29, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707821008895, NULL, '50007545', 'VENDOR'),
(30, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707821010657, NULL, '50007545', 'VENDOR'),
(31, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1707821012862, NULL, '50007545', 'VENDOR'),
(32, '7800000040', NULL, NULL, 'sdbg submited please check', 'PENDING', NULL, NULL, '50007545', NULL, NULL, 1708598098301, NULL, '50007545', 'VENDOR');

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
-- Table structure for table `sdbg_entry`
--

CREATE TABLE `sdbg_entry` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(18) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `ifsc_code` varchar(20) NOT NULL,
  `bank_addr1` varchar(255) NOT NULL,
  `bank_addr2` varchar(255) DEFAULT NULL,
  `bank_addr3` varchar(255) DEFAULT NULL,
  `bank_city` varchar(255) DEFAULT NULL,
  `bank_pin_code` varchar(7) DEFAULT NULL,
  `bg_no` varchar(255) NOT NULL,
  `bg_date` bigint(20) NOT NULL,
  `bg_ammount` float NOT NULL,
  `department` varchar(255) NOT NULL,
  `po_date` bigint(20) NOT NULL,
  `yard_no` varchar(255) NOT NULL,
  `validity_date` bigint(20) NOT NULL,
  `claim_priod` varchar(150) NOT NULL,
  `check_list_reference` varchar(200) NOT NULL,
  `check_list_date` bigint(20) NOT NULL,
  `bg_type` varchar(60) NOT NULL,
  `vendor_name` varchar(100) DEFAULT NULL,
  `vendor_address1` text DEFAULT NULL,
  `vendor_address2` text DEFAULT NULL,
  `vendor_address3` text DEFAULT NULL,
  `vendor_city` varchar(60) DEFAULT NULL,
  `vendor_pin_code` varchar(255) DEFAULT NULL,
  `extension_date1` bigint(20) NOT NULL,
  `extension_date2` bigint(20) DEFAULT NULL,
  `extension_date3` bigint(20) DEFAULT NULL,
  `extension_date4` bigint(20) DEFAULT NULL,
  `extension_date5` bigint(20) DEFAULT NULL,
  `extension_date6` bigint(20) DEFAULT NULL,
  `release_date` bigint(20) NOT NULL,
  `demand_notice_date` bigint(20) NOT NULL,
  `entension_letter_date` bigint(20) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='sdbg entry';

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
  `file_name` varchar(500) DEFAULT NULL,
  `file_type_id` varchar(100) NOT NULL,
  `file_type_name` varchar(255) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shipping_documents`
--

INSERT INTO `shipping_documents` (`id`, `purchasing_doc_no`, `file_name`, `file_type_id`, `file_type_name`, `vendor_code`, `file_path`, `remarks`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '4700013227', 'a.pdf', '1', '', '500012', 'uploads/shippingDocs', 'new', 'VENDOR', 1697106743, '622009'),
(2, '13141411411', '1706525062753-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\inspectionCallLetter\\1706525062753-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706525062760, '600232'),
(3, '13141411411', '1706525565309-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\inspectionCallLetter\\1706525565309-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706525565315, '600232'),
(4, '13141411411', '1706525619079-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\shippingDocuments\\1706525619079-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706525619086, '600232'),
(5, '13141411411', '1706525623733-setup ftp server in Linux server.pdf', '1', '', '600232', 'uploads\\shippingDocuments\\1706525623733-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706525623735, '600232'),
(6, '13141411411', '1706594631522-setup ftp server in Linux server.pdf', '1', 'my', '600232', 'uploads\\shippingDocuments\\1706594631522-setup ftp server in Linux server.pdf', 'new', 'GRSE', 1706594631525, '600232');

-- --------------------------------------------------------

--
-- Table structure for table `sub_dept`
--

CREATE TABLE `sub_dept` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_dept`
--

INSERT INTO `sub_dept` (`id`, `name`) VALUES
(1, 'Hull'),
(2, 'Electrical'),
(3, 'Machinery'),
(4, 'Plumbing');

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE `test_table` (
  `id` int(2) NOT NULL,
  `x` int(2) NOT NULL,
  `message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_table`
--

INSERT INTO `test_table` (`id`, `x`, `message`) VALUES
(1, 3, 'm1113508'),
(2, 3, 'm1'),
(3, 3, 'm13');

-- --------------------------------------------------------

--
-- Table structure for table `tnc_minutes`
--

CREATE TABLE `tnc_minutes` (
  `id` int(11) NOT NULL,
  `file_name` varchar(500) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_type` varchar(500) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(50) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tnc_minutes`
--

INSERT INTO `tnc_minutes` (`id`, `file_name`, `file_path`, `file_type`, `created_at`, `created_by_id`, `purchasing_doc_no`) VALUES
(1, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706177473483, '50007545', '8765678900'),
(2, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706178440432, '50007545', '8765678900'),
(3, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706178444776, '50007545', '8765678900'),
(4, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706178507219, '50007545', '8765678900'),
(5, '8765678900.pdf', 'uploads\\tncminutes\\8765678900.pdf', 'application/pdf', 1706178593666, '50007545', '8765678900'),
(6, '131414.pdf', 'uploads\\tncminutes\\131414.pdf', 'application/pdf', 1706608408649, '600229', '131414'),
(7, '4800005422.pdf', 'uploads\\tncminutes\\4800005422.pdf', 'application/pdf', 1706612829100, 'ERPDM1', '4800005422');

-- --------------------------------------------------------

--
-- Table structure for table `t_email_to_send`
--

CREATE TABLE `t_email_to_send` (
  `id` bigint(20) NOT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `email_to` varchar(255) NOT NULL,
  `email_subject` varchar(255) NOT NULL,
  `email_cc` varchar(255) DEFAULT NULL,
  `email_bcc` varchar(255) DEFAULT NULL,
  `email_body` varchar(4000) NOT NULL,
  `email_send_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(10) NOT NULL,
  `created_on` date NOT NULL DEFAULT current_timestamp(),
  `modified_by` varchar(10) DEFAULT NULL,
  `modified_on` date DEFAULT NULL,
  `attachemnt_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='email_send table';

--
-- Dumping data for table `t_email_to_send`
--

INSERT INTO `t_email_to_send` (`id`, `event_name`, `email_to`, `email_subject`, `email_cc`, `email_bcc`, `email_body`, `email_send_on`, `created_by`, `created_on`, `modified_by`, `modified_on`, `attachemnt_path`) VALUES
(1, NULL, 'krds@email.com', 'test', 'you_cc@email.com', 'you_bcc@email.com', 'This is testing email', '2024-02-07 05:38:04', '6804', '2024-02-07', NULL, NULL, 'd:/grse/obps/backend/api/v1/ping.pdf'),
(2, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:07:55 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:37:55', '50007545', '2024-02-13', NULL, NULL, NULL),
(3, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:12:12 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:42:12', '50007545', '2024-02-13', NULL, NULL, NULL),
(4, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:12:16 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:42:16', '50007545', '2024-02-13', NULL, NULL, NULL),
(5, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:12:57 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:42:57', '50007545', '2024-02-13', NULL, NULL, NULL),
(6, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:01 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:01', '50007545', '2024-02-13', NULL, NULL, NULL),
(7, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:03 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:03', '50007545', '2024-02-13', NULL, NULL, NULL),
(8, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:05 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:05', '50007545', '2024-02-13', NULL, NULL, NULL),
(9, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:06 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:06', '50007545', '2024-02-13', NULL, NULL, NULL),
(10, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:08 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:08', '50007545', '2024-02-13', NULL, NULL, NULL),
(11, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:21 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:21', '50007545', '2024-02-13', NULL, NULL, NULL),
(12, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:23 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:23', '50007545', '2024-02-13', NULL, NULL, NULL),
(13, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:25 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:25', '50007545', '2024-02-13', NULL, NULL, NULL),
(14, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:26 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:26', '50007545', '2024-02-13', NULL, NULL, NULL),
(15, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:27 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:27', '50007545', '2024-02-13', NULL, NULL, NULL),
(16, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:28 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:28', '50007545', '2024-02-13', NULL, NULL, NULL),
(17, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:30 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:30', '50007545', '2024-02-13', NULL, NULL, NULL),
(18, 'SDBG_SUBMIT_BY_VENDOR', 'kamal.ruidas@datacoresystems.co.in', 'New SDBG Submitted by Vendor', NULL, NULL, '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear DCG DATA -CORE SYSTEMS (INDIA) PRIV, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 7800000040.\n        <br>\n        <br>\n        By : Naskar Sir <br>\n        Remarks: sdbg submited please check<br>\n        Date : Tue Feb 13 2024 16:13:32 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', '2024-02-13 10:43:32', '50007545', '2024-02-13', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_privilege`
--

CREATE TABLE `user_privilege` (
  `id` int(11) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `internal_role_id` int(11) DEFAULT NULL,
  `privilege_id` int(11) NOT NULL,
  `emp_id` varchar(25) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_privilege`
--

INSERT INTO `user_privilege` (`id`, `department_id`, `internal_role_id`, `privilege_id`, `emp_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 12, 3, 0, 'admin', 'Mrinmoy Ghosh', '2023-09-12 10:25:51', NULL),
(2, 1, 6, 0, 'vendor', 'Vendor1', '2023-10-12 15:55:23', NULL),
(3, 0, 6, 0, 'vendor2', 'Vendor2', '2023-10-12 15:56:56', NULL),
(4, 3, 2, 0, '600231', 'grse qap staff', '2023-10-12 15:57:39', NULL),
(5, 3, 1, 0, '600229', 'grse qap assigner', '2023-10-12 15:58:16', NULL),
(6, 13, 4, 0, 'super_admin', 'Kamal Ruidas', '2023-09-12 10:25:51', NULL),
(7, 3, 2, 0, '600947', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(8, 3, 2, 0, '600948', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(9, 3, 2, 0, '600232', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(10, 3, 2, 0, '600233', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(11, 3, 2, 0, '600949', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(12, 3, 2, 0, '600951', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(13, 3, 2, 0, '600953', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(14, 3, 2, 0, '600950', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(15, 3, 2, 0, '600252', 'grse qap staff', '2023-10-12 15:58:16', NULL),
(16, 14, 3, 0, '600100', 'ppc_user', '2024-01-15 14:08:08', NULL),
(18, 15, 1, 1, '600200', 'grse_FINANCE_ASSIGNER', '2024-01-23 16:44:53', NULL),
(19, 16, 0, 0, '600300', 'grse_RIC', '2024-01-23 16:44:53', NULL),
(20, 15, 2, 1, '600201', 'grse_FINANCE_STAFF', '2024-01-23 16:44:53', NULL),
(21, 17, 1, 0, '493834', 'Po dealing officer', '2024-01-23 16:44:53', NULL),
(22, 2, 1, 0, '600400', 'CDO(drawing officer)', '2024-01-23 16:44:53', NULL);

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
(5, 'ADMIN', 1697192466, 1697192466),
(6, 'SUPER_ADMIN', 1697192466, 1697192466);

-- --------------------------------------------------------

--
-- Table structure for table `wbs`
--

CREATE TABLE `wbs` (
  `wbs_id` varchar(11) NOT NULL,
  `project_code` varchar(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wbs`
--

INSERT INTO `wbs` (`wbs_id`, `project_code`, `purchasing_doc_no`) VALUES
('W1', 'P1', '4700013227'),
('W1', 'P1', '4800008195'),
('W2', 'P2', '4700016027'),
('W2', 'P2', '4800011669'),
('W1', 'P1', '7800000040');

-- --------------------------------------------------------

--
-- Table structure for table `wbs_element`
--

CREATE TABLE `wbs_element` (
  `C_PKEY` varchar(16) NOT NULL,
  `EBELN` varchar(10) NOT NULL COMMENT 'Purchasing Document Number',
  `EBELP` int(5) NOT NULL COMMENT 'Item Number of Purchasing Document',
  `WBS_ELEMENT` varchar(24) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)',
  `NETWORK` varchar(12) DEFAULT NULL COMMENT 'Network Number for Account Assignment'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wbs_element`
--

INSERT INTO `wbs_element` (`C_PKEY`, `EBELN`, `EBELP`, `WBS_ELEMENT`, `NETWORK`) VALUES
('1000001006-20', '1000001006', 20, 'wbejdkdkkdk', 'ABCD'),
('1000001009-10', '1000001009', 10, 'wbejdkdkkdk', 'ABCD'),
('1000001009-20', '1000001009', 20, 'wbejdkdkkdk', 'ABCD');

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

--
-- Dumping data for table `wdc`
--

INSERT INTO `wdc` (`id`, `purchasing_doc_no`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '8765678900', NULL, 'DATA CORE', NULL, 'REMARKS', 'PENDING', 'VENDOR', 1704274898750, 'KAMAL RUIDAS', 'kamal.ruidas@datacoresystems.co.in');

-- --------------------------------------------------------

--
-- Table structure for table `wmc`
--

CREATE TABLE `wmc` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `document_type` varchar(40) DEFAULT NULL,
  `file_name` varchar(300) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wmc`
--

INSERT INTO `wmc` (`id`, `purchasing_doc_no`, `document_type`, `file_name`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '2233445', '1', '1706867143873-Flow chart- Service PO (1).pdf', 'uploads\\wmc\\1706867143873-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706867143939, '493834'),
(2, '2233445', '1', '1706867725693-Flow chart- Service PO (1).pdf', 'uploads\\wmc\\1706867725693-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706867725698, '493834'),
(3, '2233445', '1', '1706867726733-Flow chart- Service PO (1).pdf', 'uploads\\wmc\\1706867726733-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706867726738, '493834'),
(4, '2233445', '1', '1706867727642-Flow chart- Service PO (1).pdf', 'uploads\\wmc\\1706867727642-Flow chart- Service PO (1).pdf', 'new', 'SUBMIT', 'GRSE', 1706867727645, '493834');

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
(NULL, '20231123002', '2023-11-23', '11:30:55', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221001', '2023-12-21', '15:11:07', 'Mrinmoy Ghos', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221002', '2023-12-21', '15:58:39', 'DCG', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221003', '2023-12-21', '16:01:56', 'DCG', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221004', '2023-12-21', '16:02:43', 'DCG', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221005', '2023-12-21', '16:14:53', 'DCG', NULL, NULL, NULL, '50007523', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221006', '2023-12-21', '16:16:25', 'DCG', NULL, NULL, NULL, '50000435', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221007', '2023-12-21', '16:17:05', 'DCG', NULL, NULL, NULL, '50000435', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221008', '2023-12-21', '16:17:07', 'DCG', NULL, NULL, NULL, '50000435', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221009', '2023-12-21', '16:17:07', 'DCG', NULL, NULL, NULL, '50000435', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221010', '2023-12-21', '16:17:39', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221011', '2023-12-21', '16:17:40', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221012', '2023-12-21', '16:17:41', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221013', '2023-12-21', '16:33:24', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221014', '2023-12-21', '16:40:24', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221015', '2023-12-21', '16:40:51', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221016', '2023-12-21', '16:43:35', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20231221017', '2023-12-21', '16:57:12', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new gengrated bill', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240103001', '2024-01-03', '14:52:36', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240103002', '2024-01-03', '14:55:51', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240103003', '2024-01-03', '14:56:17', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240103004', '2024-01-03', '14:56:29', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125001', '2024-01-25', '11:12:51', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125502', '2024-01-25', '11:15:33', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125503', '2024-01-25', '11:15:38', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125504', '2024-01-25', '11:15:45', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125505', '2024-01-25', '11:15:46', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125506', '2024-01-25', '11:15:48', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125507', '2024-01-25', '11:15:49', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125508', '2024-01-25', '11:15:49', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125509', '2024-01-25', '11:15:50', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125510', '2024-01-25', '11:15:51', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125511', '2024-01-25', '11:15:52', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125512', '2024-01-25', '11:15:53', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125513', '2024-01-25', '11:15:54', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125514', '2024-01-25', '11:15:55', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125515', '2024-01-25', '11:15:56', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125516', '2024-01-25', '11:16:06', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125517', '2024-01-25', '11:16:07', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125518', '2024-01-25', '11:16:08', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125519', '2024-01-25', '11:16:08', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240125520', '2024-01-25', '11:16:09', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240219501', '2024-02-19', '11:24:30', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(NULL, '20240219502', '2024-02-19', '11:25:33', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
-- Table structure for table `zfi_bgm_1`
--

CREATE TABLE `zfi_bgm_1` (
  `FILE_NO` varchar(10) NOT NULL COMMENT 'File No',
  `BANKERS_NAME` varchar(40) DEFAULT NULL COMMENT 'Bankers Name',
  `BANKERS_BRANCH` varchar(40) DEFAULT NULL COMMENT 'Bankers Branch',
  `BANKERS_ADD1` varchar(40) DEFAULT NULL COMMENT 'Bankers Address1',
  `BANKERS_ADD2` varchar(40) DEFAULT NULL COMMENT 'Bankers Address2',
  `BANKERS_ADD3` varchar(40) DEFAULT NULL COMMENT 'Bankers Address3',
  `BANKERS_CITY` varchar(20) DEFAULT NULL COMMENT 'Bankers City',
  `B_PIN_CODE` int(6) DEFAULT NULL COMMENT 'Pin Code',
  `BANK_GU_NO` varchar(20) DEFAULT NULL COMMENT 'Bank Guarantee No',
  `BG_DATE` date DEFAULT NULL COMMENT 'BG Date',
  `BG_AMOUNT` varchar(13) DEFAULT NULL COMMENT 'BG Amount',
  `PO_NUMBER` varchar(20) DEFAULT NULL COMMENT 'Purchase Order No',
  `DEPARTMENT` varchar(8) DEFAULT NULL COMMENT 'Department',
  `PO_DATE` date DEFAULT NULL COMMENT 'Purchase Order Date',
  `YARD_NO` int(6) DEFAULT NULL COMMENT 'Yard No',
  `VALIDITY_DATE` date DEFAULT NULL COMMENT 'Validity Date',
  `CLAIM_PERIOD` date DEFAULT NULL COMMENT 'Claim Period',
  `CHECKLIST_REF` varchar(15) DEFAULT NULL COMMENT 'Checklist Reference',
  `CHECKLIST_DATE` date DEFAULT NULL COMMENT 'Checklist Date',
  `BG_TYPE` varchar(3) DEFAULT NULL COMMENT 'BG Type',
  `VENDOR_NAME` varchar(40) DEFAULT NULL COMMENT 'Vendor Name',
  `VENDOR_ADD1` varchar(40) DEFAULT NULL COMMENT 'Vendor Address1',
  `VENDOR_ADD2` varchar(40) DEFAULT NULL COMMENT 'Vendor Address2',
  `VENDOR_ADD3` varchar(40) DEFAULT NULL COMMENT 'Vendor Address3',
  `VENDOR_CITY` varchar(20) DEFAULT NULL COMMENT 'Vendor City',
  `V_PIN_CODE` int(6) DEFAULT NULL COMMENT 'Vendors Pin Code',
  `CONFIRMATION` varchar(1) DEFAULT NULL COMMENT 'Confirmation',
  `EXTENTION_DATE1` date DEFAULT NULL COMMENT 'Extention Date1',
  `EXTENTION_DATE2` date DEFAULT NULL COMMENT 'Extention Date2',
  `EXTENTION_DATE3` date DEFAULT NULL COMMENT 'Extention Date3',
  `EXTENTION_DATE4` date DEFAULT NULL COMMENT 'Extention Date4',
  `EXTENTION_DATE5` date DEFAULT NULL COMMENT 'Extention Date5',
  `EXTENTION_DATE6` date DEFAULT NULL COMMENT 'Extention Date6',
  `RELEASE_DATE` date DEFAULT NULL COMMENT 'Release Date',
  `DEM_NOTICE_DATE` date DEFAULT NULL COMMENT 'Demand Notice Date',
  `EXT_LETTER_DATE` date DEFAULT NULL COMMENT ' Extention Letter Date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='SDBG Payment Advice';

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
-- Dumping data for table `zmm_gate_entry_d`
--

INSERT INTO `zmm_gate_entry_d` (`C_PKEY`, `ENTRY_NO`, `EBELN`, `EBELP`, `W_YEAR`, `CH_QTY`, `MATNR`, `TXZ01`, `GROSS_WT`, `TIER_WT`, `NET_WT`, `CH_NETWT`, `ZQLTYSAMP`, `ZUNLOADNO`, `ZSTRLOCTN`, `GRWTDT`, `GRWTTM`, `TAWTDT`, `TAWTTM`, `ZUNLDDT`, `ZUNLDTM`, `ZUNLD_IN`, `ZUNLD_OUT`, `ZUNLDDT_OUT`, `ZUNLDTM_OUT`, `GRWTTERM`, `TAWTTERM`, `UNLDTERM`, `ZLASTDATE`, `ZLASTTERM`, `ZUSNAME`, `ZREASON`, `MIGOSTATUS`, `STATUS`, `TUNAME`, `GUNAME`, `MBLNR`, `VBELN_D`, `FLG`, `BATCH`, `MENGE_OPEN`, `RECV_FLG`, `LAST_RECV`, `WERKS`, `UNUSER`, `ZTCODE`, `UTYPE`, `MIGOSTAT`, `TKNO`, `GKNO`, `RSREM`, `RSUSER`, `GUTYPE`, `HOLDID`, `PRCH_QTY`, `ZRMK1`, `MJAHR`, `RSTNO`, `UNCLEARED_QTY`, `ZMBLNR`, `VBELN`, `POSNR`, `ZMJAHR`, `ZEILE`) VALUES
('GT121313-400002323-10-2024', 'GT121313', '400002323', 10, 2024, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('GT121313-400002323-20-2024', 'GT121313', '400002323', 20, 2024, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `VEH_REG_NO` varchar(12) DEFAULT NULL COMMENT 'Vehicle registration number',
  `LR_NO` varchar(20) DEFAULT NULL COMMENT 'L.R. no',
  `LR_DATE` date DEFAULT NULL COMMENT 'L.R. date',
  `EXNUM` varchar(10) DEFAULT NULL COMMENT 'Excise Invoice No.',
  `EXDAT` date DEFAULT NULL COMMENT 'Excise Document Date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zmm_gate_entry_h`
--

INSERT INTO `zmm_gate_entry_h` (`C_PKEY`, `ENTRY_NO`, `W_YEAR`, `ENTRY_DATE`, `ENTRY_TIME`, `CHALAN_NO`, `CHALAN_DATE`, `DELIV_NO`, `DELIV_DATE`, `TRANS_NO`, `TRAN_NAME`, `VEH_REG_NO`, `LR_NO`, `LR_DATE`, `EXNUM`, `EXDAT`) VALUES
('GT121313-2024', 'GT121313', 2024, '2024-03-04', NULL, '3446327339393', '2024-03-04', NULL, NULL, 'WB02AZ9867', 'SMD TRANSPORT', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `zpo_milestone`
--

CREATE TABLE `zpo_milestone` (
  `C_PKEY` varchar(14) NOT NULL,
  `EBELN` varchar(10) NOT NULL,
  `MID` varchar(3) NOT NULL,
  `MTEXT` varchar(60) DEFAULT NULL,
  `PLAN_DATE` date DEFAULT NULL,
  `MO` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zpo_milestone`
--

INSERT INTO `zpo_milestone` (`C_PKEY`, `EBELN`, `MID`, `MTEXT`, `PLAN_DATE`, `MO`) VALUES
('4000234569-1', '4000234569', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-02', 'M'),
('4000234569-3', '4000234569', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-03', 'M');

-- --------------------------------------------------------

--
-- Table structure for table `ztfi_bil_deface`
--

CREATE TABLE `ztfi_bil_deface` (
  `C_PKEY` varchar(26) NOT NULL COMMENT 'PRIMARY KEY',
  `ZREGNUM` varchar(11) DEFAULT NULL COMMENT 'Bill Tracking Number',
  `SEQNO` int(10) DEFAULT NULL COMMENT 'Natural number',
  `ZBILLPER` varchar(3) DEFAULT NULL COMMENT '3-Byte field',
  `ZCREATE` varchar(1) DEFAULT NULL COMMENT 'Single-Character Flag',
  `ZDELETE` varchar(1) DEFAULT NULL COMMENT 'Single-Character Flag',
  `ZBILLTYPE` varchar(8) DEFAULT NULL COMMENT 'Character field, 8 characters long',
  `ZRECORD` varchar(40) DEFAULT NULL COMMENT 'Vendor Bill Number',
  `ZREGDATE` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZPONO` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `ZVENDOR` varchar(10) DEFAULT NULL COMMENT 'Account Number of Supplier',
  `ZCREATEDBY` varchar(12) DEFAULT NULL COMMENT 'User Name',
  `ZCREATEDON` date DEFAULT NULL COMMENT 'Date',
  `ZCREATEDAT` time DEFAULT NULL COMMENT 'Field of type TIMS',
  `ZMODIFIEDBY` varchar(12) DEFAULT NULL COMMENT 'User Name',
  `ZMODIFIEDON` date DEFAULT NULL COMMENT 'Date',
  `ZMODIFIEDAT` time DEFAULT NULL COMMENT 'Field of type TIMS',
  `ZCERWDC_S` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZCERPAY_S` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZCERATTNDR_S` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZBGFILENO_S` varchar(10) DEFAULT NULL COMMENT 'Character Field Length = 10',
  `ZDDNO_S` varchar(10) DEFAULT NULL COMMENT 'Character Field Length = 10',
  `ZBSCVAL_M_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZNTSUPP_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZNETVALUE_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZCST_VAT_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZCST_VAT_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZTOTALB_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZADD_OTHRCHRG_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZADD_OTHRCHRG_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZADD_OTHRCHRG_1_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZADD_OTHRCHRG_1_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZTOTALA_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZBLNC_PAYMNT_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_INCTAX_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_INCTAX_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_RETNTN_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_RETNTN_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_WRKCONTAX_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_WRKCONTAX_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_LD_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_LD_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_PENALTY_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_PENALTY_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_SD_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_SD_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_OTHR_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_OTHR_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_GROSS_RET` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_GROSS_DED` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_INTSD_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_INTSD_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_CSTOFCON_PAINT_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_CSTOFCON_PAINT_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZNET_PYMNT1_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZNET_BLNCPAY_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZNET_RETNTN_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZNET_LESDEDC_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZNET_PYMNT2_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZLES_OTHRDED_S` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZLES_OTHRDED_TXT` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZBLNC_CERTBY_S` varchar(20) DEFAULT NULL COMMENT 'Char 20',
  `ZBLNC_PBGFILENO_S` varchar(20) DEFAULT NULL COMMENT 'Char 20',
  `ZBLNC_OTHRS_S` varchar(30) DEFAULT NULL COMMENT '30 Characters',
  `ZLD` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZOBDNO_M` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZCERMARKT_M` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZCERINSPEC_M` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZCERGUARNTEE_M` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZCERCOMP_M` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZILMS` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZCPBGFILENO_M` varchar(20) DEFAULT NULL COMMENT 'Char 20',
  `ZINDEM_BNDFILENO_M` varchar(20) DEFAULT NULL COMMENT 'Char 20',
  `ZCHLLNNO_M` varchar(30) DEFAULT NULL COMMENT '30 Characters',
  `ZCHLLNDATE_M` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZCONSIGNNO_M` varchar(30) DEFAULT NULL COMMENT '30 Characters',
  `ZCONSIGNDATE_M` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZCARRIER_M` varchar(30) DEFAULT NULL COMMENT '30 Characters',
  `ZACTLDELDATE1_M` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZACTLDELDATE2_M` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZACTLDELDATE3_M` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZPAYMNTPROCESS_M` date DEFAULT NULL COMMENT 'Field of type DATS',
  `REASON_DEDCTN` varchar(100) DEFAULT NULL COMMENT 'Character 100',
  `ZPBGFILENO_M` varchar(20) DEFAULT NULL COMMENT 'Char 20',
  `ZSRVNO_M` varchar(50) DEFAULT NULL COMMENT 'Comment',
  `ZBILLNO` varchar(40) DEFAULT NULL COMMENT 'Vendor Bill Number',
  `ZBILLDATE` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZSCHDELDATE1_S` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZSCHDELDATE2_S` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZSCHDELDATE3_S` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZDELAY1` varchar(8) DEFAULT NULL COMMENT 'Character field, 8 characters long',
  `ZDELAY2` varchar(8) DEFAULT NULL COMMENT 'Character field, 8 characters long',
  `ZDELAY3` varchar(8) DEFAULT NULL COMMENT 'Character field, 8 characters long',
  `CODE_1` int(3) DEFAULT NULL COMMENT 'Vendor Payment remarks code',
  `CODE` int(3) DEFAULT NULL COMMENT 'Vendor Payment remarks code',
  `REMARKS` varchar(60) DEFAULT NULL COMMENT 'Remarks',
  `REFERENCE` varchar(11) DEFAULT NULL COMMENT 'Bill Tracking Number',
  `REMARKS_1` varchar(60) DEFAULT NULL COMMENT 'Remarks',
  `TEN_PER_AMOUNT` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `COMMENTS_1` varchar(60) DEFAULT NULL COMMENT 'Remarks',
  `COMMENTS` varchar(60) DEFAULT NULL COMMENT 'Remarks',
  `ZTEN_RETNTN_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ZTEN_LESDEDC_S` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `MIRO` varchar(10) DEFAULT NULL COMMENT 'Character Field Length = 10',
  `MIRO_DATE` date DEFAULT NULL COMMENT 'Field of type DATS',
  `ZTEN_PROCESSED_PYMT` varchar(18) DEFAULT NULL COMMENT 'Rate (condition amount or percentage)',
  `ED_EC` varchar(100) DEFAULT NULL COMMENT 'Character 100'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ztfi_bil_deface`
--

INSERT INTO `ztfi_bil_deface` (`C_PKEY`, `ZREGNUM`, `SEQNO`, `ZBILLPER`, `ZCREATE`, `ZDELETE`, `ZBILLTYPE`, `ZRECORD`, `ZREGDATE`, `ZPONO`, `ZVENDOR`, `ZCREATEDBY`, `ZCREATEDON`, `ZCREATEDAT`, `ZMODIFIEDBY`, `ZMODIFIEDON`, `ZMODIFIEDAT`, `ZCERWDC_S`, `ZCERPAY_S`, `ZCERATTNDR_S`, `ZBGFILENO_S`, `ZDDNO_S`, `ZBSCVAL_M_S`, `ZNTSUPP_S`, `ZNETVALUE_S`, `ZCST_VAT_S`, `ZCST_VAT_TXT`, `ZTOTALB_S`, `ZADD_OTHRCHRG_S`, `ZADD_OTHRCHRG_TXT`, `ZADD_OTHRCHRG_1_S`, `ZADD_OTHRCHRG_1_TXT`, `ZTOTALA_S`, `ZBLNC_PAYMNT_S`, `ZLES_INCTAX_S`, `ZLES_INCTAX_TXT`, `ZLES_RETNTN_S`, `ZLES_RETNTN_TXT`, `ZLES_WRKCONTAX_S`, `ZLES_WRKCONTAX_TXT`, `ZLES_LD_S`, `ZLES_LD_TXT`, `ZLES_PENALTY_S`, `ZLES_PENALTY_TXT`, `ZLES_SD_S`, `ZLES_SD_TXT`, `ZLES_OTHR_S`, `ZLES_OTHR_TXT`, `ZLES_GROSS_RET`, `ZLES_GROSS_DED`, `ZLES_INTSD_S`, `ZLES_INTSD_TXT`, `ZLES_CSTOFCON_PAINT_S`, `ZLES_CSTOFCON_PAINT_TXT`, `ZNET_PYMNT1_S`, `ZNET_BLNCPAY_S`, `ZNET_RETNTN_S`, `ZNET_LESDEDC_S`, `ZNET_PYMNT2_S`, `ZLES_OTHRDED_S`, `ZLES_OTHRDED_TXT`, `ZBLNC_CERTBY_S`, `ZBLNC_PBGFILENO_S`, `ZBLNC_OTHRS_S`, `ZLD`, `ZOBDNO_M`, `ZCERMARKT_M`, `ZCERINSPEC_M`, `ZCERGUARNTEE_M`, `ZCERCOMP_M`, `ZILMS`, `ZCPBGFILENO_M`, `ZINDEM_BNDFILENO_M`, `ZCHLLNNO_M`, `ZCHLLNDATE_M`, `ZCONSIGNNO_M`, `ZCONSIGNDATE_M`, `ZCARRIER_M`, `ZACTLDELDATE1_M`, `ZACTLDELDATE2_M`, `ZACTLDELDATE3_M`, `ZPAYMNTPROCESS_M`, `REASON_DEDCTN`, `ZPBGFILENO_M`, `ZSRVNO_M`, `ZBILLNO`, `ZBILLDATE`, `ZSCHDELDATE1_S`, `ZSCHDELDATE2_S`, `ZSCHDELDATE3_S`, `ZDELAY1`, `ZDELAY2`, `ZDELAY3`, `CODE_1`, `CODE`, `REMARKS`, `REFERENCE`, `REMARKS_1`, `TEN_PER_AMOUNT`, `COMMENTS_1`, `COMMENTS`, `ZTEN_RETNTN_S`, `ZTEN_LESDEDC_S`, `MIRO`, `MIRO_DATE`, `ZTEN_PROCESSED_PYMT`, `ED_EC`) VALUES
('333-10009988-ABCD', '333', 10009988, 'ABC', NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('333-10009988-BCD', '333', 10009988, 'BCD', NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('333-10009988-BCDgg', '333', 10009988, 'BCD', NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actualsubmissiondate`
--
ALTER TABLE `actualsubmissiondate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `adr6`
--
ALTER TABLE `adr6`
  ADD PRIMARY KEY (`PERSNUMBER`);

--
-- Indexes for table `archive_emails`
--
ALTER TABLE `archive_emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bill_registration`
--
ALTER TABLE `bill_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department_wise_log`
--
ALTER TABLE `department_wise_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `depertment_master`
--
ALTER TABLE `depertment_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drawing`
--
ALTER TABLE `drawing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ekko`
--
ALTER TABLE `ekko`
  ADD PRIMARY KEY (`EBELN`);

--
-- Indexes for table `ekpo`
--
ALTER TABLE `ekpo`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- Indexes for table `emails`
--
ALTER TABLE `emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emp_department_list`
--
ALTER TABLE `emp_department_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gate_entry`
--
ALTER TABLE `gate_entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grn`
--
ALTER TABLE `grn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icgrn`
--
ALTER TABLE `icgrn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ilms`
--
ALTER TABLE `ilms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inspection_call_letter`
--
ALTER TABLE `inspection_call_letter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inspection_call_letter_file_type`
--
ALTER TABLE `inspection_call_letter_file_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `internal_role_master`
--
ALTER TABLE `internal_role_master`
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
  ADD PRIMARY KEY (`MATNR`);

--
-- Indexes for table `mara`
--
ALTER TABLE `mara`
  ADD PRIMARY KEY (`MATNR`);

--
-- Indexes for table `mkpf`
--
ALTER TABLE `mkpf`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- Indexes for table `mrs`
--
ALTER TABLE `mrs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mseg`
--
ALTER TABLE `mseg`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- Indexes for table `new_auth`
--
ALTER TABLE `new_auth`
  ADD PRIMARY KEY (`auth_id`);

--
-- Indexes for table `new_bill_registration`
--
ALTER TABLE `new_bill_registration`
  ADD PRIMARY KEY (`zbtno`);

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
-- Indexes for table `pa0000`
--
ALTER TABLE `pa0000`
  ADD PRIMARY KEY (`PERNR`);

--
-- Indexes for table `pa0001`
--
ALTER TABLE `pa0001`
  ADD PRIMARY KEY (`PERNR`);

--
-- Indexes for table `pa0002`
--
ALTER TABLE `pa0002`
  ADD PRIMARY KEY (`PERNR`);

--
-- Indexes for table `payment_advice`
--
ALTER TABLE `payment_advice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_advice2`
--
ALTER TABLE `payment_advice2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_voucher`
--
ALTER TABLE `payment_voucher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pf`
--
ALTER TABLE `pf`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privilege`
--
ALTER TABLE `privilege`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qals`
--
ALTER TABLE `qals`
  ADD PRIMARY KEY (`PRUEFLOS`);

--
-- Indexes for table `qap_submission`
--
ALTER TABLE `qap_submission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resb`
--
ALTER TABLE `resb`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- Indexes for table `rkpf`
--
ALTER TABLE `rkpf`
  ADD PRIMARY KEY (`RSNUM`);

--
-- Indexes for table `sdbg`
--
ALTER TABLE `sdbg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdbg_acknowledgement`
--
ALTER TABLE `sdbg_acknowledgement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdbg_entry`
--
ALTER TABLE `sdbg_entry`
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
-- Indexes for table `sub_dept`
--
ALTER TABLE `sub_dept`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_table`
--
ALTER TABLE `test_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tnc_minutes`
--
ALTER TABLE `tnc_minutes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_email_to_send`
--
ALTER TABLE `t_email_to_send`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_privilege`
--
ALTER TABLE `user_privilege`
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
-- Indexes for table `wbs_element`
--
ALTER TABLE `wbs_element`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- Indexes for table `wdc`
--
ALTER TABLE `wdc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wmc`
--
ALTER TABLE `wmc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zbtsi`
--
ALTER TABLE `zbtsi`
  ADD PRIMARY KEY (`ZBTNO`),
  ADD UNIQUE KEY `ZGRNO` (`ZGRNO`);

--
-- Indexes for table `zfi_bgm_1`
--
ALTER TABLE `zfi_bgm_1`
  ADD PRIMARY KEY (`FILE_NO`);

--
-- Indexes for table `zmilestone`
--
ALTER TABLE `zmilestone`
  ADD PRIMARY KEY (`MANDT`,`MID`);

--
-- Indexes for table `zmm_gate_entry_d`
--
ALTER TABLE `zmm_gate_entry_d`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- Indexes for table `zmm_gate_entry_h`
--
ALTER TABLE `zmm_gate_entry_h`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- Indexes for table `zpo_milestone`
--
ALTER TABLE `zpo_milestone`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- Indexes for table `ztfi_bil_deface`
--
ALTER TABLE `ztfi_bil_deface`
  ADD PRIMARY KEY (`C_PKEY`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actualsubmissiondate`
--
ALTER TABLE `actualsubmissiondate`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `archive_emails`
--
ALTER TABLE `archive_emails`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `bill_registration`
--
ALTER TABLE `bill_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `department_wise_log`
--
ALTER TABLE `department_wise_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `depertment_master`
--
ALTER TABLE `depertment_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `drawing`
--
ALTER TABLE `drawing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `emails`
--
ALTER TABLE `emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Mail Id', AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `emp_department_list`
--
ALTER TABLE `emp_department_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `gate_entry`
--
ALTER TABLE `gate_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `grn`
--
ALTER TABLE `grn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `icgrn`
--
ALTER TABLE `icgrn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ilms`
--
ALTER TABLE `ilms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inspection_call_letter`
--
ALTER TABLE `inspection_call_letter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `inspection_call_letter_file_type`
--
ALTER TABLE `inspection_call_letter_file_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `internal_role_master`
--
ALTER TABLE `internal_role_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mrs`
--
ALTER TABLE `mrs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `new_auth`
--
ALTER TABLE `new_auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `new_payments`
--
ALTER TABLE `new_payments`
  MODIFY `sl_no` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `new_sdbg`
--
ALTER TABLE `new_sdbg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_advice`
--
ALTER TABLE `payment_advice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment_advice2`
--
ALTER TABLE `payment_advice2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payment_voucher`
--
ALTER TABLE `payment_voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pf`
--
ALTER TABLE `pf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `privilege`
--
ALTER TABLE `privilege`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `qap_submission`
--
ALTER TABLE `qap_submission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sdbg`
--
ALTER TABLE `sdbg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `sdbg_acknowledgement`
--
ALTER TABLE `sdbg_acknowledgement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sdbg_entry`
--
ALTER TABLE `sdbg_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sdbg_return_submisson`
--
ALTER TABLE `sdbg_return_submisson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_documents`
--
ALTER TABLE `shipping_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sub_dept`
--
ALTER TABLE `sub_dept`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tnc_minutes`
--
ALTER TABLE `tnc_minutes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `t_email_to_send`
--
ALTER TABLE `t_email_to_send`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_privilege`
--
ALTER TABLE `user_privilege`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `wdc`
--
ALTER TABLE `wdc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wmc`
--
ALTER TABLE `wmc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
