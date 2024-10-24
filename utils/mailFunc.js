const { USER_TYPE_GRSE_DRAWING, ASSIGNER, USER_TYPE_GRSE_QAP } = require("../lib/constant");




const getUserDetailsQuery = (type, valueParameter) => {
  let getDeatilsQuery = "";

  switch (type) {
    case 'do':
      getDeatilsQuery =
        ` (
                SELECT    
                po.ernam           AS u_id,
                user_t.cname       AS u_name,
                user_t.email       AS u_email,
                '${type}'               AS u_type
                FROM      ekko               AS po
                    LEFT JOIN pa0002             AS user_t
                ON   ( po.ernam = user_t.pernr :: CHARACTER varying) where po.ebeln = ${valueParameter}
                )`;
      break;
    case 'vendor':

      getDeatilsQuery =
        `(
                    SELECT    
                        vendor_t.lifnr                AS u_id,
                        vendor_t.name1                AS u_name,
                        vendor_t.email                AS u_email,
                        '${type}'                     AS u_type
                    FROM      lfa1   AS vendor_t
                     where  vendor_t.lifnr = ${valueParameter}
                )`;

      break;
    case 'drawing_assingee':
      getDeatilsQuery =
        `(
                SELECT    user_t.pernr :: character varying  AS u_id,
                          user_t.cname       AS u_name,
                          user_t.email       AS u_email,
                          '${type || ""}'    AS u_type
                FROM     pa0002  as user_t where  user_t.pernr = ${valueParameter}
            )`;
      break;
    case 'bg_assignee':
      getDeatilsQuery =
        `(
                SELECT    user_t.pernr :: character varying  AS u_id,
                          user_t.cname       AS u_name,
                          user_t.email       AS u_email,
                          '${type || ""}'    AS u_type
                FROM     pa0002  as user_t where  user_t.pernr = ${valueParameter}
            )`;
      break;
    case 'finance_staff':
      getDeatilsQuery =
        `(
                SELECT    user_t.pernr :: character varying  AS u_id,
                          user_t.cname       AS u_name,
                          user_t.email       AS u_email,
                          '${type || ""}'    AS u_type
                FROM     pa0002  as user_t where  user_t.pernr = ${valueParameter}
            )`;
      break;

    case 'vendor_and_do':
      getDeatilsQuery = `        
 
            (
                SELECT    po.ernam           AS u_id,
                          user_t.cname       AS u_name,
                          user_t.email       AS u_email,
                          'do'               AS u_type
                FROM      ekko               AS po
                LEFT JOIN pa0002             AS user_t
                ON        ( po.ernam = user_t.pernr :: CHARACTER varying) where po.ebeln = ${valueParameter}
            ) 
                UNION
            (
               SELECT    po.lifnr            AS u_id,
               vendor_t.name1                AS u_name,
               vendor_t.email                AS u_email,
                         'vendor'                      AS u_type
               FROM      ekko                          AS po
               LEFT JOIN lfa1                          AS vendor_t
               ON        ( po.lifnr = vendor_t.lifnr)  where po.ebeln = ${valueParameter})`;

      break;


    case 'cdo_and_do':
      getDeatilsQuery = `
            (
                select 
                  vendor_code as u_id, 
                  users.cname as u_name, 
                  users.email as u_email, 
                  'cdo' as u_type 
                from 
                  auth as auth 
                  left join pa0002 as users on (
                    users.pernr :: character varying = auth.vendor_code
                  ) 
                  where 
                  department_id = ${USER_TYPE_GRSE_DRAWING} AND internal_role_id = ${ASSIGNER}
              ) 
              UNION ALL 
                (
                  SELECT 
                    po.ernam AS u_id, 
                    user_t.cname AS u_name, 
                    user_t.email AS u_email,
                    'do' AS u_type 
                  FROM 
                    ekko AS po 
                    LEFT JOIN pa0002 AS user_t ON (
                      po.ernam = user_t.pernr :: CHARACTER varying
                    ) 
                  where 
                    po.ebeln = ${valueParameter})`;
      break;

    case 'vendor_by_po':

      getDeatilsQuery = `
            (
                SELECT    po.lifnr            AS u_id,
                vendor_t.name1                AS u_name,
                vendor_t.email                AS u_email,
                          'vendor'                      AS u_type
                FROM      ekko                          AS po
                LEFT JOIN lfa1                          AS vendor_t
                ON        ( po.lifnr = vendor_t.lifnr)  where po.ebeln = ${valueParameter}
            )`;
      break;
    case 'vendor_by_btn':

      getDeatilsQuery = `
            (

            SELECT 
	            btn.vendor_code as u_id,
	            vendor.name1 as u_name,
	            vendor.email as u_email,
	            'vendor' as u_type
            FROM btn as btn 
	            left join lfa1 as vendor
	              ON(vendor.lifnr = btn.vendor_code)
            WHERE btn_num = ${valueParameter}
            )`;
      break;
      case 'vendor_by_sbtn':

      getDeatilsQuery = `
            (

            SELECT 
	            btn.vendor_code as u_id,
	            vendor.name1 as u_name,
	            vendor.email as u_email,
	            'vendor' as u_type
            FROM btn_service_hybrid as btn 
	            left join lfa1 as vendor
	              ON(vendor.lifnr = btn.vendor_code)
            WHERE btn_num = ${valueParameter}
            )`;
      break;

    case 'nodal_officers':
      getDeatilsQuery = `(select 
              vendor_code as u_id, 
              users.cname as u_name, 
              users.email as u_email, 
              'nodal_officers' as u_type 
            from 
              auth as auth 
              left join pa0002 as users on (
                users.pernr :: character varying = auth.vendor_code
              ) 
              where 
              department_id = ${USER_TYPE_GRSE_QAP} AND internal_role_id = ${ASSIGNER}
          ) `
      break;
    case 'qa_officers':
      getDeatilsQuery = `(select 
              vendor_code as u_id, 
              users.cname as u_name, 
              users.email as u_email, 
              'nodal_officers' as u_type 
            from 
              auth as auth 
              left join pa0002 as users on (
                users.pernr :: character varying = auth.vendor_code
              ) 
              where 
              department_id = ${USER_TYPE_GRSE_QAP} AND internal_role_id = ${ASSIGNER}
          ) `;


      break;

    case 'wdc_certifing_authrity':
      getDeatilsQuery =
        `(
                SELECT    user_t.pernr       AS u_id,
                          user_t.cname       AS u_name,
                          user_t.email       AS u_email,
                          '${type || ""}'    AS u_type
                FROM     pa0002  as user_t where  user_t.pernr = ${valueParameter}
            )`;
      break;
    default:
      getDeatilsQuery =
        `(
                SELECT    user_t.pernr :: character varying  AS u_id,
                          user_t.cname       AS u_name,
                          user_t.email       AS u_email,
                          '${type || ""}'    AS u_type
                FROM     pa0002  as user_t where  user_t.pernr = ${valueParameter}
            )`;
      break;


  }

  return getDeatilsQuery;

}



module.exports = { getUserDetailsQuery }