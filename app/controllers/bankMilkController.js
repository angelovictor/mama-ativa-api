"use strict";
const db = require("../models");
const MilkBank = db.milkBank;

exports.banksMilk = (req, res) => {
  MilkBank.findAll({
    attributes: ['id', 'name', 'type', 'phone', 'location_complete', 'home_collect']
  })
    .then(banks => {
      if (!banks) {
        return res.status(404).send({ message: "Não foi possível encontrar um Banco de Leito no Mama Ativa." });
      }
      res.status(200).send(banks);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};