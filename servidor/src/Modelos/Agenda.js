/**
 * Representa el esquema de una agenda de contactos de un usuario en la base de datos mongodb
 */

const mongoose = require("mongoose");

const DireccionesSchema = new mongoose.Schema({
  calle: String,
  número: String,
  ciudad: String,
});
const ContactoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  teléfonos: [String],
  direcciones: [DireccionesSchema],
});
const AgendaSchema = new mongoose.Schema({
  usuarioId: String, //MongodbID del usuario
  usuario: String, //Nombre del usuario al que pertenece la agenda
  contactos: [ContactoSchema],
});

module.exports = mongoose.model("Agenda", AgendaSchema);
