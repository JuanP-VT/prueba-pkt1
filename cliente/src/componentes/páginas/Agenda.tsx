/**
 * Componente para mostrar la agenda de contactos
 */

import { redirect } from "react-router-dom";

import FormularioNuevoContacto from "../compuestos/FormularioNuevoContacto";
import ListadoDeContactos from "../compuestos/ListadoDeContactos";
import getUsuario from "../../utils/getUsuario";

export default function Agenda() {
  const usuario = getUsuario();
  if (!usuario) {
    redirect("/auth");
    return;
  }
  return (
    <div>
      <FormularioNuevoContacto />
      <ListadoDeContactos />
    </div>
  );
}
