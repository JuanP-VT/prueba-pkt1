/**
 *  Barra de navegación principal
 */
import { Link } from "react-router-dom";
import BotónSesión from "../ui/BotónDeSesión";
import getUsuario from "../../utils/getUsuario";

export default function Navegación() {
  const usuario = getUsuario();
  return (
    <div className="w-full h-15 flex border shadow-2xl py-3 rounded-lg justify-around">
      <Link to="/">Inicio</Link>
      <Link to="/agenda">Agenda</Link>
      <BotónSesión usuario={usuario} />
    </div>
  );
}
