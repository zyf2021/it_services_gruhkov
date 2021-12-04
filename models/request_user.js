module.exports = (sequelize,Sequelize)=>{
    const Request_User = sequelize.define("request_user",{
        date_ask:{
            type:Sequelize.DATE
        },
        date_load:{
            type:Sequelize.DATE
        },
        date_ready:{
            type:Sequelize.DATE
        },
        type:{
            type:Sequelize.STRING
        }
        //user_id
    })

    return Request_User    
}