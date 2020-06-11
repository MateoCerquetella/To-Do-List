const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../config/env');
const userSchema = require('./user.model');
const User = mongoose.model('User', userSchema);

//Crear User
exports.register = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({
      message: 'Falta contenido en el cuerpo.'
    });
  }

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }

  User.create(newUser)
    .then((data) => {
      // Token
      const expiresIn = 24 * 60 * 60; // 1 dia
      const accessToken = jwt.sign(
        {
          id: data.id
        },
        env.TOKEN_SECRET,
        {
          expiresIn: expiresIn
        });

      const dataUser = {
        username: data.username,
        email: data.email,
        accessToken: accessToken,
        expiresIn: expiresIn
      }
      return res.status(200).send(dataUser);
    })
    .catch((err) => {
      console.error(err);
      if (err && err.code === 11000) {
        return res.status(409).send({ message: 'Ya existe el usuario o mail' });
      }
      return res.status(500).send({
        message: 'Se ha producido un error al querer guardar el usuario'
      });
    });
}

exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: 'Falta contenido en el cuerpo.'
    });
  }

  const newUser = {
    username: req.body.username,
    password: req.body.password
  }

  //Busca por usuario
  User.findOne({ username: newUser.username })
    .then((data) => {
      if (data === null) {
        return res.status(409).send({ message: 'No existe el usuario' });
      }
      const resultPassword = bcrypt.compareSync(newUser.password, data.password);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign(
          {
            id: data.id
          },
          env.TOKEN_SECRET,
          {
            expiresIn: expiresIn
          });

        const dataUser = {
          username: data.username,
          email: data.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        res.status(200).send(dataUser);
      } else {
        //La contraseña es incorrecta
        res.status(409).send({ message: 'La contraseña es incorrecta' });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        message: 'Se ha producido un error al querer iniciar sesión'
      });
    });
}