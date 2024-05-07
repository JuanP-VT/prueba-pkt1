const express = require("express");
const rutaUsuarios = express.Router();
const UsuarioModelo = require("../Modelos/Usuario");
const bcrypt = require("bcrypt");
/**
 * Crea un nuevo usuario
 * Debe ser una petición POST
 * @param {nombre: string, contraseña: string}
 *
 */
rutaUsuarios.post("/", async (req, res) => {
  const nombre = req.body.nombre;
  const contraseña = req.body.contraseña;
  const usuario = { nombre, contraseña };
  //Validamos al usuario
  const ValidarUsuario = require("../Validación/Usuario");
  try {
    ValidarUsuario.parse(usuario);
  } catch (error) {
    res.json({ message: error }).status(400);
  }
  //Después de validar la solicitud exitosamente
  //Verificamos que el nombre de usuario no exista en la base de datos
  const encontrarUsuario = await UsuarioModelo.findOne({
    nombre: usuario.nombre,
  });
  //Retornar un error si el usuario ya existe
  if (encontrarUsuario) {
    res.json({ message: "El usuario ya existe" }).status(400);
    return;
  }
  try {
    //Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const encriptarPassword = await bcrypt.hash(contraseña, salt);
    const nuevoUsuarioEncriptado = {
      ...usuario,
      contraseña: encriptarPassword,
    };
    //Si el usuario no existe, crearlo
    const nuevoUsuario = new UsuarioModelo(nuevoUsuarioEncriptado);
    await nuevoUsuario.save();
    res.json({ message: "Usuario creado exitosamente" }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ message: error }).status(500);
  }
});

module.exports = rutaUsuarios;
