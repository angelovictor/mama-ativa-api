"use strict";
exports.allAccess = (req, res) => {
  res.status(200).send("Conteúdo Público.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Conteúdo do Usuário.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Conteúdo do Administrador.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Conteúdo do Moderador.");
};
