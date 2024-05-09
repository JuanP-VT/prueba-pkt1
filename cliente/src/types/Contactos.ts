export interface Dirección {
  calle: string;
  número: string;
  ciudad: string;
}
export interface Contacto {
  nombre: string;
  apellido: string;
  correo: string;
  teléfonos: string[];
  direcciones: Dirección[];
}
