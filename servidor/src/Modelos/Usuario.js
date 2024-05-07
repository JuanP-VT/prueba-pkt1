/**
 * Representa el esquema de un usuario en la base de datos mongodb
 */
const mongoose = require("mongoose");
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  contraseña: String,
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);
