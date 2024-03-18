const { getEpochTime } = require("../lib/utils");

/*
* Modify WBS payload object to insert data
* @param {Object} payload
* @param {string} status
* @returns Object
*/
// const wbsPayload = (payload) => {

// const payloadObj = {
// EBELN: payload.EBELN,
// EBELP: payload.EBELP ? payload.EBELP : null,
// WBS_ELEMENT: payload.WBS_ELEMENT,
// NETWORK: payload.NETWORK ? payload.NETWORK : null
// }

// return payloadObj;
// }


const wbsPayload = async (payload) => {
    console.log("payyyyyy", payload);
    if (!payload || !Array.isArray(payload) || !payload.length) {
        throw new Error("Please send valid payload");
    }
    const pl = payload.map((obj) => ({
        C_PKEY: `${obj.EBELN}-${obj.EBELP}`,
        EBELN: obj.EBELN,
        EBELP: obj.EBELP,
        WBS_ELEMENT: obj.WBS_ELEMENT || null,
        NETWORK: obj.NETWORK || null
    }));
    return pl;
};

module.exports = { wbsPayload }