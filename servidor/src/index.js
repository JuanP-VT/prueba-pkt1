const express = require("express");
const mongoose = require("mongoose");
//Configuración de dotenv para las variables de entorno
require("dotenv").config();
const app = express();
app.use(express.json()); // permite a la app utilizar JSON

//Cors
const cors = require("cors"); //habilita CORS para poder hacer y recibir peticiones
app.use(cors());

//Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI);
app.get("/", async (req, res) => {
  res.send("Hola mundo");
});
//Rutas
const rutaUsuarios = require("./Rutas/Usuario");
app.use("/usuario", rutaUsuarios);
app.listen(process.env.PORT || 8080);