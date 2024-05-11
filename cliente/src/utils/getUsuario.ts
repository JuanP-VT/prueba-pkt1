/**
 * Retorna al usuario si está autenticado o null si no lo está
 * Utiliza local storage
 */
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UsuarioID } from "../types/Usuario";
export default function getUsuario(): UsuarioID | null {
  const jwt = JSON.parse(localStorage.getItem("pkt1-jwt") || "{}");
  if (!jwt.token) {
    return null;
  }
  //Extendemos la interfaz del payload para que typescript sepa del contenido
  interface UsuarioJwtPayload extends JwtPayload {
    _id: string;
    nombre: string;
  }
  const decode = jwtDecode(jwt.token) as UsuarioJwtPayload;
  if (decode._id && decode.nombre) {
    return {
      nombre: decode.nombre,
      _id: decode._id,
    };
  }
  return null;
}
