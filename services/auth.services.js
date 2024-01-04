const { USER_TYPE_SUPER_ADMIN } = require("../lib/constant");
const { resSend } = require("../lib/resSend");

const authDataModify = (queryResult) => {

    if (!Array.isArray(queryResult) && !queryResult.result) return [];
    const result = queryResult.map((row) => {
        const authData = {};
        const userTypeData = {};
        const userRoleData = {};

        for (const key in row) {
            const [table, column] = key.split('.');

            switch (table) {
                case 'auth':
                    authData[column] = row[key];
                    break;
                case 'user_type':
                    userTypeData[column] = row[key];
                    break;
                case 'user_role':
                    userRoleData[column] = row[key];
                    break;
            }
        }

        // deleting password 
        delete authData.password;

        return { user: authData, user_type: userTypeData, user_role: userRoleData };
    });

    return result;
}


const unlockPrivilege = async (req, res, next) => {
    try {

        const id = req.tokenData.user_type;

        if (!id || id !== USER_TYPE_SUPER_ADMIN) return resSend(res, false, 400, "YOU DON'T HAVE ACCESS");

        next();

    } catch (error) {

        console.log("Unlock Privilege api", error);

        return resSend(res, false, 500, "INTERNAL_SERVER_ERROR_VERIFY_TOKEN");

    }
}

module.exports = { authDataModify, unlockPrivilege }