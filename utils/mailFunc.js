



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
                po.ebeln           AS purchising_doc_no,
                '${type}'               AS user_type
                FROM      ekko               AS po
                    LEFT JOIN pa0002             AS user_t
                ON   ( po.ernam = user_t.pernr :: CHARACTER varying) where po.ebeln = ${valueParameter};
                )`;
            break;
        case 'vendor':

            getDeatilsQuery =
                `(
                    SELECT    
                        vendor_t.lifnr                AS u_id,
                        vendor_t.name1                AS u_name,
                        vendor_t.email                AS u_email,
                        '${type}'                     AS user_type
                    FROM      lfa1   AS vendor_t
                     where  vendor_t.lifnr = ${valueParameter};
                )`;

            break;
        case 'drawing_assigner':
            getDeatilsQuery =
                `(
                    SELECT    po.ernam           AS u_id,
                              user_t.cname       AS u_name,
                              user_t.email       AS u_email,
                              '${type}'               AS user_type
                    FROM pa0002             AS user_t
                    user_t.pernr = ${valueParameter};
                )`
            break;

        case 'vendor_and_do':
            getDeatilsQuery = `        
 
            (
                SELECT    po.ernam           AS u_id,
                          user_t.cname       AS u_name,
                          user_t.email       AS u_email,
                          'do'               AS user_type
                FROM      ekko               AS po
                LEFT JOIN pa0002             AS user_t
                ON        ( po.ernam = user_t.pernr :: CHARACTER varying) where po.ebeln = ${valueParameter}
            ) 
                UNION
            (
               SELECT    po.lifnr            AS u_id,
               vendor_t.name1                AS u_name,
               vendor_t.email                AS u_email,
                         'vendor'                      AS user_type
               FROM      ekko                          AS po
               LEFT JOIN lfa1                          AS vendor_t
               ON        ( po.lifnr = vendor_t.lifnr)  where po.ebeln = ${valueParameter})`;

               break;

        default:
            getDeatilsQuery = 
            `(
                SELECT    user_t.pernr       AS u_id,
                          user_t.cname       AS u_name,
                          user_t.email       AS u_email,
                          '${type || ""}'    AS user_type
                FROM     pa0002  as user_t where  user_t.pernr = ${valueParameter}
            )`;
            break;


    }

    return getDeatilsQuery;

}



module.exports = { getUserDetailsQuery }