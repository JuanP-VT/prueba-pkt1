import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { Usuario } from "../../types/Usuario";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import getUsuario from "../../utils/getUsuario";
/**
 * Componente para mostrar el formulario de inicio de sesión
 * Si el usuario ya está autenticado, redirige a la página principal
 *
 * Contiene validación y feedback
 */

export default function FormularioInicioDeSesión() {
  const usuario = getUsuario();
  //Estado para guardar la información del usuario
  const [formulario, setFormulario] = useState<Usuario>({
    nombre: "",
    contraseña: "",
  });
  //Estado para mostrar la contraseña en el campo
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  //Estado para indicar al componente cuando se está esperando la respuesta de una solicitud http
  const [cargando, setCargando] = useState(false);
  //Estados para mostrar feedback de la validación
  const [feedBack, setFeedback] = useState("");

  //Desviar al usuario si ya está autenticado
  if (usuario) {
    return <Navigate to={"/agenda"} />;
  }
  //Manejar la petición para iniciar sesión
  async function manejarPetición(ev: React.FormEvent) {
    setCargando(true);
    ev.preventDefault();
    try {
      const respuesta = await fetch("https://pkt1-prueba-api.fly.dev/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formulario }),
      });
      if (respuesta.ok) {
        setFeedback("Bienvenido");
        //Guardar el token en estado global
        const jwt = await respuesta.json();
        localStorage.setItem("pkt1-jwt", JSON.stringify(jwt));
        //Redirigir al usuario
        setTimeout(() => {
          location.href = "/agenda";
        }, 1000);
      } else {
        setCargando(false);
        setFeedback("Credenciales incorrectas");
      }
    } catch (error) {
      setCargando(false);
      setFeedback("Error en el servidor");
    }
  }
  return (
    <div className="flex  w-full flex-col items-center justify-center">
      <div className="flex max-w-[300px] flex-col">
        <form
          onSubmit={(ev) => manejarPetición(ev)}
          className="flex flex-col gap-2 p-3 sm:w-[300px]"
        >
          <h1 className="p-2 font-semibold">Iniciar Sesión</h1>
          <TextField
            inputProps={{ "data-testid": "nombre" }}
            value={formulario.nombre}
            onChange={(ev) =>
              setFormulario({ ...formulario, nombre: ev.target.value })
            }
            size="small"
            placeholder="Nombre de usuario"
            className="w-full"
          >
            Nombre De Usuario
          </TextField>
          <div className="relative flex">
            <TextField
              inputProps={{ "data-testid": "contraseña" }}
              value={formulario.contraseña}
              onChange={(ev) =>
                setFormulario({ ...formulario, contraseña: ev.target.value })
              }
              type={mostrarContraseña ? "text" : "password"}
              size="small"
              placeholder="Contraseña"
              className="w-full"
            >
              Contraseña
            </TextField>
            {mostrarContraseña ? (
              <Visibility
                className="absolute right-1 top-2 cursor-pointer text-slate-300"
                onClick={() => setMostrarContraseña(false)}
              />
            ) : (
              <VisibilityOff
                className="absolute right-1 top-2 cursor-pointer text-slate-300"
                onClick={() => setMostrarContraseña(true)}
              />
            )}
          </div>
          {feedBack && <p className="p-1 text-sm font-semibold">{feedBack}</p>}
          <div>
            {cargando ? (
              <PuffLoader size={20} color="#1976d2" className="text-red-500" />
            ) : (
              <Button
                style={{ backgroundColor: "#3dae2b" }}
                color="primary"
                disabled={cargando}
                type="submit"
                variant="contained"
              >
                Iniciar Sesión
              </Button>
            )}
          </div>
        </form>
        <div className="flex flex-col px-2">
          <p className="p-1 text-sm font-semibold">¿No tienes cuenta?</p>
          <Link
            className="ml-2 text-sm font-bold text-pktVerde hover:text-pktAzul"
            to="/registrar"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
