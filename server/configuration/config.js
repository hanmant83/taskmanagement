require('dotenv').config();
const config={
    DBDetails:{
        user:process.env.DB_USER_NAME,
        host:process.env.DB_HOST,
        database:process.env.DB_DATABASE,
        password:process.env.DB_PASSWORD,
        port:process.env.DB_PORT
    }
}
module.exports=config;