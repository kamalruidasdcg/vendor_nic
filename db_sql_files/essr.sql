-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2024 at 07:19 AM
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
-- Table structure for table `essr`
--

CREATE TABLE `essr` (
  `lblni` varchar(10) NOT NULL COMMENT 'Entry Sheet Number',
  `lblne` varchar(16) DEFAULT NULL COMMENT 'External Entry Sheet Number',
  `ernam` varchar(12) DEFAULT NULL COMMENT 'Name of Person Responsible for Creating the Object',
  `erdat` date DEFAULT NULL COMMENT 'Date on Which Record Was Created',
  `aedat` date DEFAULT NULL COMMENT 'Last Changed On',
  `aenam` varchar(12) DEFAULT NULL COMMENT 'Name of Person Who Changed Object',
  `sbnamag` varchar(12) DEFAULT NULL COMMENT 'Person Responsible (Internally)',
  `sbnaman` varchar(12) DEFAULT NULL COMMENT 'Person Responsible (Externally)',
  `dlort` varchar(25) DEFAULT NULL COMMENT 'Location Where Service Was Performed',
  `lbldt` date DEFAULT NULL COMMENT 'Price Reference Date of Entry Sheet',
  `lzvon` date DEFAULT NULL COMMENT 'Period',
  `lzbis` date DEFAULT NULL COMMENT 'End of period',
  `lwert` varchar(11) DEFAULT NULL COMMENT 'Value of Services',
  `uwert` varchar(11) DEFAULT NULL COMMENT 'Portion from Unplanned Services',
  `unplv` varchar(11) DEFAULT NULL COMMENT 'Portion Unplanned Value Without Reference to Contract',
  `waers` varchar(5) DEFAULT NULL COMMENT 'Currency Key',
  `packno` int(10) DEFAULT NULL COMMENT 'Package number',
  `txz01` varchar(40) DEFAULT NULL COMMENT 'Short Text of Service Entry Sheet',
  `ebeln` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `ebelp` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `loekz` varchar(1) DEFAULT NULL COMMENT 'Deletion indicator in entry sheet',
  `kzabn` varchar(1) DEFAULT NULL COMMENT 'Acceptance indicator',
  `final` varchar(1) DEFAULT NULL COMMENT 'Indicator: Final Entry Sheet',
  `frggr` varchar(2) DEFAULT NULL COMMENT 'Release group',
  `frgsx` varchar(2) DEFAULT NULL COMMENT 'Release Strategy',
  `frgkl` varchar(1) DEFAULT NULL COMMENT 'Release indicator: Entry sheet',
  `frgzu` varchar(8) DEFAULT NULL COMMENT 'Release State',
  `frgrl` varchar(1) DEFAULT NULL COMMENT 'Release Not Yet Completely Effected',
  `f_lock` varchar(1) DEFAULT NULL COMMENT 'Block Release of Entry Sheet',
  `pwwe` decimal(3,3) DEFAULT NULL COMMENT 'Points score for quality of services',
  `pwfr` decimal(3,3) DEFAULT NULL COMMENT 'Points score for on-time delivery',
  `bldat` date DEFAULT NULL COMMENT 'Document Date in Document',
  `budat` date DEFAULT NULL COMMENT 'Posting Date in the Document',
  `xblnr` varchar(16) DEFAULT NULL COMMENT 'Reference Document Number',
  `bktxt` varchar(25) DEFAULT NULL COMMENT 'Document Header Text',
  `knttp` varchar(1) DEFAULT NULL COMMENT 'Account Assignment Category',
  `kzvbr` varchar(1) DEFAULT NULL COMMENT 'Consumption posting',
  `netwr` varchar(11) DEFAULT NULL COMMENT 'Net Value of Entry Sheet',
  `banfn` varchar(10) DEFAULT NULL COMMENT 'Purchase Requisition Number',
  `bnfpo` int(5) DEFAULT NULL COMMENT 'Item number of purchase requisition',
  `warpl` varchar(12) DEFAULT NULL COMMENT 'Maintenance Plan',
  `wapos` varchar(16) DEFAULT NULL COMMENT 'Maintenance Item',
  `abnum` int(10) DEFAULT NULL COMMENT 'Maintenance Plan Call Number',
  `fknum` varchar(10) DEFAULT NULL COMMENT 'Shipment Cost Number',
  `fkpos` int(6) DEFAULT NULL COMMENT 'Shipment costs item',
  `user1` varchar(20) DEFAULT NULL COMMENT 'Technical Reference Field for External Entry Sheet Number',
  `user2` varchar(20) DEFAULT NULL COMMENT 'User field: Service entry sheet',
  `navnw` varchar(11) DEFAULT NULL COMMENT 'Non-deductible input tax',
  `spec_no` varchar(10) DEFAULT NULL COMMENT 'Number of a Set of Model Service Specifications',
  `cuobj` bigint(18) DEFAULT NULL COMMENT 'Configuration (internal object number)',
  `lemin` varchar(1) DEFAULT NULL COMMENT 'Returns Indicator',
  `comp_date` date DEFAULT NULL COMMENT 'Date',
  `manhrs` decimal(4,3) DEFAULT NULL COMMENT 'Man Hours',
  `rspt` decimal(3,3) DEFAULT NULL COMMENT 'Response Time',
  `drsbm` decimal(3,3) DEFAULT NULL COMMENT 'Drawing Submission',
  `qaps` decimal(3,3) DEFAULT NULL COMMENT 'QAP Submission',
  `ldel` decimal(3,3) DEFAULT NULL COMMENT 'LIST OF DELIVERABLES',
  `prpmd` decimal(3,3) DEFAULT NULL COMMENT 'Prmptns in disptchng',
  `spcim` decimal(3,3) DEFAULT NULL COMMENT 'Suppl of correct itm',
  `disbm` decimal(3,3) DEFAULT NULL COMMENT 'Doc./Inv submission',
  `sreng` decimal(3,3) DEFAULT NULL COMMENT 'service enginners',
  `prmta` decimal(3,3) DEFAULT NULL COMMENT 'Promtns inTrial act',
  `rejre` decimal(3,3) DEFAULT NULL COMMENT 'Rejction/replacement',
  `wdc` varchar(25) DEFAULT NULL COMMENT 'Work Done Certificate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `essr`
--

INSERT INTO `essr` (`lblni`, `lblne`, `ernam`, `erdat`, `aedat`, `aenam`, `sbnamag`, `sbnaman`, `dlort`, `lbldt`, `lzvon`, `lzbis`, `lwert`, `uwert`, `unplv`, `waers`, `packno`, `txz01`, `ebeln`, `ebelp`, `loekz`, `kzabn`, `final`, `frggr`, `frgsx`, `frgkl`, `frgzu`, `frgrl`, `f_lock`, `pwwe`, `pwfr`, `bldat`, `budat`, `xblnr`, `bktxt`, `knttp`, `kzvbr`, `netwr`, `banfn`, `bnfpo`, `warpl`, `wapos`, `abnum`, `fknum`, `fkpos`, `user1`, `user2`, `navnw`, `spec_no`, `cuobj`, `lemin`, `comp_date`, `manhrs`, `rspt`, `drsbm`, `qaps`, `ldel`, `prpmd`, `spcim`, `disbm`, `sreng`, `prmta`, `rejre`, `wdc`) VALUES
('555', '1234', '600288', '2024-04-03', '2024-04-03', '666', '77', '7777', 'ii', '2024-04-01', '2024-04-02', '2024-04-04', '', '', '', '', 0, '', '', 0, '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, '', '', '', '', '', '', 0, '', '', 0, '', 0, '', '', '', '', NULL, '', '2024-08-07', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'wdc-1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `essr`
--
ALTER TABLE `essr`
  ADD PRIMARY KEY (`lblni`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
