/**
 * Componente para mostrar la agenda de contactos
 */

import { Navigate } from "react-router-dom";
import ListadoDeContactos from "../compuestos/ListadoDeContactos";
import getUsuario from "../../utils/getUsuario";

export default function Agenda() {
  const usuario = getUsuario();
  if (!usuario) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <ListadoDeContactos />
    </div>
  );
}
