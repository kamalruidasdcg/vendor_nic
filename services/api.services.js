const { query } = require("../config/dbConfig");
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

        await saveLogInDb(req.ip, req.originalUrl, req.method, res.statusCode, body, "apilog" );

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

async function saveLogInDb(source="", req_url="", req_method="", status_code="", msg="", stack="") {
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