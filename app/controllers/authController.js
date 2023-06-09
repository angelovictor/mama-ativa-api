"use strict";
require("dotenv").config();
const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;
const Role = db.role;
const Address = db.address;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone,
    birth_date: req.body.birth_date,
    profile_photo: req.body.profile_photo,
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

exports.profileUpdate = (req, res) => {
  const objectUserToUpdate = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone,
    birth_date: req.body.birth_date,
    profile_photo: req.body.profile_photo,
    address: req.body.address,
  };

  User.update(objectUserToUpdate,
    {
      where: { id: req.params.id }
    });

  Address.update(req.body.address,
    {
      where: { userId: req.params.id }
    });

  res.status(200).json({ message: 'atualizado com sucesso' });
};

exports.profileDelete = (req, res) => {
  // Delete User to Database
  User.findByPk(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'Não foi possível deletar, usuário inexistente!',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send({ message: `Usuário deletado com sucesso!` }))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    },
    include: [{
      model: Address,
      as: "address"
    }]
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
          message: 'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para escolher uma outra.'
        });
      };

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: parseInt(process.env.TOKE_TIME_LIMIT) // 86400 24 hours || 86400 / 24hrs = 3600 1HR || 3600 / 60seg = 1MIN
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
          accessToken: token,
          phone: user.phone,
          birth_date: user.birth_date,
          profile_photo: user.profile_photo,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          address: {
            cep: user.address.cep,
            street: user.address.street,
            district: user.address.district,
            city: user.address.city,
            state: user.address.state,
          }
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
