var express = require('express');
var router = express.Router();
var crypto = require("crypto-js");

const usuarios = require('../models/pacientModel');

router.post('/register', async (req, res, next) => {
    try {
      usuarios.find({ name: req.body.name }).then((value) => {
        if (value.length == 0) {
          usuarios.create(req.body).then((value) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ codigoEstado: 200, mensaje: "El usuario se creo con exito" });
          });
        }
        else {
          res.statusCode = 409;
          res.setHeader('Content-Type', 'application/json');
          res.json({ codigoEstado: 409, mensaje: "El nombre de usuario ya existe" });
        }
      });
    }
    catch (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.json({ codigoEstado: 404, mensaje: "Error Inesperado", objetoError: err });
      next(err);
    }
  });