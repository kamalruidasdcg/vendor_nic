-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2024 at 08:13 AM
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
(1, '4700013553', '1701254356049-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701254356049-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'VENDOR', 1701254356096, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(2, '4700013553', '1701254364918-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701254364918-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'APPROVED', 'VENDOR', 1701254364933, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com'),
(3, '4700013229', '1701254824179-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701254824179-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'VENDOR', 1701254824222, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(4, '4700013229', '1701254951342-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701254951342-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'VENDOR', 1701254951352, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(5, '4700013229', '1701254981560-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701254981560-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'APPROVED', 'VENDOR', 1701254981570, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(6, '4700013230', '1701348968218-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701348968218-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'VENDOR', 1701348968231, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(7, '4700013230', '1701349034781-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701349034781-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'VENDOR', 1701349034789, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(8, '4700013230', '1701349155706-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701349155706-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'GRSE', 1701349155718, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(9, '4700013230', '1701349185823-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701349185823-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'APPROVED', 'GRSE', 1701349185831, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(10, '4700013231', '1701349349451-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701349349451-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'APPROVED', 'GRSE', 1701349349458, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(11, '4800007095', '1701777647338-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50005041', 'uploads\\drawing\\1701777647338-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'VENDOR', 1701777647350, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(12, '4800007095', '1701777715886-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', 'uploads\\drawing\\1701777715886-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'GRSE', 1701777715892, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(13, '4800007095', '1702283276391-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50005041', 'uploads\\drawing\\1702283276391-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'VENDOR', 1702283276403, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com'),
(14, '4800007095', '1704265998909-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50005041', 'uploads\\drawing\\1704265998909-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'REMARKS 1', 'PENDING', 'VENDOR', 1704265998914, 'KAMAL RUIDAS', 'kamal.sspur@gmail.com');

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

--
-- Dumping data for table `archive_emails`
--

INSERT INTO `archive_emails` (`id`, `event`, `sender`, `subject`, `body`, `status`, `message`, `created_at`, `creatd_by_name`, `created_by_id`) VALUES
(1, 'SDBG_SUBMIT_BY_VENDOR', 'mainak.dutta16@gmail.com', 'New SDBG submitted', '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\n        <br>\n        <br>\n        By : KAMAL RUIDAS <br>\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\n        Date : Thu Jan 04 2024 17:30:55 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', 'NEW', '{\"to\":\"mainak.dutta16@gmail.com\",\"subject\":\"New SDBG submitted\",\"html\":\"\\n        <!DOCTYPE html>\\n        <html>\\n          <head>\\n            <meta charset=\\\"utf-8\\\">\\n            <title>E-Mail OBPS Project</title>\\n            <style>\\n              .container {\\n                width: 100%;\\n                height: 100%;\\n                padding: 20px;\\n                background-color: #f4f4f4;\\n              }\\n              .email {\\n                width: 80%;\\n                margin: 0 auto;\\n                background-color: #fff;\\n                padding: 20px;\\n              }\\n              .email-header {\\n                background-color: #333;\\n                color: #fff;\\n                padding: 20px;\\n                text-align: center;\\n              }\\n              .email-body {\\n                padding: 20px;\\n              }\\n              .email-footer {\\n                padding: 20px;\\n                text-align: center;\\n              }\\n            </style>\\n          </head>\\n          <body>\\n            <div class=\\\"container\\\">\\n              <div class=\\\"email\\\">\\n                <div class=\\\"email-body\\\">\\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\\n        <br>\\n        <br>\\n        By : KAMAL RUIDAS <br>\\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\\n        Date : Thu Jan 04 2024 17:30:55 GMT+0530 (India Standard Time) <br>\\n        </p>\\n                </div>\\n                <div class=\\\"email-footer\\\">\\n                  <p>Don\'t reply to this mail.</p>\\n                </div>\\n              </div>\\n            </div>\\n          </body>\\n        </html>\\n      \"}', 1704369666888, 'MAINAK DUTTA', '50007545'),
(2, 'SDBG_SUBMIT_BY_VENDOR', 'mainak.dutta16@gmail.com', 'New SDBG submitted', '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\n        <br>\n        <br>\n        By : KAMAL RUIDAS <br>\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\n        Date : Thu Jan 04 2024 17:32:34 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', 'NEW', '{\"to\":\"mainak.dutta16@gmail.com\",\"subject\":\"New SDBG submitted\",\"html\":\"\\n        <!DOCTYPE html>\\n        <html>\\n          <head>\\n            <meta charset=\\\"utf-8\\\">\\n            <title>E-Mail OBPS Project</title>\\n            <style>\\n              .container {\\n                width: 100%;\\n                height: 100%;\\n                padding: 20px;\\n                background-color: #f4f4f4;\\n              }\\n              .email {\\n                width: 80%;\\n                margin: 0 auto;\\n                background-color: #fff;\\n                padding: 20px;\\n              }\\n              .email-header {\\n                background-color: #333;\\n                color: #fff;\\n                padding: 20px;\\n                text-align: center;\\n              }\\n              .email-body {\\n                padding: 20px;\\n              }\\n              .email-footer {\\n                padding: 20px;\\n                text-align: center;\\n              }\\n            </style>\\n          </head>\\n          <body>\\n            <div class=\\\"container\\\">\\n              <div class=\\\"email\\\">\\n                <div class=\\\"email-body\\\">\\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\\n        <br>\\n        <br>\\n        By : KAMAL RUIDAS <br>\\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\\n        Date : Thu Jan 04 2024 17:32:34 GMT+0530 (India Standard Time) <br>\\n        </p>\\n                </div>\\n                <div class=\\\"email-footer\\\">\\n                  <p>Don\'t reply to this mail.</p>\\n                </div>\\n              </div>\\n            </div>\\n          </body>\\n        </html>\\n      \"}', 1704369846988, 'MAINAK DUTTA', '50007545'),
(3, 'SDBG_SUBMIT_BY_VENDOR', 'mainak.dutta16@gmail.com', 'New SDBG submitted', '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\n        <br>\n        <br>\n        By : KAMAL RUIDAS <br>\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\n        Date : Thu Jan 04 2024 17:32:37 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', 'NEW', '{\"to\":\"mainak.dutta16@gmail.com\",\"subject\":\"New SDBG submitted\",\"html\":\"\\n        <!DOCTYPE html>\\n        <html>\\n          <head>\\n            <meta charset=\\\"utf-8\\\">\\n            <title>E-Mail OBPS Project</title>\\n            <style>\\n              .container {\\n                width: 100%;\\n                height: 100%;\\n                padding: 20px;\\n                background-color: #f4f4f4;\\n              }\\n              .email {\\n                width: 80%;\\n                margin: 0 auto;\\n                background-color: #fff;\\n                padding: 20px;\\n              }\\n              .email-header {\\n                background-color: #333;\\n                color: #fff;\\n                padding: 20px;\\n                text-align: center;\\n              }\\n              .email-body {\\n                padding: 20px;\\n              }\\n              .email-footer {\\n                padding: 20px;\\n                text-align: center;\\n              }\\n            </style>\\n          </head>\\n          <body>\\n            <div class=\\\"container\\\">\\n              <div class=\\\"email\\\">\\n                <div class=\\\"email-body\\\">\\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\\n        <br>\\n        <br>\\n        By : KAMAL RUIDAS <br>\\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\\n        Date : Thu Jan 04 2024 17:32:37 GMT+0530 (India Standard Time) <br>\\n        </p>\\n                </div>\\n                <div class=\\\"email-footer\\\">\\n                  <p>Don\'t reply to this mail.</p>\\n                </div>\\n              </div>\\n            </div>\\n          </body>\\n        </html>\\n      \"}', 1704369853771, 'MAINAK DUTTA', '50007545'),
(4, 'SDBG_SUBMIT_BY_VENDOR', 'mainak.dutta16@gmail.com', 'New SDBG submitted', '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\n        <br>\n        <br>\n        By : KAMAL RUIDAS <br>\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\n        Date : Thu Jan 04 2024 17:32:39 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', 'NEW', '{\"to\":\"mainak.dutta16@gmail.com\",\"subject\":\"New SDBG submitted\",\"html\":\"\\n        <!DOCTYPE html>\\n        <html>\\n          <head>\\n            <meta charset=\\\"utf-8\\\">\\n            <title>E-Mail OBPS Project</title>\\n            <style>\\n              .container {\\n                width: 100%;\\n                height: 100%;\\n                padding: 20px;\\n                background-color: #f4f4f4;\\n              }\\n              .email {\\n                width: 80%;\\n                margin: 0 auto;\\n                background-color: #fff;\\n                padding: 20px;\\n              }\\n              .email-header {\\n                background-color: #333;\\n                color: #fff;\\n                padding: 20px;\\n                text-align: center;\\n              }\\n              .email-body {\\n                padding: 20px;\\n              }\\n              .email-footer {\\n                padding: 20px;\\n                text-align: center;\\n              }\\n            </style>\\n          </head>\\n          <body>\\n            <div class=\\\"container\\\">\\n              <div class=\\\"email\\\">\\n                <div class=\\\"email-body\\\">\\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\\n        <br>\\n        <br>\\n        By : KAMAL RUIDAS <br>\\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\\n        Date : Thu Jan 04 2024 17:32:39 GMT+0530 (India Standard Time) <br>\\n        </p>\\n                </div>\\n                <div class=\\\"email-footer\\\">\\n                  <p>Don\'t reply to this mail.</p>\\n                </div>\\n              </div>\\n            </div>\\n          </body>\\n        </html>\\n      \"}', 1704369860709, 'MAINAK DUTTA', '50007545'),
(20, 'SDBG_SUBMIT_BY_VENDOR', 'mainak.dutta16@gmail.com', 'New SDBG submitted', '\n        <!DOCTYPE html>\n        <html>\n          <head>\n            <meta charset=\"utf-8\">\n            <title>E-Mail OBPS Project</title>\n            <style>\n              .container {\n                width: 100%;\n                height: 100%;\n                padding: 20px;\n                background-color: #f4f4f4;\n              }\n              .email {\n                width: 80%;\n                margin: 0 auto;\n                background-color: #fff;\n                padding: 20px;\n              }\n              .email-header {\n                background-color: #333;\n                color: #fff;\n                padding: 20px;\n                text-align: center;\n              }\n              .email-body {\n                padding: 20px;\n              }\n              .email-footer {\n                padding: 20px;\n                text-align: center;\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email\">\n                <div class=\"email-body\">\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\n        <br>\n        <br>\n        By : KAMAL RUIDAS <br>\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\n        Date : Thu Jan 04 2024 17:36:38 GMT+0530 (India Standard Time) <br>\n        </p>\n                </div>\n                <div class=\"email-footer\">\n                  <p>Don\'t reply to this mail.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n        </html>\n      ', 'SENT', '{\"to\":\"mainak.dutta16@gmail.com\",\"subject\":\"New SDBG submitted\",\"html\":\"\\n        <!DOCTYPE html>\\n        <html>\\n          <head>\\n            <meta charset=\\\"utf-8\\\">\\n            <title>E-Mail OBPS Project</title>\\n            <style>\\n              .container {\\n                width: 100%;\\n                height: 100%;\\n                padding: 20px;\\n                background-color: #f4f4f4;\\n              }\\n              .email {\\n                width: 80%;\\n                margin: 0 auto;\\n                background-color: #fff;\\n                padding: 20px;\\n              }\\n              .email-header {\\n                background-color: #333;\\n                color: #fff;\\n                padding: 20px;\\n                text-align: center;\\n              }\\n              .email-body {\\n                padding: 20px;\\n              }\\n              .email-footer {\\n                padding: 20px;\\n                text-align: center;\\n              }\\n            </style>\\n          </head>\\n          <body>\\n            <div class=\\\"container\\\">\\n              <div class=\\\"email\\\">\\n                <div class=\\\"email-body\\\">\\n                  <p>Dear PriceWaterhouseCoopers Pvt Ltd, <br>\\n        Below are the details pertinent to submission of SDBG for the PO - 4800007095.\\n        <br>\\n        <br>\\n        By : KAMAL RUIDAS <br>\\n        Remarks: REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS<br>\\n        Date : Thu Jan 04 2024 17:36:38 GMT+0530 (India Standard Time) <br>\\n        </p>\\n                </div>\\n                <div class=\\\"email-footer\\\">\\n                  <p>Don\'t reply to this mail.</p>\\n                </div>\\n              </div>\\n            </div>\\n          </body>\\n        </html>\\n      \"}', 1704370027861, 'MAINAK DUTTA', '50007545');

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
(2, 1, 1, 0, 'vendor', 'vendor', 'Vendor1', '50007545', '2023-10-12 15:55:23', NULL),
(3, 1, 0, 0, 'vendor2', '1234', 'Vendor2', '50000435', '2023-10-12 15:56:56', NULL),
(4, 3, 3, 2, '600231', '1234', 'qap staff', '600231', '2023-10-12 15:57:39', NULL),
(5, 4, 3, 1, '600229', '1234', 'qap assineer', '600229', '2023-10-12 15:58:16', NULL),
(6, 6, 13, 4, 'super_admin', '0000', 'Kamal Ruidas', '600230', '2023-09-12 10:25:51', NULL);

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
(8, 600229, '50007545', '3', 'ASSIGNED', 11, 'QAP ASSIGN ', '4800001795', 1704537973, '600229'),
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
(4, 'INSPECTION_CALL_LETTER'),
(5, 'SHIPPEING_DOUCMENT'),
(6, 'GATE_ENTRY_GOODS-RECEIPT_ICRGN'),
(7, 'INVOICE_PBG_CHECKLIST'),
(8, 'BILL_REGISTRATION'),
(9, 'PAYMENT_RECOMMENDATION'),
(10, 'RETURING_OF_BILLS'),
(11, 'PAYMENT_VOUCHER'),
(12, 'ADMIN'),
(13, 'SUPER_ADMIN');

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
('10000001', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000002', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000003', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000004', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000005', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000006', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000007', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000008', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000009', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000010', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000011', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000012', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('10000013', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '50000437', '1234', '123'),
('1234512354', '5788', 'S', 'ABCD', 'W', '2023-11-07', '34567656787', '1234567890', '1234', '123'),
('4700013227', 'GRSE', 'F', 'ZDM', NULL, '2015-02-12', 'ERPDM', '50005041', 'GRSE', 'ERP'),
('4700013553', 'GRSE', 'F', 'ZDM', NULL, '2015-03-27', 'ERPDM', '50005041', 'GRSE', 'ERP'),
('4700016027', 'GRSE', 'F', 'ZDM', NULL, '2016-01-29', '487412', '50005041', 'GRSE', 'ERP'),
('4800001795', 'GRSE', 'F', 'ZDM', NULL, '2012-11-28', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800003580', 'GRSE', 'F', 'ZDM', NULL, '2014-03-18', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800004078', 'GRSE', 'F', 'ZDM', NULL, '2014-06-25', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800005422', 'GRSE', 'F', 'ZDM', NULL, '2015-03-19', 'ERPDM1', '50005041', 'GRSE', 'ERP'),
('4800007095', 'GRSE', 'F', 'ZDM', NULL, '2015-09-11', '600230', '50005041', 'GRSE', 'ERP'),
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
('8989898960', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '1234567890', '1234', '123'),
('8989898989', '5788', 'S', 'ABCD', 'W', '2024-11-07', '34567656787', '1234567890', '1234', '123'),
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
('4700013227', 10, '', '', '04.08.2015', 'Impl. of Asset Mgmt as per Co Act 13', '9200MAT', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,200,000.0', '1,200,000.00', 'SG'),
('4700013553', 10, '', '', '22.03.2016', '1. Project Systems & Production Planning', 'SER08205', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,813,063.0', '1,813,063.00', 'SU'),
('4700013553', 15, '', '', '12.01.2017', '1. Project Systems & Production Planning', '9200SPARE-28', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,557,165.0', '1,557,165.00', 'TV'),
('4700013553', 20, '', '', '22.03.2016', '2. Workflows', 'SER08205', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '204,218.00', '204,218.00', 'SU'),
('4700013553', 30, '', '', '22.03.2016', '3. ABAP Reports', 'SER08205', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '81,690.00', '81,690.00', '4S'),
('4700013553', 40, '', '', '12.01.2017', '4. Testing', 'SER08206', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '163,376.00', '163,376.00', 'TV'),
('4700013553', 50, '', '', '12.01.2017', '5. Commissioning the system', 'SER08206', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '81,688.00', '81,688.00', 'TV'),
('4700013553', 60, '', '', '20.06.2019', '6. Warranty Support', 'SER08206', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '490,076.00', '490,076.00', 'TV'),
('4700013553', 70, '', '', '12.01.2017', '7. Training', 'SER08206', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '81,687.00', '81,687.00', 'TV'),
('4700013553', 80, '', '', '12.01.2017', '8. Documentation', 'SER08206', 'GRSE', '100', '', 'SE74', 0, 1, 'LS', '147,037.00', '147,037.00', 'TV'),
('4700016027', 10, '', '', '26.07.2019', 'Inclusion of QA functions in Projects', '', 'GRSE', '100', '', 'SE74', 0, 1, 'AU', '1,440,000.0', '1,440,000.00', '12'),
('4800001795', 10, '', '', '30.11.2012', 'SAP SYSTEM AUDIT & RELATED ACTIVITIES', '9200MAT', 'GRSE', '100', '', 'SE57', 0, 1, 'AU', '4,004,984.0', '4,004,984.00', 'SG'),
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
('QQ00013227', 88, 'W', '1', '20.06.2019', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('1234512354', 10023, 'W', '1', '07.03.2014', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('1234512354', 88, 'W', '1', '20.06.2019', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('1234512354', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('1234512354', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('1234512354', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('1234512354', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000001', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000001', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000002', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000002', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000003', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000003', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000004', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000004', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000005', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000005', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000006', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000006', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000007', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000007', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000008', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000008', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000009', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000009', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000010', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000010', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000011', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000011', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000012', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000012', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('1234512354', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('1234512354', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG'),
('10000013', 10023, 'W', '1', '2014-07-23', 'IncomeTax Rectification in SAP Payroll', NULL, 'GRSE', '100', NULL, 'SE57', 1244, 232131, 'AU', '0', '0', 'TV'),
('10000013', 88, 'W', '1', '2019-06-20', '6. Warranty Support', NULL, 'GRSE', '100', NULL, 'SE74', 0, 1, 'AU', '9000,3222', '124,456,900', 'SG');

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
  `sub_dept_name` varchar(20) NOT NULL,
  `sub_dept_id` varchar(20) NOT NULL,
  `emp_id` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='department  and sub dept list table';

--
-- Dumping data for table `emp_department_list`
--

INSERT INTO `emp_department_list` (`id`, `dept_name`, `dept_id`, `sub_dept_name`, `sub_dept_id`, `emp_id`) VALUES
(1, 'QAP', '3', 'hull', '1', '600229'),
(2, 'QAP', '3', 'electrical', '2', '600947'),
(3, 'QAP', '3', 'hull', '1', '600231'),
(4, 'QAP', '3', 'electrical', '2', '600948'),
(5, 'QAP', '3', 'hull', '1', '600232'),
(7, 'QAP', '3', 'machinery', '3', '600233'),
(8, 'QAP', '3', 'electrical', '2', '600949'),
(9, 'QAP', '3', 'plumbing', '4', '600951'),
(10, 'QAP', '3', 'plumbing', '4', '600953'),
(11, 'QAP', '3', 'plumbing', '4', '600950'),
(12, 'QAP', '3', 'machinery', '3', '600252');

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
(3, '4700013229', '50000437', '', '1704265637863-sample.pdf', 'uploads\\grn\\1704265637863-sample.pdf', NULL, '', '', 1704265637871, 'A RAJA BANERJEE', '600231');

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
(1, '4700013227', '1700647390698-t.c.pdf', '09383HAL', 'uploads\\inspectionCallLetter\\1700647390698-t.c.pdf', 'BAHAMAS MISSILE DRAWING4', '1', 'VENDOR', 1700647390969, 'Hindustan Aeronautics Limited', '09383HAL'),
(8, '47654764345', '1704276529024-eket.pdf', '50005041', 'uploads\\inspectionCallLetter\\1704276529024-eket.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704276529126, 'KAMAL RUIDAS', '6804');

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
(4, 'SUPER_ADMIN');

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
('50007545', 'IN', 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00'),
('600229', 'IN', 'naskar sir', 'KOLKATA', NULL, NULL, '25', 'DOMV', NULL, 'EN', 'AAFCD4828F', NULL, '19AAFCD4828F1ZL', '0000-00-00');

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

--
-- Dumping data for table `makt`
--

INSERT INTO `makt` (`MANDT`, `MATNR`, `SPRAS`, `MAKTX`, `MAKTG`) VALUES
(0, '9200MAT', 'a', 'desc desc', 'desc dejd');

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
('9200MAT', 'ZDIN'),
('9200SPARE-28', 'ZDIN'),
('9200SPARE18', 'ZDIN'),
('SER08205', 'ZDIN'),
('SER08206', 'ZDIN'),
('000000015114117149', 'ZROH'),
('000000015128076737', 'ZROH');

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
('20240103004', '6804', 'KB', '2023-09-27', 'kamal.ruidas@gmail.com', 'dbc', '00:00:00', 1704273989966, '1704273989959-sample.pdf', 'uploads\\invoice\\1704273989959-sample.pdf', '123232344', '8765678987', 'new bill registration', '50007545', 'mrinmoygh081@gmail.com', 'DCG');

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
  `isLocked` tinyint(1) NOT NULL COMMENT 'Locked Record',
  `updated_by` varchar(30) NOT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
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

INSERT INTO `new_sdbg` (`id`, `purchasing_doc_no`, `file_name`, `file_path`, `remarks`, `status`, `isLocked`, `updated_by`, `bank_name`, `transaction_id`, `vendor_code`, `created_at`, `created_by_name`, `created_by_id`, `updated_by_name`, `updated_by_id`, `updated_at`) VALUES
(1, '4700013229', '1701251326624-pa0105.pdf', 'uploads\\sdbg\\1701251326624-pa0105.pdf', 'REMARKS', 'PENDING', 0, 'GRSE', 'Axis Bank', '476547643456789', 'DATA CORE', 1701251326632, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com', 'kamal', '00000105', 1701260275562),
(2, '4700013229', '1701252034328-pa0105.pdf', 'uploads\\sdbg\\1701252034328-pa0105.pdf', 'REMARKS', 'ACKNOWLEDGED', 0, 'GRSE', 'Axis Bank', '476547643456789', 'DATA CORE', 1701252034375, 'KAMAL RUIDAS', 'kamal.sspur@gmai.com', 'kamal', '00000105', 1702299110374),
(3, '4700013230', '1701347325654-pa0105.pdf', 'uploads\\sdbg\\1701347325654-pa0105.pdf', 'REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', 'DATA CORE', 1701347325660, 'KAMAL RUIDAS', '6804', '', '', 0),
(4, '4700013230', '1701347472534-pa0105.pdf', 'uploads\\sdbg\\1701347472534-pa0105.pdf', 'REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701347472540, 'KAMAL RUIDAS', '6804', '', '', 0),
(5, '4700013230', '1701347522030-pa0105.pdf', 'uploads\\sdbg\\1701347522030-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701347522034, 'KAMAL RUIDAS', '6804', '', '', 0),
(6, '4700013230', '1701347845116-pa0105.pdf', 'uploads\\sdbg\\1701347845116-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'GRSE', 'Axis Bank', '476547643456789', '1324242425', 1701347845124, 'KAMAL RUIDAS', '6804', '', '', 0),
(7, '4700013230', '1701347897924-pa0105.pdf', 'uploads\\sdbg\\1701347897924-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'GRSE', 'Axis Bank', '476547643456789', '1324242425', 1701347897933, 'KAMAL RUIDAS', '6804', '', '', 0),
(8, '4700013230', '1701348002534-pa0105.pdf', 'uploads\\sdbg\\1701348002534-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'ACKNOWLEDGED', 0, 'GRSE', 'Axis Bank', '476547643456789', '1324242425', 1701348002542, 'KAMAL RUIDAS', '6804', '', '', 0),
(9, '4700013231', '1701422357004-pa0105.pdf', 'uploads\\sdbg\\1701422357004-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701422357006, 'KAMAL RUIDAS', '6804', '', '', 0),
(10, '4700013231', '1701434992917-pa0105.pdf', 'uploads\\sdbg\\1701434992917-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701434992921, 'KAMAL RUIDAS', '6804', '', '', 0),
(11, '4700013231', '1701435047980-pa0105.pdf', 'uploads\\sdbg\\1701435047980-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701435047986, 'KAMAL RUIDAS', '6804', '', '', 0),
(12, '4700013231', '1701435171262-pa0105.pdf', 'uploads\\sdbg\\1701435171262-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701435171267, 'KAMAL RUIDAS', '6804', '', '', 0),
(13, '4700013231', '1701435298297-pa0105.pdf', 'uploads\\sdbg\\1701435298297-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701435298302, 'KAMAL RUIDAS', '6804', '', '', 0),
(14, '4700013231', '1701435909249-pa0105.pdf', 'uploads\\sdbg\\1701435909249-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701435909255, 'KAMAL RUIDAS', '6804', '', '', 0),
(15, '4700013231', '1701436088839-pa0105.pdf', 'uploads\\sdbg\\1701436088839-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701436088845, 'KAMAL RUIDAS', '6804', '', '', 0),
(16, '4700013231', '1701753281982-pa0105.pdf', 'uploads\\sdbg\\1701753281982-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701753281989, 'KAMAL RUIDAS', '6804', '', '', 0),
(17, '4700013231', '1701758137752-pa0105.pdf', 'uploads\\sdbg\\1701758137752-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701758137760, 'KAMAL RUIDAS', '6804', '', '', 0),
(18, '4700013231', '1701758321503-pa0105.pdf', 'uploads\\sdbg\\1701758321503-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701758321512, 'KAMAL RUIDAS', '6804', '', '', 0),
(19, '4700013231', '1701758915826-pa0105.pdf', 'uploads\\sdbg\\1701758915826-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701758915832, 'KAMAL RUIDAS', '6804', '', '', 0),
(20, '4700013231', '1701759040327-pa0105.pdf', 'uploads\\sdbg\\1701759040327-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701759040332, 'KAMAL RUIDAS', '6804', '', '', 0),
(21, '4700013231', '1701759187212-pa0105.pdf', 'uploads\\sdbg\\1701759187212-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701759187218, 'KAMAL RUIDAS', '6804', '', '', 0),
(22, '4700013231', '1701760085593-pa0105.pdf', 'uploads\\sdbg\\1701760085593-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701760085600, 'KAMAL RUIDAS', '6804', '', '', 0),
(23, '4700013231', '1701760481734-pa0105.pdf', 'uploads\\sdbg\\1701760481734-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701760481740, 'KAMAL RUIDAS', '6804', '', '', 0),
(24, '4700013231', '1701760572609-pa0105.pdf', 'uploads\\sdbg\\1701760572609-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701760572615, 'KAMAL RUIDAS', '6804', '', '', 0),
(25, '4700013231', '1701760597455-pa0105.pdf', 'uploads\\sdbg\\1701760597455-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '1324242425', 1701760597462, 'KAMAL RUIDAS', '6804', '', '', 0),
(26, '4700013231', '1701760634684-pa0105.pdf', 'uploads\\sdbg\\1701760634684-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701760634689, 'KAMAL RUIDAS', '6804', '', '', 0),
(27, '4700013231', '1701765201790-pa0105.pdf', 'uploads\\sdbg\\1701765201790-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701765201798, 'KAMAL RUIDAS', '6804', '', '', 0),
(28, '4700013231', '1701765236586-pa0105.pdf', 'uploads\\sdbg\\1701765236586-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701765236593, 'KAMAL RUIDAS', '6804', '', '', 0),
(29, '4700013231', '1701765275607-pa0105.pdf', 'uploads\\sdbg\\1701765275607-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701765275613, 'KAMAL RUIDAS', '6804', '', '', 0),
(30, '4700013231', '1701765303044-pa0105.pdf', 'uploads\\sdbg\\1701765303044-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701765303050, 'KAMAL RUIDAS', '6804', '', '', 0),
(31, '4800011727', '1701765485034-pa0105.pdf', 'uploads\\sdbg\\1701765485034-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701765485043, 'KAMAL RUIDAS', '6804', '', '', 0),
(32, '4800011727', '1701766332452-pa0105.pdf', 'uploads\\sdbg\\1701766332452-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701766332458, 'KAMAL RUIDAS', '6804', '', '', 0),
(33, '4800007095', '1701768540996-pa0105.pdf', 'uploads\\sdbg\\1701768540996-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701768541002, 'KAMAL RUIDAS', '6804', '', '', 0),
(34, '4800007095', '1701768562780-pa0105.pdf', 'uploads\\sdbg\\1701768562780-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701768562784, 'KAMAL RUIDAS', '6804', '', '', 0),
(35, '4800007095', '1701768739222-pa0105.pdf', 'uploads\\sdbg\\1701768739222-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701768739224, 'KAMAL RUIDAS', '6804', '', '', 0),
(36, '4800007095', '1701769162147-pa0105.pdf', 'uploads\\sdbg\\1701769162147-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50000437', 1701769162152, 'KAMAL RUIDAS', '50000437', '', '', 0),
(37, '4800007095', '1701769846132-pa0105.pdf', 'uploads\\sdbg\\1701769846132-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1701769846145, 'MAINAK DUTTA', '50005041', '', '', 0),
(38, '4800007095', '1701769990958-pa0105.pdf', 'uploads\\sdbg\\1701769990958-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1701769990963, 'KAMAL RUIDAS', '600230', '', '', 0),
(39, '4700013553', '1701774571263-pa0105.pdf', 'uploads\\sdbg\\1701774571263-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1701774571270, 'MAINAK DUTTA', '50005041', '', '', 0),
(40, '4800007095', '1701775287573-pa0105.pdf', 'uploads\\sdbg\\1701775287573-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1701775287577, 'KAMAL RUIDAS', '600230', '', '', 0),
(41, '4800007095', '1701775595314-pa0105.pdf', 'uploads\\sdbg\\1701775595314-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'ACKNOWLEDGED', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1701775595320, 'KAMAL RUIDAS', '600230', '', '', 0),
(42, '4800007095', '1702298727531-pa0105.pdf', 'uploads\\sdbg\\1702298727531-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1702298727538, 'KAMAL RUIDAS', '600230', '', '', 0),
(43, '4700013229', '1702298740517-pa0105.pdf', 'uploads\\sdbg\\1702298740517-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1702298740520, 'KAMAL RUIDAS', '600230', '', '', 0),
(44, '4700013229', '1702298817265-pa0105.pdf', 'uploads\\sdbg\\1702298817265-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'ACKNOWLEDGED', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1702298817270, 'KAMAL RUIDAS', '600230', 'kamal', '00000105', 1702299110374),
(45, '4700013229', '1702299012706-pa0105.pdf', 'uploads\\sdbg\\1702299012706-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'ACKNOWLEDGED', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1702299012714, 'KAMAL RUIDAS', '600230', 'kamal', '00000105', 1702299110374),
(46, '4700013229', '1702299083283-pa0105.pdf', 'uploads\\sdbg\\1702299083283-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'ACKNOWLEDGED', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1702299083291, 'KAMAL RUIDAS', '600230', 'kamal', '00000105', 1702299110374),
(47, '4700013229', '1702300049944-pa0105.pdf', 'uploads\\sdbg\\1702300049944-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'ACKNOWLEDGED', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1702300049950, 'KAMAL RUIDAS', '600230', 'kamal', '00000105', 1702300106561),
(48, '4700013229', '1702300336203-pa0105.pdf', 'uploads\\sdbg\\1702300336203-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1702300336208, 'KAMAL RUIDAS', '600230', '', '', 0),
(49, '4700013229', '1702300344986-pa0105.pdf', 'uploads\\sdbg\\1702300344986-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'ACKNOWLEDGED', 0, 'GRSE', 'Axis Bank', '476547643456789', '50005041', 1702300344990, 'KAMAL RUIDAS', '600230', 'kamal', '00000105', 1702300799946),
(50, '4800007095', '1704266242172-pa0105.pdf', 'uploads\\sdbg\\1704266242172-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704266242174, 'MAINAK DUTTA', '50005041', '', '', 0),
(51, '4800007095', '1704266271542-sample.pdf', 'uploads\\sdbg\\1704266271542-sample.pdf', 'Vendor upload sdbg', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704266271549, 'KAMAL RUIDAS', '6804', '', '', 0),
(52, '4800007095', '1704266292830-sample.pdf', 'uploads\\sdbg\\1704266292830-sample.pdf', 'Vendor upload sdbg', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704266292833, 'KAMAL RUIDAS', '6804', '', '', 0),
(53, '4800007095X', '1704266815071-sample.pdf', 'uploads\\sdbg\\1704266815071-sample.pdf', 'Vendor upload sdbg', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704266815078, 'KAMAL RUIDAS', '50000435', '', '', 0),
(54, '4800007095', '1704364270248-pa0105.pdf', 'uploads\\sdbg\\1704364270248-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704364270252, 'MAINAK DUTTA', '50007545', '', '', 0),
(55, '4800007095', '1704364361353-pa0105.pdf', 'uploads\\sdbg\\1704364361353-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704364361359, 'MAINAK DUTTA', '50007545', '', '', 0),
(56, '4800007095', '1704364422542-pa0105.pdf', 'uploads\\sdbg\\1704364422542-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704364422547, 'MAINAK DUTTA', '50007545', '', '', 0),
(57, '4800007095', '1704364490289-pa0105.pdf', 'uploads\\sdbg\\1704364490289-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704364490294, 'MAINAK DUTTA', '50007545', '', '', 0),
(58, '4800007095', '1704364555821-pa0105.pdf', 'uploads\\sdbg\\1704364555821-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704364555828, 'MAINAK DUTTA', '50007545', '', '', 0),
(59, '4800007095', '1704364601596-pa0105.pdf', 'uploads\\sdbg\\1704364601596-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704364601603, 'MAINAK DUTTA', '50007545', '', '', 0),
(60, '4800007095', '1704364687712-pa0105.pdf', 'uploads\\sdbg\\1704364687712-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704364687716, 'MAINAK DUTTA', '50007545', '', '', 0),
(61, '4800007095', '1704365295619-pa0105.pdf', 'uploads\\sdbg\\1704365295619-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704365295624, 'MAINAK DUTTA', '50007545', '', '', 0),
(62, '4800007095', '1704365445165-pa0105.pdf', 'uploads\\sdbg\\1704365445165-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704365445172, 'MAINAK DUTTA', '50007545', '', '', 0),
(63, '4800007095', '1704365594546-pa0105.pdf', 'uploads\\sdbg\\1704365594546-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704365594550, 'MAINAK DUTTA', '50007545', '', '', 0),
(64, '4800007095', '1704365695911-pa0105.pdf', 'uploads\\sdbg\\1704365695911-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704365695918, 'MAINAK DUTTA', '50007545', '', '', 0),
(65, '4800007095', '1704365728975-pa0105.pdf', 'uploads\\sdbg\\1704365728975-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704365728982, 'MAINAK DUTTA', '50007545', '', '', 0),
(66, '4800007095', '1704365880733-pa0105.pdf', 'uploads\\sdbg\\1704365880733-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704365880738, 'MAINAK DUTTA', '50007545', '', '', 0),
(67, '4800007095', '1704365885279-pa0105.pdf', 'uploads\\sdbg\\1704365885279-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704365885281, 'MAINAK DUTTA', '50007545', '', '', 0),
(68, '4800007095', '1704365886083-pa0105.pdf', 'uploads\\sdbg\\1704365886083-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704365886085, 'MAINAK DUTTA', '50007545', '', '', 0),
(69, '4800007095', '1704366180413-pa0105.pdf', 'uploads\\sdbg\\1704366180413-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704366180417, 'MAINAK DUTTA', '50007545', '', '', 0),
(70, '4800007095', '1704366221133-pa0105.pdf', 'uploads\\sdbg\\1704366221133-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704366221137, 'MAINAK DUTTA', '50007545', '', '', 0),
(71, '4800007095', '1704369185472-pa0105.pdf', 'uploads\\sdbg\\1704369185472-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704369185477, 'MAINAK DUTTA', '50007545', '', '', 0),
(72, '4800007095', '1704369484951-pa0105.pdf', 'uploads\\sdbg\\1704369484951-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704369484956, 'MAINAK DUTTA', '50007545', '', '', 0),
(73, '4800007095', '1704369496057-pa0105.pdf', 'uploads\\sdbg\\1704369496057-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704369496062, 'MAINAK DUTTA', '50007545', '', '', 0),
(74, '4800007095', '1704369655507-pa0105.pdf', 'uploads\\sdbg\\1704369655507-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704369655513, 'MAINAK DUTTA', '50007545', '', '', 0),
(75, '4800007095', '1704369754285-pa0105.pdf', 'uploads\\sdbg\\1704369754285-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704369754291, 'MAINAK DUTTA', '50007545', '', '', 0),
(76, '4800007095', '1704369757166-pa0105.pdf', 'uploads\\sdbg\\1704369757166-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704369757170, 'MAINAK DUTTA', '50007545', '', '', 0),
(77, '4800007095', '1704369759105-pa0105.pdf', 'uploads\\sdbg\\1704369759105-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704369759108, 'MAINAK DUTTA', '50007545', '', '', 0),
(78, '4800007095', '1704369998406-pa0105.pdf', 'uploads\\sdbg\\1704369998406-pa0105.pdf', 'REMARKS REMARKS REMARKS REMARKS REMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKSREMARKS REMARKS', 'PENDING', 0, 'VENDOR', 'Axis Bank', '476547643456789', '50005041', 1704369998412, 'MAINAK DUTTA', '50007545', '', '', 0);

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
(600230, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'KAMAL RUIDAS', NULL, NULL, NULL),
(600231, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', 'HRAHRISOA1', 'A RAJA BANERJEE', '1', '0000-00-00', 'IN'),
(600232, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ABHINIT ANAND', NULL, NULL, NULL),
(600233, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'MRINMOY GHOSH', '1', '0000-00-00', 'IN'),
(600947, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'TAMAL SEN', '1', '0000-00-00', 'IN'),
(600948, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', 'HRAHRISOA1', 'JUNIOR PC ROY', '1', '0000-00-00', 'IN'),
(600949, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'SR MRINMOY GHOSH', NULL, NULL, NULL),
(600950, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', 'HRAHRISOA1', 'OM PRAKASH GHOSH', '1', '0000-00-00', 'IN'),
(600951, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'ABHINIT RAJ', NULL, NULL, NULL),
(600952, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'MR. MRINMOY GHOSH', '1', '0000-00-00', 'IN'),
(600953, 'NA', 'NA', 'N', '0000-00-00', '0000-00-00', 0, '0000-00-00', '601621', 'TAPAS PAL', '1', '0000-00-00', 'IN');

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
(600229, '0030', NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', 'ERPDM1', '10', NULL, 'mainak.dutta16@gmail.com'),
(600229, '0010', NULL, NULL, '0000-00-00', '0000-00-00', NULL, '0000-00-00', '601621', 'CEIL', '8584014353', 'mainak.dutta16@gmail.com'),
(600230, '0030', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'mainak.dutta16@gmail.com'),
(600231, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'mainak.dutta16@gmail.com'),
(600232, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'aabhnitandand@gmail.com'),
(600233, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'mrinmoyghosh102@gmail.com'),
(600947, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'tamalsen@gmail.com'),
(600948, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'juniorpcroy@gmail.com'),
(600949, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'srmrinoy@gmail.com'),
(600950, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'omprakash@gmail.com'),
(600951, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'aabhnitanand@gmail.com'),
(600952, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'mrinmoyghosh102@gmail.com'),
(600953, '0030', NULL, NULL, NULL, NULL, NULL, NULL, 'ERPDM1', '10', NULL, 'tapaspal_tapaspal@gmail.com');

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
(4, '4700013553', '1703132525937-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', NULL, NULL, 'uploads\\qap\\1703132525937-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'PENDING', 'VENDOR', 1703132525947, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(8, '4800001795', NULL, '50007545', '600229', '600231', NULL, 'QAP ASSIGN ', 'ASSIGNED --ISSUE', 'GRSE', 1703134836244, 'KAMAL RUIDAS', '600229'),
(9, '4800001795', NULL, '50007545', '600229', '600231', NULL, 'QAP  REJECTED', 'REJECTED', 'GRSE', 1703135338176, 'KAMAL RUIDAS', '600231'),
(10, '4800001795', '1703135400202-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', '600229', '600231', 'uploads\\qap\\1703135400202-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'RE_SUBMITTED', 'VENDOR', 1703135400210, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(11, '4800001795', '1703135469577-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', '600229', '600231', 'uploads\\qap\\1703135469577-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'RE_SUBMITTED', 'VENDOR', 1703135469587, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(12, '4800001795', NULL, '50007545', '600229', '600231', NULL, 'QAP ASSIGN ', 'ASSIGNED', 'GRSE', 1703135706322, 'KAMAL RUIDAS', '600229'),
(13, '4800001795', NULL, '50007545', '600229', '600231', NULL, 'QAP ACCEPTED . . . . ', 'ACCEPTED', 'GRSE', 1703135719932, 'KAMAL RUIDAS', '600229'),
(14, '4800001795', '1703135744890-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', '600229', '600231', 'uploads\\qap\\1703135744890-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP  APPROVED .......', 'APPROVED', 'GRSE', 1703135744897, 'KAMAL RUIDAS', '600229'),
(15, '4800001795', '1703143894329-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', NULL, NULL, 'uploads\\qap\\1703143894329-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'PENDING', 'VENDOR', 1703143894338, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545'),
(16, '47654764345', NULL, '50005041', NULL, NULL, NULL, 'Vendor upload sdbg', 'PENDING', 'VENDOR', 1704272766110, 'KAMAL RUIDAS', '50000435'),
(17, '47654764345', '1704273023793-sample.pdf', '50005041', NULL, NULL, 'uploads\\qap\\1704273023793-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'VENDOR', 1704273023796, 'KAMAL RUIDAS', '50000435'),
(18, '4800001795', '1704450933023-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', '50007545', NULL, NULL, 'uploads\\qap\\1704450933023-Holiday List 2023_Data Core & AILABS Kolkata (sans ITeS).pdf', 'QAP uploaded . . ', 'PENDING', 'VENDOR', 1704450933032, 'DCG DATA -CORE SYSTEMS (INDIA) PRIV', '50007545');

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

--
-- Dumping data for table `shipping_documents`
--

INSERT INTO `shipping_documents` (`id`, `purchasing_doc_no`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '47654764345', '1704276761446-sample.pdf', '50005041', 'uploads\\shippingDocuments\\1704276761446-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704276761449, 'KAMAL RUIDAS', '6804'),
(2, '47654764345', '1704276847309-sample.pdf', '50005041', 'uploads\\shippingDocuments\\1704276847309-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704276847317, 'KAMAL RUIDAS', '6804'),
(3, '47654764345', '1704277129286-sample.pdf', '50005041', 'uploads\\shippingDocuments\\1704277129286-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704277129290, 'KAMAL RUIDAS', '6804'),
(4, '47654764345', '1704277176551-sample.pdf', '50005041', 'uploads\\shippingDocuments\\1704277176551-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704277176554, 'KAMAL RUIDAS', '6804'),
(5, '47654764345', '1704277225505-sample.pdf', '50005041', 'uploads\\shippingDocuments\\1704277225505-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704277225512, 'KAMAL RUIDAS', '6804'),
(6, '47654764345', '1704277252199-sample.pdf', '50005041', 'uploads\\shippingDocuments\\1704277252199-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704277252205, 'KAMAL RUIDAS', '6804'),
(7, '47654764345', '1704277311405-sample.pdf', '50005041', 'uploads\\shippingDocuments\\1704277311405-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704277311417, 'KAMAL RUIDAS', '6804'),
(8, '47654764345', '1704277350262-sample.pdf', '50005041', 'uploads\\shippingDocuments\\1704277350262-sample.pdf', 'Vendor upload sdbg', 'PENDING', 'GRSE', 1704277350265, 'KAMAL RUIDAS', '6804');

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

--
-- Dumping data for table `wdc`
--

INSERT INTO `wdc` (`id`, `purchasing_doc_no`, `file_name`, `vendor_code`, `file_path`, `remarks`, `status`, `updated_by`, `created_at`, `created_by_name`, `created_by_id`) VALUES
(1, '8765678900', NULL, 'DATA CORE', NULL, 'REMARKS', 'PENDING', 'VENDOR', 1704274898750, 'KAMAL RUIDAS', 'kamal.ruidas@datacoresystems.co.in');

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
(NULL, '20240103004', '2024-01-03', '14:56:29', 'DCG', NULL, NULL, NULL, '50007545', '123232344', '2023-09-27', '8765678987', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'new bill registration', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `id` bigint(20) NOT NULL,
  `FILE_NO` varchar(10) DEFAULT NULL COMMENT 'File No',
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

--
-- Dumping data for table `zfi_bgm_1`
--

INSERT INTO `zfi_bgm_1` (`id`, `FILE_NO`, `BANKERS_NAME`, `BANKERS_BRANCH`, `BANKERS_ADD1`, `BANKERS_ADD2`, `BANKERS_ADD3`, `BANKERS_CITY`, `B_PIN_CODE`, `BANK_GU_NO`, `BG_DATE`, `BG_AMOUNT`, `PO_NUMBER`, `DEPARTMENT`, `PO_DATE`, `YARD_NO`, `VALIDITY_DATE`, `CLAIM_PERIOD`, `CHECKLIST_REF`, `CHECKLIST_DATE`, `BG_TYPE`, `VENDOR_NAME`, `VENDOR_ADD1`, `VENDOR_ADD2`, `VENDOR_ADD3`, `VENDOR_CITY`, `V_PIN_CODE`, `CONFIRMATION`, `EXTENTION_DATE1`, `EXTENTION_DATE2`, `EXTENTION_DATE3`, `EXTENTION_DATE4`, `EXTENTION_DATE5`, `EXTENTION_DATE6`, `RELEASE_DATE`, `DEM_NOTICE_DATE`, `EXT_LETTER_DATE`) VALUES
(1, 'dfd', 'fvdg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'sdfvb', 'sdsfdfg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'csdxz', 'sfcds', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'payload.FI', 'payload.BANKERS_NAME', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'payload.FI', 'payload.BANKERS_NAME', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'payload.FI', 'payload.BANKERS_NAME', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'payload.FI', 'payload.BANKERS_NAME', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, '111111', 'AXIS BANK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, '22222', 'AXIS BANK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, '111111', 'AXIS BANK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, '22222', 'AXIS BANK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, '111111', 'AXIS BANK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, '22222', 'AXIS BANK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, '111111', 'AXIS BANK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, '22222', 'AXIS BANK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, '111111', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(17, '22222', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(18, '111111', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(19, '22222', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(20, '111111', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(21, '22222', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(22, '111111', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(23, '22222', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(24, '111111', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(25, '22222', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(26, '33333', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(27, '44444', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(28, '33333', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(29, '44444', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(30, '33333', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(31, '44444', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(32, '33333', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(33, '44444', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(34, '33333', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(35, '44444', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(36, '33333', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(37, '44444', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(38, '33333', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21'),
(39, '44444', 'AXIS BANK', 'KOLKATA', 'KOLKATA', 'KOLAKATA', NULL, 'KOL', 700001, '8765434567890987', '2023-12-21', '1133999999999', '40839293', 'QAP', '2023-12-01', NULL, '2023-12-31', '2023-12-10', NULL, NULL, 'YYY', 'DCG DATA CORE SYSTEMS INDIA PRIVATE LIMI', 'KOLKATA', 'SALT LAKE', 'SECTOR 2', 'KOLkAKAT', 700232, 'Y', '2023-12-31', NULL, NULL, NULL, NULL, NULL, '2024-01-31', NULL, '2023-12-21');

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
(0, '10000001', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000001', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000002', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000002', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000003', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000003', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000004', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000004', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000005', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000005', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000006', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000006', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000007', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000007', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000008', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000008', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000009', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000009', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000010', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000010', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000011', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000011', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000012', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000012', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '10000013', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '10000013', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '8989898960', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '8989898960', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M'),
(0, '8989898989', '1', 'CONTRACTUAL SDBG SUBMISSION DATE', '2024-11-01 18:30:00', 'M'),
(0, '8989898989', '3', 'CONTRACTUAL QAP SUBMISSION DATE', '2024-11-02 18:30:00', 'M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_drawing`
--
ALTER TABLE `add_drawing`
  ADD PRIMARY KEY (`drawing_id`);

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
-- Indexes for table `ekko`
--
ALTER TABLE `ekko`
  ADD PRIMARY KEY (`EBELN`);

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
-- Indexes for table `inspection_call_letter`
--
ALTER TABLE `inspection_call_letter`
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
  ADD PRIMARY KEY (`MANDT`,`MATNR`,`SPRAS`);

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
-- Indexes for table `po`
--
ALTER TABLE `po`
  ADD PRIMARY KEY (`po_id`);

--
-- Indexes for table `qap_submission`
--
ALTER TABLE `qap_submission`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `sub_dept`
--
ALTER TABLE `sub_dept`
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
-- Indexes for table `zfi_bgm_1`
--
ALTER TABLE `zfi_bgm_1`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `drawing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `emails`
--
ALTER TABLE `emails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Mail Id', AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `emp_department_list`
--
ALTER TABLE `emp_department_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `gate_entry`
--
ALTER TABLE `gate_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `grn`
--
ALTER TABLE `grn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `icgrn`
--
ALTER TABLE `icgrn`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inspection_call_letter`
--
ALTER TABLE `inspection_call_letter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `internal_role_master`
--
ALTER TABLE `internal_role_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

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
-- AUTO_INCREMENT for table `qap_submission`
--
ALTER TABLE `qap_submission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sub_dept`
--
ALTER TABLE `sub_dept`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT for table `zfi_bgm_1`
--
ALTER TABLE `zfi_bgm_1`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
