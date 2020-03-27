require('dotenv').config();

module.exports = {
    prefix: process.env.PREFIX,

    horoscope_api_token: process.env.HOROSCOPE_TOKEN,

    adminRoleId: process.env.ADMIN_ROLE_ID,
    djRoleId: process.env.DJ_ROLE_ID,
    kassId: process.env.KASS_ID
}