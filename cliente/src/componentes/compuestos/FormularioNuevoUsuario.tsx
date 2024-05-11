import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import { Usuario } from "../../types/Usuario";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { PuffLoader } from "react-spinners";
import { ZodError } from "zod";
import {
  validarContraseña,
  validarNombreDeUsuario,
} from "../../validación/Usuario";
import { Navigate } from "react-router-dom";
import getUsuario from "../../utils/getUsuario";
/**
 *
 * Componente para registrar nuevos usuarios
 */

export default function FormularioNuevoUsuario() {
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
  const [errorEnElNombre, setErrorEnElNombre] = useState(false);
  const [errorEnLaContraseña, setErrorEnLaContraseña] = useState(false);
  //Desviar al usuario si ya está autenticado
  if (usuario) {
    return <Navigate to={"/"} />;
  }
  //Definimos la función para manejar la petición del formulario
  async function manejarPetición(ev: React.FormEvent) {
    setCargando(true);
    //Prevenimos la recarga de la página
    ev.preventDefault();
    //Limpiamos el estado del feedback
    setFeedback("");
    setErrorEnElNombre(false);
    setErrorEnLaContraseña(false);
    //Validamos la solicitud antes de enviar
    try {
      validarNombreDeUsuario.parse(formulario.nombre);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorJSON = JSON.parse(error.message);
        setFeedback(errorJSON[0].message);
        setErrorEnElNombre(true);
        setCargando(false);
      }
      return;
    }
    try {
      validarContraseña.parse(formulario.contraseña);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorJSON = JSON.parse(error.message);
        setFeedback(errorJSON[0].message);
        setErrorEnLaContraseña(true);
        setCargando(false);
      }
      return;
    }

    //Enviar petición http al endpoint
    try {
      const respuesta = await fetch("http://localhost:8080/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });
      const data = await respuesta.json();

      //Mostramos feedback de la petición
      if (respuesta.status === 409) {
        setFeedback("El nombre de usuario ya está registrado");
        setErrorEnElNombre(true);
        setCargando(false);
        return;
      }
      //Recargamos la página después de una solicitud exitosa
      if (respuesta.ok) {
        setFeedback("Usuario creado exitosamente");
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        //Se puede extender más la validación dependiendo de los requerimientos
        setFeedback(data.message);
      }
    } catch (error) {
      //Si falla el fetch
      setFeedback("Error al conectar con el servidor");
      setCargando(false);
    }
  }
  return (
    <div className="flex w-full justify-center">
      <form
        onSubmit={(ev) => manejarPetición(ev)}
        className="flex flex-col gap-2 p-3 sm:w-[300px]"
      >
        <h1 className="p-2 font-semibold">Registrar Nuevo Usuario</h1>
        <TextField
          inputProps={{ "data-testid": "nombre" }}
          error={errorEnElNombre}
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
            error={errorEnLaContraseña}
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
              Registrar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
