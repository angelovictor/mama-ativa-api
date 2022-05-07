"use strict";
const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;
const Role = db.role;
const Address = db.address;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    address: req.body.address,   
  }, {
    include: [{
      model: Address,
      as: "address"
    }]
  }).then(user => {
      const msgSuccessRegistered = "Usuário cadastrado com sucesso!";
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: msgSuccessRegistered });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: msgSuccessRegistered });
        });
      }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Não foi possível encontrar sua Conta do Mama Ativa." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          //accessToken: null,
          message: 'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para escolher uma outra.' });
      };

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 60 // 86400 24 hours || 86400 / 24hrs = 3600 1HR || 3600 / 60seg = 1MIN
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
