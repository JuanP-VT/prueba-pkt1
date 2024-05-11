/**
 * Representa la estructura de la agenda de contactos
 */
export interface Dirección {
  calle: string;
  número: string;
  ciudad: string;
}
export interface Contacto {
  _id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  teléfonos: string[];
  direcciones: Dirección[];
}

export interface Agenda {
  contactos: Contacto[];
  usuario: string;
  usuarioId: string;
}
