-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2024 at 08:25 AM
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
-- Table structure for table `btn_service_hybrid`
--

CREATE TABLE `btn_service_hybrid` (
  `btn_num` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `purchasing_doc_no` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `invoice_no` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `invoice_filename` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `invoice_value` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `e_invoice_no` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `e_invoice_filename` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `debit_note` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `credit_note` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `debit_credit_filename` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `net_gross_claim_amount` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `total_amount` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `vendor_name` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `wdc_number` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `contractual_work_start_date` varchar(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `contractual_work_completion_date` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `actual_work_start_date` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `actual_work_completion_date` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `esi_compliance_certified` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `pf_compliance_certified` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Wage_compliance_certified` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `pbg` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `hsn_gstn_icgrn` tinyint(1) DEFAULT NULL,
  `updated_by` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_id` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `vendor_code` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `assigned_to` varchar(14) NOT NULL,
  `btn_type` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `btn_service_hybrid`
--

INSERT INTO `btn_service_hybrid` (`btn_num`, `purchasing_doc_no`, `invoice_no`, `invoice_filename`, `invoice_value`, `e_invoice_no`, `e_invoice_filename`, `debit_note`, `credit_note`, `debit_credit_filename`, `net_gross_claim_amount`, `total_amount`, `vendor_name`, `wdc_number`, `contractual_work_start_date`, `contractual_work_completion_date`, `actual_work_start_date`, `actual_work_completion_date`, `esi_compliance_certified`, `pf_compliance_certified`, `Wage_compliance_certified`, `pbg`, `hsn_gstn_icgrn`, `updated_by`, `created_at`, `created_by_id`, `vendor_code`, `assigned_to`, `btn_type`) VALUES
('BTN20240424994', '7800000040', 'REMARKS', '', '43', '2345', '', '34', '23', '', '54', '3456', '45tyt6yuj', '3erfrthyujuk,', '123456787', '67876567j76', '12343434343', '234234545345', '3e3e3e3e', '2334', '23445y', '3edf4rtg', 1, '', 4, '', '50007545', '', 'hybrid-bill-service'),
('BTN20240424994', '7800000040', 'REMARKS', '', '43', '2345', '', '34', '23', '', '54', '3456', '45tyt6yuj', '3erfrthyujuk,', '123456787', '67876567j76', '12343434343', '234234545345', '3e3e3e3e', '2334', '23445y', '3edf4rtg', 1, '', 4, '', '50007545', '324543', 'hybrid-bill-service');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
