const { query } = require("../config/pgDbConfig");
const { INSERT } = require("../lib/constant");
const { generateQuery, getEpochTime } = require("../lib/utils");


const apiLog = async (req, res, next) => {

    if (req.method === 'POST' || req.method === 'PUT') {
        // console.log('Req Body: ', req.body);
    }
    const originalSend = res.send;
    res.send = async function (body) {
        // Log response status code
        res.send = originalSend;
        const jsonBody = JSON.parse(body);
        // console.log(jsonBody);
        // console.log(jsonBody.message);
        // console.log(jsonBody.data);
        const msg = res.statusCode >= 200 && res.statusCode < 300 ? jsonBody.message : jsonBody.data;
        console.log("msg", msg);
        await saveLogInDb(req.ip, req.originalUrl, req.method, res.statusCode, msg, "apilog");

        // console.log(
        //     `Request from : ${req.ip},
        //      Request path : ${req.path},
        //      Request url : ${req.originalUrl},
        //      Request method : ${req.method},
        //      Response status code : ${res.statusCode},
        //      Response obj : ${body}`);

        return res.send(body);
    };
    next();
}

async function saveLogInDb(source = "", req_url = "", req_method = "", status_code = "", msg = "", stack = "") {
    const logPaylaod = {
        source,
        req_url,
        req_method,
        status_code,
        msg,
        stack,
        created_at: getEpochTime()
    }
    try {
        const { q, val } = generateQuery(INSERT, 'generic_log', logPaylaod);
        // console.log(q, val);
        await query({ query: q, values: val });
    } catch (error) {
        console.log("saveLogInDb", error);
    }
}


module.exports = { apiLog }