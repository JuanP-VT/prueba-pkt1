const express = require("express");
const rutaAgenda = express.Router();
const AgendaModelo = require("../Modelos/Agenda");
const AutentificarJWT = require("../middleware/AutentificarJWT");

/**
 * Obtiene la agenda del usuario
 * Debe ser una petición GET
 * Debe contener un encabezado de autentificación
 * @param {headers: {Authorization: string}}
 */
rutaAgenda.get("/", AutentificarJWT, async (req, res) => {
  const id = req.user._id;
  //Extraemos el id del token
  try {
    const agenda = await AgendaModelo.findOne({ usuarioId: id });

    res.json(agenda);
  } catch (error) {
    res.status(500).json({ message: "Error Interno" });
  }
});

/**
 * Crea un nuevo contacto en la agenda del usuario
 * Debe ser una petición POST
 * @param {nombre: string, apellidos: string, correo: string, teléfonos: string[],
 *  direcciones: Dirección[{calle: string, número: string, ciudad: string}] }
 */

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
  const ValidarNuevoContacto = require("../Validación/Contacto");
  try {
    ValidarNuevoContacto.parse(nuevoContacto);
  } catch (error) {
    //Retorna al frontend el error de validación
    return res.status(400).json({ message: error });
  }
  //Buscamos la agenda del usuario
  try {
    const agenda = await AgendaModelo.findOne({ usuarioId: id });
    const contactosModificados = [...agenda.contactos, nuevoContacto];
    const agendaModificada = await agenda.updateOne({
      contactos: contactosModificados,
    });

    return res.json({ agenda: agendaModificada });
  } catch (error) {
    return res.status(500).json({ message: "Error en la base de datos" });
  }
});

/**
 * Actualiza la agenda del usuario
 * Debe ser una petición PUT
 * Debe ser un contacto valido en el body con su _id
 * @param {contactos: Contacto[]}
 */
rutaAgenda.put("/", AutentificarJWT, async (req, res) => {
  //Extraemos el id del token
  const id = req.user._id;

  //Validamos que el body
  const nuevoContacto = {
    _id: req.body._id,
    nombre: req.body.nombre,
    apellido: req.body.apellido ?? "",
    correo: req.body.correo,
    teléfonos: req.body.teléfonos ?? [],
    direcciones: req.body.direcciones ?? [],
  };

  const ValidarNuevoContacto = require("../Validación/Contacto");
  try {
    ValidarNuevoContacto.parse(nuevoContacto);
  } catch (error) {
    //Retorna al frontend el error de validación
    return res.status(400).json({ message: error });
  }

  //Buscamos el contacto que queremos modificar
  try {
    const agenda = await AgendaModelo.findOne({ usuarioId: id });
    const contactos = agenda.contactos;
    const indice = contactos.findIndex((contacto) => {
      const idString = contacto._id.toString();
      return idString === nuevoContacto._id;
    });

    //Si no se encuentra el indice retorna
    if (indice === -1) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }
    //Actualizamos el contacto
    contactos[indice] = req.body;
    const agendaModificada = await agenda.updateOne({
      contactos: contactos,
    });
    return res.json({ agenda: agendaModificada });
  } catch (error) {
    return res.status(500).json({ message: "Error en la base de datos" });
  }
});

/**
 * Elimina un contacto de la agenda del usuario
 * Debe ser una petición DELETE
 * @param {_id: string}
 *
 */
rutaAgenda.delete("/", AutentificarJWT, async (req, res) => {
  //Extraemos el id del token
  const id = req.body._id;

  //Validamos la petición
  //Solo validaremos un campo, por esta ocasión utilizaré validación manual y no la librería Zod
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Solicitud inválida" });
  }
  //Buscamos la agenda del usuario
  try {
    const agenda = await AgendaModelo.findOne({ usuarioId: req.user._id });
    const contactos = agenda.contactos;
    //Eliminamos el contacto
    const contactosModificados = contactos.filter(
      (contacto) => contacto._id.toString() !== id
    );
    const agendaModificada = await agenda.updateOne({
      contactos: contactosModificados,
    });
    return res.json({ agenda: agendaModificada });
  } catch (error) {
    return res.status(500).json({ message: "Error en la base de datos" });
  }
});
module.exports = rutaAgenda;
