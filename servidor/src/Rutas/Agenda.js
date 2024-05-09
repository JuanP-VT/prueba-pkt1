const express = require("express");
const rutaAgenda = express.Router();
const AgendaModelo = require("../Modelos/Agenda");
const AutentificarJWT = require("../middleware/AutentificarJWT");
const ValidarNuevoContacto = require("../Validación/Contacto");

rutaAgenda.post("/", AutentificarJWT, async (req, res) => {
  //Extraemos el id del token
  const id = req.user._id;
  //Extraemos el cuerpo de la solicitud
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const correo = req.body.correo;
  const teléfonos = req.body.teléfonos;
  const direcciones = req.body.direcciones;
  const nuevoContacto = { nombre, apellido, correo, teléfonos, direcciones };
  //Validamos la petición
  try {
    ValidarNuevoContacto.parse(nuevoContacto);
  } catch (error) {
    //Retorna al frontend el error de validación
    return res.status(400).json({ message: error });
  }
  //Buscamos la agenda del usuario
  try {
    const agenda = await AgendaModelo.findById(id);
    const contactosModificados = [...agenda.contactos, nuevoContacto];
    const agendaModificada = await AgendaModelo.findByIdAndUpdate(
      id,
      { contactos: contactosModificados },
      { new: true }
    );
    return res.json({ agenda: agendaModificada });
  } catch (error) {
    return res.status(500).json({ message: "Error en la base de datos" });
  }
});

module.exports = rutaAgenda;