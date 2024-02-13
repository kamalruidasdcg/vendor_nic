const { getEpochTime } = require("../lib/utils");

/*
* Modify WBS payload object to insert data
* @param {Object} payload 
* @param {string} status 
* @returns Object
*/
const wbsPayload = (payload) => {

    const payloadObj = {
        EBELN: payload.EBELN,
        EBELP: payload.EBELP ? payload.EBELP : null,
        WBS_ELEMENT: payload.WBS_ELEMENT,
        NETWORK: payload.NETWORK ? payload.NETWORK : null
    }

    return payloadObj;
}

module.exports = { wbsPayload }
