/**
 * Componente para mostrar el botón de sesión
 * Redirige al usuario a la página de inicio de sesión si no está autentificado
 * Borra el JWT de autentificación si lo hay
 */
import { UsuarioID } from "../../types/Usuario";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import borrarJWT from "../../utils/borrarJWT";

type Props = {
  usuario: UsuarioID | null;
};

export default function BotónDeSesión({ usuario }: Props) {
  return (
    <div className="text-xs">
      {usuario ? (
        <Button
          className="text-xs"
          onClick={() => borrarJWT()}
          size="small"
          variant="contained"
          color="info"
        >
          <p className="text-xs">Cerrar Sesión</p>
        </Button>
      ) : (
        <Button size="small" variant="contained" color="primary">
          <Link className="text-xs" to="/auth">
            Iniciar Sesión
          </Link>
        </Button>
      )}
    </div>
  );
}
