/**
 * Borra el JWT de autentificación del localStorage
 */

export default function borrarJWT() {
  localStorage.removeItem("pkt1-jwt");
  location.reload();
}
