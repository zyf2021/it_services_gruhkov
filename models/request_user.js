const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{
    const Request_User = sequelize.define("request_user",{
        //date_ask
        //date_ready
        //type
        //user_id

    })

    return Request_User    
}