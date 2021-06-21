module.exports = {
    HOST: "localhost",
    USER: "lafountain",
    PASSWORD: "root",
    DB: "simple_test",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };