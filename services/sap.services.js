const { getEpochTime } = require("../lib/utils");


/**
 * Modify SDBG Payload object to insert data
 * @param {Object} payload 
 * @param {string} status 
 * @returns Object
 */

exports.zfi_bgm_1_Payload = async (payload) => {
    console.log("456yujk5tyj");
    console.log(payload);

    // "FILE_NO": "payload.FILE_NO2",
    // "BANKERS_NAME": "payload.BANKERS_NAME",
    // "BANKERS_ADD1": "payload.BANKERS_ADD1",
    // "BANKERS_ADD2": "payload.BANKERS_ADD2"
    return payload.map((obj) => (
        {
            "FILE_NO": (obj.FILE_NO) ? obj.FILE_NO : null,
            "BANKERS_NAME": (obj.BANKERS_NAME) ? obj.BANKERS_NAME : null
        }
    ));

    // const payloadObj = {}
    // Object.keys(payload).forEach
    // Object.keys(payload).forEach((key) => {
    //     payloadObj[key] = payload[key] ? payload[key] : null
    // });

    // // console.log("payloadObj");
    // // console.log(payloadObj);


    // return payloadObj;
}

