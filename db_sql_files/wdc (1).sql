-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2024 at 01:06 PM
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
-- Table structure for table `wdc`
--

CREATE TABLE `wdc` (
  `id` int(11) NOT NULL,
  `reference_no` varchar(60) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `vendor_code` varchar(100) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `wdc_date` bigint(20) NOT NULL,
  `po_line_iten_no` varchar(100) NOT NULL,
  `job_location` varchar(200) NOT NULL,
  `yard_no` varchar(60) NOT NULL,
  `actual_start_date` bigint(20) NOT NULL,
  `actual_completion_date` bigint(20) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `messurment` varchar(30) NOT NULL,
  `quantity` int(11) NOT NULL,
  `entry_by_production` varchar(60) NOT NULL,
  `stage_datiels` text NOT NULL,
  `actual_payable_amount` int(11) DEFAULT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` bigint(20) NOT NULL,
  `created_by_name` varchar(255) NOT NULL,
  `created_by_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `wdc`
--
ALTER TABLE `wdc`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `wdc`
--
ALTER TABLE `wdc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
