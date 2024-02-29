const { query } = require("../config/dbConfig");

async function createTable() {
  let data= []
  try {
    const obj = {
      CHAR: "varchar",
      CURR: "varchar",
      UNIT: "varchar",
      CUKY: "varchar",
      LANG: "varchar",
      FLTP: "varchar",
      NUMC: "int",
      QUAN: "int",
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
    for (let i = 0; i <= len; i++) {
     str += ` "${data[i].Field_name}" : obj.${data[i].Field_name} || null,`;
    }




    let q = "CREATE TABLE qals ( ";

    console.log("len", len);

    for (let i = 0; i <= len; i++) {
      const fieldName = data[i].Field_name;
      let dataType = obj[data[i].Datatype];
      const Length = parseInt(data[i].Length);
      if (fieldName && Length && dataType) {
        let dataLen = `(${Length})`;
        if (dataType == "varchar" && parseInt(Length) > 255) {
          dataType = "text";
        }
        if (dataType == "int" && parseInt(Length) > 10) {
          dataType = "bigint";
        }
        if (dataType == "decimal") {
          dataLen = `(${Length}, 2)`
        }
        if (
          dataType === "date" ||
          dataType === "time" ||
          dataType === "text"
        ) {
          dataLen = "";
        }
        q = q
          .concat(` ${fieldName}`)
          .concat(` ${dataType}${dataLen}`)
          .concat(" NULL")
          .concat(` COMMENT "${data[i].Domain_text || "" }"`);
        if (i != len) {
          q = q.concat(",");
        }
      }
      if (i == len) {
        q = q.concat(")");
      }
    }


    console.log("--query--> ",q);
    console.log("--payload--> ",str);


    return await query({ query: q, values: [] });
  } catch (error) {
    console.log("err", error);
  }
}


module.exports = { createTable };
// createTable().then((val) => console.log(val)).catch((err) => console.log(err))
