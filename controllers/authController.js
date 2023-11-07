// const roles = require("../constants/roles");
// const {
//     generateSalt,
//     getHashedText,
//     compareHash,
// } = require("../services/crypto.services");


const { query } = require("../config/dbConfig");
const { getAccessToken, getRefreshToken } = require("../services/jwt.services");
const { resSend } = require("../lib/resSend");
const { AUTH, USTER_TYPE } = require("../lib/tableName");
// const { authDataModify } = require("../services/auth.services");





const MAX_AGE = 24 * 60 * 60 * 1000;


const login = async (req, res) => {

    try {
        if (!req.body.vendor_code || !req.body.password) {
            return resSend(res, false, 400, "MANDATORY_INPUTS_REQUIRED");
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


        const q1 = ` SELECT t1.vendor_code, t1.email, t1.user_type, t1.username, t1.password, t2.* FROM auth as t1 LEFT JOIN lfa1 AS t2 ON t1.vendor_code = t2.LIFNR WHERE t1.vendor_code = ?`
        const result = await query({ query: q1, values: [req.body.vendor_code] });

        console.log("result", result);

        if (!result.length) {

            return resSend(res, false, 404, "USER_NOT_FOUND");
        }

        if (req.body.password !== result[0]["password"]) {
            console.log("!compareHash(req.body.password,  result[0].password))", result[0]["password"]);
            return resSend(res, false, 401, "INCORRECT_PASSWORD");
        }

        // commented because of previously use role base access. now no need 
        // const user = result && result?.length ? authDataModify(result)[0] : {};


        // deleting password from response
        delete result[0]["password"];

        const user = {
            user : {
                name: result[0].NAME1,
                ...result[0],
            }
        }

        console.log("user", user);

        const payload = {
            username: user.user.username,
            vendor_code: user.user.vendor_code,
            user_type: user.user.user_type,
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


module.exports = { login };
