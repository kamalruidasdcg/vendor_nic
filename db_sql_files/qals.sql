-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2024 at 10:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `qals`
--

CREATE TABLE `qals` (
  `PRUEFLOS` bigint(12) NOT NULL COMMENT 'Inspection Lot Number',
  `WERK` varchar(4) DEFAULT NULL COMMENT 'Plant',
  `ART` varchar(8) DEFAULT NULL COMMENT 'Inspection Type',
  `HERKUNFT` varchar(2) DEFAULT NULL COMMENT 'Inspection Lot Origin',
  `OBJNR` varchar(22) DEFAULT NULL COMMENT 'Object number',
  `OBTYP` varchar(3) DEFAULT NULL COMMENT 'Object Category',
  `STAT11` varchar(1) DEFAULT NULL COMMENT 'GR blocked stock',
  `INSMK` varchar(1) DEFAULT NULL COMMENT 'Quantity Is or Was in Inspection Stock',
  `STAT01` varchar(1) DEFAULT NULL COMMENT 'Inspection Lot is Created Automatically',
  `STAT08` varchar(1) DEFAULT NULL COMMENT 'Automatic Usage Decision Planned',
  `KZSKIPLOT` varchar(1) DEFAULT NULL COMMENT 'Lot Skipped',
  `DYN` varchar(1) DEFAULT NULL COMMENT 'Skips Allowed',
  `HPZ` varchar(1) DEFAULT NULL COMMENT '100% Inspection',
  `EIN` varchar(1) DEFAULT NULL COMMENT 'Serial Number Management Possible',
  `ANZSN` int(10) DEFAULT NULL COMMENT 'Number of serial numbers',
  `STAT30` varchar(1) DEFAULT NULL COMMENT 'Origin of Inspection Lot Unit of Measure for LIS Interface',
  `QINFSTATUS` varchar(8) DEFAULT NULL COMMENT 'QINF Status',
  `ENSTEHDAT` datetime DEFAULT NULL COMMENT 'Date of Lot Creation',
  `ENTSTEZEIT` time DEFAULT NULL COMMENT 'Time of Lot Creation',
  `ERSTELLER` varchar(12) DEFAULT NULL COMMENT 'Name of User Who Created the Data Record',
  `ERSTELDAT` datetime DEFAULT NULL COMMENT 'Date on Which the Data Record Was Created',
  `ERSTELZEIT` time DEFAULT NULL COMMENT 'Time of Lot Creation',
  `AENDERER` varchar(12) DEFAULT NULL COMMENT 'Name of User who Most Recently Changed the Data Record',
  `AENDERDAT` datetime DEFAULT NULL COMMENT 'Date on Which Data Record Was Changed',
  `AENDERZEIT` time DEFAULT NULL COMMENT 'Time of Lot Change',
  `PASTRTERM` datetime DEFAULT NULL COMMENT 'Inspection Start Date',
  `PASTRZEIT` time DEFAULT NULL COMMENT 'Inspection Start Time',
  `PAENDTERM` datetime DEFAULT NULL COMMENT 'End Date of the Inspection',
  `PAENDZEIT` time DEFAULT NULL COMMENT 'Inspection End Time',
  `ZAEHL` int(8) DEFAULT NULL COMMENT 'Internal counter',
  `ZKRIZ` int(7) DEFAULT NULL COMMENT 'Counter for additional criteria',
  `ZAEHL1` int(8) DEFAULT NULL COMMENT 'Internal counter',
  `SELMATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `STAT17` varchar(1) DEFAULT NULL COMMENT 'Manufacturer Part No. Processing Active',
  `SELHERST` varchar(10) DEFAULT NULL COMMENT 'Number of Manufacturer',
  `SELKUNNR` varchar(10) DEFAULT NULL COMMENT 'Account number of customer',
  `AUFNR` varchar(12) DEFAULT NULL COMMENT 'Order Number',
  `VERID` varchar(4) DEFAULT NULL COMMENT 'Production Version',
  `SA_AUFNR` varchar(12) DEFAULT NULL COMMENT 'Run schedule header number',
  `KUNNR` varchar(10) DEFAULT NULL COMMENT 'Customer (Ship-To Party)',
  `LIFNR` varchar(10) DEFAULT NULL COMMENT 'Supplier''s Account Number',
  `MATNR` varchar(18) DEFAULT NULL COMMENT 'Material Number',
  `CHARG` varchar(10) DEFAULT NULL COMMENT 'Batch Number',
  `LAGORTCHRG` varchar(4) DEFAULT NULL COMMENT 'Storage Location',
  `ZEUGNISBIS` datetime DEFAULT NULL COMMENT 'Valid-To Date for The Batch Certificate',
  `PS_PSP_PNR` int(8) DEFAULT NULL COMMENT 'Valuated Sales Order Stock WBS Element',
  `KDPOS` int(6) DEFAULT NULL COMMENT 'Sales Order Item of Valuated Sales Order Stock',
  `EKORG` varchar(4) DEFAULT NULL COMMENT 'Purchasing Organization',
  `EBELN` varchar(10) DEFAULT NULL COMMENT 'Purchasing Document Number',
  `EBELP` int(5) DEFAULT NULL COMMENT 'Item Number of Purchasing Document',
  `ETENR` int(4) DEFAULT NULL COMMENT 'Delivery Schedule Line Counter',
  `MJAHR` int(4) DEFAULT NULL COMMENT 'Material Document Year',
  `MBLNR` varchar(10) DEFAULT NULL COMMENT 'Number of Material Document',
  `ZEILE` int(4) DEFAULT NULL COMMENT 'Item in Material Document',
  `BUDAT` datetime DEFAULT NULL COMMENT 'Posting Date in the Document',
  `BWART` varchar(3) DEFAULT NULL COMMENT 'Movement Type (Inventory Management)',
  `KTEXTLOS` varchar(40) DEFAULT NULL COMMENT 'Short Text',
  `LTEXTKZ` varchar(1) DEFAULT NULL COMMENT 'Long Text Exists For Inspection Lot',
  `KTEXTMAT` varchar(40) DEFAULT NULL COMMENT 'Short Text for Inspection Object',
  `LOSMENGE` bigint(13) DEFAULT NULL COMMENT 'Inspection Lot Quantity',
  `MENGENEINH` varchar(3) DEFAULT NULL COMMENT 'Base Unit of Measure for Inspection Lot Quantity',
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
  `QPMATLOS` varchar(16) DEFAULT NULL COMMENT 'Allowed Share of Scrap',
  `AUFNR_CO` varchar(12) DEFAULT NULL COMMENT 'Order Number for Recording Appraisal Costs',
  `KZVBR` varchar(1) DEFAULT NULL COMMENT 'Consumption posting',
  `KNTTP` varchar(1) DEFAULT NULL COMMENT 'Account Assignment Category',
  `PSTYP` varchar(1) DEFAULT NULL COMMENT 'Item category in purchasing document',
  `STAT05` varchar(1) DEFAULT NULL COMMENT 'Account Assignment Key: Inspection Lot',
  `KOSTL` varchar(10) DEFAULT NULL COMMENT 'Cost Center',
  `AUFPS` int(4) DEFAULT NULL COMMENT 'Item Number of Reservation / Dependent Requirements',
  `KONT_PSPNR` int(8) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)',
  `NPLNR` varchar(12) DEFAULT NULL COMMENT 'Network Number for Account Assignment',
  `APLZL` int(8) DEFAULT NULL COMMENT 'Internal counter',
  `DABRZ` datetime DEFAULT NULL COMMENT 'Reference date for settlement',
  `KSTRG` varchar(12) DEFAULT NULL COMMENT 'Cost Object',
  `PAOBJNR` int(10) DEFAULT NULL COMMENT 'Profitability Segment Number (CO-PA)',
  `PRCTR` varchar(10) DEFAULT NULL COMMENT 'Profit Center',
  `GSBER` varchar(4) DEFAULT NULL COMMENT 'Business Area',
  `KONTO` varchar(10) DEFAULT NULL COMMENT 'G/L Account Number',
  `KOKRS` varchar(4) DEFAULT NULL COMMENT 'Controlling Area',
  `BUKRS` varchar(4) DEFAULT NULL COMMENT 'Company Code',
  `LOS_REF` bigint(12) DEFAULT NULL COMMENT 'Inspection Lot Number Which Is Referenced',
  `PROJECT` varchar(24) DEFAULT NULL COMMENT 'Work Breakdown Structure Element (WBS Element)',
  `GATE_ENTRY_NO` varchar(10) DEFAULT NULL COMMENT 'Gate Entry Number'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qals`
--

INSERT INTO `qals` (`PRUEFLOS`, `WERK`, `ART`, `HERKUNFT`, `OBJNR`, `OBTYP`, `STAT11`, `INSMK`, `STAT01`, `STAT08`, `KZSKIPLOT`, `DYN`, `HPZ`, `EIN`, `ANZSN`, `STAT30`, `QINFSTATUS`, `ENSTEHDAT`, `ENTSTEZEIT`, `ERSTELLER`, `ERSTELDAT`, `ERSTELZEIT`, `AENDERER`, `AENDERDAT`, `AENDERZEIT`, `PASTRTERM`, `PASTRZEIT`, `PAENDTERM`, `PAENDZEIT`, `ZAEHL`, `ZKRIZ`, `ZAEHL1`, `SELMATNR`, `STAT17`, `SELHERST`, `SELKUNNR`, `AUFNR`, `VERID`, `SA_AUFNR`, `KUNNR`, `LIFNR`, `MATNR`, `CHARG`, `LAGORTCHRG`, `ZEUGNISBIS`, `PS_PSP_PNR`, `KDPOS`, `EKORG`, `EBELN`, `EBELP`, `ETENR`, `MJAHR`, `MBLNR`, `ZEILE`, `BUDAT`, `BWART`, `KTEXTLOS`, `LTEXTKZ`, `KTEXTMAT`, `LOSMENGE`, `MENGENEINH`, `LMENGE01`, `LMENGE02`, `LMENGE03`, `LMENGE04`, `LMENGE05`, `LMENGE06`, `MATNRNEU`, `CHARGNEU`, `LMENGE07`, `LMENGE08`, `LMENGE09`, `LMENGEZUB`, `LMENGELZ`, `LMENGEPR`, `LMENGEZER`, `LMENGEIST`, `LMENGESCH`, `LTEXTKZBB`, `QPMATLOS`, `AUFNR_CO`, `KZVBR`, `KNTTP`, `PSTYP`, `STAT05`, `KOSTL`, `AUFPS`, `KONT_PSPNR`, `NPLNR`, `APLZL`, `DABRZ`, `KSTRG`, `PAOBJNR`, `PRCTR`, `GSBER`, `KONTO`, `KOKRS`, `BUKRS`, `LOS_REF`, `PROJECT`, `GATE_ENTRY_NO`) VALUES
(1000001009, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, '1234', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL),
(1000001010, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '50000437', NULL, NULL, NULL, NULL, NULL, NULL, '1234', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '5788', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `qals`
--
ALTER TABLE `qals`
  ADD PRIMARY KEY (`PRUEFLOS`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
