const express = require("express");
const UsuarioModelo = require("../Modelos/Usuario");
const bcrypt = require("bcrypt");
const rutaAuth = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
/**
 * Autentifica usuario
 * Debe ser una petición POST
 * @param {nombre: string, contraseña: string}
 *
 * Si es exitoso retorna un JWT válido
 */

rutaAuth.post("/", async (req, res) => {
  //Extraemos el cuerpo de la petición
  const nombre = req.body.nombre;
  const contraseña = req.body.contraseña;
  const usuario = { nombre, contraseña };

  //Validamos la petición
  const ValidarUsuario = require("../Validación/Usuario");
  try {
    ValidarUsuario.parse(usuario);
  } catch (error) {
    //Retorna al frontend el error de validación
    return res.status(400).json({ message: error });
  }

  //Validamos las credenciales
  try {
    const encontrarUsuario = await UsuarioModelo.findOne({
      nombre: usuario.nombre,
    });
    if (!encontrarUsuario) {
      return res.status(404).json({ message: "Credenciales inválidas" });
    }
    const comprobarContraseña = await bcrypt.compare(
      contraseña,
      encontrarUsuario.contraseña
    );
    if (!comprobarContraseña) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    //Generamos el token de acceso
    const jwtToken = jwt.sign(
      encontrarUsuario.toJSON(), //Necesario para remover los métodos de mongoose y evitar errores
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ token: jwtToken });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al conectar a la base de datos" });
  }
});

module.exports = rutaAuth;
