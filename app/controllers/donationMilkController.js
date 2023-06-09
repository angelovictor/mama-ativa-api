"use strict";
const db = require("../models");
const MilkDonation = db.milkDonation;
const MilkBank = db.milkBank;

exports.donateMilk = (req, res) => {
  MilkDonation.create({
    amount_milk: req.body.amountMilk,
    userId: req.body.userId,
    bankId: req.body.bankId
  }).then(donation => {
    res.status(200).send("Doação Realizada com Sucesso.")
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.userListDonateMilk = (req, res) => {
  MilkDonation.findAll({
    where: {
      userId: req.params.id
    },
    include: [{
      model: MilkBank,
      as: "milk_bank"
    }]
  })
    .then(donations => {
      if (!donations) {
        return res.status(404).send({ message: "Não foi possível encontrar as doações no Mama Ativa." });
      }

      res.status(200).send(donations);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.userUpdateDonateMilk = (req, res) => {
  MilkDonation.update({
    amount_milk: req.body.amountMilk,
    bankId: req.body.bankId
  },
    {
      where: {
        id: req.params.id,
        userId: req.body.userId
      }
    })
    .then(donation => {
      if (!donation) {
        return res.status(404).send({ message: "Não foi possível encontrar a doação no Mama Ativa." });
      }

      res.status(200).send({ message: "Doação Atualizada com Sucesso." });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.userDeleteDonateMilk = (req, res) => {
  MilkDonation.findOne({
    where: {
      id: req.params.id,
      userId: req.body.userId
    }
  })
    .then(donation => {
      if (!donation) {
        return res.status(404).send({ message: "Não foi possível deletar, doação inexistente!" });
      }
      return donation
        .destroy()
        .then(() => { res.status(204).send({ message: "Doação deletada com sucesso!" }) })
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};