/**
 *  Barra de navegación principal
 */
import { Link } from "react-router-dom";
import BotónSesión from "../ui/BotónDeSesión";
import getUsuario from "../../utils/getUsuario";

export default function Navegación() {
  const usuario = getUsuario();
  return (
    <div className="h-15 flex w-full justify-around rounded-lg border py-3 shadow-2xl">
      <Link to="/">Inicio</Link>
      <Link to="/agenda">Agenda</Link>
      <BotónSesión usuario={usuario} />
    </div>
  );
}
