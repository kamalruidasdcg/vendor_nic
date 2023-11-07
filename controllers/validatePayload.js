
const tableStructure = {
    ekko: [
        { colName: "EBELN", length: 10, type: "string", isNull: false },
        { colName: "BUKRS", length: 4, type: "string", isNull: false },
        { colName: "BSTYP", length: 1, type: "string", isNull: false },
        { colName: "BSART", length: 4, type: "string", isNull: false },
        { colName: "LOEKZ", length: 1, type: "string", isNull: false },
        { colName: "AEDAT", length: 10, type: "string", isNull: false },
        { colName: "ERNAM", length: 12, type: "string", isNull: false },
        { colName: "LIFNR", length: 10, type: "string", isNull: false },
        { colName: "EKORG", length: 4, type: "string", isNull: false },
        { colName: "EKGRP", length: 3, type: "number", isNull: false },
    ],
};

const validatePayload = (tableName, obj) => {
    const validSchema = tableStructure[tableName];
    const notNullablePayload = validSchema.filter((collSchema) => collSchema.isNull === false)
    notNullablePayload

    let isValid = {
        status: true,
        msg: `VALID PAYLOAD ${JSON.stringify(validSchema)}`,
    };

    const objKeys = Object.keys(obj);

    if (notNullablePayload.length > objKeys.length || validSchema.length < objKeys.length) {
        return {
            status: false,
            msg: `INVALID OBJECT, DATA SHOULD BE IN VALID LENGTH ${JSON.stringify(validSchema)}`,
        };
    }

    for (let i = 0; i < objKeys.length; i++) {
        const tableCollIndex = validSchema.findIndex((coll) => coll.colName == objKeys[i]);

        if (tableCollIndex >= 0) {
            if ((validSchema[tableCollIndex].isNull === false && !obj[validSchema[tableCollIndex].colName])
                || (typeof obj[validSchema[tableCollIndex].colName] !== validSchema[tableCollIndex].type)) {


                isValid = {
                    status: false,
                    msg: `INVALID COLUMN TYPE COLL-> ${validSchema[tableCollIndex].colName}`,
                };
                break;
            } else if (
                (validSchema[tableCollIndex].isNull === false && !obj[validSchema[tableCollIndex].colName]) ||
                (typeof obj[validSchema[tableCollIndex].colName] == "string" &&
                    !(obj[validSchema[tableCollIndex].colName]?.length <= validSchema[tableCollIndex].length))
            ) {

                isValid = {
                    status: false,
                    msg: `INVALID DATA LENGTH IN COLL-> ${validSchema[tableCollIndex].colName}`,
                };
                break;
            } else if (
                (validSchema[tableCollIndex].isNull === false && !obj[validSchema[tableCollIndex].colName]) ||
                (typeof obj[validSchema[tableCollIndex].colName] == "number" &&
                    !(obj[validSchema[tableCollIndex].colName]?.toString()?.length <= validSchema[tableCollIndex].length))
            ) {

                isValid = {
                    status: false,
                    msg: `INVALID DATA LENGTH IN COLL-> ${validSchema[tableCollIndex].colName}`,
                };
                break;
            }


        } else {

            isValid = {
                status: false,
                msg: `INVALID OBJECT, DATA SHOULD BE ${JSON.stringify(validSchema)}`,
            };
            break;
        }

    }

    return isValid;
};

// const obj = {
//     EBELN: "1234567890",
//     BUKRS: "5788",
//     BSTYP: "S",
//     BSART: "ABCD",
//     LOEKZ: "W",
//     AEDAT: "06.11.2023",
//     ERNAM: "34567656787",
//     LIFNR: "1234567890",
//     EKORG: "1234",
//     EKGRP: 333,
//     // EKGRPF: "123",
// };

// const ff = validatePayload("ekko", obj);

module.exports = { validatePayload };
