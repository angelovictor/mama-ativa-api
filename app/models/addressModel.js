"use strict";
module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("addresses", {
        cep: {
            type: Sequelize.INTEGER(9),
            allowNull: false
        },
        street: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        district: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        city: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        state: {
            type: Sequelize.STRING(2),
            allowNull: false
        }
    });

    return Address;
};
