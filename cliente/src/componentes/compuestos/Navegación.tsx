import { Link } from "react-router-dom";
import { UsuarioID } from "../../types/Usuario";
import BotónSesión from "../ui/BotónDeSesión";

type Props = {
  usuario: UsuarioID | null;
};
export default function Navegación({ usuario }: Props) {
  return (
    <div className="w-full h-15 flex border shadow-2xl py-3 rounded-lg justify-around">
      <Link to="/">Inicio</Link>
      <Link to="/agenda">Agenda</Link>
      <BotónSesión usuario={usuario} />
    </div>
  );
}
