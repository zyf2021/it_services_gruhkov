module.exports = {
    HOST: "localhost",
    USER: "mysql",
    PASSWORD: "mysql",
    DB: "it_services_gruhkov",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }