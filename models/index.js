const dbConfig = require("../config/db.config.js")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:dbConfig.HOST,
    dialect:dbConfig.dialect
  })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require("./users.model.js")(sequelize, Sequelize)
db.request_user = require("./request_user")(sequelize, Sequelize)

const User = db.users
const Request_User = db.request_user

User.hasMany(Request_User)

module.exports = db;