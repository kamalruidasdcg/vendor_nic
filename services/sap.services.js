const { getEpochTime } = require("../lib/utils");


/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */

exports.zfi_bgm_1_Payload = async (payload) => {
    const payloadObj = {}
   // Object.keys(payload).forEach
    Object.keys(payload).forEach((key) => {
        payloadObj[key] = payload[key] ? payload[key] : null
    });
  
    // console.log("payloadObj");
    // console.log(payloadObj);
   

    return payloadObj;
}

