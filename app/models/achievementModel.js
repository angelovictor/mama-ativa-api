"use strict";
module.exports = (sequelize, Sequelize) => {
  const Achievement = sequelize.define("achievements", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    level: {
      type: Sequelize.INTEGER(100),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    badge: {
      type: Sequelize.BLOB("long"),
      allowNull: false
    },
  });

  return Achievement;
};
