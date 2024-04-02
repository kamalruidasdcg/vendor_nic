-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2024 at 10:47 AM
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
-- Table structure for table `generic_log`
--

CREATE TABLE `generic_log` (
  `id` int(11) NOT NULL,
  `source` varchar(200) NOT NULL,
  `req_url` varchar(200) NOT NULL,
  `req_method` varchar(200) NOT NULL,
  `status_code` varchar(10) NOT NULL,
  `msg` text NOT NULL,
  `stack` text NOT NULL,
  `created_at` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `generic_log`
--

INSERT INTO `generic_log` (`id`, `source`, `req_url`, `req_method`, `status_code`, `msg`, `stack`, `created_at`) VALUES
(1, '::1', '/gateentry', 'POST', '400', '{\"status\":\"F\",\"statusCode\":400,\"message\":\"INVALID PAYLOAD\",\"data\":null,\"token\":null}', 'apilog', 0),
(2, '::1', '/api/v1/sap/store/gateentry', 'POST', '400', '{\"status\":\"F\",\"statusCode\":400,\"message\":\"INVALID PAYLOAD\",\"data\":null,\"token\":null}', 'apilog', 0),
(3, '::1', '/api/v1/sap/store/gateentry', 'POST', '400', '{\"status\":\"F\",\"statusCode\":400,\"message\":\"INVALID PAYLOAD\",\"data\":null,\"token\":null}', 'apilog', 2147483647),
(4, '::1', '/api/v1/ping', 'GET', '200', '{\"success\":true,\"data\":{\"queryData\":{}},\"message\":\"SERVER IS RUNNING \"}', 'apilog', 2147483647),
(5, '::1', '/api/v1/ping', 'GET', '200', '{\"success\":true,\"data\":{\"queryData\":{}},\"message\":\"SERVER IS RUNNING \"}', 'apilog', 1711974765672),
(6, '::1', '/api/v1/sap/store/gateentry', 'POST', '400', '{\"status\":\"F\",\"statusCode\":400,\"message\":\"Error in database conn!!\",\"data\":{},\"token\":null}', 'apilog', 1712037317508),
(7, '::1', '/api/v1/sap/store/gateentry', 'POST', '200', '{\"status\":\"S\",\"statusCode\":200,\"message\":\"data insert succeed with mail trigere\",\"data\":[],\"token\":null}', 'apilog', 1712037453015),
(8, '::1', '/api/v1/sap/store/gateentry', 'POST', '200', '{\"status\":\"S\",\"statusCode\":200,\"message\":\"data insert succeed with mail trigere\",\"data\":[],\"token\":null}', 'apilog', 1712037644819),
(9, '::1', '/api/v1/sap/store/gateentry', 'POST', '200', '{\"status\":\"S\",\"statusCode\":200,\"message\":\"data insert succeed with mail trigere\",\"data\":[],\"token\":null}', 'apilog', 1712040028962),
(10, '::1', '/api/v1/sap/store/gateentry', 'POST', '200', '{\"status\":\"S\",\"statusCode\":200,\"message\":\"data insert succeed with mail trigere\",\"data\":[],\"token\":null}', 'apilog', 1712040178760),
(11, '::1', '/api/v1/sap/store/gateentry', 'POST', '200', '{\"status\":\"S\",\"statusCode\":200,\"message\":\"data insert succeed with mail trigere\",\"data\":[],\"token\":null}', 'apilog', 1712040614079),
(12, '::1', '/api/v1/sap/sdbg/paymentAdvice/ZFI_BGM_1', 'POST', '500', '{\"status\":\"0\",\"statusCode\":500,\"message\":\"Internal server error\",\"data\":null,\"token\":null}', 'apilog', 1712046590994),
(13, '::1', '/api/v1/sap/sdbg/paymentAdvice/ZFI_BGM_1', 'POST', '500', '{\"status\":\"0\",\"statusCode\":500,\"message\":\"Internal server error\",\"data\":null,\"token\":null}', 'apilog', 1712046765662),
(14, '::1', '/api/v1/sap/sdbg/paymentAdvice/ZFI_BGM_1', 'POST', '500', '{\"status\":\"0\",\"statusCode\":500,\"message\":\"Internal server error\",\"data\":null,\"token\":null}', 'apilog', 1712046823677),
(15, '::1', '/api/v1/sap/sdbg/paymentAdvice/ZFI_BGM_1', 'POST', '500', '{\"status\":\"0\",\"statusCode\":500,\"message\":\"Internal server error\",\"data\":null,\"token\":null}', 'apilog', 1712046933790),
(16, '::1', '/api/v1/sap/sdbg/paymentAdvice/ZFI_BGM_1', 'POST', '500', '{\"status\":\"0\",\"statusCode\":500,\"message\":\"Internal server error\",\"data\":null,\"token\":null}', 'apilog', 1712047329755),
(17, '::1', '/api/v1/sap/sdbg/paymentAdvice/ZFI_BGM_1', 'POST', '200', '{\"status\":\"1\",\"statusCode\":200,\"message\":\"Data inserted successfully\",\"data\":[{\"fieldCount\":0,\"affectedRows\":1,\"insertId\":0,\"info\":\"\",\"serverStatus\":2,\"warningStatus\":3,\"changedRows\":0},null],\"token\":null}', 'apilog', 1712047377006);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `generic_log`
--
ALTER TABLE `generic_log`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `generic_log`
--
ALTER TABLE `generic_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
