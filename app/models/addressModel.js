"use strict";
module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("addresses", {
        cep: {
            type: Sequelize.INTEGER(9),
        },
        street: {
            type: Sequelize.STRING(60),
        },
        district: {
            type: Sequelize.STRING(40),
        },
        city: {
            type: Sequelize.STRING(40),
        },
        state: {
            type: Sequelize.STRING(2),
        }
    });
  
    return Address;
};
  