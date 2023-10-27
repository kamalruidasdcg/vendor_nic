
TABLE NAME ZBTS

   /**
     * 
     * FIELD MAPPING ZBTS TABLE TO BILL REGISTRAIGON 
     * 
     *  ZBTNO = systemgeneratedZBTNO
     *  ?? [EBELN] = po [Purches Oredr Id]
     *  ?? [LIFNR] = vendor_id [Vendor id],
     * ?? [ZVBNO]= invoice [invoice Number][VENDOR BILL NUMBER IN ZBTS TABLE]
     * ?? [VEN_BILL_DATE] = bill_date [ VENDOR Bill Date],
     * ?? [DPERNR1]= bill_submitted [Bill Submitted By ]
     * ?? [ZRMK1]= remarks [ Remarks]
     * ?? = file_name [ uploadedFile Name]
     * [RERDAT] = CURRENT DATE , DATA CREATION DATE
     * [ RERZET] = CURRENT TIME , DATA CREATION TIME
     * [RERNAM] = VENDOR NAME = vendor_id (vendor table);
     */


     NEW BILL REG PAYLOAD


       // const bill_registration_table = {
    //   "purchasing_doc_no": "87656789876",
    //   "invoice_no": "123232344",
    //   "bill_submit_date":"2023-09-27",
    //   "bill_time": "11:20:34",
    //   "bill_submit_to_name": "",
    //   "bill_submit_to_email": "",
    //   "remarks": "new gengrated bill",
    //   "file_name": "newFile.jpg",
    //   "vendor_ac_no": "50007523",
    //   "vendor_name": "Mrinmoy Ghosh",
    //   "vendor_email": "mrinmoygh081@gmail.com",
    //   "created_date": "2023-09-27",
    //   "created_time": "11:20:34",
    //   "created_epoch_time": 898765456789,
    //   "action_by_id":"LOGGED IN USER ID",
    //   "action_by_name": "LOGGED IN USER NAME"
    // }