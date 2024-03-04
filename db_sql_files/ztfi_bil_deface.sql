-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2024 at 07:48 AM
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
('333-10009988-ABCD', '333', 10009988, 'ABC', NULL, 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ztfi_bil_deface`
--
ALTER TABLE `ztfi_bil_deface`
  ADD PRIMARY KEY (`C_PKEY`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
