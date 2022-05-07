"use strict";
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING(150),
        },
        email: {
            type: Sequelize.STRING(150),
        },
        phone: {
            type: Sequelize.STRING(150),
        },
        birth_date: {
            type: Sequelize.STRING(10),
        },
        profile_photo: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        }
    });

    return User;
};
