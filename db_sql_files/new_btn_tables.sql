
CREATE TABLE `store_gate` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `acc_no` varchar(20) NOT NULL,
  `gate_date` varchar(25) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_gate`
--

INSERT INTO `store_gate` (`id`, `purchasing_doc_no`, `acc_no`, `gate_date`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'ACC3232', '2024-03-28', '', '', '', '2024-03-28', '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `store_grn`
--

CREATE TABLE `store_grn` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `grn_no` varchar(20) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_grn`
--

INSERT INTO `store_grn` (`id`, `purchasing_doc_no`, `grn_no`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'grn5678', '', '', '', '2024-03-28', '50007546'),
(2, '7800000040', 'grn5671', '', '', '', '2024-03-28', '50007547'),
(3, '7800000040', 'grn5672', '', '', '', '2024-03-28', '50007541');

-- --------------------------------------------------------



--
-- Table structure for table `btn`
--

--
-- Table structure for table `store_icgrn`
--

CREATE TABLE `store_icgrn` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `icgrn_no` varchar(20) NOT NULL,
  `icgrn_value` varchar(12) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_icgrn`
--

INSERT INTO `store_icgrn` (`id`, `purchasing_doc_no`, `icgrn_no`, `icgrn_value`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'icgrn2255', '23000', '', '', '', '2024-03-28', '50007545'),
(2, '7800000040', 'icgrn2256', '230009', '', '', '', '2024-03-28', '50007578'),
(3, '7800000040', 'icgrn2252', '45000', '', '', '', '2024-03-28', '50007546');

-- --------------------------------------------------------

--
-- Table structure for table `sub_dept`
--

CREATE TABLE `btn` (
  `btn_num` varchar(30) NOT NULL,
  `purchasing_doc_no` varchar(30) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `invoice_no` varchar(30) DEFAULT NULL,
  `invoice_filename` varchar(150) NOT NULL,
  `invoice_value` varchar(30) DEFAULT NULL,
  `e_invoice_no` varchar(30) DEFAULT NULL,
  `e_invoice_filename` varchar(150) DEFAULT NULL,
  `debit_note` varchar(15) DEFAULT NULL,
  `credit_note` varchar(15) DEFAULT NULL,
  `debit_credit_filename` varchar(150) DEFAULT NULL,
  `net_claim_amount` varchar(15) DEFAULT NULL,
  `c_sdbg_date` varchar(30) DEFAULT NULL,
  `c_sdbg_filename` varchar(150) DEFAULT NULL,
  `a_sdbg_date` varchar(30) DEFAULT NULL,
  `demand_raise_filename` varchar(150) DEFAULT NULL,
  `gate_entry_no` varchar(30) DEFAULT NULL,
  `get_entry_filename` varchar(150) DEFAULT NULL,
  `gate_entry_date` varchar(30) DEFAULT NULL,
  `grn_nos` varchar(300) DEFAULT NULL,
  `icgrn_nos` varchar(300) DEFAULT NULL,
  `icgrn_total` varchar(30) DEFAULT NULL,
  `c_drawing_date` varchar(30) DEFAULT NULL,
  `a_drawing_date` varchar(30) DEFAULT NULL,
  `c_qap_date` varchar(30) DEFAULT NULL,
  `a_qap_date` varchar(30) DEFAULT NULL,
  `c_ilms_date` varchar(30) DEFAULT NULL,
  `a_ilms_date` varchar(30) DEFAULT NULL,
  `pbg_filename` varchar(150) DEFAULT NULL,
  `hsn_gstn_icgrn` tinyint(1) DEFAULT NULL,
  `ld_gate_entry_date` varchar(30) DEFAULT NULL,
  `ld_contractual_date` varchar(30) DEFAULT NULL,
  `ld_amount` varchar(15) NOT NULL,
  `c_drawing_date_do` varchar(30) DEFAULT NULL,
  `a_drawing_date_do` varchar(30) DEFAULT NULL,
  `drawing_penalty` varchar(15) DEFAULT NULL,
  `c_qap_date_do` varchar(30) DEFAULT NULL,
  `a_qap_date_do` varchar(30) DEFAULT NULL,
  `qap_penalty` varchar(15) DEFAULT NULL,
  `c_ilms_date_do` varchar(30) DEFAULT NULL,
  `a_ilms_date_do` varchar(30) DEFAULT NULL,
  `ilms_penalty` varchar(15) DEFAULT NULL,
  `other_penalty` varchar(15) DEFAULT NULL,
  `total_penalty` varchar(15) NOT NULL,
  `net_payable_amount` varchar(15) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(30) NOT NULL,
  `created_by_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `btn`
--

INSERT INTO `btn` (`btn_num`, `purchasing_doc_no`, `vendor_code`, `invoice_no`, `invoice_filename`, `invoice_value`, `e_invoice_no`, `e_invoice_filename`, `debit_note`, `credit_note`, `debit_credit_filename`, `net_claim_amount`, `c_sdbg_date`, `c_sdbg_filename`, `a_sdbg_date`, `demand_raise_filename`, `gate_entry_no`, `get_entry_filename`, `gate_entry_date`, `grn_nos`, `icgrn_nos`, `icgrn_total`, `c_drawing_date`, `a_drawing_date`, `c_qap_date`, `a_qap_date`, `c_ilms_date`, `a_ilms_date`, `pbg_filename`, `hsn_gstn_icgrn`, `ld_gate_entry_date`, `ld_contractual_date`, `ld_amount`, `c_drawing_date_do`, `a_drawing_date_do`, `drawing_penalty`, `c_qap_date_do`, `a_qap_date_do`, `qap_penalty`, `c_ilms_date_do`, `a_ilms_date_do`, `ilms_penalty`, `other_penalty`, `total_penalty`, `net_payable_amount`, `updated_by`, `created_at`, `created_by_id`) VALUES
('BTN20240405997', '7800000040', '50007545', 'DEMO167', '', '50000', '', '', '200', '300', '', '49900', '1699255657917', '[{\"file_name\":\"1711692203939-sample.pdf\"}]', '1712341800000', '', '', '', '', '[{\"grn_no\":\"grn5678\"},{\"grn_no\":\"grn5671\"},{\"grn_no\":\"grn5672\"}]', '{\"total_icgrn_value\":298009,\"icgrn\":[{\"icgrn_no\":\"icgrn2255\",\"icgrn_value\":\"23000\"},{\"icgrn_no\":\"icgrn2256\",\"icgrn_value\":\"230009\"},{\"icgrn_no\":\"icgrn2252\",\"icgrn_value\":\"45000\"}]}', '', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '', 0, ',', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '5/4/2024', ''),
('BTN20240405998', '7800000040', '50007545', 'DEMO565', '', '298009', '', '', '', '', '', '298009', '1699255657917', '[{\"file_name\":\"1711692203939-sample.pdf\"}]', '1712341800000', '', '', '', '', '[{\"grn_no\":\"grn5678\"},{\"grn_no\":\"grn5671\"},{\"grn_no\":\"grn5672\"}]', '{\"total_icgrn_value\":298009,\"icgrn\":[{\"icgrn_no\":\"icgrn2255\",\"icgrn_value\":\"23000\"},{\"icgrn_no\":\"icgrn2256\",\"icgrn_value\":\"230009\"},{\"icgrn_no\":\"icgrn2252\",\"icgrn_value\":\"45000\"}]}', '', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '', 0, ',', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '5/4/2024', ''),
('BTN20240405999', '7800000040', '50007545', 'DEMO567', '', '50000', '', '', '300', '50', '', '50250', '1699255657917', '[{\"file_name\":\"1711692203939-sample.pdf\"}]', '1712341800000', '1712308751809-sample.pdf', '', '', '', '[{\"grn_no\":\"grn5678\"},{\"grn_no\":\"grn5671\"},{\"grn_no\":\"grn5672\"}]', '{\"total_icgrn_value\":298009,\"icgrn\":[{\"icgrn_no\":\"icgrn2255\",\"icgrn_value\":\"23000\"},{\"icgrn_no\":\"icgrn2256\",\"icgrn_value\":\"230009\"},{\"icgrn_no\":\"icgrn2252\",\"icgrn_value\":\"45000\"}]}', '', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '', 0, ',', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '5/4/2024', '');

-- --------------------------------------------------------

--
-- Table structure for table `btn_do`
--

CREATE TABLE `btn_do` (
  `btn_num` varchar(15) NOT NULL,
  `contractual_ld` varchar(45) NOT NULL,
  `ld_amount` varchar(15) NOT NULL,
  `drg_penalty` varchar(15) NOT NULL,
  `qap_penalty` varchar(15) NOT NULL,
  `ilms_penalty` varchar(15) NOT NULL,
  `other_deduction` varchar(15) NOT NULL,
  `total_deduction` varchar(15) NOT NULL,
  `net_payable_amout` varchar(15) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `btn_do`
--

INSERT INTO `btn_do` (`btn_num`, `contractual_ld`, `ld_amount`, `drg_penalty`, `qap_penalty`, `ilms_penalty`, `other_deduction`, `total_deduction`, `net_payable_amout`, `created_at`, `created_by`) VALUES
('BTN20240405997', '2024-04-29', '', '998', '998', '998', '1000', '6489', '291520', '0000-00-00 00:00:00', ''),
('BTN20240405998', '2024-04-06', '', '5960.18', '5960.18', '5960.18', '10', '32790', '265219', '0000-00-00 00:00:00', ''),
('BTN20240405999', '2024-04-20', '', '1005', '1005', '1005', '', '5527', '292482', '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `demande_management`
--


CREATE TABLE `store_gate` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `acc_no` varchar(20) NOT NULL,
  `gate_date` varchar(25) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_gate`
--

INSERT INTO `store_gate` (`id`, `purchasing_doc_no`, `acc_no`, `gate_date`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'ACC3232', '2024-03-28', '', '', '', '2024-03-28', '50007545');

-- --------------------------------------------------------

--
-- Table structure for table `store_grn`
--

CREATE TABLE `store_grn` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `grn_no` varchar(20) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_grn`
--

INSERT INTO `store_grn` (`id`, `purchasing_doc_no`, `grn_no`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'grn5678', '', '', '', '2024-03-28', '50007546'),
(2, '7800000040', 'grn5671', '', '', '', '2024-03-28', '50007547'),
(3, '7800000040', 'grn5672', '', '', '', '2024-03-28', '50007541');

-- --------------------------------------------------------



--
-- Table structure for table `btn`
--

--
-- Table structure for table `store_icgrn`
--

CREATE TABLE `store_icgrn` (
  `id` int(11) NOT NULL,
  `purchasing_doc_no` varchar(11) NOT NULL,
  `icgrn_no` varchar(20) NOT NULL,
  `icgrn_value` varchar(12) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `file_path` varchar(200) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `created_by_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store_icgrn`
--

INSERT INTO `store_icgrn` (`id`, `purchasing_doc_no`, `icgrn_no`, `icgrn_value`, `file_name`, `file_path`, `updated_by`, `created_at`, `created_by_id`) VALUES
(1, '7800000040', 'icgrn2255', '23000', '', '', '', '2024-03-28', '50007545'),
(2, '7800000040', 'icgrn2256', '230009', '', '', '', '2024-03-28', '50007578'),
(3, '7800000040', 'icgrn2252', '45000', '', '', '', '2024-03-28', '50007546');

-- --------------------------------------------------------

--
-- Table structure for table `sub_dept`
--

CREATE TABLE `btn` (
  `btn_num` varchar(30) NOT NULL,
  `purchasing_doc_no` varchar(30) NOT NULL,
  `vendor_code` varchar(100) NOT NULL,
  `invoice_no` varchar(30) DEFAULT NULL,
  `invoice_filename` varchar(150) NOT NULL,
  `invoice_value` varchar(30) DEFAULT NULL,
  `e_invoice_no` varchar(30) DEFAULT NULL,
  `e_invoice_filename` varchar(150) DEFAULT NULL,
  `debit_note` varchar(15) DEFAULT NULL,
  `credit_note` varchar(15) DEFAULT NULL,
  `debit_credit_filename` varchar(150) DEFAULT NULL,
  `net_claim_amount` varchar(15) DEFAULT NULL,
  `c_sdbg_date` varchar(30) DEFAULT NULL,
  `c_sdbg_filename` varchar(150) DEFAULT NULL,
  `a_sdbg_date` varchar(30) DEFAULT NULL,
  `demand_raise_filename` varchar(150) DEFAULT NULL,
  `gate_entry_no` varchar(30) DEFAULT NULL,
  `get_entry_filename` varchar(150) DEFAULT NULL,
  `gate_entry_date` varchar(30) DEFAULT NULL,
  `grn_nos` varchar(300) DEFAULT NULL,
  `icgrn_nos` varchar(300) DEFAULT NULL,
  `icgrn_total` varchar(30) DEFAULT NULL,
  `c_drawing_date` varchar(30) DEFAULT NULL,
  `a_drawing_date` varchar(30) DEFAULT NULL,
  `c_qap_date` varchar(30) DEFAULT NULL,
  `a_qap_date` varchar(30) DEFAULT NULL,
  `c_ilms_date` varchar(30) DEFAULT NULL,
  `a_ilms_date` varchar(30) DEFAULT NULL,
  `pbg_filename` varchar(150) DEFAULT NULL,
  `hsn_gstn_icgrn` tinyint(1) DEFAULT NULL,
  `ld_gate_entry_date` varchar(30) DEFAULT NULL,
  `ld_contractual_date` varchar(30) DEFAULT NULL,
  `ld_amount` varchar(15) NOT NULL,
  `c_drawing_date_do` varchar(30) DEFAULT NULL,
  `a_drawing_date_do` varchar(30) DEFAULT NULL,
  `drawing_penalty` varchar(15) DEFAULT NULL,
  `c_qap_date_do` varchar(30) DEFAULT NULL,
  `a_qap_date_do` varchar(30) DEFAULT NULL,
  `qap_penalty` varchar(15) DEFAULT NULL,
  `c_ilms_date_do` varchar(30) DEFAULT NULL,
  `a_ilms_date_do` varchar(30) DEFAULT NULL,
  `ilms_penalty` varchar(15) DEFAULT NULL,
  `other_penalty` varchar(15) DEFAULT NULL,
  `total_penalty` varchar(15) NOT NULL,
  `net_payable_amount` varchar(15) NOT NULL,
  `updated_by` varchar(30) NOT NULL,
  `created_at` varchar(30) NOT NULL,
  `created_by_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `btn`
--

INSERT INTO `btn` (`btn_num`, `purchasing_doc_no`, `vendor_code`, `invoice_no`, `invoice_filename`, `invoice_value`, `e_invoice_no`, `e_invoice_filename`, `debit_note`, `credit_note`, `debit_credit_filename`, `net_claim_amount`, `c_sdbg_date`, `c_sdbg_filename`, `a_sdbg_date`, `demand_raise_filename`, `gate_entry_no`, `get_entry_filename`, `gate_entry_date`, `grn_nos`, `icgrn_nos`, `icgrn_total`, `c_drawing_date`, `a_drawing_date`, `c_qap_date`, `a_qap_date`, `c_ilms_date`, `a_ilms_date`, `pbg_filename`, `hsn_gstn_icgrn`, `ld_gate_entry_date`, `ld_contractual_date`, `ld_amount`, `c_drawing_date_do`, `a_drawing_date_do`, `drawing_penalty`, `c_qap_date_do`, `a_qap_date_do`, `qap_penalty`, `c_ilms_date_do`, `a_ilms_date_do`, `ilms_penalty`, `other_penalty`, `total_penalty`, `net_payable_amount`, `updated_by`, `created_at`, `created_by_id`) VALUES
('BTN20240405997', '7800000040', '50007545', 'DEMO167', '', '50000', '', '', '200', '300', '', '49900', '1699255657917', '[{\"file_name\":\"1711692203939-sample.pdf\"}]', '1712341800000', '', '', '', '', '[{\"grn_no\":\"grn5678\"},{\"grn_no\":\"grn5671\"},{\"grn_no\":\"grn5672\"}]', '{\"total_icgrn_value\":298009,\"icgrn\":[{\"icgrn_no\":\"icgrn2255\",\"icgrn_value\":\"23000\"},{\"icgrn_no\":\"icgrn2256\",\"icgrn_value\":\"230009\"},{\"icgrn_no\":\"icgrn2252\",\"icgrn_value\":\"45000\"}]}', '', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '', 0, ',', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '5/4/2024', ''),
('BTN20240405998', '7800000040', '50007545', 'DEMO565', '', '298009', '', '', '', '', '', '298009', '1699255657917', '[{\"file_name\":\"1711692203939-sample.pdf\"}]', '1712341800000', '', '', '', '', '[{\"grn_no\":\"grn5678\"},{\"grn_no\":\"grn5671\"},{\"grn_no\":\"grn5672\"}]', '{\"total_icgrn_value\":298009,\"icgrn\":[{\"icgrn_no\":\"icgrn2255\",\"icgrn_value\":\"23000\"},{\"icgrn_no\":\"icgrn2256\",\"icgrn_value\":\"230009\"},{\"icgrn_no\":\"icgrn2252\",\"icgrn_value\":\"45000\"}]}', '', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '', 0, ',', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '5/4/2024', ''),
('BTN20240405999', '7800000040', '50007545', 'DEMO567', '', '50000', '', '', '300', '50', '', '50250', '1699255657917', '[{\"file_name\":\"1711692203939-sample.pdf\"}]', '1712341800000', '1712308751809-sample.pdf', '', '', '', '[{\"grn_no\":\"grn5678\"},{\"grn_no\":\"grn5671\"},{\"grn_no\":\"grn5672\"}]', '{\"total_icgrn_value\":298009,\"icgrn\":[{\"icgrn_no\":\"icgrn2255\",\"icgrn_value\":\"23000\"},{\"icgrn_no\":\"icgrn2256\",\"icgrn_value\":\"230009\"},{\"icgrn_no\":\"icgrn2252\",\"icgrn_value\":\"45000\"}]}', '', '1699255657917', '1711455110864', '1699255657917', '1711455133087', '1699255657917', '1711455172021', '', 0, ',', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '5/4/2024', '');

-- --------------------------------------------------------

--
-- Table structure for table `btn_do`
--

CREATE TABLE `btn_do` (
  `btn_num` varchar(15) NOT NULL,
  `contractual_ld` varchar(45) NOT NULL,
  `ld_amount` varchar(15) NOT NULL,
  `drg_penalty` varchar(15) NOT NULL,
  `qap_penalty` varchar(15) NOT NULL,
  `ilms_penalty` varchar(15) NOT NULL,
  `other_deduction` varchar(15) NOT NULL,
  `total_deduction` varchar(15) NOT NULL,
  `net_payable_amout` varchar(15) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `btn_do`
--

INSERT INTO `btn_do` (`btn_num`, `contractual_ld`, `ld_amount`, `drg_penalty`, `qap_penalty`, `ilms_penalty`, `other_deduction`, `total_deduction`, `net_payable_amout`, `created_at`, `created_by`) VALUES
('BTN20240405997', '2024-04-29', '', '998', '998', '998', '1000', '6489', '291520', '0000-00-00 00:00:00', ''),
('BTN20240405998', '2024-04-06', '', '5960.18', '5960.18', '5960.18', '10', '32790', '265219', '0000-00-00 00:00:00', ''),
('BTN20240405999', '2024-04-20', '', '1005', '1005', '1005', '', '5527', '292482', '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `demande_management`
--

--
-- Indexes for table `store_gate`
--
ALTER TABLE `store_gate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_grn`
--
ALTER TABLE `store_grn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_icgrn`
--
ALTER TABLE `store_icgrn`
  ADD PRIMARY KEY (`id`);



  --
-- Indexes for table `btn`
--
ALTER TABLE `btn`
  ADD PRIMARY KEY (`btn_num`);

--
-- Indexes for table `btn_do`
--
ALTER TABLE `btn_do`
  ADD PRIMARY KEY (`btn_num`);
