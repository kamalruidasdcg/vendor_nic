const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {query} = require("../../config/dbConfig");
const { resSend } = require("../../lib/resSend");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// exports.auth = async (req, res) => {
//   const { username, password } = req.body;

//   let sql = `SELECT * FROM auth WHERE username= '${username}' and password='${password}'`;
//   const result = await query({
//     query: sql,
//     values: [],
//   });
//   if (result && result.length > 0) {
//     const token = generateToken(result[0]?.auth_id);
//     let da = {
//       username: result[0]?.username,
//       name: result[0]?.name,
//       email: result[0]?.email,
//       vendor_id: result[0]?.vendor_id,
//     };
//     resSend(res, true, 200, "You have logged in successfully", da, token);
//   } else {
//     resSend(
//       res,
//       false,
//       200,
//       "Please check your username and password",
//       null,
//       null
//     );
//   }
// };



exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    res.json({
      message: "Token is not valid",
      success: false,
    });
  } else {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  }
}


// module.exports = {auth, verifyToken}