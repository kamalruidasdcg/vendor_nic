// const { query,  } = require("../config/dbConfig");
const { connection } = require("../../config/dbConfig");
const { TRUE } = require("../../lib/constant");
const { responseSend, resSend } = require("../../lib/resSend");
const { GATE_ENTRY_DATA, GATE_ENTRY_HEADER } = require("../../lib/tableName");
const { gateEntryHeaderPayload, gateEntryDataPayload } = require("../../services/sap.store.services");
const { generateInsertUpdateQuery, generateQueryForMultipleData } = require("../../lib/utils");
const Measage = require("../../utils/messages");
const { poolClient, poolQuery, getQuery, query } = require("../../config/pgDbConfig");


const insertGateEntryData = async (req, res) => {
  let insertPayload = {};
  let payload = {};

  try {

    // const promiseConnection = await connection();
    const client = await poolClient();
    let transactionSuccessful = false;
    // if (Array.isArray(req.body)) {
    //     payload = req.body.length > 0 ? req.body[0] : null;
    // } else if (typeof req.body === 'object' && req.body !== null) {
    //     payload = req.body;
    // }
    payload = req.body;

    console.log("payload", req.body);

    // const { ITEM_TAB, ...obj } = payload;

    // console.log("GE_LINE_ITEMS", ITEM_TAB);
    // console.log("obj", obj);
    // await client.beginTransaction();
    await client.query('BEGIN');

    async function insertRecurcionFn(payload, index) {
      if (index == payload.length) return;

      const { ITEM_TAB, ...obj } = payload[index];

      if (!obj || typeof obj !== 'object' || !Object.keys(obj).length || !obj.ENTRY_NO || !obj.W_YEAR) {
        // return responseSend(res, "F", 400, "INVALID PAYLOAD", null, null);
        throw new Error(Measage.INVALID_PAYLOAD);
      }

      // await client.beginTransaction();


      try {
        insertPayload = await gateEntryHeaderPayload(obj);
        console.log("insertPayload", insertPayload);
        const gate_entry_h_Insert = await generateInsertUpdateQuery(insertPayload, GATE_ENTRY_HEADER, ["ENTRY_NO", "W_YEAR"]);
        const results = await poolQuery({ client, query: gate_entry_h_Insert.q, values: gate_entry_h_Insert.val });
        console.log("results", results);
      } catch (error) {
        throw new Error(`${Measage.DATA_INSERT_FAILED} ${error.toString()}`);
        // return responseSend(res, "F", 502, "Data insert failed !!", error, null);
      }

      if (ITEM_TAB && ITEM_TAB?.length) {

        try {
          const zmilestonePayload = await gateEntryDataPayload(ITEM_TAB);
          // console.log('ekpopayload', zmilestonePayload);
          // const insert_ekpo_table = `INSERT INTO ekpo (EBELN, EBELP, LOEKZ, STATU, AEDAT, TXZ01, MATNR, BUKRS, WERKS, LGORT, MATKL, KTMNG, MENGE, MEINS, NETPR, NETWR, MWSKZ) VALUES ?`;
          const zmm_ge_line_item_q = await generateQueryForMultipleData(zmilestonePayload, GATE_ENTRY_DATA, ["ENTRY_NO", "EBELN", "EBELP", "W_YEAR"]);
          const response = await poolQuery({ client, query: zmm_ge_line_item_q.q, values: zmm_ge_line_item_q.val })

        } catch (error) {
          // console.log("error, zpo milestone", error);
          // throw new Error(Measage.DATA_INSERT_FAILED + JSON.stringify(error.toString()));
          throw new Error(`${Measage.DATA_INSERT_FAILED} ${error.toString()}`);

        }
      }


      await insertRecurcionFn(payload, index + 1)
    }



    try {

      await insertRecurcionFn(payload, 0);
      await client.query('COMMIT');
      transactionSuccessful = true;

    } catch (error) {
      responseSend(res, "F", 502, error.toString(), error.stack, null);
    }
    finally {
      if (!transactionSuccessful) {
        // console.log("Connection End" + "--->" + "connection release");
        await client.query('ROLLBACK')
      }
      if (transactionSuccessful === TRUE) {
        responseSend(res, "S", 200, "data insert succeed with", [], null)
      }
      client.release()
      // console.log("Connection End" + "--->" + "");
    }
  } catch (error) {
    responseSend(res, "F", 500, Measage.SERVER_ERROR, error, null);
  }
};


const storeActionList = async (req, res) => {
  try {
    // const promiseConnection = await connection();
    // let transactionSuccessful = false;

    /**
* gate entry 
* grn 
* icgrn
* resvertion ( SIR)
* issue 
* service enty sheet
*/


    try {

      let storeActionListQuery =
        `
                (SELECT NULL         AS docNo,
                    NULL         AS btn,
                    NULL         AS issueNo,
                    NULL         AS issueYear,
                    NULL         AS reservationNumber,
                    NULL         AS reservationDate,
                    gateEntryNo,
                    updatedBy,
                    dateTime,
                    'gate_entry' AS documentType
             FROM   (SELECT entry_no   AS gateEntryNo,
                            entry_date AS dateTime,
                            'grse'     AS updatedBy
                     FROM   zmm_gate_entry_h AS gateentry) AS gate_entry)
            UNION ALL
            
            (SELECT docno,
                    NULL           AS btn,
                    NULL           AS issueNo,
                    NULL           AS issueYear,
                    NULL           AS reservationNumber,
                    NULL           AS reservationDate,
                    NULL           AS gateEntryNo,
                    updatedby,
                    dateTime,
                    'icgrn_report' AS documentType
             FROM   (SELECT DISTINCT mblnr      AS docNo,
                                     ersteldat  AS dateTime,
                                     USER.cname AS updatedBy
                     FROM   qals AS q
                            LEFT JOIN pa0002 AS USER
                                   ON ( q.aenderer = USER.pernr )) AS qals)
            UNION ALL
            (SELECT NULL                 AS docNo,
                    NULL                 AS btn,
                    NULL                 AS issueNo,
                    NULL                 AS issueYear,
                    reservationNumber,
                    reservationDate,
                    NULL                 AS gateEntryNo,
                    updatedby,
                    dateTime,
                    'reservation_report' AS documentType
             FROM   (SELECT rsnum      AS reservationNumber,
                            rsdat      AS reservationDate,
                            rsdat      AS dateTime,
                            USER.cname AS updatedBy
                     FROM   rkpf AS rk
                            LEFT JOIN pa0002 AS USER
                                   ON ( rk.usnam = USER.pernr)
                     GROUP  BY rk.rsnum,
                               rk.rsdat) AS rkpf)
            UNION ALL
            (
                SELECT NULL AS docno,
                       NULL AS btn,
                       issueno,
                       issueyear,
                       NULL AS reservationnumber,
                       NULL AS reservationdate,
                       NULL AS gateentryno,
                       updatedby,
                       dateTime,
                       'goods_issue_slip' AS documenttype
                FROM   (
                                 SELECT    mblnr      AS issueno,
                                           mjahr      AS issueyear,
                                           USER.cname AS updatedby,
                                           bwart,
                                           budat_mkpf AS dateTime
                                 FROM      mseg       AS ms
                                 LEFT JOIN pa0002     AS USER
                                 ON        (
                                                     ms.usnam_mkpf = USER.pernr )
                                 GROUP BY  ms.mblnr,
                                           ms.mjahr) AS mseg
                WHERE  
                              mseg.bwart IN ('221',
                                             '281',
                                             '201',
                                             '321',
                                             '222',
                                             '202',
                                             '122'))`;

      storeActionListQuery = `SELECT * FROM ((SELECT 
                
                NULL         AS matDocNo,
                NULL         AS docNo,
                                                NULL         AS btn,
                                                NULL         AS issueNo,
                                                NULL         AS issueYear,
                                                NULL         AS reservationNumber,
                                                NULL         AS reservationDate,
                                                gateEntryNo,
                                                updatedBy,
                                                dateTime,
                                                 purchasing_doc_no,
                                                'gate_entry' AS documentType
                                         FROM   (SELECT zmm_gate_entry_d.entry_no   AS gateEntryNo,
                                                         zmm_gate_entry_d.ebeln AS purchasing_doc_no,
                                                        zmm_gate_entry_h.entry_date AS dateTime,
                                                        'grse'     AS updatedBy
                                                 FROM   zmm_gate_entry_d AS zmm_gate_entry_d
                                                 LEFT JOIN zmm_gate_entry_h AS zmm_gate_entry_h
                                                     ON zmm_gate_entry_d.ENTRY_NO = zmm_gate_entry_h.ENTRY_NO
                                                 GROUP BY zmm_gate_entry_d.entry_no
                            ) AS gate_entry)


                            UNION ALL

                            (

                            SELECT 		matDocNo,
                				NULL           AS docno,
                                NULL           AS btn,
                                NULL           AS issueNo,
                                NULL           AS issueYear,
                                NULL           AS reservationNumber,
                                NULL           AS reservationDate,
                                NULL           AS gateEntryNo,
                                NULL           AS updatedby,
                                dateTime,
                                purchasing_doc_no,
                                'grn_report' AS documentType
                         FROM   (
                            SELECT 
                        mseg.MBLNR as matDocNo,
                        mseg.EBELN as purchasing_doc_no,
                        mseg.budat_mkpf AS dateTime
                            FROM mseg AS mseg
                            WHERE 1 = 1 AND  ( mseg.BWART IN ('101') )) AS mseg
                            )
                            
                            UNION ALL
                            
                            (SELECT             NULL         AS matDocNo,
                                                docno,
                                                NULL           AS btn,
                                                NULL           AS issueNo,
                                                NULL           AS issueYear,
                                                NULL           AS reservationNumber,
                                                NULL           AS reservationDate,
                                                NULL           AS gateEntryNo,
                                                updatedby,
                                                dateTime,
                                                purchasing_doc_no,
                                                'icgrn_report' AS documentType
                                         FROM   (SELECT DISTINCT mblnr      AS docNo,
                                                                 ersteldat  AS dateTime,
                                                 q.EBELN as purchasing_doc_no,
                                                                 USER.cname AS updatedBy
                                                 FROM   qals AS q
                                                        LEFT JOIN pa0002 AS USER
                                                               ON ( q.aenderer = USER.pernr )) AS qals)
                            
                            UNION ALL
                            
                            (SELECT             NULL                 AS matDocNo,
                                                NULL                 AS docNo,
                                                NULL                 AS btn,
                                                NULL                 AS issueNo,
                                                NULL                 AS issueYear,
                                                reservationNumber,
                                                reservationDate,
                                                NULL                 AS gateEntryNo,
                                                updatedby,
                                                dateTime,
                                                 purchasing_doc_no,
                                                'reservation_report' AS documentType
                                         FROM   (SELECT rk.rsnum      AS reservationNumber,
                                                        rk.rsdat      AS reservationDate,
                                                        rk.rsdat      AS dateTime,
                                                         rk.EBELN as purchasing_doc_no,
                                                        USER.cname AS updatedBy
                                                 FROM   rkpf AS rk
                                                        LEFT JOIN pa0002 AS USER
                                                               ON ( rk.usnam = USER.pernr)
                                                 GROUP  BY rk.rsnum,
                                                           rk.rsdat) AS rkpf)
                            
                            UNION ALL
                            
                            
                            (
                                            SELECT 
                                                   NULL         AS matDocNo,
                                                   NULL AS docno,
                                                   NULL AS btn,
                                                   issueno,
                                                   issueyear,
                                                   NULL AS reservationnumber,
                                                   NULL AS reservationdate,
                                                   NULL AS gateentryno,
                                                   updatedby,
                                                   dateTime,
                                                   purchasing_doc_no,
                                                   'goods_issue_slip' AS documenttype
                                            FROM   (
                                                             SELECT    ms.mblnr      AS issueno,
                                                                       ms.mjahr      AS issueyear,
                                                                       USER.cname AS updatedby,
                                                                       ms.bwart,
                                                                       budat_mkpf AS dateTime,
                                                                        ms.EBELN as purchasing_doc_no
                                                             FROM      mseg       AS ms
                                                             LEFT JOIN pa0002     AS USER
                                                             ON        (
                                                                                 ms.usnam_mkpf = USER.pernr )
                                                             GROUP BY  ms.mblnr,
                                                                       ms.mjahr) AS mseg
                                            WHERE  
                                                          mseg.bwart IN ('221',
                                                                         '281',
                                                                         '201',
                                                                         '321',
                                                                         '222',
                                                                         '202',
                                                                         '122'))) AS store_action_list WHERE 1 = 1`;





      //     (SELECT NULL              AS docNo,
      //         btn,
      //         NULL              AS issueNo,
      //         NULL              AS issueYear,
      //         NULL              AS reservationNumber,
      //         NULL              AS reservationDate,
      //         NULL AS gateEntryNo,
      //         updatedBy,
      //         dateTime,
      //         'ztfi_bil_deface' AS documentType
      //  FROM   (SELECT DISTINCT zregnum    AS btn,
      //                          zcreatedon AS dateTime,
      //                          USER.cname AS updatedBy
      //          FROM   ztfi_bil_deface AS zb
      //                 LEFT JOIN pa0002 AS USER
      //                        ON ( zb.zcreatedby = USER.pernr )) AS ztfi_bil_deface)




      storeActionListQuery =
        `
            SELECT * FROM ((SELECT 
                
                NULL         AS "matDocNo",
                NULL         AS "docNo",
                                                NULL         AS "btn",
                                                NULL         AS "issueNo",
                                                NULL         AS "issueYear",
                                                NULL         AS "reservationNumber",
                                                NULL         AS "reservationDate",
                                                gateEntryNo AS "gateEntryNo",
                                                updatedBy AS "updatedBy",
                                                dateTime AS "dateTime",
                                                purchasing_doc_no AS "purchasing_doc_no",
                								NULL AS "serviceEntryNumber",
                                                'gate_entry' AS "documentType"
                                         FROM   (SELECT zmm_gate_entry_d.entry_no   AS "gateEntryNo",
                                                         zmm_gate_entry_d.ebeln AS "purchasing_doc_no",
                                                        zmm_gate_entry_h.entry_date AS "dateTime",
                                                        'grse'     AS "updatedBy"
                                                 FROM   zmm_gate_entry_d AS zmm_gate_entry_d
                                                 LEFT JOIN zmm_gate_entry_h AS zmm_gate_entry_h
                                                     ON zmm_gate_entry_d.ENTRY_NO = zmm_gate_entry_h.ENTRY_NO
                                                 GROUP BY zmm_gate_entry_d.entry_no
                            ) AS gate_entry)


                            UNION ALL

                            (

                            SELECT 		matDocNo AS "matDocNo",
                				NULL           AS "docNo",
                                NULL           AS "btn",
                                NULL           AS "issueNo",
                                NULL           AS "issueYear",
                                NULL           AS "reservationNumber",
                                NULL           AS "reservationDate",
                                NULL           AS "gateEntryNo",
                                NULL           AS "updatedby",
                                dateTime        AS "dateTime",
                                purchasing_doc_no AS purchasing_doc_no,
                                NULL AS "serviceEntryNumber",
                                'grn_report' AS "documentType"
                         FROM   (
                            SELECT 
                        mseg.MBLNR as "matDocNo",
                        mseg.EBELN as "purchasing_doc_no",
                        mseg.budat_mkpf AS "dateTime"
                            FROM mseg AS mseg
                            WHERE 1 = 1 AND  ( mseg.BWART IN ('101') )) AS mseg
                            )
                            
                            UNION ALL
                            
                            (SELECT             NULL         AS "matDocNo",
                                                docNo         AS "docNo",
                                                NULL           AS "btn",
                                                NULL           AS "issueNo",
                                                NULL           AS "issueYear",
                                                NULL           AS "reservationNumber",
                                                NULL           AS "reservationDate",
                                                NULL           AS "gateEntryNo",
                                                updatedBy       AS "updatedBy",
                                                dateTime        AS "dateTime",
                                                purchasing_doc_no AS "purchasing_doc_no",
                             					NULL AS serviceEntryNumber,
                                                'icgrn_report' AS documentType
                                         FROM   (SELECT DISTINCT mblnr      AS "docNo",
                                                                 ersteldat  AS "dateTime",
                                                                 q.EBELN as "purchasing_doc_no",
                                                                 USER.cname AS "updatedBy"
                                                 FROM   qals AS q
                                                        LEFT JOIN pa0002 AS USER
                                                               ON ( q.aenderer = USER.pernr )) AS qals)
                            
                            UNION ALL
                            
                            (SELECT             NULL                 AS "matDocNo",
                                                NULL                 AS "docNo",
                                                NULL                 AS "btn",
                                                NULL                 AS "issueNo",
                                                NULL                 AS "issueYear",
                                                reservationNumber AS "reservationNumber",
                                                reservationDate AS "reservationDate",
                                                NULL                 AS "gateEntryNo",
                                                updatedBy       AS "updatedBy",
                                                dateTime        AS "dateTime",
                                                purchasing_doc_no AS "purchasing_doc_no",
                                                 NULL AS "serviceEntryNumber",
                                                'reservation_report' AS "documentType"
                                         FROM   (SELECT rk.rsnum      AS "reservationNumber",
                                                        rk.rsdat      AS "reservationDate",
                                                        rk.rsdat      AS "dateTime",
                                                         rk.EBELN as "purchasing_doc_no",
                                                        USER.cname AS "updatedBy"
                                                 FROM   rkpf AS rk
                                                        LEFT JOIN pa0002 AS USER
                                                               ON ( rk.usnam = USER.pernr)
                                                 GROUP  BY rk.rsnum,
                                                           rk.rsdat) AS rkpf)
                            
                            UNION ALL
                            
                            
                            (
                                            SELECT 
                                                   NULL         AS "matDocNo",
                                                   NULL AS "docNo",
                                                   NULL AS "btn",
                                                   issueNo AS "issueNo",
                                                   issueYear as "issueYear",
                                                   NULL AS "reservationNumber",
                                                   NULL AS "reservationDate",
                                                   NULL AS "gateentryNo",
                                                   updatedBy       AS "updatedBy",
                                                   dateTime        AS "dateTime",
                                                   purchasing_doc_no AS "purchasing_doc_no",
                                					NULL AS "serviceEntryNumber",
                                                   'goods_issue_slip' AS "documentType"
                                            FROM   (
                                                             SELECT    ms.mblnr      AS "issueNo",
                                                                       ms.mjahr      AS "issueYear",
                                                                       USER.cname AS "updatedby",
                                                                       ms.bwart,
                                                                       budat_mkpf AS "dateTime",
                                                                        ms.EBELN as "purchasing_doc_no"
                                                             FROM      mseg       AS ms
                                                             LEFT JOIN pa0002     AS USER
                                                             ON        (
                                                                                 ms.usnam_mkpf = USER.pernr )
                                                             GROUP BY  ms.mblnr,
                                                                       ms.mjahr) AS mseg
                                            WHERE  
                                                          mseg.bwart IN ('221',
                                                                         '281',
                                                                         '201',
                                                                         '321',
                                                                         '222',
                                                                         '202',
                                                                         '122'))
              
              
              UNION ALL
               
               (SELECT             				NULL         		AS "matDocNo",
                                                NULL                 AS "docNo",
                                                NULL                 AS "btn",
                                                NULL                 AS "issueNo",
                                                NULL                 AS "issueYear",
                                                NULL AS "reservationNumber",
                                                NULL AS "reservationDate",
                                                NULL                 AS "gateEntryNo",
                                                NULL AS "updatedby",
                                                dateTime as "dateTime" ,
                                                 purchising_doc_no as "purchising_doc_no",
                                                 serviceEntryNumber as "serviceEntryNumber",
                                                'service_entry_report' AS "documentType"
                                         FROM   (
                                             SELECT essr.lblni as "serviceEntryNumber",
                								essr.ebeln as "purchising_doc_no",
                								essr.erdat as "dateTime"
                
                							FROM essr) AS essr)
               
              
              
              ) AS store_action_list WHERE 1 = 1`;




      storeActionListQuery = `
              
              
              SELECT 
  * 
FROM 
  (
    (
      SELECT 
        NULL AS "matDocNo", 
        NULL AS "docNo", 
        NULL AS "btn", 
        NULL AS "issueNo", 
        NULL AS "issueYear", 
        NULL AS "reservationNumber", 
        NULL AS "reservationDate", 
        "gateEntryNo" AS "gateEntryNo", 
        "updatedBy" AS "updatedBy", 
        "dateTime" AS "dateTime", 
        "purchasing_doc_no" AS "purchasing_doc_no", 
        NULL AS "serviceEntryNumber", 
        'gate_entry' AS "documentType" 
      FROM 
        (
          SELECT 
            zmm_gate_entry_d.entry_no AS "gateEntryNo", 
            zmm_gate_entry_d.ebeln AS "purchasing_doc_no", 
            zmm_gate_entry_h.entry_date AS "dateTime", 
            'grse' AS "updatedBy" 
          FROM 
            zmm_gate_entry_d AS zmm_gate_entry_d 
            LEFT JOIN zmm_gate_entry_h AS zmm_gate_entry_h ON zmm_gate_entry_d.ENTRY_NO = zmm_gate_entry_h.ENTRY_NO 
          GROUP BY 
            zmm_gate_entry_d.entry_no, 
            zmm_gate_entry_d.ebeln, 
            zmm_gate_entry_h.entry_date
        ) AS gate_entry
    ) 
    UNION ALL 
      (
        SELECT 
          "matDocNo" AS "matDocNo", 
          NULL AS "docNo", 
          NULL AS "btn", 
          NULL AS "issueNo", 
          NULL AS "issueYear", 
          NULL AS "reservationNumber", 
          NULL AS "reservationDate", 
          NULL AS "gateEntryNo", 
          NULL AS "updatedby", 
          "dateTime" AS "dateTime", 
          "purchasing_doc_no" AS purchasing_doc_no, 
          NULL AS "serviceEntryNumber", 
          'grn_report' AS "documentType" 
        FROM 
          (
            SELECT 
              mseg.MBLNR as "matDocNo", 
              mseg.EBELN as "purchasing_doc_no", 
              mseg.budat_mkpf AS "dateTime" 
            FROM 
              mseg AS mseg 
            WHERE 
              1 = 1 
              AND (
                mseg.BWART IN ('101')
              )
          ) AS mseg
      ) 
    UNION ALL 
      (
        SELECT 
          NULL AS "matDocNo", 
          "docNo" AS "docNo", 
          NULL AS "btn", 
          NULL AS "issueNo", 
          NULL AS "issueYear", 
          NULL AS "reservationNumber", 
          NULL AS "reservationDate", 
          NULL AS "gateEntryNo", 
          "updatedBy" AS "updatedBy", 
          "dateTime" AS "dateTime", 
          "purchasing_doc_no" AS "purchasing_doc_no", 
          NULL AS "serviceEntryNumber", 
          'icgrn_report' AS documentType 
        FROM 
          (
            SELECT 
              DISTINCT mblnr AS "docNo", 
              ersteldat AS "dateTime", 
              q.EBELN as "purchasing_doc_no", 
              guser.cname AS "updatedBy" 
            FROM 
              qals AS q 
              LEFT JOIN pa0002 AS guser ON (
                q.aenderer :: integer = guser.pernr
              )
          ) AS qals
      ) 
    UNION ALL 
      (
        SELECT 
          NULL AS "matDocNo", 
          NULL AS "docNo", 
          NULL AS "btn", 
          NULL AS "issueNo", 
          NULL AS "issueYear", 
          "reservationNumber" AS "reservationNumber", 
          "reservationDate" AS "reservationDate", 
          NULL AS "gateEntryNo", 
          "updatedBy" AS "updatedBy", 
          "dateTime" AS "dateTime", 
          "purchasing_doc_no" AS "purchasing_doc_no", 
          NULL AS "serviceEntryNumber", 
          'reservation_report' AS "documentType" 
        FROM 
          (
            SELECT 
              rk.rsnum::character varying AS "reservationNumber", 
              rk.rsdat::character varying AS "reservationDate", 
              rk.rsdat AS "dateTime", 
              rk.EBELN as "purchasing_doc_no", 
              guser.cname AS "updatedBy" 
            FROM 
              rkpf AS rk 
              LEFT JOIN pa0002 AS guser ON (rk.usnam :: integer = guser.pernr) 
            GROUP BY 
              rk.rsnum, 
              rk.rsdat, 
              guser.cname
          ) AS rkpf
      ) 
    UNION ALL 
      (
        SELECT 
          NULL AS "matDocNo", 
          NULL AS "docNo", 
          NULL AS "btn", 
          "issueNo" AS "issueNo", 
          "issueYear" as "issueYear", 
          NULL AS "reservationNumber", 
          NULL AS "reservationDate", 
          NULL AS "gateentryNo", 
          mseg.updatedBy AS "updatedBy", 
          "dateTime" AS "dateTime", 
          "purchasing_doc_no" AS "purchasing_doc_no", 
          NULL AS "serviceEntryNumber", 
          'goods_issue_slip' AS "documentType" 
        FROM 
          (
            SELECT 
              ms.mblnr AS "issueNo", 
              ms.mjahr::character varying AS "issueYear", 
              guser.cname AS "updatedby", 
              ms.bwart, 
              budat_mkpf AS "dateTime", 
              ms.EBELN as "purchasing_doc_no" 
            FROM 
              mseg AS ms 
              LEFT JOIN pa0002 AS guser ON (
                ms.usnam_mkpf :: integer = guser.pernr
              ) 
            GROUP BY 
              ms.mblnr, 
              guser.cname, 
              ms.bwart, 
              budat_mkpf, 
              ms.mjahr, 
              ms.EBELN
          ) AS mseg 
        WHERE 
          mseg.bwart IN (
            '221', '281', '201', '321', '222', '202', 
            '122'
          )
      ) 
    UNION ALL 
      (
        SELECT 
          NULL AS "matDocNo", 
          NULL AS "docNo", 
          NULL AS "btn", 
          NULL AS "issueNo", 
          NULL AS "issueYear", 
          NULL AS "reservationNumber", 
          NULL AS "reservationDate", 
          NULL AS "gateEntryNo", 
          NULL AS "updatedby", 
          "dateTime" as "dateTime", 
          "purchising_doc_no" as "purchising_doc_no", 
          "serviceEntryNumber" as "serviceEntryNumber", 
          'service_entry_report' AS "documentType" 
        FROM 
          (
            SELECT 
              essr.lblni as "serviceEntryNumber", 
              essr.ebeln as "purchising_doc_no", 
              essr.erdat as "dateTime" 
            FROM 
              essr
          ) AS essr
      )
  ) AS store_action_list WHERE 1 = 1`;



      const queryParams = req.query;
      const val = [];
      if (queryParams.poNo) {
        storeActionListQuery = storeActionListQuery.concat(" AND store_action_list.purchasing_doc_no = $1 ");
        val.push(queryParams.poNo);
      }
      console.log("storeActionListQuery", storeActionListQuery);

      // const [results] = await promiseConnection.execute(storeActionListQuery);
      const results = await getQuery({ query: storeActionListQuery, values: val });

      console.log(storeActionListQuery, results);

      // transactionSuccessful = true;

      resSend(res, true, 200, "data fetch success", results, null)
      // if (transactionSuccessful === TRUE && results) {
      // } else {
      //     responseSend(res, false, 200, "no data found", [], null);
      // }

    } catch (error) {
      responseSend(res, "F", 502, "data fetch failed !!", error, null);
    }
    finally {
      // const connEnd = await promiseConnection.end();
      console.log("Connection End" + "--->" + "connection release");
    }
  } catch (error) {
    responseSend(res, "F", 400, "Error in database conn!!", error, null);
  }
};
const gateEntryReport = async (req, res) => {

  try {

    let ge_query = `
            SELECT 
                zmm_gate_entry_h.ENTRY_NO as "gate_entry_no",
                zmm_gate_entry_h.ENTRY_DATE as "entry_date",
                zmm_gate_entry_h.VEH_REG_NO as "vehicle_no",
                zmm_gate_entry_d.INVNO as "invoice_number",
                zmm_gate_entry_d.INV_DATE as "invoice_date",
                zmm_gate_entry_d.EBELN as "purchising_doc_no",
                zmm_gate_entry_d.EBELP as "po_line_item_no",
                zmm_gate_entry_d.CH_QTY as "chalan_quantity",
                zmm_gate_entry_d.CH_NETWT as "net_quantity",
                zmm_gate_entry_d.MATNR as "material_code",
                material.MAKTX as "material_desc",
                ekko.LIFNR as "vendor_code",
                lfa1.NAME1 as "vendor_name",
                ekpo.MENGE as "quantity"
                FROM zmm_gate_entry_h AS zmm_gate_entry_h 
            LEFT JOIN zmm_gate_entry_d as zmm_gate_entry_d
                ON( zmm_gate_entry_h.ENTRY_NO = zmm_gate_entry_d.ENTRY_NO)
                LEFT JOIN ekko as ekko
                	ON (zmm_gate_entry_d.EBELN = ekko.EBELN)
                    LEFT JOIN ekpo as ekpo
                	ON (zmm_gate_entry_d.EBELN = ekpo.EBELN AND zmm_gate_entry_d.EBELP = ekpo.EBELP)
                    LEFT JOIN lfa1 as lfa1
                    	ON(lfa1.LIFNR = ekko.LIFNR)
                    LEFT JOIN makt as material
                        ON(material.MATNR = zmm_gate_entry_d.MATNR)
                WHERE 1 = 1`;

    console.log("ge_query", ge_query);
    if (req.body.gate_entry_no) {
      ge_query = ge_query.concat(` AND zmm_gate_entry_h.ENTRY_NO = '${req.body.gate_entry_no}'`);
    }



    await getQuery({ query: ge_query.q, values: ge_query.val });
    // console.log(results, "jjjj");
    let obj = {
      gate_entry_no: null,
      entry_date: null,
      vendor_code: null,
      vendor_name: null,
      invoice_number: null,
      vehicle_no: null
    }
    if (results && results.length) {
      obj.gate_entry_no = results[0].gate_entry_no,
        obj.entry_date = results[0].entry_date,
        obj.vendor = results[0].vendor,
        obj.invoice_number = results[0].invoice_number,
        obj.vehicle_no = results[0].vehicle_no,
        obj.vendor_name = results[0].vendor_name,
        obj.vendor_code = results[0].vendor_code,
        obj.line_items = results

    }

    // console.log(ge_query, results);


    if (results.length) {
      resSend(res, true, 200, "data fetch success", obj, null)
    } else {
      resSend(res, false, 200, "no data found", [], null);
    }

  } catch (error) {
    resSend(res, false, 502, error.toString(), error.stack, null);
  }


};




module.exports = { insertGateEntryData, storeActionList, gateEntryReport };
//     EBELN: "7777777777",
//     BUKRS: "5788",
//     BSTYP: "S",
//     BSART: "ABCD",
//     LOEKZ: "W",
//     AEDAT: "2023-11-07",
//     ERNAM: "34567656787",
//     LIFNR: "1234567890",
//     EKORG: "1234",
//     EKGRP: "123",
//     ekpo: [
//       {
//         EBELN: "7777777777",
//         EBELP: 10023,
//         LOEKZ: "W",
//         STATU: "1",
//         AEDAT: "07.03.2014",
//         TXZ01: "IncomeTax Rectification in SAP Payroll",
//         MATNR: "",
//         BUKRS: "GRSE",
//         WERKS: "100",
//         LGORT: "",
//         MATKL: "SE57",
//         KTMNG: 1244,
//         MENGE: 232131,
//         MEINS: "AU",
//         NETPR: "0",
//         NETWR: "0",
//         MWSKZ: "TV",
//       },
//       {
//         EBELN: "7777777777",
//         EBELP: 88,
//         LOEKZ: "W",
//         STATU: "1",
//         AEDAT: "20.06.2019",
//         TXZ01: "6. Warranty Support",
//         MATNR: "",
//         BUKRS: "GRSE",
//         WERKS: "100",
//         LGORT: "",
//         MATKL: "SE74",
//         KTMNG: "0",
//         MENGE: "1",
//         MEINS: "AU",
//         NETPR: "9000,3222",
//         NETWR: "124,456,900",
//         MWSKZ: "SG",
//       },
//     ],
//     zpo_milestone: [
//       { EBELN: "7777777777", MID: "M-1", MTEXT: "IM IN - 1", PLAN_DATE: "2023-11-02", MO: "M" },
//       { EBELN: "7777777777", MID: "M-2", MTEXT: "IM IN - 2", PLAN_DATE: "2023-11-03", MO: "O" },
//     ],
//   };