/**
 * Validación para peticiones de un nuevo contacto
 */

const z = require("zod");

const ValidarNuevoContacto = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  apellido: z.string({ message: "El apellido debe ser un string" }),
  correo: z.string().email({ message: "El correo no es valido" }),
  teléfonos: z.array(z.string()),
  direcciones: z.array(
    z.object({
      calle: z.string(),
      número: z.string(),
      ciudad: z.string(),
    })
  ),
});

module.exports = ValidarNuevoContacto;
