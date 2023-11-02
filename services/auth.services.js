
const authDataModify = (queryResult) => {

    if(!Array.isArray(queryResult) && !queryResult.result) return [];
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



module.exports = { authDataModify }