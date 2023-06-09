"use strict";
module.exports = (sequelize, Sequelize) => {
  const MilkBank = sequelize.define("milk_banks", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    type: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(15),
      allowNull: false
    },
    location_complete: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    home_collect: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return MilkBank;
};
