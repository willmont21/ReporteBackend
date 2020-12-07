module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Admin1243",
    DB: "reporte",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };