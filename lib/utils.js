const { UPDATE, INSERT, USER_TYPE_VENDOR } = require("./constant");
const { query } = require("../config/dbConfig");
const Message = require("../utils/messages");
const { getQuery } = require("../config/pgDbConfig");


/**
 * CREATE QUERY FOR
 * @param {string} action
 * @param {string} tableName
 * @param {Object} dataObject
 * @param {Object} whereConditionObj
 * @returns {Object} { q:string, val: [] }
 */
// const generateQuery = (action, tableName, dataObject, whereCondition = "") => {

//   if (!action || !tableName || !dataObject || !Object.keys(dataObject).length) {
//     throw new Error(Message.VALID_PARAMETER);
//   }
//   // if (action == UPDATE && !whereCondition) {
//   //   throw new Error(Message.SEND_VALID_CONDITION_TEXT);
//   // }

//   console.log("action - ------------------>", action, whereCondition);

//   const setVauesVariables = [];
//   const updateValues = Object.values(dataObject);
//   let q = "";

//   if (action === UPDATE) {
//     const updateFields = Object.keys(dataObject).map((key, i) => `${key} = $${i + 1}`);
//     q = `UPDATE  ${tableName} SET (${updateFields.join(", ")}) WHERE ${whereCondition}`;
//   } else if (action === INSERT) {
//     const insertFields = Object.keys(dataObject).map((key, i) => {
//       setVauesVariables.push(`$${i + 1}`);
//       return `${key}`;
//     });
//     q = `INSERT INTO ${tableName} (${insertFields.join(", ")}) VALUES (${setVauesVariables.join(", ")}) RETURNING *`;
//   }
//   return { q, val: [...updateValues] };
// }


const generateQuery = (action, tableName, dataObject, conditonDataObj = {}) => {

  if (!action || !tableName || !dataObject || !Object.keys(dataObject).length) {
    throw new Error("Message.VALID_PARAMETER");
  }

  const setVauesVariables = [];
  let updateValues = Object.values(dataObject);
  let q = "";

  if (action === UPDATE) {
    const updateFields = Object.keys(dataObject).map((key, i) => `${key} = $${i + 1}`);
    let condQuery = "";
    if (Object.keys(conditonDataObj).length > 0) {
      condQuery += " WHERE 1 = 1"
      const conditions = Object.keys(conditonDataObj).map((key, index) => {
        return ` AND ${key} = $${index + 1 + Object.keys(dataObject).length}`;
      });
      condQuery += conditions.join(" ");
    }

    updateValues = [...updateValues, ...Object.values(conditonDataObj)]
    q = `UPDATE  ${tableName} SET ${updateFields.join(", ")} ${condQuery}`;
  } else if (action === INSERT) {
    const insertFields = Object.keys(dataObject).map((key, i) => {
      setVauesVariables.push(`$${i + 1}`);
      return `${key}`;
    });
    q = `INSERT INTO ${tableName} (${insertFields.join(", ")}) VALUES (${setVauesVariables.join(", ")}) RETURNING *`;
  }
  return { q, val: [...updateValues] };
}


// function generateQuery(action, tableName, updateObject, whereCondition = "") {
//   const updateFields = Object.keys(updateObject).map((key, i) => `${key} = $${i+1}`);
//   const updateValues = Object.values(updateObject);
//   let q = "";

//   if (!action || !tableName || !updateObject)
//     throw Error("please send valid parameters !!!");
//   if (action === UPDATE && !whereCondition)
//     throw Error("please send whereCondition !!!");

//   if (action == UPDATE) {
//     q = `UPDATE ${tableName} SET ${updateFields.join(
//       ", "
//     )} WHERE ${whereCondition};`;
//   } else if (action == INSERT) {
//     q = `INSERT INTO ${tableName} ${updateFields.join(", ")} RETURNING *`;
//   }
//   return { q, val: [...updateValues] };
// }

/////////

async function generateQueryArray(action, tableName, payloadObj) {
  if (!action || !tableName || !payloadObj)
    throw Error("please send valid parameters !!!");
  if (action === UPDATE && !whereCondition)
    throw Error("please send whereCondition !!!");

  // query constract of insert field
  console.log("payloadObj", payloadObj);
  let setQ = "( ";
  const updateFields = Object.keys(payloadObj[0]).map((key) => ` ${key}`);
  setQ = setQ.concat(updateFields).concat(" )");

  let q = `INSERT INTO ${tableName} ${setQ} VALUES ?`;

  // value constract
  const val = payloadObj.map((obj) => Object.values(obj));
  return { q, val };
}

const queryArrayTOString = async (Query, user_type) => {
  console.log(Query, "Query");

  console.log("user_type", user_type);
  const Arr = await getQuery({ query: Query, values: [] });
  let str = "";
  console.log("---->", Arr);

  if (Arr.length) {
    Arr.forEach((item) => {
      // str += "'" + item.EBELN + "',";
      // str = str.concat("'");
      // str = str.concat(`${item.EBELN } || ${item.purchasing_doc_no }`);
      // str = str.concat("'");
      const poNo = item.EBELN || item.purchasing_doc_no;

      console.log("item", item);
      str = str.concat("'").concat(`${poNo}`).concat("'").concat(",");
    });
  }
  //    if (user_type == USER_TYPE_VENDOR || user_type == 4) {
  //         await Promise.all(
  //             Arr.map(async (item) => {
  //                 str += "'" + item.EBELN + "',";
  //             })
  //         );
  //    } else {
  //         await Promise.all(
  //             Arr.map(async (item) => {
  //                 str += "'" + item.purchasing_doc_no + "',";
  //             })
  //         );
  //     }
  console.log("str", str);
  str = str.slice(0, -1);

  return str;
};

/**
 * GET CURRENT EPOCH TIME
 * @returns new Date().getTime()
 */
const getEpochTime = () => new Date().getTime();


function pad(number) {
  return number.toString().padStart(2, '0');
}

function getDateString(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();

    const paddedMonth = pad(month);
    const paddedDay = pad(day);

    return `${year}${paddedMonth}${paddedDay}`;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}


const getYyyyMmDd = (dateTime) => {
  try {
    let v1 = dateTime.toString();
    const val = v1.length == 10 ? parseInt(v1) * 1000 : parseInt(v1);
    const date = new Date(val);
    // const date = new Date(dateTime); // dateTime/1000; //
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  } catch (err) {
    console.log(err);
    return "00000000";
  }
};
function formatDate(inputDate) {
  if (!inputDate || typeof inputDate !== "string" || inputDate.length < 8) {
    return null; // Return null if the input date is not provided or has less than 8 characters
  }

  // Convert the input date string to a Date object
  const year = inputDate.slice(0, 4);
  const month = inputDate.slice(4, 6);
  const day = inputDate.slice(6, 8);

  const dateObject = new Date(`${year}-${month}-${day}`);

  if (isNaN(dateObject.getTime())) {
    return null; // Return null for an invalid date
  }

  const formattedDate = dateObject.toISOString().split("T")[0];

  return formattedDate;
}

function formatTime(inputTime) {
  if (!inputTime || typeof inputTime !== "string" || inputTime.length < 6) {
    return null;
  }

  // Extract hours, minutes, and seconds components
  const hours = inputTime.slice(0, 2);
  const minutes = inputTime.slice(2, 4);
  const seconds = inputTime.slice(4, 6);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    console.log("inputTime -2", inputTime);
    return null; // Return null for an invalid time
  }

  // Convert to hh:mm:ss format
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  console.log("inputTime -1 formattedTime", inputTime, formattedTime);
  return formattedTime;
}

/**
 *  generateQueryForMultipleData function
 * @param {Array} array
 * @param {String} tableName
 * @param {String} pk
 * @returns String
 */

// async function generateQueryForMultipleData(array, tableName, pk) {
//   if (!array || !Array.isArray(array) || !array.length || !pk) {
//     throw new Error("Invalid payload or parameter, please check the function");
//   }

//   let inserQ = `INSERT INTO  ${tableName} `;
//   const columnArr = Object.keys(array[0]);
//   const columnLen = columnArr.length - 1;

//   // COLUMNS
//   let column = "(";
//   Object.keys(array[0]).forEach((ele, i) => {
//     column = column.concat(` ${ele}`);
//     if (i != columnLen) {
//       column = column.concat(",");
//     }
//     if (i == columnLen) {
//       column = column.concat(")");
//     }
//   });

//   inserQ = inserQ.concat(column);
//   inserQ = inserQ.concat(" VALUES ");

//   // VALUES
//   let value = "";
//   const arrayLen = array.length - 1;
//   const val = array.forEach((el, len) => {
//     value = value.concat("(");
//     const valueLen = Object.keys(el).length - 1;

//     Object.keys(el).forEach((val, keyLen) => {
//       if (typeof el[val] === "number") {
//         value = value.concat(` ${el[val]}`);
//       } else if (typeof el[val] === "string") {
//         value = value.concat(` '${el[val]}'`);
//       } else {
//         value = value.concat(` ${el[val]}`);
//       }

//       if (keyLen != valueLen) {
//         value = value.concat(",");
//       }
//     });

//     value = value.concat(")");

//     if (len != arrayLen) {
//       value = value.concat(", ");
//     }
//   });

//   inserQ = inserQ.concat(value);

//   inserQ = inserQ.concat(" ON DUPLICATE KEY UPDATE ");

//   // UPDATE VALUES

//   const columnArrWithOutPK = columnArr.filter((col) => col != pk);
//   const columnArrWithOutPKLen = columnArrWithOutPK.length - 1;

//   let updateKeys = "";
//   columnArrWithOutPK.forEach((u_key, j) => {
//     updateKeys = updateKeys.concat(` ${u_key} = VALUES (${u_key})`);
//     if (j != columnArrWithOutPKLen) {
//       updateKeys = updateKeys.concat(",");
//     }
//   });
//   inserQ = inserQ.concat(updateKeys);

//   return inserQ;
// }



async function generateQueryForMultipleData(array, tableName, multiplePKs) {
  if (!array || !Array.isArray(array) || !array.length || !multiplePKs) {
    throw new Error("Invalid payload or parameter, please check the function");
  }

  const columnArr = Object.keys(array[0]);
  let valuesArray = array.map(item => Object.values(item));
  const allValues = valuesArray.flat();

  const column = valuesArray.map(
    (row, i) => `(${row.map((_, j) => `$${i * row.length + j + 1}`).join(', ')})`
  ).join(', ');

  let queryText =
    `INSERT INTO ${tableName} (${columnArr.join(', ')})
    VALUES ${column}`;

  queryText += ` ON CONFLICT `;
  const conflictKeys = multiplePKs.join(", ");
  queryText += `( ${conflictKeys} )`;
  const columnArrWithOutPK = columnArr.filter((col) => !multiplePKs.includes(col));
  const columnArrWithOutPKLen = columnArrWithOutPK.length - 1;
  queryText += ` DO UPDATE SET `;
  let updateKeys = "";
  columnArrWithOutPK.forEach((u_key, j) => {
    updateKeys += ` ${u_key} = EXCLUDED.${u_key}`;
    if (j != columnArrWithOutPKLen) {
      updateKeys += ",";
    }
  });
  queryText += updateKeys;

  return { q: queryText, val: allValues };
}



/**
 *  generateInsertUpdateQuery function
 * @param {Array} array
 * @param {String} tableName
 * @param {String} pk
 * @returns String
 */

// async function generateInsertUpdateQuery(obj, tableName, pk, multiplePKs) {
//   if (!obj || typeof obj !== "object" || !Object.keys(obj)?.length || !pk) {
//     throw new Error("Invalid payload or parameter, please check the function");
//   }
//   let inserQ = `INSERT INTO  ${tableName} `;
//   const columnArr = Object.keys(obj);
//   const columnLen = columnArr.length - 1;

//   // COLUMNS
//   let column = "(";
//   columnArr.forEach((ele, i) => {
//     column = column.concat(` ${ele}`);
//     if (i != columnLen) {
//       column = column.concat(",");
//     }
//     if (i == columnLen) {
//       column = column.concat(")");
//     }
//   });

//   inserQ = inserQ.concat(column);
//   inserQ = inserQ.concat(" VALUES ");

//   // VALUES
//   let value = "(";

//   Object.keys(obj).forEach((val, keyLen) => {
//     if (typeof obj[val] === "number") {
//       value = value.concat(` ${obj[val]}`);
//     } else if (typeof obj[val] === "string") {
//       value = value.concat(` '${obj[val]}'`);
//     } else {
//       value = value.concat(` ${obj[val]}`);
//     }

//     if (keyLen != columnLen) {
//       value = value.concat(",");
//     }
//   });

//   value = value.concat(" )");

//   inserQ = inserQ.concat(value);

//   inserQ = inserQ.concat(" ON DUPLICATE KEY UPDATE ");
//   // UPDATE VALUES

//   const columnArrWithOutPK = columnArr.filter((col) => col != pk);
//   const columnArrWithOutPKLen = columnArrWithOutPK.length - 1;

//   let updateKeys = "";
//   columnArrWithOutPK.forEach((u_key, j) => {
//     updateKeys = updateKeys.concat(` ${u_key} = VALUES (${u_key})`);
//     if (j != columnArrWithOutPKLen) {
//       updateKeys = updateKeys.concat(",");
//     }
//   });
//   inserQ = inserQ.concat(updateKeys);

//   return inserQ;
// }


// async function generateInsertUpdateQuery(obj, tableName, multiplePKs) {
//   if (!obj || typeof obj !== "object" || !Object.keys(obj)?.length) {
//     throw new Error("Invalid payload or parameter, please check the function");
//   }
//   let inserQ = `INSERT INTO  ${tableName} `;
//   const columnArr = Object.keys(obj);
//   const columnLen = columnArr.length - 1;

//   // COLUMNS
//   let column = "(";
//   columnArr.forEach((ele, i) => {
//     column = column.concat(` ${ele}`);
//     if (i != columnLen) {
//       column = column.concat(",");
//     }
//     if (i == columnLen) {
//       column = column.concat(")");
//     }
//   });

//   inserQ = inserQ.concat(column);
//   inserQ = inserQ.concat(" VALUES ");

//   // VALUES
//   let value = "(";

//   Object.keys(obj).forEach((val, keyLen) => {
//     if (typeof obj[val] === "number") {
//       value = value.concat(` ${obj[val]}`);
//     } else if (typeof obj[val] === "string") {
//       value = value.concat(` '${obj[val]}'`);
//     } else {
//       value = value.concat(` ${obj[val]}`);
//     }

//     if (keyLen != columnLen) {
//       value = value.concat(",");
//     }
//   });

//   value = value.concat(" )");

//   inserQ = inserQ.concat(value);

//   inserQ = inserQ.concat(" ON CONFLICT");
//   const conflictKeys = multiplePKs.join(", ");
//   // UPDATE VALUES
//   inserQ = inserQ.concat(`( ${conflictKeys})`);
//   const columnArrWithOutPK = columnArr.filter((col) => !multiplePKs.includes(col));
//   const columnArrWithOutPKLen = columnArrWithOutPK.length - 1;

//   inserQ = inserQ.concat(" DO UPDATE SET ");

//   let updateKeys = "";
//   columnArrWithOutPK.forEach((u_key, j) => {
//     updateKeys = updateKeys.concat(` ${u_key} = EXCLUDED.${u_key}`);
//     if (j != columnArrWithOutPKLen) {
//       updateKeys = updateKeys.concat(",");
//     }
//   });
//   inserQ = inserQ.concat(updateKeys);

//   return inserQ;
// }
async function generateInsertUpdateQuery(obj, tableName, multiplePKs) {
  if (!obj || typeof obj !== "object" || !Object.keys(obj)?.length) {
    throw new Error("Invalid payload or parameter, please check the function");
  }

  const columnArr = Object.keys(obj);
  let valuesArray = Object.values(obj);
  allValues = valuesArray;
  const column = valuesArray.map((key, i) => `$${i + 1}`).join(", ");
  let queryText =
    `INSERT INTO ${tableName} (${columnArr.join(', ')})
  VALUES ( ${column} )`;

  queryText += ` ON CONFLICT `;
  const conflictKeys = multiplePKs.join(", ");
  queryText += `( ${conflictKeys} )`;
  const columnArrWithOutPK = columnArr.filter((col) => !multiplePKs.includes(col));
  const columnArrWithOutPKLen = columnArrWithOutPK.length - 1;
  queryText += " DO UPDATE SET ";
  let updateKeys = "";
  columnArrWithOutPK.forEach((u_key, j) => {
    updateKeys += ` ${u_key} = EXCLUDED.${u_key}`;
    if (j != columnArrWithOutPKLen) {
      updateKeys += ",";
    }
  });
  queryText += updateKeys;

  return { q: queryText, val: allValues };
}


async function generalErrorLog(error, source, error_stack) {
  try {
    const paylaod = {
      error_stack,
      source,
      error_message: JSON.stringify(error),
      created_at: getEpochTime(),
    };

    const { q, val } = generateQuery(INSERT, "general_error_log", paylaod);

    console.log("qqq", q, val);

    const response = await query({ query: q, values: val });
  } catch (error) {
    console.log("generalErrorLog function error");
  }
}

/**
 * getDateTime
 * return { dateTime, data} Object
 * date time format : YYYY-MM-DD HH:MM:SS
 * date format : YYYY-MM-DD
 * @returns { dateTime, date}
 */
function getDateTime(currentData) {
  let now = currentData || new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hour.toString().length == 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    second = '0' + second;
  }
  var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  const date = year + '-' + month + '-' + day

  return { dateTime, date };
}

module.exports = {
  formatDate,
  formatTime,
  generateQuery,
  generateQueryArray,
  getEpochTime,
  getYyyyMmDd,
  queryArrayTOString,
  generateQueryForMultipleData,
  generateInsertUpdateQuery,
  generalErrorLog,
  getDateString,
  getDateTime
};
