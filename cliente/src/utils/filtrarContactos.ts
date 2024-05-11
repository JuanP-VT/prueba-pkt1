/**
 * Función para filtrar contactos por nombre, apellido, correo, teléfonos o direcciones
 *
 */
import { Contacto } from "../types/Contactos";
export default function filtrarContactos(
  contactos: Contacto[] | undefined,
  filtro: string,
) {
  // Si no hay contactos, retornamos un array vacío
  if (!contactos) {
    return [];
  }
  return contactos.filter((contacto) => {
    return (
      contacto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      contacto.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
      contacto.correo.toLowerCase().includes(filtro.toLowerCase()) ||
      contacto.teléfonos.some((tel) => tel.includes(filtro)) ||
      contacto.direcciones.some((dir) =>
        dir.calle.toLowerCase().includes(filtro.toLowerCase()),
      ) ||
      contacto.direcciones.some((dir) =>
        dir.ciudad.toLowerCase().includes(filtro.toLowerCase()),
      ) ||
      contacto.direcciones.some((dir) =>
        dir.número.toLowerCase().includes(filtro.toLowerCase()),
      )
    );
  });
}
