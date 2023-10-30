const { query } = require("../config/dbConfig");

const storeRefreshToken = async (refreshToken, user_id) => {

    try {
        // const saveRefreshTokenQ = `UPDATE user SET refresh_token = ${refreshToken} WHERE user_id = ${user_id}`;

        const saveRefreshTokenQ = `INSERT INTO token (subject, token, is_active) VALUES("${user_id}", "${refreshToken}", "1") ON DUPLICATE KEY UPDATE token=${refreshToken}`

        await query({ query: saveRefreshTokenQ, values: {} });


    } catch (error) {
        console.log(error);
    }
}


module.exports = { storeRefreshToken };