/**
 *  Barra de navegación principal
 */
import { Link } from "react-router-dom";
import BotónSesión from "../ui/BotónDeSesión";
import getUsuario from "../../utils/getUsuario";

export default function Navegación() {
  const usuario = getUsuario();
  return (
    <div className="h-15 flex w-full justify-center gap-3 rounded-lg border  bg-slate-200 py-3 sm:justify-around ">
      <Link className="font-bold  hover:text-blue-500" to="/">
        Inicio
      </Link>
      <Link className="font-bold  hover:text-blue-500 " to="/agenda">
        Agenda
      </Link>
      {usuario && <p className="capitalize underline">{usuario?.nombre}</p>}
      <BotónSesión usuario={usuario} />
    </div>
  );
}
