/**
 * Componente para registrarse o iniciar sesión
 */

import FormularioNuevoUsuario from "../compuestos/FormularioNuevoUsuario";
import { UsuarioID } from "../../types/Usuario";

type Props = {
  usuario: UsuarioID | null;
};
export default function InicioSesión({ usuario }: Props) {
  return (
    <div>
      <FormularioNuevoUsuario usuario={usuario} />
    </div>
  );
}
