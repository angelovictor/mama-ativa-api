require("dotenv").config();

module.exports = {
  "HOST": `${process.env.DATABASE_HOST}`,
  "USER": `${process.env.DATABASE_USER}`,
  "PASSWORD": `${process.env.DATABASE_PASSWORD}`,
  "DB": `${process.env.DATABASE_DB}`,
  "dialect": "mysql",
  "timezone": "-03:00",
  "pool": {
    "max": 5,
    "min": 0,
    "acquire": 30000,
    "idle": 10000
  }
};
