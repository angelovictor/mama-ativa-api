"use strict";
const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    timezone: config.timezone,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel.js")(sequelize, Sequelize);
db.role = require("./roleModel.js")(sequelize, Sequelize);
db.address = require("./addressModel.js")(sequelize, Sequelize);
db.milkBank = require("./bankMilkModel.js")(sequelize, Sequelize);
db.milkDonation = require("./donationMilkModel.js")(sequelize, Sequelize);
db.achievement = require("./achievementModel.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasOne(db.address, {
  foreignKey: "userId",
  as: "address",
  onDelete: "cascade",
  onUpdate: "cascade"
});

db.address.belongsTo(db.user, {
  foreignKey: "userId"
});

db.achievement.belongsToMany(db.user, {
  through: "user_achievements",
  foreignKey: "achievementId",
  otherKey: "userId"
});

db.user.belongsToMany(db.achievement, {
  through: "user_achievements",
  foreignKey: "userId",
  otherKey: "achievementId"
});

db.user.hasMany(db.milkDonation, {
  foreignKey: "userId",
  as: "donation"
});

db.milkBank.hasMany(db.milkDonation, {
  foreignKey: "bankId",
  as: "donation"
});

db.milkDonation.belongsTo(db.user, {
  foreignKey: "userId"
});

db.milkDonation.belongsTo(db.milkBank, {
  foreignKey: "bankId"
});

db.ROLES = ["user", "mod", "admin"];

module.exports = db;
