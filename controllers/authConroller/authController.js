// const roles = require("../constants/roles");
const {
  generateSalt,
  getHashedText,
  compareHash,
} = require("../../services/crypto.services");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
// const { query } = require("../../config/dbConfig");
const {
  getAccessToken,
  getRefreshToken,
} = require("../../services/jwt.services");
const { resSend } = require("../../lib/resSend");
const {
  AUTH,
  USTER_TYPE,
  SDBG,
  REGISTRATION_OTP,
  EMPLAYEE_MASTER_PA0002,
  VENDOR_MASTER_LFA1,
} = require("../../lib/tableName");
const {
  USER_TYPE_VENDOR,
  USER_TYPE_SUPER_ADMIN,
  INSERT,
  TRUE,
  UPDATE,
  USER_TYPE_GRSE_DRAWING,
  ASSIGNER,
  STAFF,
} = require("../../lib/constant");
// const { authDataModify } = require("../services/auth.services");

const rolePermission = require("../../lib/role/deptWiseRolePermission");
// const { generateSalt, getHashedText } = require("../../services/crypto.services");
const { getEpochTime, generateQuery } = require("../../lib/utils");

const Message = require("../../utils/messages");
const {
  query,
  getQuery,
  poolClient,
  poolQuery,
} = require("../../config/pgDbConfig");
const { EMAIL_TEMPLAE } = require("../../templates/mail-template");
const SENDMAIL = require("../../lib/mailSend");

const MAX_AGE = 12 * 60 * 60 * 1000;

const login = async (req, res) => {
  try {
    const client = await poolClient();

    try {
      if (!req.body.vendor_code || !req.body.password) {
        return resSend(res, false, 200, Message.MANDATORY_INPUTS_REQUIRED);
      }

      const { vendor_code, password } = req.body;

      // const userQuery = `SELECT * FROM ${AUTH} WHERE username = "${req.body.username}"`;

      // const userFoundQuery = `SELECT * FROM auth JOIN user_type ON auth.user_type = user_type.id JOIN  user_role ON user_role.user_type_id = user_type.id WHERE auth.username = "${req.body.username}"`

      //     const q1 = `SELECT
      //     auth.auth_id AS "auth.auth_id",
      //     auth.user_type AS "auth.user_type",
      //     auth.username AS "auth.username",
      //     auth.password AS "auth.password",
      //     auth.name AS "auth.name",
      //     auth.email AS "auth.email",
      //     auth.vendor_code AS "auth.vendor_code",
      //     user_type.id AS "user_type.id",
      //     user_type.user_type AS "user_type.user_type",
      //     user_type.created_at AS "user_type.created_at",
      //     user_type.updated_at AS "user_type.updated_at",
      //     user_role.user_type_id AS "user_role.user_type_id",
      //     user_role.ven_bill_submit AS "user_role.ven_bill_submit",
      //     user_role.ven_bill_show AS "user_role.ven_bill_show",
      //     user_role.ven_bill_edit AS "user_role.ven_bill_edit",
      //     user_role.ven_bill_received AS "user_role.ven_bill_received",
      //     user_role.ven_bill_certified AS "user_role.ven_bill_certified",
      //     user_role.ven_bill_forward AS "user_role.ven_bill_forward"
      // FROM auth
      // JOIN user_type ON auth.user_type = user_type.id
      // JOIN user_role ON user_role.user_type_id = user_type.id
      // WHERE auth.vendor_code = "${req.body.vendor_code}"`;
      let login_Q = `SELECT 
                t1.vendor_code, t1.user_type, t1.username, t1.password, t1.department_id, t1.internal_role_id,
                    t2.name AS department_name, t3.name AS role
                FROM 
                    auth
                AS 
                    t1 
			    LEFT JOIN
                	depertment_master
                AS 
                    t2
                ON
                	t1.department_id = t2.id
                LEFT JOIN
                	internal_role_master
                AS 
                    t3
                ON	
                    t1.internal_role_id = t3.id
                WHERE
                    t1.vendor_code = $1 AND t1.is_active = 1`;

      // if (req.body.userType === "VENDOR") {
      //     login_Q = `SELECT t1.vendor_code, t1.email, t1.user_type, t1.username, t1.password,
      //     t3.SMTP_ADDR
      //         FROM auth
      //             AS t1
      //         LEFT JOIN adr6
      //         AS t3
      //             ON
      //         t1.vendor_code = t3.PERSNUMBER
      //             WHERE
      //         (t1.user_type = 1 AND t1.vendor_code = ?)`;
      // }
      // else if (req.body.userType === "GRSE") {
      //     login_Q = `SELECT
      //         t1.vendor_code, t1.email, t1.user_type, t1.username, t1.password,
      //         t2.CNAME, t3.USRID_LONG
      //         FROM auth
      //             AS t1
      //         WHERE
      //              AND t1.vendor_code = ?`;
      // }
      // const  vendorLogin_Q = `SELECT t1.vendor_code, t1.email, t1.user_type, t1.username, t1.password, t2.*, t3.SMTP_ADDR FROM auth as t1 LEFT JOIN lfa1 AS t2 ON t1.vendor_code = t2.LIFNR LEFT JOIN adr6 as t3 ON t1.vendor_code = t3.PERSNUMBER  WHERE t1.vendor_code = ?`;

      // let result = await getQuery({ query: login_Q, values: [req.body.vendor_code] });

      let { rows } = await client.query(login_Q, [vendor_code]);

      result = rows;
      let user = {};
      let permission = {};
      let userDetails = [];
      if (!result.length) {
        return resSend(res, false, 200, Message.USER_NOT_FOUND, result);
      }

      const match = await bcrypt.compare(password, result[0]["password"]);

      if (!match) {
        return resSend(res, false, 200, "INCORRECT_PASSWORD");
      } else {
        if (result[0]["user_type"] === USER_TYPE_VENDOR) {
          const vendorDetailsQ = `SELECT 
                        t1.NAME1 AS name ,
                        t1.email
                    FROM
                        lfa1 AS t1 
                    WHERE
                        t1.LIFNR = $1`;

          // userDetails = await getQuery({ query: vendorDetailsQ, values: [req.body.vendor_code] });

          const userData = await client.query(vendorDetailsQ, [vendor_code]);
          userDetails = userData.rows;

          if (userDetails.length) {
            result[0] = { ...result[0], ...userDetails[0] };
            const { department_name, role } = result[0];
            const deptPermission = rolePermission["VENDOR"];
            permission = deptPermission;
          }
          // if (permission.length) {
          //     name = permission[0].name;
          //     email = permission[0].email;
          //     permission = permission?.map((el) => {
          //         delete el.name,
          //             delete el.email
          //         return el;
          //     })
          // }

          // user = { user: { ...result[0] } };
        } else if (result[0]["user_type"] !== USER_TYPE_VENDOR) {
          const grseDetaisQ = `SELECT 
                            t1.CNAME AS name,
                            t1.EMAIL AS email
                        FROM 
                            pa0002 AS t1
                        WHERE 
                            t1.PERNR = $1`;
          // userDetails = await getQuery({
          //     query:

          //         grseDetaisQ, values: [req.body.vendor_code]
          // });
          const grseEmpDetails = await client.query(grseDetaisQ, [vendor_code]);

          userDetails = grseEmpDetails.rows;
          if (userDetails.length) {
            result[0] = { ...result[0], ...userDetails[0] };
            const { department_name, role } = result[0];
            const deptPermission = rolePermission[department_name];
            if (deptPermission) {
              deptPermission[role] = true;
            }
            permission = deptPermission ? deptPermission : {};
          }

          /**
                     *   LEFT JOIN 
                    permission AS t3
                ON 
                    t3.user_id = t1.PERNR
                    if (permission?.length) {
                        name = permission[0].name;
                        email = permission[0].email;
    
                        permission = permission?.map((el) => {
                            delete el.name,
                                delete el.email
                            return el;
                        })
                    }
                     */
        }
      }

      // commented because of previously use role base access. now no need
      // const user = result && result?.length ? authDataModify(result)[0] : {};

      // deleting password from response
      delete result[0]["password"];

      // let sidebar_menu = { ...rolePermission };
      // added permission as per define in permission table
      // if permission is on the table permission has granted
      // otherwise no permission
      // if (permission?.length && result[0]["user_type"] !== USER_TYPE_VENDOR) {

      //     if (result[0]["user_type"] == USER_TYPE_SUPER_ADMIN) {
      //         const newObj = JSON.parse(
      //             JSON.stringify(rolePermission, (key, value) =>
      //                 typeof value === "boolean" ? true : value
      //             )
      //         );

      //         sidebar_menu = newObj;

      //     } else {

      //         permission.forEach((el) => {
      //             if (sidebar_menu[el.screen_name]["activities"]) {
      //                 sidebar_menu[el.screen_name]["activities"][el.activity_type] = el["activity_status"] === 1 ? true : false;
      //                 if (el.activity_status === 1) {
      //                     sidebar_menu[el.screen_name]["hasAccess"] = true;
      //                 }
      //             }
      //         });
      //     }

      // }

      // user["permission"] = sidebar_menu;

      user = { user: { ...result[0] }, permission };

      const payload = {
        username: user.user?.username,
        vendor_code: user.user?.vendor_code,
        name: user.user?.name,
        user_type: user.user?.user_type,
        department_id: user.user.department_id,
        internal_role_id: user.user.internal_role_id,

        // user_type_name: user.user_type.user_type
      };

      const ACCESS_TOKEN_VALIDITY = "1d";
      const REFRESH_TOKEN_VALIDITY = "7d";

      const accessToken = getAccessToken(payload, ACCESS_TOKEN_VALIDITY);
      const refreshToken = getRefreshToken(payload, REFRESH_TOKEN_VALIDITY);

      if (!accessToken || !refreshToken)
        return resSend(res, false, 500, "TOKEN_GENERATION_ERROR");

      // TO DO
      // save data in cookie
      // res.cookie('jwt', refreshToken, {
      //     httpOnly: true,
      //     sameSite: 'None', secure: true,
      //     maxAge: MAX_AGE
      // });

      return resSend(
        res,
        true,
        200,
        Message.USER_AUTHENTICATION_SUCCESS,
        user,
        { accessToken, refreshToken }
      );
    } catch (error) {
      console.error(error.message);
      return resSend(
        res,
        false,
        500,
        Message.SERVER_ERROR,
        JSON.stringify(error)
      );
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message);
  }
};

const sendOtp = async (req, res) => {
  try {
    const client = await poolClient();

    try {
      const { ...obj } = req.body;
      if (!obj.user_type || !obj.user_code) {
        return resSend(res, false, 200, Message.INVALID_PAYLOAD, null, null);
      }

      const tableName =
        obj.user_type === "vendor"
          ? VENDOR_MASTER_LFA1
          : EMPLAYEE_MASTER_PA0002;
      const fieldName = obj.user_type === "vendor" ? "lifnr" : "pernr";

      const validUser = await poolQuery({
        client,
        query: `SELECT email  FROM ${tableName} where ${fieldName} = '${obj.user_code}'`,
        values: [],
      });

      if (
        validUser.length == 0 ||
        !validUser[0].email ||
        validUser[0].email === ""
      ) {
        return resSend(
          res,
          false,
          200,
          "You are not allowed to register!",
          null,
          null
        );
      }

      const otp = crypto.randomInt(100000, 999999);
      // SEND MAIL TO USER //
      let mailOptions = {
        to: validUser[0].email,
        from: process.env.MAIL_SEND_MAIL_ID,
        subject: `OBPS Registration OTP Generated`,
        html: EMAIL_TEMPLAE(
          `Your one time PIN for registration in OBPS is : ${otp}. Valid for 30 minutes, Do not shere it with anyone.`
        ),
      };
      try {
        await SENDMAIL(mailOptions);

        // delete existing record on same user code
        let delOtp = `DELETE FROM ${REGISTRATION_OTP} WHERE user_code = '${obj.user_code}'`;
        let delOtpRes = await poolQuery({
          client,
          query: delOtp,
          values: [],
        });
        // add otp record
        const insertRegistrationOtp = {
          user_type: obj.user_type,
          functional_area: obj.functional_area ? obj.functional_area : null,
          role: obj.role ? obj.role : null,
          sub_dept_id: obj.sub_dept_id ? obj.sub_dept_id : null,
          user_code: obj.user_code,
          otp: otp,
          created_at: getEpochTime(),
          status: "PENDING",
        };

        let addOtpQ = generateQuery(
          INSERT,
          REGISTRATION_OTP,
          insertRegistrationOtp
        );
        let addOtpRes = await poolQuery({
          client,
          query: addOtpQ["q"],
          values: addOtpQ["val"],
        });
        return resSend(
          res,
          true,
          200,
          `OTP send via mail.Please check Mail inbox.`,
          null,
          null
        );
      } catch (err) {
        return resSend(res, false, 200, `You are not authourised.`, null, null);
      }
    } catch (error) {
      return resSend(
        res,
        false,
        500,
        Message.SERVER_ERROR,
        JSON.stringify(error)
      );
    } finally {
      console.log("finally block");
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message);
  }
};
const forgotPasswordOtp = async (req, res) => {
  try {
    const client = await poolClient();

    try {
      const { ...obj } = req.body;
      if (!obj.user_code) {
        return resSend(res, false, 200, Message.INVALID_PAYLOAD, null, null);
      }

      let qry = `SELECT 
                    t1.email,t2.user_type,t2.department_id,t2.internal_role_id
                    FROM 
                        pa0002
                    AS 
                        t1 
              LEFT JOIN
                      auth
                    AS 
                        t2
                    ON
                      t2.vendor_code = t1.pernr :: character varying
                  
                    WHERE
                        t2.vendor_code = $1 AND t2.is_active = 1`;

      const validUser = await poolQuery({
        client,
        query: qry,
        values: [obj.user_code],
      });

      if (
        validUser.length == 0 ||
        !validUser[0].email ||
        validUser[0].email === ""
      ) {
        return resSend(
          res,
          false,
          200,
          "You are not allowed to get OTP!",
          null,
          null
        );
      }

      const otp = crypto.randomInt(100000, 999999);
      // SEND MAIL TO USER //
      let mailOptions = {
        to: validUser[0].email,
        from: process.env.MAIL_SEND_MAIL_ID,
        subject: `OBPS Registration OTP Generated`,
        html: EMAIL_TEMPLAE(
          `Your one time PIN for forgot password in OBPS is : ${otp}. Valid for 30 minutes, Do not shere it with anyone.`
        ),
      };
      try {
        await SENDMAIL(mailOptions);

        // delete existing record on same user code
        let delOtp = `DELETE FROM ${REGISTRATION_OTP} WHERE user_code = '${obj.user_code}'`;
        let delOtpRes = await poolQuery({
          client,
          query: delOtp,
          values: [],
        });
        // add otp record
        const insertRegistrationOtp = {
          user_type:
            validUser[0].user_type == USER_TYPE_VENDOR ? "vendor" : "GRSE",
          functional_area: validUser[0].department_id,
          role: validUser[0].internal_role_id,
          user_code: obj.user_code,
          otp: otp,
          created_at: getEpochTime(),
          status: "PENDING",
        };

        let addOtpQ = generateQuery(
          INSERT,
          REGISTRATION_OTP,
          insertRegistrationOtp
        );
        let addOtpRes = await poolQuery({
          client,
          query: addOtpQ["q"],
          values: addOtpQ["val"],
        });
        return resSend(
          res,
          true,
          200,
          `OTP send via mail.Please check Mail inbox.`,
          null,
          null
        );
      } catch (err) {
        return resSend(res, false, 200, `You are not authourised.`, null, null);
      }
    } catch (error) {
      return resSend(
        res,
        false,
        500,
        Message.SERVER_ERROR,
        JSON.stringify(error)
      );
    } finally {
      // console.log("finally block");
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message);
  }
};

const otpVefify = async (req, res) => {
  try {
    const client = await poolClient();

    try {
      const { ...obj } = req.body;
      if (!obj.otp || !obj.user_code) {
        return resSend(res, false, 200, Message.INVALID_PAYLOAD, null, null);
      }

      const milliseconds = (h, m, s) => (h * 60 * 60 + m * 60 + s) * 1000;

      // Usage
      const result = milliseconds(0, 30, 0);
      let start = getEpochTime() - result;

      const otpVefifyQuery = `SELECT COUNT(*) as count FROM ${REGISTRATION_OTP} where created_at BETWEEN '${start}' AND '${getEpochTime()}' AND user_code = '${
        obj.user_code
      }' AND otp = '${obj.otp}'`;
      const otpVefifyQueryRes = await poolQuery({
        client,
        query: otpVefifyQuery,
        values: [],
      });
      //return false;
      let msg;
      let status;
      if (otpVefifyQueryRes && otpVefifyQueryRes[0].count == 1) {
        msg = `OTP is verified.`;
        status = true;
        const whereCondition = {
          user_code: obj.user_code,
          otp: obj.otp,
        };

        const updatePayload = {
          status: "VERIFIED",
        };
        const updateVerified = generateQuery(
          UPDATE,
          REGISTRATION_OTP,
          updatePayload,
          whereCondition
        );
        const getUpdate = await poolQuery({
          client,
          query: updateVerified["q"],
          values: updateVerified["val"],
        });
      } else {
        msg = `Your OTP is incorrect!`;
        status = false;
      }
      resSend(res, status, 200, msg, null, null);
    } catch (error) {
      console.log(error);
      resSend(
        res,
        false,
        500,
        Message.SERVER_ERROR,
        JSON.stringify(error),
        null
      );
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message);
  }
};

const setPassword = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const { ...obj } = req.body;
      if (!obj.password || !obj.user_code || !obj.otp) {
        return resSend(res, false, 200, Message.INVALID_PAYLOAD, null, null);
      }

      const vefifyQuery = `SELECT * FROM ${REGISTRATION_OTP} where user_code = '${obj.user_code}' AND status = 'VERIFIED' AND otp = '${obj.otp}'`;
      const otpVefifyQueryRes = await getQuery({
        query: vefifyQuery,
        values: [],
      });

      if (otpVefifyQueryRes && otpVefifyQueryRes.length == 0) {
        return resSend(res, false, 200, `OTP is incorrect!`, null, null);
      }
      const tableName =
        otpVefifyQueryRes[0].user_type === "vendor"
          ? VENDOR_MASTER_LFA1
          : EMPLAYEE_MASTER_PA0002;
      const fieldName =
        otpVefifyQueryRes[0].user_type === "vendor" ? "lifnr" : "pernr";

      const validUser = await poolQuery({
        client,
        query: `SELECT * FROM ${tableName} where ${fieldName} = '${obj.user_code}'`,
        values: [],
      });

      if (validUser.length == 0) {
        return resSend(
          res,
          false,
          200,
          "You are not allowed to register!",
          null,
          null
        );
      }

      let name;
      let username;
      if (otpVefifyQueryRes[0].user_type === "vendor") {
        name = validUser[0].name1;
        username = validUser[0].stcd1;
      } else {
        name = validUser[0].cname;
        username = validUser[0].persg;
      }

      const salt = bcrypt.genSaltSync();
      const encrytedPassword = bcrypt.hashSync(obj.password, salt);

      const regData = {
        user_type:
          otpVefifyQueryRes[0].user_type == "vendor" ? USER_TYPE_VENDOR : 2,
        department_id: otpVefifyQueryRes[0].functional_area,
        internal_role_id: otpVefifyQueryRes[0].role,
        username: username,
        password: encrytedPassword,
        name: name,
        vendor_code: obj.user_code,
        datetime: getEpochTime(),
      };

      let resMsg;
      if (
        otpVefifyQueryRes[0].user_type === "vendor" ||
        otpVefifyQueryRes[0].role == 2
      ) {
        regData.is_active = 1;
        resMsg = "You are authorised! Please login to get access.";
      } else {
        regData.is_active = 0;
        resMsg = "Please contact a nodal officer for approval.";
      }
      // delete existing record on same user code
      let delOtp = `DELETE FROM ${AUTH} WHERE vendor_code = '${obj.user_code}'`;
      let delOtpRes = await poolQuery({
        client,
        query: delOtp,
        values: [],
      });
      console.log(delOtpRes);
      // Insert new user record in auth table.
      const { q, val } = generateQuery(INSERT, AUTH, regData);
      const response = await poolQuery({ client, query: q, values: val });

      if (
        otpVefifyQueryRes[0].user_type === "GRSE" &&
        otpVefifyQueryRes[0].role === 1
      ) {
        // SEND MAIL TO NODAL OFFICERS //
        let getNodalOfficersQ = `SELECT t1.vendor_code, t2.email FROM auth AS t1
                LEFT JOIN 
                    pa0002 AS t2 
                ON 
                    t1.vendor_code = t2.pernr  :: character varying WHERE
                t1.department_id = $1 AND t1.internal_role_id = $2`;

        const getNodalOfficersR = await getQuery({
          query: getNodalOfficersQ,
          values: [otpVefifyQueryRes[0].functional_area, ASSIGNER],
        });
        let emails = "";
        if (getNodalOfficersR.length > 0) {
          getNodalOfficersR.forEach((item) => {
            if (item.email && item.email != "") {
              if (emails === "") {
                emails += item.email;
              } else {
                emails += "," + item.email;
              }
            }
          });
        }

        if (emails != "") {
          let mailOptions = {
            to: "mainak.dutta16@gmail.com,kbcdefgh33@gmail.co",
            from: process.env.MAIL_SEND_MAIL_ID,
            subject: `OBPS Registration Request.`,
            html: EMAIL_TEMPLAE(
              `A user is trying to register as a nodal officier in your depertment in OBPS system. \n  Please login to your OBPS portal to take the necessary action.`
            ),
          };
          await SENDMAIL(mailOptions);
        } else {
          resMsg = "No nodal officer found.";
        }
      }

      if (
        otpVefifyQueryRes[0].user_type === "GRSE" &&
        otpVefifyQueryRes[0].role === 2
      ) {
        const empDLQ = {
          dept_id: otpVefifyQueryRes[0].functional_area,
          internal_role_id: otpVefifyQueryRes[0].role,
          sub_dept_id: otpVefifyQueryRes[0].sub_dept_id
            ? otpVefifyQueryRes[0].sub_dept_id
            : 0,
          emp_id: obj.user_code,
        };
        // delete existing record on same user code
        let delOtp = `DELETE FROM emp_department_list WHERE emp_id = '${obj.user_code}'`;
        let delOtpRes = await poolQuery({
          client,
          query: delOtp,
          values: [],
        });
        // Insert new user record in emp_department_list table.
        const empDLR = generateQuery(INSERT, "emp_department_list", empDLQ);
        const response = await poolQuery({
          client,
          query: empDLR["q"],
          values: empDLR["val"],
        });
      }

      resSend(res, "status", 200, resMsg, null, null);
    } catch (error) {
      console.log(error.message);
      resSend(
        res,
        false,
        500,
        Message.SERVER_ERROR,
        JSON.stringify(error),
        null
      );
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message);
  }
};

const getListPendingEmp = async (req, res) => {
  try {
    const tokenData = { ...req.tokenData };
    if (tokenData.internal_role_id != ASSIGNER) {
      resSend(res, false, 200, Message.YOU_ARE_UN_AUTHORIZED, null, null);
    }
    const vefifyQuery = `SELECT t1.vendor_code, t2.name as depertment_name, t3.name as internal_role, t4.email, t4.cname as name FROM auth AS t1
                LEFT JOIN 
                    depertment_master AS t2 
                ON 
                    t1.department_id = t2.id  
                    LEFT JOIN 
                    internal_role_master AS t3 
                ON 
                    t1.internal_role_id = t3.id
                    LEFT JOIN 
                    pa0002 AS t4 
                ON 
                    t1.vendor_code = t4.pernr :: character varying
    
                    WHERE t1.vendor_code != $1 AND
                t1.department_id = $2 AND t1.internal_role_id = $3 AND t1.is_active = $4`;
    const otpVefifyQueryRes = await getQuery({
      query: vefifyQuery,
      values: [
        tokenData.vendor_code,
        tokenData.department_id,
        tokenData.internal_role_id,
        0,
      ],
    });
    resSend(
      res,
      true,
      200,
      `user data fetch Succesfully.`,
      otpVefifyQueryRes,
      null
    );
  } catch (error) {
    resSend(res, false, 500, Message.SERVER_ERROR, error, null);
  }
};

const acceptedPendingEmp = async (req, res) => {
  try {
    const client = await poolClient();
    try {
      const tokenData = { ...req.tokenData };
      if (!req.body.status || !req.body.user_code) {
        return resSend(res, false, 200, Message.INVALID_PAYLOAD, null, null);
      }
      if (tokenData.internal_role_id != ASSIGNER) {
        return resSend(
          res,
          false,
          200,
          Message.YOU_ARE_UN_AUTHORIZED,
          null,
          null
        );
      }
      const checkDeptQ = `SELECT department_id FROM ${AUTH} WHERE vendor_code = $1`;
      const checkDeptR = await poolQuery({
        client,
        query: checkDeptQ,
        values: [req.body.user_code],
      });

      if (checkDeptR[0].department_id != tokenData.department_id) {
        resSend(res, false, 200, Message.YOU_ARE_UN_AUTHORIZED, null, null);
      } else {
        const updateQuery = `Update ${AUTH} set is_active = $1 WHERE vendor_code = $2`;
        const queryRes = await poolQuery({
          client,
          query: updateQuery,
          values: [req.body.status, req.body.user_code],
        });
        resSend(res, true, 200, `user approved.`, null, null);
      }
    } catch (error) {
      resSend(res, false, 500, Message.SERVER_ERROR, error, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    const client = await poolClient();
    console.log(req.body);
    try {
      if (!req.body.user_code || !req.body.old_pw || !req.body.new_pw) {
        return resSend(res, false, 200, Message.MANDATORY_INPUTS_REQUIRED);
      }

      const { user_code, old_pw, new_pw } = req.body;

      let login_Q = `SELECT * FROM auth WHERE vendor_code = $1 AND is_active = 1`;

      let result = await poolQuery({
        client,
        query: login_Q,
        values: [user_code],
      });

      console.log(result);

      if (!result.length) {
        return resSend(res, false, 200, Message.USER_NOT_FOUND, result);
      }

      const match = await bcrypt.compare(old_pw, result[0]["password"]);

      if (!match) {
        return resSend(res, false, 200, "INCORRECT_PASSWORD");
      }

      const whereCondition = {
        vendor_code: user_code,
        password: result[0]["password"],
      };
      const salt = bcrypt.genSaltSync();
      const encrytedPassword = bcrypt.hashSync(new_pw, salt);
      const updatePayload = {
        password: encrytedPassword,
      };

      const updateVerified = generateQuery(
        UPDATE,
        AUTH,
        updatePayload,
        whereCondition
      );
      console.log(updateVerified);
      const getUpdate = await poolQuery({
        client,
        query: updateVerified["q"],
        values: updateVerified["val"],
      });
      console.log(getUpdate);

      return resSend(res, true, 200, "Password update successfully!");
    } catch (error) {
      console.log(error.message);
      resSend(res, false, 500, Message.SERVER_ERROR, error, null);
    } finally {
      client.release();
    }
  } catch (error) {
    resSend(res, false, 500, Message.DB_CONN_ERROR, error.message);
  }
};

// const registration = async (req, res) => {

//     try {
//         const paylaod = req.body;
//         let regData = {};

//         if (!paylaod.user_type || !paylaod.username) return resSend(res, false, 400, Message.INVALID_PAYLOAD, null);
//         const salt = generateSalt();
//         const encrytedPassword = getHashedText("1234", salt);

//         if (paylaod.user_type === USER_TYPE_VENDOR) {

//             const validVendor = await query({ query: "SELECT COUNT(*) as count FROM lfa1 WHERE 1 = 1 AND  lifnr = ? ", values: [paylaod.username] });
//             if (!validVendor) {
//                 return resSend(res, false, 200, "User not access for OBPS", paylaod);
//             }

//             // const encrytedPassword = getHashedText(req.body.password, salt);

//             regData = {
//                 vendor_code: paylaod.username,
//                 user_type: USER_TYPE_VENDOR,
//                 default_password: encrytedPassword,
//                 is_approved: 'N',
//                 fistime_login: 'N',
//                 created_at: getEpochTime(),
//                 user_data: JSON.stringify({ department_id: null, internal_role_id: null })
//             }

//             const { q, val } = generateQuery(INSERT, 'user_registraion', regData);
//             const response = await query({ query: q, values: val });

//             if (response.affectedRows) {
//                 resSend(res, true, 200, Message.USER_REG_SUCCESS, null);
//             } else {
//                 resSend(res, false, 400, Message.USER_REG_UN_SUCCESS, response);
//             }

//         } else if (paylaod.user_type !== USER_TYPE_VENDOR) {

//             const validVendor = await query({ query: "SELECT COUNT(*) as count FROM pa0002 WHERE 1 = 1 AND  pernr = ? ", values: [paylaod.username] });
//             if (!validVendor) {
//                 return resSend(res, false, 200, "User not access for OBPS", paylaod);
//             }

//             // const encrytedPassword = getHashedText(req.body.password, salt);

//             regData = {
//                 vendor_code: paylaod.username,
//                 user_type: 2,
//                 default_password: encrytedPassword,
//                 is_approved: 'N',
//                 fistime_login: 'N',
//                 created_at: getEpochTime(),
//                 user_data: JSON.stringify({ department_id: null, internal_role_id: null })
//             }

//             const { q, val } = generateQuery(INSERT, 'user_registraion', regData);
//             const response = await query({ query: q, values: val });

//             if (response.affectedRows) {
//                 resSend(res, true, 200, Message.USER_REG_SUCCESS, null);
//             } else {
//                 resSend(res, false, 400, Message.USER_REG_UN_SUCCESS, response);
//             }

//         } else {

//             resSend(res, false, 400, Message.DATA_NOT_INSERTED, null);

//         }
//     } catch (error) {
//         resSend(res, false, 500, Message.SERVER_ERROR, null);
//     }

// }

module.exports = {
  login,
  sendOtp,
  forgotPasswordOtp,
  otpVefify,
  setPassword,
  updatePassword,
  getListPendingEmp,
  acceptedPendingEmp,
};
