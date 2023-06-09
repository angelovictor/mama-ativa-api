"use strict";
module.exports = (sequelize, Sequelize) => {
  const MilkDonation = sequelize.define("milk_donations", {
    amount_milk: {
      type: Sequelize.INTEGER
    }
  });

  return MilkDonation;
};
