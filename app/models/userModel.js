"use strict";
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: false
        },
        birth_date: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        profile_photo: {
            type: Sequelize.BLOB("long"),
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return User;
};
