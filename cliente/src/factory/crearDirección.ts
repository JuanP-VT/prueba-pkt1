/**
 * Factory function para crear direcciones
 */
import type { Dirección } from "../types/Contactos";

export default function crearDirección(dirección: Dirección): Dirección {
  return {
    calle: dirección.calle,
    número: dirección.número,
    ciudad: dirección.ciudad,
  };
}
