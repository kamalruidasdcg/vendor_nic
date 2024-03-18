const { query } = require("../config/dbConfig");

async function createTable() {
  let data= [
    {
     "Field_name": "PRUEFLOS",
     "Datatype": "NUMC",
     "Length": 12,
     "Domain_text": "Inspection Lot Number"
    },
    {
     "Field_name": "KZART",
     "Datatype": "CHAR",
     "Length": 1,
     "Domain_text": "Inspection Lot, Partial Lot, Single Unit, Interval"
    },
    {
     "Field_name": "ZAEHLER",
     "Datatype": "CHAR",
     "Length": 6,
     "Domain_text": "Counter for Usage Decision"
    },
    {
     "Field_name": "VKATART",
     "Datatype": "CHAR",
     "Length": 1,
     "Domain_text": "Catalog"
    },
    {
     "Field_name": "VWERKS",
     "Datatype": "CHAR",
     "Length": 4,
     "Domain_text": "Plant"
    },
    {
     "Field_name": "VAUSWAHLMG",
     "Datatype": "CHAR",
     "Length": 8,
     "Domain_text": "Selected Set of the Usage Decision"
    },
    {
     "Field_name": "VCODEGRP",
     "Datatype": "CHAR",
     "Length": 8,
     "Domain_text": "Code Group of the Usage Decision"
    },
    {
     "Field_name": "VCODE",
     "Datatype": "CHAR",
     "Length": 4,
     "Domain_text": "Usage Decision Code"
    },
    {
     "Field_name": "VERSIONAM",
     "Datatype": "CHAR",
     "Length": 6,
     "Domain_text": "Version Number of the Selected Set Record"
    },
    {
     "Field_name": "VERSIONCD",
     "Datatype": "CHAR",
     "Length": 6,
     "Domain_text": "Version Number of the Code Record"
    },
    {
     "Field_name": "VBEWERTUNG",
     "Datatype": "CHAR",
     "Length": 1,
     "Domain_text": "Code Valuation"
    },
    {
     "Field_name": "DBEWERTUNG",
     "Datatype": "CHAR",
     "Length": 1,
     "Domain_text": "Dynamic Modif. Valuation According to Worst Case Principle"
    },
    {
     "Field_name": "VFOLGEAKTI",
     "Datatype": "CHAR",
     "Length": 8,
     "Domain_text": "Follow-Up Action"
    },
    {
     "Field_name": "QKENNZAHL",
     "Datatype": "DEC",
     "Length": 3,
     "Domain_text": "Quality Score"
    },
    {
     "Field_name": "LTEXTKZ",
     "Datatype": "CHAR",
     "Length": 1,
     "Domain_text": "Long Text for Usage Decision"
    },
    {
     "Field_name": "VNAME",
     "Datatype": "CHAR",
     "Length": 12,
     "Domain_text": "Person who Made the Usage Decision"
    },
    {
     "Field_name": "VDATUM",
     "Datatype": "DATS",
     "Length": 8,
     "Domain_text": "Date of Code Used for Usage Decision"
    },
    {
     "Field_name": "VEZEITERF",
     "Datatype": "TIMS",
     "Length": 6,
     "Domain_text": "Time when Usage Decision Was Recorded"
    },
    {
     "Field_name": "VAENAME",
     "Datatype": "CHAR",
     "Length": 12,
     "Domain_text": "Person who Changed the Usage Decision"
    },
    {
     "Field_name": "VAEDATUM",
     "Datatype": "DATS",
     "Length": 8,
     "Domain_text": "Change Date of Usage Decision"
    },
    {
     "Field_name": "VEZEITAEN",
     "Datatype": "TIMS",
     "Length": 6,
     "Domain_text": "Time when Usage Decision Changed"
    },
    {
     "Field_name": "STAFO",
     "Datatype": "CHAR",
     "Length": 6,
     "Domain_text": "Update group for statistics update"
    },
    {
     "Field_name": "TEILLOS",
     "Datatype": "NUMC",
     "Length": 6,
     "Domain_text": "Partial lot number"
    },
    {
     "Field_name": "VORGLFNR",
     "Datatype": "NUMC",
     "Length": 8,
     "Domain_text": "Current Node Number from Order Counter APLZL"
    }
   ]
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
    for (let i = 0; i <= len; i++) {
     str += ` "${data[i].Field_name.toLowerCase()}" : obj.${data[i].Field_name.toLowerCase()} || obj.${data[i].Field_name} || null,`;
    }




    let q = "CREATE TABLE qave ( ";

    console.log("len", len);

    for (let i = 0; i <= len; i++) {
      let fieldName = data[i].Field_name;
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
        }
        if (dataType == "decimal") {
          dataLen = `(${Length}, 3)`
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
