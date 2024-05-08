import z from "zod";
/**
 * Validación para peticiones de nuevos usuarios
 */
const validarNombreDeUsuario = z
  .string()
  .min(4, { message: "La longitud minima del nombre es de 4 caracteres" })
  .max(50, { message: "La longitud maxima es de 50 caracteres" });
const validarContraseña = z
  .string()
  .min(5, { message: "La longitud minima de la contraseña es de 5 caracteres" })
  .max(50, {
    message: "La longitud maxima de la contraseña es de 50 caracteres",
  });
export { validarNombreDeUsuario, validarContraseña };
