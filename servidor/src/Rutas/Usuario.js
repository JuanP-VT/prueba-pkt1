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
  //Extraemos el cuerpo de la petición
  const nombre = req.body.nombre;
  const contraseña = req.body.contraseña;
  const usuario = { nombre, contraseña };
  //Validamos al usuario
  const ValidarUsuario = require("../Validación/Usuario");
  try {
    ValidarUsuario.parse(usuario);
  } catch (error) {
    //Retorna al frontend el error de validación
    return res.status(400).json({ message: error });
  }
  //Después de validar la solicitud exitosamente
  //Verificamos que el nombre de usuario no exista en la base de datos
  const encontrarUsuario = await UsuarioModelo.findOne({
    nombre: usuario.nombre,
  });
  //Retornar un error si el usuario ya existe
  if (encontrarUsuario) {
    return res.status(409).json({ message: "El usuario ya existe" });
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
    //Después de guardar al usuario, creamos una colección para su agenda
    const agendaModelo = require("../Modelos/Agenda");
    const nuevoAgenda = new agendaModelo({
      usuarioId: nuevoUsuario._id,
      usuario: nuevoUsuario.nombre,
      contactos: [],
    });
    await nuevoAgenda.save();
    return res.json({ message: "Usuario creado exitosamente" }).status(200);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = rutaUsuarios;
