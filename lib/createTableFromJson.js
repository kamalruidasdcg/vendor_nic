const { query } = require("../config/dbConfig");

async function createTable() {
  var data = [
    {
      Field_name: "MANDT",
      Datatype: "CLNT",
      Length: 3,
      Domain_text: "Client",
    },
    {
      Field_name: "MBLNR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Number of Material Document",
    },
    {
      Field_name: "MJAHR",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Material Document Year",
    },
    {
      Field_name: "ZEILE",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Item in Material Document",
    },
    {
      Field_name: "LINE_ID",
      Datatype: "NUMC",
      Length: 6,
      Domain_text: "Unique identification of document line",
    },
    {
      Field_name: "PARENT_ID",
      Datatype: "NUMC",
      Length: 6,
      Domain_text: "Identifier of immediately superior line",
    },
    {
      Field_name: "LINE_DEPTH",
      Datatype: "NUMC",
      Length: 2,
      Domain_text: "Hierarchy level of line in document",
    },
    {
      Field_name: "MAA_URZEI",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Original Line for Account Assignment Item in Material Doc.",
    },
    {
      Field_name: "BWART",
      Datatype: "CHAR",
      Length: 3,
      Domain_text: "Movement Type (Inventory Management)",
    },
    {
      Field_name: "XAUTO",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Item automatically created",
    },
    {
      Field_name: "MATNR",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Material Number",
    },
    {
      Field_name: "WERKS",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Plant",
    },
    {
      Field_name: "LGORT",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Storage Location",
    },
    {
      Field_name: "CHARG",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Batch Number",
    },
    {
      Field_name: "INSMK",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Stock Type",
    },
    {
      Field_name: "ZUSCH",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Batch status key",
    },
    {
      Field_name: "ZUSTD",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Batch in Restricted-Use Stock",
    },
    {
      Field_name: "SOBKZ",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Special Stock Indicator",
    },
    {
      Field_name: "LIFNR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Supplier's Account Number",
    },
    {
      Field_name: "KUNNR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Account number of customer",
    },
    {
      Field_name: "KDAUF",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Sales Order Number",
    },
    {
      Field_name: "KDPOS",
      Datatype: "NUMC",
      Length: 6,
      Domain_text: "Item Number in Sales Order",
    },
    {
      Field_name: "KDEIN",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Delivery schedule for sales order",
    },
    {
      Field_name: "PLPLA",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Distribution of Differences",
    },
    {
      Field_name: "SHKZG",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Debit/Credit Indicator",
    },
    {
      Field_name: "WAERS",
      Datatype: "CUKY",
      Length: 5,
      Domain_text: "Currency Key",
    },
    {
      Field_name: "DMBTR",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Amount in local currency",
    },
    {
      Field_name: "BNBTR",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Delivery costs in local currency",
    },
    {
      Field_name: "BUALT",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Amount Posted in Alternative Price Control",
    },
    {
      Field_name: "SHKUM",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Debit/credit indicator in revaluation",
    },
    {
      Field_name: "DMBUM",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Revaluation amount on back-posting to a previous period",
    },
    {
      Field_name: "BWTAR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Valuation Type",
    },
    {
      Field_name: "MENGE",
      Datatype: "QUAN",
      Length: 13,
      Domain_text: "Quantity",
    },
    {
      Field_name: "MEINS",
      Datatype: "UNIT",
      Length: 3,
      Domain_text: "Base Unit of Measure",
    },
    {
      Field_name: "ERFMG",
      Datatype: "QUAN",
      Length: 13,
      Domain_text: "Quantity in unit of entry",
    },
    {
      Field_name: "ERFME",
      Datatype: "UNIT",
      Length: 3,
      Domain_text: "Unit of entry",
    },
    {
      Field_name: "BPMNG",
      Datatype: "QUAN",
      Length: 13,
      Domain_text: "Quantity in Purchase Order Price Unit",
    },
    {
      Field_name: "BPRME",
      Datatype: "UNIT",
      Length: 3,
      Domain_text: "Order Price Unit (Purchasing)",
    },
    {
      Field_name: "EBELN",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Purchase order number",
    },
    {
      Field_name: "EBELP",
      Datatype: "NUMC",
      Length: 5,
      Domain_text: "Item Number of Purchasing Document",
    },
    {
      Field_name: "LFBJA",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Fiscal Year of a Reference Document",
    },
    {
      Field_name: "LFBNR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Document No. of a Reference Document",
    },
    {
      Field_name: "LFPOS",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Item of a Reference Document",
    },
    {
      Field_name: "SJAHR",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Material Document Year",
    },
    {
      Field_name: "SMBLN",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Number of Material Document",
    },
    {
      Field_name: "SMBLP",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Item in Material Document",
    },
    {
      Field_name: "ELIKZ",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Delivery Completed Indicator",
    },
    {
      Field_name: "SGTXT",
      Datatype: "CHAR",
      Length: 50,
      Domain_text: "Item Text",
    },
    {
      Field_name: "EQUNR",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Equipment Number",
    },
    {
      Field_name: "WEMPF",
      Datatype: "CHAR",
      Length: 12,
      Domain_text: "Goods recipient",
    },
    {
      Field_name: "ABLAD",
      Datatype: "CHAR",
      Length: 25,
      Domain_text: "Unloading Point",
    },
    {
      Field_name: "GSBER",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Business Area",
    },
    {
      Field_name: "KOKRS",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Controlling Area",
    },
    {
      Field_name: "PARGB",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Trading partner's business area",
    },
    {
      Field_name: "PARBU",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Clearing company code",
    },
    {
      Field_name: "KOSTL",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Cost Center",
    },
    {
      Field_name: "PROJN",
      Datatype: "CHAR",
      Length: 16,
      Domain_text: "Old: Project number : No longer used --> PS_POSNR",
    },
    {
      Field_name: "AUFNR",
      Datatype: "CHAR",
      Length: 12,
      Domain_text: "Order Number",
    },
    {
      Field_name: "ANLN1",
      Datatype: "CHAR",
      Length: 12,
      Domain_text: "Main Asset Number",
    },
    {
      Field_name: "ANLN2",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Asset Subnumber",
    },
    {
      Field_name: "XSKST",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Indicator: Statistical Posting to Cost Center",
    },
    {
      Field_name: "XSAUF",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Indicator: Posting to Order Is Statistical",
    },
    {
      Field_name: "XSPRO",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Indicator: Posting to Project Is Statistical",
    },
    {
      Field_name: "XSERG",
      Datatype: "CHAR",
      Length: 1,
      Domain_text:
        "Indicator: Posting to Profitability Analysis Is Statistical",
    },
    {
      Field_name: "GJAHR",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Fiscal Year",
    },
    {
      Field_name: "XRUEM",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Allow Posting to Previous Period (Backposting)",
    },
    {
      Field_name: "XRUEJ",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Indicator: post to previous year",
    },
    {
      Field_name: "BUKRS",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Company Code",
    },
    {
      Field_name: "BELNR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Document Number of an Accounting Document",
    },
    {
      Field_name: "BUZEI",
      Datatype: "NUMC",
      Length: 3,
      Domain_text: "Number of Line Item Within Accounting Document",
    },
    {
      Field_name: "BELUM",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Document Number of an Accounting Document",
    },
    {
      Field_name: "BUZUM",
      Datatype: "NUMC",
      Length: 3,
      Domain_text: "Number of Line Item Within Accounting Document",
    },
    {
      Field_name: "RSNUM",
      Datatype: "NUMC",
      Length: 10,
      Domain_text: "Number of reservation/dependent requirements",
    },
    {
      Field_name: "RSPOS",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Item Number of Reservation / Dependent Requirements",
    },
    {
      Field_name: "KZEAR",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Final Issue for Reservation",
    },
    {
      Field_name: "PBAMG",
      Datatype: "QUAN",
      Length: 13,
      Domain_text: "Quantity",
    },
    {
      Field_name: "KZSTR",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Transaction/event is relevant to statistics",
    },
    {
      Field_name: "UMMAT",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Receiving/Issuing Material",
    },
    {
      Field_name: "UMWRK",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Receiving plant/issuing plant",
    },
    {
      Field_name: "UMLGO",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Receiving/issuing storage location",
    },
    {
      Field_name: "UMCHA",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Receiving/Issuing Batch",
    },
    {
      Field_name: "UMZST",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Status of Transfer Batch",
    },
    {
      Field_name: "UMZUS",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Status key of transfer batch",
    },
    {
      Field_name: "UMBAR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Valuation Type of Transfer Batch",
    },
    {
      Field_name: "UMSOK",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Special stock indicator for physical stock transfer",
    },
    {
      Field_name: "KZBEW",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Movement Indicator",
    },
    {
      Field_name: "KZVBR",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Consumption posting",
    },
    {
      Field_name: "KZZUG",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Receipt Indicator",
    },
    {
      Field_name: "WEUNB",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Goods Receipt, Non-Valuated",
    },
    {
      Field_name: "PALAN",
      Datatype: "DEC",
      Length: 11,
      Domain_text: "WMS Number of pallets",
    },
    {
      Field_name: "LGNUM",
      Datatype: "CHAR",
      Length: 3,
      Domain_text: "Warehouse Number / Warehouse Complex",
    },
    {
      Field_name: "LGTYP",
      Datatype: "CHAR",
      Length: 3,
      Domain_text: "Storage Type",
    },
    {
      Field_name: "LGPLA",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Storage Bin",
    },
    {
      Field_name: "BESTQ",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Stock Category in the Warehouse Management System",
    },
    {
      Field_name: "BWLVS",
      Datatype: "NUMC",
      Length: 3,
      Domain_text: "Movement Type for Warehouse Management",
    },
    {
      Field_name: "TBNUM",
      Datatype: "NUMC",
      Length: 10,
      Domain_text: "Transfer Requirement Number",
    },
    {
      Field_name: "TBPOS",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Transfer Requirement Item",
    },
    {
      Field_name: "XBLVS",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Indicator: posting in warehouse management system",
    },
    {
      Field_name: "VSCHN",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Ind: interim storage posting for source stor.type and bin",
    },
    {
      Field_name: "NSCHN",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Ind.: interim storage posting for dest.stor.type and bin",
    },
    {
      Field_name: "DYPLA",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Indicator: dynamic storage bin",
    },
    {
      Field_name: "UBNUM",
      Datatype: "NUMC",
      Length: 10,
      Domain_text: "Posting Change Number",
    },
    {
      Field_name: "TBPRI",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Transfer Priority",
    },
    {
      Field_name: "TANUM",
      Datatype: "NUMC",
      Length: 10,
      Domain_text: "Transfer Order Number",
    },
    {
      Field_name: "WEANZ",
      Datatype: "NUMC",
      Length: 3,
      Domain_text: "Number of GR/GI Slips to Be Printed",
    },
    {
      Field_name: "GRUND",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Reason for Movement",
    },
    {
      Field_name: "EVERS",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Shipping Instructions",
    },
    {
      Field_name: "EVERE",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Compliance with Shipping Instructions",
    },
    {
      Field_name: "IMKEY",
      Datatype: "CHAR",
      Length: 8,
      Domain_text: "Internal Key for Real Estate Object",
    },
    {
      Field_name: "KSTRG",
      Datatype: "CHAR",
      Length: 12,
      Domain_text: "Cost Object",
    },
    {
      Field_name: "PAOBJNR",
      Datatype: "NUMC",
      Length: 10,
      Domain_text: "Profitability Segment Number (CO-PA)",
    },
    {
      Field_name: "PRCTR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Profit Center",
    },
    {
      Field_name: "PS_PSP_PNR",
      Datatype: "NUMC",
      Length: 8,
      Domain_text: "Work Breakdown Structure Element (WBS Element)",
    },
    {
      Field_name: "NPLNR",
      Datatype: "CHAR",
      Length: 12,
      Domain_text: "Network Number for Account Assignment",
    },
    {
      Field_name: "AUFPL",
      Datatype: "NUMC",
      Length: 10,
      Domain_text: "Routing number of operations in the order",
    },
    {
      Field_name: "APLZL",
      Datatype: "NUMC",
      Length: 8,
      Domain_text: "Internal counter",
    },
    {
      Field_name: "AUFPS",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Order item number",
    },
    {
      Field_name: "VPTNR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Partner account number",
    },
    {
      Field_name: "FIPOS",
      Datatype: "CHAR",
      Length: 14,
      Domain_text: "Commitment Item",
    },
    {
      Field_name: "SAKTO",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "G/L Account Number",
    },
    {
      Field_name: "BSTMG",
      Datatype: "QUAN",
      Length: 13,
      Domain_text: "Goods receipt quantity in order unit",
    },
    {
      Field_name: "BSTME",
      Datatype: "UNIT",
      Length: 3,
      Domain_text: "Purchase Order Unit of Measure",
    },
    {
      Field_name: "XWSBR",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Reversal of GR allowed for GR-based IV despite invoice",
    },
    {
      Field_name: "EMLIF",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Vendor to be supplied/who is to receive delivery",
    },
    {
      Field_name: "EXBWR",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Externally Entered Posting Amount in Local Currency",
    },
    {
      Field_name: "VKWRT",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Value at Sales Prices Including Value-Added Tax",
    },
    {
      Field_name: "AKTNR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Promotion",
    },
    {
      Field_name: "ZEKKN",
      Datatype: "NUMC",
      Length: 2,
      Domain_text: "Sequential Number of Account Assignment",
    },
    {
      Field_name: "VFDAT",
      Datatype: "DATS",
      Length: 8,
      Domain_text: "Shelf Life Expiration or Best-Before Date",
    },
    {
      Field_name: "CUOBJ_CH",
      Datatype: "NUMC",
      Length: 18,
      Domain_text: "Internal object number of the batch classification",
    },
    {
      Field_name: "EXVKW",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Externally Entered Sales Value in Local Currency",
    },
    {
      Field_name: "PPRCTR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Partner Profit Center",
    },
    {
      Field_name: "RSART",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Record type",
    },
    {
      Field_name: "GEBER",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Fund",
    },
    {
      Field_name: "FISTL",
      Datatype: "CHAR",
      Length: 16,
      Domain_text: "Funds Center",
    },
    {
      Field_name: "MATBF",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Material in Respect of Which Stock is Managed",
    },
    {
      Field_name: "UMMAB",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Receiving/Issuing Material",
    },
    {
      Field_name: "BUSTM",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Posting string for quantities",
    },
    {
      Field_name: "BUSTW",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Posting String for Values",
    },
    {
      Field_name: "MENGU",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Quantity Updating in Material Master Record",
    },
    {
      Field_name: "WERTU",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Value Updating in Material Master Record",
    },
    {
      Field_name: "LBKUM",
      Datatype: "QUAN",
      Length: 13,
      Domain_text: "Total valuated stock before the posting",
    },
    {
      Field_name: "SALK3",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Value of total valuated stock before the posting",
    },
    {
      Field_name: "VPRSV",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Price control indicator",
    },
    {
      Field_name: "FKBER",
      Datatype: "CHAR",
      Length: 16,
      Domain_text: "Functional Area",
    },
    {
      Field_name: "DABRBZ",
      Datatype: "DATS",
      Length: 8,
      Domain_text: "Reference date for settlement",
    },
    {
      Field_name: "VKWRA",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Value at sales prices excluding value-added tax",
    },
    {
      Field_name: "DABRZ",
      Datatype: "DATS",
      Length: 8,
      Domain_text: "Reference date for settlement",
    },
    {
      Field_name: "XBEAU",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Purchase order created at time of goods receipt",
    },
    {
      Field_name: "LSMNG",
      Datatype: "QUAN",
      Length: 13,
      Domain_text: "Quantity in Unit of Measure from Delivery Note",
    },
    {
      Field_name: "LSMEH",
      Datatype: "UNIT",
      Length: 3,
      Domain_text: "Unit of Measure From Delivery Note",
    },
    {
      Field_name: "KZBWS",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Valuation of Special Stock",
    },
    {
      Field_name: "QINSPST",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Status of Goods Receipt Inspection",
    },
    {
      Field_name: "URZEI",
      Datatype: "NUMC",
      Length: 4,
      Domain_text: "Original line in material document",
    },
    {
      Field_name: "J_1BEXBASE",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Alternate base amount in document currency",
    },
    {
      Field_name: "MWSKZ",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Tax on Sales/Purchases Code",
    },
    {
      Field_name: "TXJCD",
      Datatype: "CHAR",
      Length: 15,
      Domain_text: "Tax Jurisdiction",
    },
    {
      Field_name: "EMATN",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Material number corresponding to manufacturer part number",
    },
    {
      Field_name: "J_1AGIRUPD",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Goods issue revaluation performed",
    },
    {
      Field_name: "VKMWS",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Tax on Sales/Purchases Code",
    },
    {
      Field_name: "HSDAT",
      Datatype: "DATS",
      Length: 8,
      Domain_text: "Date of Manufacture",
    },
    {
      Field_name: "BERKZ",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Material Staging Indicator for Production Supply",
    },
    {
      Field_name: "MAT_KDAUF",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Sales order number of valuated sales order stock",
    },
    {
      Field_name: "MAT_KDPOS",
      Datatype: "NUMC",
      Length: 6,
      Domain_text: "Sales Order Item of Valuated Sales Order Stock",
    },
    {
      Field_name: "MAT_PSPNR",
      Datatype: "NUMC",
      Length: 8,
      Domain_text: "Valuated Sales Order Stock WBS Element",
    },
    {
      Field_name: "XWOFF",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Calculation of val. open",
    },
    {
      Field_name: "BEMOT",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Accounting Indicator",
    },
    {
      Field_name: "PRZNR",
      Datatype: "CHAR",
      Length: 12,
      Domain_text: "Business Process",
    },
    {
      Field_name: "LLIEF",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Supplying Vendor",
    },
    {
      Field_name: "LSTAR",
      Datatype: "CHAR",
      Length: 6,
      Domain_text: "Activity Type",
    },
    {
      Field_name: "XOBEW",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Vendor Stock Valuation Indicator",
    },
    {
      Field_name: "GRANT_NBR",
      Datatype: "CHAR",
      Length: 20,
      Domain_text: "Grant",
    },
    {
      Field_name: "ZUSTD_T156M",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Stock Type Modification (Read from Table T156M)",
    },
    {
      Field_name: "SPE_GTS_STOCK_TY",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "GTS Stock Type",
    },
    {
      Field_name: "KBLNR",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Document Number for Earmarked Funds",
    },
    {
      Field_name: "KBLPOS",
      Datatype: "NUMC",
      Length: 3,
      Domain_text: "Earmarked Funds: Document Item",
    },
    {
      Field_name: "XMACC",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Multiple Account Assignment",
    },
    {
      Field_name: "VGART_MKPF",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Transaction/Event Type",
    },
    {
      Field_name: "BUDAT_MKPF",
      Datatype: "DATS",
      Length: 8,
      Domain_text: "Posting Date in the Document",
    },
    {
      Field_name: "CPUDT_MKPF",
      Datatype: "DATS",
      Length: 8,
      Domain_text: "Day On Which Accounting Document Was Entered",
    },
    {
      Field_name: "CPUTM_MKPF",
      Datatype: "TIMS",
      Length: 6,
      Domain_text: "Time of Entry",
    },
    {
      Field_name: "USNAM_MKPF",
      Datatype: "CHAR",
      Length: 12,
      Domain_text: "User Name",
    },
    {
      Field_name: "XBLNR_MKPF",
      Datatype: "CHAR",
      Length: 16,
      Domain_text: "Reference Document Number",
    },
    {
      Field_name: "TCODE2_MKPF",
      Datatype: "CHAR",
      Length: 20,
      Domain_text: "Transaction Code",
    },
    {
      Field_name: "VBELN_IM",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Delivery",
    },
    {
      Field_name: "VBELP_IM",
      Datatype: "NUMC",
      Length: 6,
      Domain_text: "Delivery Item",
    },
    {
      Field_name: "SGT_SCAT",
      Datatype: "CHAR",
      Length: 16,
      Domain_text: "Stock Segment",
    },
    {
      Field_name: "SGT_UMSCAT",
      Datatype: "CHAR",
      Length: 16,
      Domain_text: "Receiving/Issuing Stock Segment",
    },
    {
      Field_name: "SGT_RCAT",
      Datatype: "CHAR",
      Length: 16,
      Domain_text: "Requirement Segment",
    },
    {
      Field_name: "DISUB_OWNER",
      Datatype: "CHAR",
      Length: 10,
      Domain_text: "Owner of stock",
    },
    {
      Field_name: "FSH_SEASON_YEAR",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Season Year",
    },
    {
      Field_name: "FSH_SEASON",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Season",
    },
    {
      Field_name: "FSH_COLLECTION",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Fashion Collection",
    },
    {
      Field_name: "FSH_THEME",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Fashion Theme",
    },
    {
      Field_name: "FSH_UMSEA_YR",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Receiving/Issuing Season Year",
    },
    {
      Field_name: "FSH_UMSEA",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Receiving/Issuing Season",
    },
    {
      Field_name: "FSH_UMCOLL",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Receiving/Issuing Collection",
    },
    {
      Field_name: "FSH_UMTHEME",
      Datatype: "CHAR",
      Length: 4,
      Domain_text: "Receiving/Issuing Theme",
    },
    {
      Field_name: "SGT_CHINT",
      Datatype: "CHAR",
      Length: 1,
      Domain_text: "Discrete Batch Number",
    },
    {
      Field_name: "FSH_DEALLOC_QTY",
      Datatype: "QUAN",
      Length: 13,
      Domain_text: "ARun Allocated Quantity",
    },
    {
      Field_name: "OINAVNW",
      Datatype: "CURR",
      Length: 13,
      Domain_text: "Non-deductible input tax",
    },
    {
      Field_name: "OICONDCOD",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Joint Venture Indicator (Condition Key)",
    },
    {
      Field_name: "CONDI",
      Datatype: "CHAR",
      Length: 2,
      Domain_text: "Joint Venture Indicator (Condition Key)",
    },
    {
      Field_name: "WRF_CHARSTC1",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Characteristic Value 1",
    },
    {
      Field_name: "WRF_CHARSTC2",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Characteristic Value 2",
    },
    {
      Field_name: "WRF_CHARSTC3",
      Datatype: "CHAR",
      Length: 18,
      Domain_text: "Characteristic Value 3",
    },
  ];

  try {
    const obj = {
      CHAR: "varchar",
      CURR: "varchar",
      UNIT: "varchar",
      NUMC: "int",
      QUAN: "int",
      BIGINT: "bigint",
      DATS: "datetime",
      TIMS: "time",
      TEXT: "text",
    };
    let q = "CREATE TABLE mseg ( ";

    for (let i = 0; i < data.length; i++) {
      const fieldName = data[i].Field_name;
      let dataType = obj[data[i].Datatype];
      const Length = data[i].Length;
      if (fieldName && Length && dataType) {
        let dataLen = `(${Length})`;
        if (dataType == "varchar" && parseInt(Length) > 255) {
          dataType = "text";
        }
        if (dataType == "int" && parseInt(Length) > 10) {
          dataType = "bigint";
        }
        if (
          dataType === "datetime" ||
          dataType === "time" ||
          dataType === "text"
        ) {
          dataLen = "";
        }
        q = q
          .concat(` ${fieldName}`)
          .concat(` ${dataType}${dataLen}`)
          .concat(" NULL")
          .concat(` COMMENT "${data[i].Domain_text}"`);
        if (i != data.length - 1) {
          q = q.concat(",");
        }
      }
      if (i == data.length - 1) {
        q = q.concat(")");
      }
    }

    console.log(q);

    return await query({ query: q, values: [] });
  } catch (error) {
    console.log("err", error);
  }
}

module.exports = { createTable };
// createTable().then((val) => console.log(val)).catch((err) => console.log(err))
