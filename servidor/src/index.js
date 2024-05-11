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
const rutaAuth = require("./Rutas/Auth");
const rutaAgenda = require("./Rutas/Agenda");
const rutaDemo = require("./Rutas/Demo");
app.use("/usuario", rutaUsuarios);
app.use("/auth", rutaAuth);
app.use("/agenda", rutaAgenda);
app.use("/demo", rutaDemo);
app.listen(3000);
