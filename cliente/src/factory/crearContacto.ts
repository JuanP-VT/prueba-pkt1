/**
 * Factory function para crear contactos
 */

import { Contacto } from "../types/Contactos";

export default function crearContacto(contacto: Contacto): Contacto {
  return {
    nombre: contacto.nombre,
    apellido: contacto.apellido,
    correo: contacto.correo,
    teléfonos: contacto.teléfonos,
    direcciones: contacto.direcciones,
  };
}
