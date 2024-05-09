import z from "zod";

const validarNombre = z.string().min(1, {
  message: "El nombre es requerido",
});
const validarCorreo = z.string().email({
  message: "El correo no es valido",
});

export { validarCorreo, validarNombre };
