/**
 * Validación para peticiones de nuevos usuarios
 */

const z = require("zod");
const ValidarUsuario = z.object({
  nombre: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(50, { message: "La longitud maxima es de 50 caracteres" }),
  contraseña: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .max(50, { message: "La longitud maxima es de 50 caracteres" }),
});

module.exports = ValidarUsuario;
