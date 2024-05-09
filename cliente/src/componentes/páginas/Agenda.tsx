/**
 * Componente para mostrar la agenda de contactos
 */

import { redirect } from "react-router-dom";
import { UsuarioID } from "../../types/Usuario";
import FormularioNuevoContacto from "../compuestos/FormularioNuevoContacto";

type Props = {
  usuario: UsuarioID | null;
};

export default function Agenda({ usuario }: Props) {
  if (!usuario) {
    redirect("/auth");
    return;
  }
  return (
    <div>
      <FormularioNuevoContacto />
    </div>
  );
}
