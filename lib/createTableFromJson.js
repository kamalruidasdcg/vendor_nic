const { query } = require("../config/dbConfig");

async function createTable(payload) {
  let data= payload.schema;
  try {
    const obj = {
      CHAR: "varchar",
      CURR: "varchar",
      UNIT: "varchar",
      CUKY: "varchar",
      LANG: "varchar",
      FLTP: "varchar",
      NUMC: "int",
      QUAN: "decimal",
      INT4: "int",
      INT2: "int",
      BIGINT: "bigint",
      DATS: "date",
      TIMS: "time",
      TEXT: "text",
      DEC: "decimal"
    };

    if(!data.length) return;

    const len = data.length - 1;
    let str  = "";
    // for (let i = 0; i <= len; i++) {
    //  str += ` "${data[i].Field_name.toLowerCase()}" : obj.${data[i].Field_name.toLowerCase()} || obj.${data[i].Field_name} || "",`;
    // }


    let q = `CREATE TABLE ${payload.tableName} ( `;

    console.log("len", len);

    for (let i = 0; i <= len; i++) {
      let fieldName = data[i].Field_name;
      let defaultValue = ` "" `;
      let dataType = obj[data[i].Datatype];
      const Length = parseInt(data[i].Length);
      if (fieldName && Length && dataType) {
        fieldName = fieldName.toLowerCase();
        let dataLen = `(${Length})`;
        if (dataType == "varchar" && parseInt(Length) > 255) {
          dataType = "text";
        }
        if (dataType == "int" && parseInt(Length) > 10) {
          dataType = "bigint";
          defaultValue = null;
        }
        if (dataType == "decimal") {
          dataLen = `(${Length}, 3)`;
          defaultValue = null;
        }
        if (dataType === "date" || dataType === "time") {
          dataLen = ""; 
          defaultValue = null;
        }
        if (dataType === "text") {
          dataLen = ""; 
          defaultValue = "";
        }

        if(dataType === "text" || dataType == "varchar") {
          defaultValue = ` "" `;
        }

        console.log("defaultValue", defaultValue);

        q = q
          .concat(` ${fieldName}`)
          .concat(` ${dataType}${dataLen}`)
          .concat(" NULL")
          .concat(` COMMENT "${data[i].Domain_text || "" }"`);
        if (i != len) {
          q = q.concat(",");
        }
      
  

     str += ` "${data[i].Field_name.toLowerCase()}" : obj.${data[i].Field_name.toLowerCase()} || obj.${data[i].Field_name} || ${defaultValue},`;


      }
      if (i == len) {
        q = q.concat(")");
      }
    }


    console.log("--query--> ",q);
    console.log("--payload--> ",str);
    const resp = await query({ query: q, values: [] })

    return { resp, q, str };
  } catch (error) {
    console.log("create table function error ---- x - x - x ---", error);
  }
}


module.exports = { createTable };
// createTable().then((val) => console.log(val)).catch((err) => console.log(err))
