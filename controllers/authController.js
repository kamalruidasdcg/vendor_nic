// const roles = require("../constants/roles");
// const {
//     generateSalt,
//     getHashedText,
//     compareHash,
// } = require("../services/crypto.services");


const { query } = require("../db/dbConfig");
const { getAccessToken, getRefreshToken } = require("../services/jwt.services");
const { resSend } = require("../lib/resSend");
const { AUTH, USTER_TYPE } = require("../lib/tableName");
const { authDataModify } = require("../services/auth.services");





const MAX_AGE = 24 * 60 * 60 * 1000;


const login = async (req, res) => {

    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    try {
        if (!req.body.username || !req.body.password) {
            return resSend(res, false, 400, "MANDATORY_INPUTS_REQUIRED");
        }

        // const userQuery = `SELECT * FROM ${AUTH} WHERE username = "${req.body.username}"`;

        // const userFoundQuery = `SELECT * FROM auth JOIN user_type ON auth.user_type = user_type.id JOIN  user_role ON user_role.user_type_id = user_type.id WHERE auth.username = "${req.body.username}"`


        const q1 = `SELECT
        auth.auth_id AS "auth.auth_id",
        auth.user_type AS "auth.user_type",
        auth.username AS "auth.username",
        auth.password AS "auth.password",
        auth.name AS "auth.name",
        auth.email AS "auth.email",
        auth.vendor_id AS "auth.vendor_id",
        auth.datetime AS "auth.datetime",
        auth.last_login_time AS "auth.last_login_time",
        user_type.id AS "user_type.id",
        user_type.user_type AS "user_type.user_type",
        user_type.created_at AS "user_type.created_at",
        user_type.updated_at AS "user_type.updated_at",
        user_role.user_type_id AS "user_role.user_type_id",
        user_role.ven_bill_submit AS "user_role.ven_bill_submit",
        user_role.ven_bill_show AS "user_role.ven_bill_show",
        user_role.ven_bill_edit AS "user_role.ven_bill_edit",
        user_role.ven_bill_received AS "user_role.ven_bill_received",
        user_role.ven_bill_certified AS "user_role.ven_bill_certified",
        user_role.ven_bill_forward AS "user_role.ven_bill_forward"
    FROM auth
    JOIN user_type ON auth.user_type = user_type.id
    JOIN user_role ON user_role.user_type_id = user_type.id
    WHERE auth.username = "${req.body.username}"`;


        console.log("q1", q1)


        const result = await query({ query: q1, values: [] });

        const user = result && result?.length ? authDataModify(result)[0] : {};

        console.log("user", user);

        if (!user?.user?.username)
            return resSend(res, false, 404, "USER_NOT_FOUND");

        if (req.body.password !== user.user.password) {
            console.log("!compareHash(req.body.password,  user.user.password)", user.user.password);
            return resSend(res, false, 401, Messages.INCORRECT_PASSWORD);
        }

        const payload = {
            username: user.user.username,
            user_type: user.user.user_type,
            user_type_name: user.user_type.user_type
        };

        const ACCESS_TOKEN_VALIDITY = "30m";
        const REFRESH_TOKEN_VALIDITY = "30m";

        const accessToken = getAccessToken(payload, ACCESS_TOKEN_VALIDITY);
        const refreshToken = getRefreshToken(payload, REFRESH_TOKEN_VALIDITY);

        if (!accessToken || !refreshToken)
            return resSend(res, false, 500, "TOKEN_GENERATION_ERROR");


        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: MAX_AGE
        });



        return resSend(res, true, 200, "USER_AUTHENTICATION_SUCCESS", user, { accessToken, refreshToken });
    } catch (error) {
        console.log("LOGIN ERROR", error);

        return resSend(res, false, 500, "INTERNAL_SERVER_ERROR");
    }
};


module.exports = { login };
