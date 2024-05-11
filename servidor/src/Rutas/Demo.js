const express = require("express");
const rutaDemo = express.Router();
const AgendaModelo = require("../Modelos/Agenda");
const AutentificarJWT = require("../middleware/AutentificarJWT");

rutaDemo.post("/", AutentificarJWT, async (req, res) => {
  const id = req.user._id;
  //Extraemos el id del token
  try {
    const agenda = await AgendaModelo.findOne({ usuarioId: id });
    const contactosModificados = [...agenda.contactos, ...ContactosDemo];
    const agendaModificada = await agenda.updateOne({
      contactos: contactosModificados,
    });
    res.json(agendaModificada);
  } catch (error) {
    res.status(500).json({ message: "Error Interno" });
  }
});
module.exports = rutaDemo;

const ContactosDemo = [
  {
    nombre: "Manuel Emiliano",
    apellido: "Zapata Zapata",
    correo: "emilinito@gmail.com",
    teléfonos: ["+51 668 3030"],
    direcciones: [
      {
        calle: "Zapata y madero",
        número: "55",
        ciudad: "Guadalajara",
        _id: "663d86e19ef16e2689767559",
      },
    ],
    _id: "663d86e19ef16e2689767558",
  },
  {
    nombre: "Juan",
    apellido: "Rulfo ",
    correo: "Rulfo@gmail.com",
    teléfonos: ["+51 668889291"],
    direcciones: [
      {
        calle: "Calle 1",
        número: "551",
        ciudad: "Guadalajarax",
        _id: "663d86ee9ef16e2689767561",
      },
    ],
    _id: "663d86ee9ef16e2689767560",
  },
  {
    nombre: "juan",
    apellido: "valdez ",
    correo: "rel@gmail.com",
    teléfonos: ["+51 66832910"],
    direcciones: [
      {
        calle: "Calle viva",
        número: "11",
        ciudad: "Los Grandes",
        _id: "663d89758484d0b461f0f0a6",
      },
    ],
    _id: "663d89758484d0b461f0f0a5",
  },
  {
    nombre: "Jerome",
    apellido: "Alberto",
    correo: "Jalberto@gmail.com",
    teléfonos: ["+52 6630301010", "+66 3310 101010"],
    direcciones: [
      {
        calle: "Kyrome",
        número: "1000",
        ciudad: "Kyrosx",
        _id: "663e42ba097dce3ed4862540",
      },
    ],
    _id: "663e42ba097dce3ed486253e",
  },
  {
    nombre: "Emilia ",
    apellido: "Cervantes",
    correo: "emily@gmail.com",
    teléfonos: ["+33 1020 202010", "+51 2010 99581"],
    direcciones: [
      {
        calle: "Bar Lang Street",
        número: "11",
        ciudad: "RTK City",
        _id: "663ebda5e4eb481047db1268",
      },
      {
        calle: "Angular sucks",
        número: "11",
        ciudad: "just kidding",
        _id: "663ebda5e4eb481047db1269",
      },
    ],
    _id: "663ebda5e4eb481047db1267",
  },
  {
    nombre: "Manuel",
    apellido: "Tocayo",
    correo: "manuel@gmail.com",
    teléfonos: ["6661000"],
    direcciones: [
      {
        calle: "",
        número: "",
        ciudad: "",
        _id: "663ebec6e4eb481047db129b",
      },
    ],
    _id: "663ebec6e4eb481047db129a",
  },
  {
    nombre: "Manolo",
    apellido: "Serrano",
    correo: "xk@gma.com",
    teléfonos: ["101029381929", "10100030020"],
    direcciones: [
      {
        calle: "Calle 1 y 2",
        número: "12",
        ciudad: "JJR",
        _id: "663ebef2e4eb481047db12c7",
      },
    ],
    _id: "663ebef2e4eb481047db12c6",
  },
  {
    nombre: "Diosceline",
    apellido: "Villa",
    correo: "dios@gmail.com",
    teléfonos: ["66100878392"],
    direcciones: [
      {
        calle: "Calle test",
        número: "999",
        ciudad: "Los Cabos",
        _id: "663ebf0fe4eb481047db12f9",
      },
    ],
    _id: "663ebf0fe4eb481047db12f8",
  },
  {
    nombre: "Maria ",
    apellido: "Ines",
    correo: "marinme@gmail.com",
    teléfonos: ["99837194729"],
    direcciones: [
      {
        calle: "Cedrops tree",
        número: "199",
        ciudad: "Guasave",
        _id: "663ebf31e4eb481047db1331",
      },
    ],
    _id: "663ebf31e4eb481047db1330",
  },
  {
    nombre: "Martín Silvano",
    apellido: "Madero",
    correo: "silvi@gmail.com",
    teléfonos: ["399392918"],
    direcciones: [
      {
        calle: "Dead End",
        número: "100",
        ciudad: "Tenerife",
        _id: "663ebf61e4eb481047db136f",
      },
    ],
    _id: "663ebf61e4eb481047db136e",
  },
  {
    nombre: "María",
    apellido: "Villa",
    correo: "david@gmail.com",
    teléfonos: ["18239128319"],
    direcciones: [
      {
        calle: "Zapata y madero",
        número: "555",
        ciudad: "Guadalajara",
        _id: "663ebf97e4eb481047db13b3",
      },
    ],
    _id: "663ebf97e4eb481047db13b2",
  },
  {
    nombre: "María",
    apellido: "Concepción",
    correo: "concha@gmail.com",
    teléfonos: ["20102030"],
    direcciones: [
      {
        calle: "Constitución y madero",
        número: "200",
        ciudad: "Guadalajara",
        _id: "663ec07be4eb481047db1509",
      },
    ],
    _id: "663ec07be4eb481047db1508",
  },
  {
    nombre: "Juan Pedro",
    apellido: "Perez Pereira",
    correo: "PPPP@gmail.com",
    teléfonos: ["6682315188"],
    direcciones: [
      {
        calle: "Patrones",
        número: "22",
        ciudad: "DF",
        _id: "663ec0a3e4eb481047db1559",
      },
    ],
    _id: "663ec0a3e4eb481047db1558",
  },
];
