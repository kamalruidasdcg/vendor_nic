// const roles = require("../constants/roles");
// const {
//     generateSalt,
//     getHashedText,
//     compareHash,
// } = require("../services/crypto.services");


const { query } = require("../../config/dbConfig");
const { getAccessToken, getRefreshToken } = require("../../services/jwt.services");
const { resSend } = require("../../lib/resSend");
const { AUTH, USTER_TYPE } = require("../../lib/tableName");
const { USER_TYPE_VENDOR, USER_TYPE_SUPER_ADMIN, INSERT, TRUE } = require("../../lib/constant");
// const { authDataModify } = require("../services/auth.services");

const rolePermission = require("../../lib/role/deptWiseRolePermission");
// const { generateSalt, getHashedText } = require("../../services/crypto.services");
const { getEpochTime, generateQuery } = require("../../lib/utils");

const Message = require("../../utils/messages");





const MAX_AGE = 24 * 60 * 60 * 1000;


const login = async (req, res) => {

    try {

        if (!req.body.vendor_code || !req.body.password) {
            return resSend(res, false, 200, "MANDATORY_INPUTS_REQUIRED");
        }

        // const userQuery = `SELECT * FROM ${AUTH} WHERE username = "${req.body.username}"`;

        // const userFoundQuery = `SELECT * FROM auth JOIN user_type ON auth.user_type = user_type.id JOIN  user_role ON user_role.user_type_id = user_type.id WHERE auth.username = "${req.body.username}"`


        //     const q1 = `SELECT
        //     auth.auth_id AS "auth.auth_id",
        //     auth.user_type AS "auth.user_type",
        //     auth.username AS "auth.username",
        //     auth.password AS "auth.password",
        //     auth.name AS "auth.name",
        //     auth.email AS "auth.email",
        //     auth.vendor_code AS "auth.vendor_code",
        //     user_type.id AS "user_type.id",
        //     user_type.user_type AS "user_type.user_type",
        //     user_type.created_at AS "user_type.created_at",
        //     user_type.updated_at AS "user_type.updated_at",
        //     user_role.user_type_id AS "user_role.user_type_id",
        //     user_role.ven_bill_submit AS "user_role.ven_bill_submit",
        //     user_role.ven_bill_show AS "user_role.ven_bill_show",
        //     user_role.ven_bill_edit AS "user_role.ven_bill_edit",
        //     user_role.ven_bill_received AS "user_role.ven_bill_received",
        //     user_role.ven_bill_certified AS "user_role.ven_bill_certified",
        //     user_role.ven_bill_forward AS "user_role.ven_bill_forward"
        // FROM auth
        // JOIN user_type ON auth.user_type = user_type.id
        // JOIN user_role ON user_role.user_type_id = user_type.id
        // WHERE auth.vendor_code = "${req.body.vendor_code}"`;
        let login_Q =
            `SELECT 
                t1.vendor_code, t1.user_type, t1.username, t1.password, t1.department_id, t1.internal_role_id,
                    t2.name AS department_name, t3.name AS role
                FROM 
                    auth
                AS 
                    t1 
			    LEFT JOIN
                	depertment_master
                AS 
                    t2
                ON
                	t1.department_id = t2.id
                LEFT JOIN
                	internal_role_master
                AS 
                    t3
                ON	
                    t1.internal_role_id = t3.id
                WHERE 
                    t1.vendor_code = ?`;

        // if (req.body.userType === "VENDOR") {
        //     login_Q = `SELECT t1.vendor_code, t1.email, t1.user_type, t1.username, t1.password, 
        //     t3.SMTP_ADDR 
        //         FROM auth 
        //             AS t1
        //         LEFT JOIN adr6 
        //         AS t3 
        //             ON 
        //         t1.vendor_code = t3.PERSNUMBER
        //             WHERE 
        //         (t1.user_type = 1 AND t1.vendor_code = ?)`;
        // }
        // else if (req.body.userType === "GRSE") {
        //     login_Q = `SELECT 
        //         t1.vendor_code, t1.email, t1.user_type, t1.username, t1.password, 
        //         t2.CNAME, t3.USRID_LONG 
        //         FROM auth 
        //             AS t1 
        //         WHERE 
        //              AND t1.vendor_code = ?`;
        // }
        // const  vendorLogin_Q = `SELECT t1.vendor_code, t1.email, t1.user_type, t1.username, t1.password, t2.*, t3.SMTP_ADDR FROM auth as t1 LEFT JOIN lfa1 AS t2 ON t1.vendor_code = t2.LIFNR LEFT JOIN adr6 as t3 ON t1.vendor_code = t3.PERSNUMBER  WHERE t1.vendor_code = ?`;

        let result = await query({ query: login_Q, values: [req.body.vendor_code] });
        let user = {};
        let permission = {};
        let userDetails = [];
        if (!result.length) {
            return resSend(res, false, 200, "USER_NOT_FOUND");
        }

        if (req.body.password !== result[0]["password"]) {
            console.log("U R given Password -->", req.body.password, "Please check !!");
            return resSend(res, false, 200, "INCORRECT_PASSWORD");
        } else if (req.body.password === result[0]["password"]) {
            if (result[0]["user_type"] === USER_TYPE_VENDOR) {
                const vendorDetailsQ =
                    `SELECT t1.NAME1 AS name , t2.SMTP_ADDR AS email
                        FROM
                            lfa1
                        AS t1
                        LEFT JOIN
                            adr6 
                        AS t2
                            ON 
                        t1.LIFNR = t2.PERSNUMBER
                            WHERE 
                        t1.LIFNR = ?`;

                userDetails = await query({ query: vendorDetailsQ, values: [req.body.vendor_code] });

                if (userDetails.length) {
                    result[0] = { ...result[0], ...userDetails[0] };
                    const { department_name, role } = result[0];
                    const deptPermission = rolePermission["VENDOR"];
                    permission = deptPermission;

                }
                // if (permission.length) {
                //     name = permission[0].name;
                //     email = permission[0].email;
                //     permission = permission?.map((el) => {
                //         delete el.name,
                //             delete el.email
                //         return el;
                //     })
                // }

                // user = { user: { ...result[0] } };
            } else if (result[0]["user_type"] !== USER_TYPE_VENDOR) {

                const grseDetaisQ =
                    `SELECT t1.CNAME AS name, t2.USRID_LONG AS email
                        FROM pa0002 
                        AS t1 
                    LEFT JOIN pa0105 
                        AS t2
                    ON
                        (t1.PERNR = t2.PERNR AND t2.SUBTY = "0030")
                    WHERE 
                         t1.PERNR = ?`;
                userDetails = await query({
                    query:

                        grseDetaisQ, values: [req.body.vendor_code]
                });

                if (userDetails.length) {
                    result[0] = { ...result[0], ...userDetails[0] };
                    const { department_name, role } = result[0];
                    const deptPermission = rolePermission[department_name];
                    if (deptPermission) {
                        deptPermission[role] = true;
                    }
                    permission = deptPermission ? deptPermission : {};
                }

                /**
                 *   LEFT JOIN 
                permission AS t3
            ON 
                t3.user_id = t1.PERNR
                if (permission?.length) {
                    name = permission[0].name;
                    email = permission[0].email;

                    permission = permission?.map((el) => {
                        delete el.name,
                            delete el.email
                        return el;
                    })
                }
                 */
            }

        }

        // commented because of previously use role base access. now no need 
        // const user = result && result?.length ? authDataModify(result)[0] : {};


        // deleting password from response
        delete result[0]["password"];

        // let sidebar_menu = { ...rolePermission };
        // added permission as per define in permission table
        // if permission is on the table permission has granted 
        // otherwise no permission
        // if (permission?.length && result[0]["user_type"] !== USER_TYPE_VENDOR) {

        //     if (result[0]["user_type"] == USER_TYPE_SUPER_ADMIN) {
        //         const newObj = JSON.parse(
        //             JSON.stringify(rolePermission, (key, value) =>
        //                 typeof value === "boolean" ? true : value
        //             )
        //         );

        //         sidebar_menu = newObj;

        //     } else {

        //         permission.forEach((el) => {
        //             if (sidebar_menu[el.screen_name]["activities"]) {
        //                 sidebar_menu[el.screen_name]["activities"][el.activity_type] = el["activity_status"] === 1 ? true : false;
        //                 if (el.activity_status === 1) {
        //                     sidebar_menu[el.screen_name]["hasAccess"] = true;
        //                 }
        //             }
        //         });
        //     }

        // }

        // user["permission"] = sidebar_menu;

        user = { user: { ...result[0] }, permission };

        const payload = {
            username: user.user?.username,
            vendor_code: user.user?.vendor_code,
            name: user.user?.name,
            user_type: user.user?.user_type,
            department_id: user.user.department_id,
            internal_role_id: user.user.internal_role_id

            // user_type_name: user.user_type.user_type
        };

        const ACCESS_TOKEN_VALIDITY = "1d";
        const REFRESH_TOKEN_VALIDITY = "7d";

        const accessToken = getAccessToken(payload, ACCESS_TOKEN_VALIDITY);
        const refreshToken = getRefreshToken(payload, REFRESH_TOKEN_VALIDITY);

        if (!accessToken || !refreshToken)
            return resSend(res, false, 500, "TOKEN_GENERATION_ERROR");


        // TO DO 
        // save data in cookie
        // res.cookie('jwt', refreshToken, {
        //     httpOnly: true,
        //     sameSite: 'None', secure: true,
        //     maxAge: MAX_AGE
        // });



        return resSend(res, true, 200, "USER_AUTHENTICATION_SUCCESS", user, { accessToken, refreshToken });
    } catch (error) {
        console.log("LOGIN ERROR", error);

        return resSend(res, false, 500, "INTERNAL_SERVER_ERROR");
    }
};


// const registration = async (req, res) => {

//     try {
//         const paylaod = req.body;
//         let regData = {};

//         if (!paylaod.user_type || !paylaod.username) return resSend(res, false, 400, Message.INVALID_PAYLOAD, null);
//         const salt = generateSalt();
//         const encrytedPassword = getHashedText("1234", salt);

//         if (paylaod.user_type === USER_TYPE_VENDOR) {

//             const validVendor = await query({ query: "SELECT COUNT(*) as count FROM lfa1 WHERE 1 = 1 AND  lifnr = ? ", values: [paylaod.username] });
//             if (!validVendor) {
//                 return resSend(res, false, 200, "User not access for OBPS", paylaod);
//             }

//             // const encrytedPassword = getHashedText(req.body.password, salt);

//             regData = {
//                 vendor_code: paylaod.username,
//                 user_type: USER_TYPE_VENDOR,
//                 default_password: encrytedPassword,
//                 is_approved: 'N',
//                 fistime_login: 'N',
//                 created_at: getEpochTime(),
//                 user_data: JSON.stringify({ department_id: null, internal_role_id: null })
//             }

//             const { q, val } = generateQuery(INSERT, 'user_registraion', regData);
//             const response = await query({ query: q, values: val });

//             if (response.affectedRows) {
//                 resSend(res, true, 200, Message.USER_REG_SUCCESS, null);
//             } else {
//                 resSend(res, false, 400, Message.USER_REG_UN_SUCCESS, response);
//             }


//         } else if (paylaod.user_type !== USER_TYPE_VENDOR) {


//             const validVendor = await query({ query: "SELECT COUNT(*) as count FROM pa0002 WHERE 1 = 1 AND  pernr = ? ", values: [paylaod.username] });
//             if (!validVendor) {
//                 return resSend(res, false, 200, "User not access for OBPS", paylaod);
//             }

//             // const encrytedPassword = getHashedText(req.body.password, salt);

//             regData = {
//                 vendor_code: paylaod.username,
//                 user_type: 2,
//                 default_password: encrytedPassword,
//                 is_approved: 'N',
//                 fistime_login: 'N',
//                 created_at: getEpochTime(),
//                 user_data: JSON.stringify({ department_id: null, internal_role_id: null })
//             }

//             const { q, val } = generateQuery(INSERT, 'user_registraion', regData);
//             const response = await query({ query: q, values: val });

//             if (response.affectedRows) {
//                 resSend(res, true, 200, Message.USER_REG_SUCCESS, null);
//             } else {
//                 resSend(res, false, 400, Message.USER_REG_UN_SUCCESS, response);
//             }


//         } else {

//             resSend(res, false, 400, Message.DATA_NOT_INSERTED, null);

//         }
//     } catch (error) {
//         resSend(res, false, 500, Message.SERVER_ERROR, null);
//     }

// }


module.exports = { login };

