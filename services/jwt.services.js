
const jwt = require('jsonwebtoken');
const { resSend } = require('../lib/resSend');
const { query } = require('../config/dbConfig');
require("dotenv").config();
const { storeRefreshToken } = require('./token.services')
const apiAccessList = require("../lib/apiList");
const basicAuth = require('express-basic-auth');
;
// const ACCESS_TOKEN_SECRET = "accessTopSecret";
// const REFRESH_TOKEN_SECRET = "refreshTopSecret";

const TOKEN_ISSUER = "KAMAL_RUIDAS";




/**
 * Access token issu
 * @param {Object} payload 
 * @param {string} accessTokenValidity 
 * @returns string | null
 */

const getAccessToken = (payload, accessTokenValidity) => {

    try {

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: accessTokenValidity || '30m',
            subject: payload.username,
            issuer: TOKEN_ISSUER
        })

        return accessToken;

    } catch (error) {

        return null
    }

}


/**
 * REFRESH TOKEN ISSUER
 * @param {Object} payload 
 * @param {string} refreshTokenValidity 
 * @returns string | null
 */

const getRefreshToken = (payload, refreshTokenValidity) => {


    try {

        const refreshToken = jwt.sign({ username: payload.username }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: refreshTokenValidity || '1h',
            subject: payload.username,
            issuer: TOKEN_ISSUER
        })

        //  storeRefreshToken(refreshToken, payload.username);

        return refreshToken;

    } catch (error) {

        console.log("Refresh token error", error)
        return null;

    }


}


/**
 * verify access token
 * @param {string} token 
 * @returns boolean | null
 */
const getVerifiedAccessTokenData = (token) => {

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decode;
    } catch (err) {
        return null;
    }
}


/**
 * 
 * @param {Object} data 
 * @returns data | null
 */
const veifyAccessTokenRole = async (data) => {

    const userRoleVeifiy = `SELECT * FROM auth WHERE username = "${data.username}" AND user_type = ${data.user_type}`;
    const result = await query({ query: userRoleVeifiy, values: [] });

    if (result && result?.length) {
        return result
    }
    return null;
}

/**
 * Requested person api access
 * @param {Object} data 
 * @param {string} reqUrl 
 * @returns boolean
 */
const hasapiAccessList = (data, reqUrl) => {

    const roleAccess = apiAccessList[data.user_type];

    // FOR ALL ACCESS ROLE ADMIN
    if (data?.user_type == 5 || data?.user_type == "5") return true;

    return roleAccess.includes((url) => url === reqUrl);
}



/**
 * veifyAccessToken
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 * @returns nextMiddleware | error
 */

const veifyAccessToken = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) return resSend(res, false, 400, "NO_TOKEN_FOUND");

        const tokenData = getVerifiedAccessTokenData(token);

        if (!tokenData) return resSend(res, false, 401, "INVALID_EXPIRED_TOKEN");

        // const validRole = await veifyAccessTokenRole(tokenData);
        // if (!validRole) return resSend(res, false, 401, "Access Denied: YOU DONT HAVE ACCESS");

        req["tokenData"] = tokenData;

        next();

    } catch (error) {

        console.log("verifyAccess token", error);

        return resSend(res, false, 500, "INTERNAL_SERVER_ERROR_VERIFY_TOKEN");

    }
}

/**
 * verifyOnlyAccessToken
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 * @returns nextMiddleware | error
 */
const verifyOnlyAccessToken = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) return resSend(res, false, 400, "NO_TOKEN_FOUND");


        const tokenData = getVerifiedAccessTokenData(token);

        if (!tokenData) return resSend(res, false, 401, "INVALID_EXPIRED_TOKEN");

        req["tokenData"] = tokenData;

        next();

    } catch (error) {

        console.log("verifyAccess token", error);

        return resSend(res, false, 500, "INTERNAL_SERVER_ERROR_VERIFY_TOKEN");

    }
}

/**
 * authorizeRoute checking
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 * @returns nextMiddleware | error
 */
const authorizeRoute = async (req, res, next) => {

    const targetRoute = req.originalUrl;
    const userRole = req.tokenData?.user_type;
    const isAllowed = isRouteAllowedForRole(userRole, targetRoute);
    if (!isAllowed) return resSend(res, false, 403, "NO API ACCESS");

    next();
}

/**
 * checking the user role which is store in the token
 * @param {number} role 
 * @param {string} targetRoute 
 * @returns boolean
 */

function isRouteAllowedForRole(role, targetRoute) {
    // ADMIN ACCESS ALL ROUTE
    if (role == 5 || role == "5") return true;

    const allowedRoutes = apiAccessList[role];
    if (allowedRoutes) {
        for (const route of allowedRoutes) {
            const routeParts = route.split('/');
            const targetRouteParts = targetRoute.split('/');

            if (routeParts.length === targetRouteParts.length) {
                let isMatch = true;

                for (let i = 0; i < routeParts.length; i++) {
                    if (routeParts[i] !== targetRouteParts[i] && !routeParts[i].startsWith(':')) {
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch) {
                    return true;
                }
            }
        }
    }

    return false;
}


// Middleware for Basic Authentication
const basicAuthVerification = basicAuth({
    users: { [process.env.SAP_API_AUTH_USERNAME]: process.env.SAP_API_AUTH_PASSWORD }, 
    challenge: true,
    unauthorizedResponse: 'Unauthorized'
});


module.exports = { getAccessToken, getRefreshToken, veifyAccessToken, verifyOnlyAccessToken, authorizeRoute, basicAuthVerification };