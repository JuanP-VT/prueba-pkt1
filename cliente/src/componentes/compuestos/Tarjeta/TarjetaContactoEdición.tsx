/* eslint-disable react-refresh/only-export-components */
import { Contacto } from "../../../types/Contactos";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";
import { useState } from "react";
import InputTeléfonos from "../InputTeléfonos";
import { Button } from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import InputDirecciones from "../InputDirecciones";
import { Undo } from "@mui/icons-material";
import crearContacto from "../../../factory/crearContacto";
import { validarCorreo, validarNombre } from "../../../validación/Contactos";
import { ZodError } from "zod";
import { PuffLoader } from "react-spinners";
import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
type Props = {
  contacto: Contacto;
  setEdición: React.Dispatch<React.SetStateAction<boolean>>;
};
/**
 * Componente para mostrar la tarjeta de contacto en modo edición
 * Tiene funcionalidad para editar y borrar un contacto
 */

export default function TarjetaContactoEdición({
  contacto,
  setEdición,
}: Props) {
  //Estado para guardar la información del contacto
  const [formulario, setFormulario] = useState(contacto);
  const [teléfonos, setTeléfonos] = useState(contacto.teléfonos);
  const [direcciones, setDirecciones] = useState(contacto.direcciones);
  //Estados para el feedback
  const [feedback, setFeedback] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorEnElNombre, setErrorEnElNombre] = useState(false);
  const [errorEnElCorreo, setErrorEnElCorreo] = useState(false);
  //Estado para el modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Definimos la función para manejar la edición del contacto
  async function manejarEdición(ev: React.FormEvent) {
    setCargando(true);
    setFeedback("");
    ev.preventDefault();
    //Creamos un objecto representando el contacto
    const contactoEditado = crearContacto({
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      correo: formulario.correo,
      teléfonos: teléfonos,
      direcciones: direcciones,
    });
    //Agregamos el id
    const contactoConID = { ...contactoEditado, _id: contacto._id };
    //Validamos nombre y correo
    try {
      validarNombre.parse(contactoConID.nombre);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorJSON = JSON.parse(error.message);
        setFeedback(errorJSON[0].message);
        setErrorEnElNombre(true);
        setCargando(false);
        return;
      }
    }
    try {
      validarCorreo.parse(contactoConID.correo);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorJSON = JSON.parse(error.message);
        setFeedback(errorJSON[0].message);
        setErrorEnElCorreo(true);
        setCargando(false);
        return;
      }
    }
    //Enviar solicitud

    //Buscamos el token para adjuntarlo en el headers de la petición http
    const jwt = JSON.parse(localStorage.getItem("pkt1-jwt") || "{}");

    const respuesta = await fetch("http://localhost:8080/agenda", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify(contactoConID),
    });

    if (!respuesta.ok) {
      setCargando(false);
      setFeedback("Error en el servidor");
    }
    setFeedback("Contacto editado exitosamente");
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  //Definimos la función para manejar la eliminación del contacto
  async function manejarEliminación(_id: string) {
    //Buscamos el token para adjuntarlo en el headers de la petición http
    const jwt = JSON.parse(localStorage.getItem("pkt1-jwt") || "{}");
    const respuesta = await fetch("http://localhost:8080/agenda", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify({ _id }),
    });

    if (respuesta.ok) {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
  return (
    <div className="flex flex-col items-center relative p-2 py-5 ">
      <Undo
        className="absolute right-2 hover:text-blue-500 cursor-pointer"
        onClick={() => setEdición(false)}
      />
      <DeleteOutline
        className="absolute right-2 top-14 hover:text-red-500 cursor-pointer"
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <h2 id="unstyled-modal-title" className="modal-title relative px-10">
            ¿Estas seguro de querer eliminar este contacto?
          </h2>
          <Button
            variant="contained"
            onClick={() => manejarEliminación(contacto._id ?? "")}
          >
            Borrar
          </Button>
          <Undo
            className="absolute right-2 top-1 hover:text-blue-500 cursor-pointer"
            onClick={handleClose}
          />
        </ModalContent>
      </Modal>
      <form onSubmit={(ev) => manejarEdición(ev)}>
        <div>
          <InputLabel htmlFor="nombre">Nombre</InputLabel>
          <TextField
            value={formulario.nombre}
            error={errorEnElNombre}
            onChange={(e) =>
              setFormulario({ ...formulario, nombre: e.target.value })
            }
            inputProps={{ "data-testid": "nombre" }}
            size="small"
            placeholder="Nombre del contacto"
          />
        </div>
        <div className="mt-2">
          <InputLabel htmlFor="apellido">Apellido</InputLabel>
          <TextField
            value={formulario.apellido}
            onChange={(e) =>
              setFormulario({ ...formulario, apellido: e.target.value })
            }
            inputProps={{ "data-testid": "apellido" }}
            size="small"
            placeholder="Apellido del contacto"
          />
        </div>
        <div className="mt-2">
          <InputLabel htmlFor="correo">Correo</InputLabel>
          <TextField
            value={formulario.correo}
            error={errorEnElCorreo}
            onChange={(e) =>
              setFormulario({ ...formulario, correo: e.target.value })
            }
            inputProps={{ "data-testid": "correo" }}
            size="small"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="flex flex-col">
          <div>
            {teléfonos.map((_, index) => (
              <InputTeléfonos
                key={"teléfono" + index}
                teléfonos={teléfonos}
                setTeléfonos={setTeléfonos}
                index={index}
              />
            ))}
            <Button
              size="small"
              onClick={() => {
                setTeléfonos([...teléfonos, ""]); //Agrega una string vacía
              }}
              className="w-52 "
            >
              <p className="font-semibold">Agregar Teléfono</p>
              <AddCircleOutline className="cursor-pointer my-1 pl-1" />
            </Button>
          </div>
          <div>
            {direcciones.map((_, index) => (
              <InputDirecciones
                key={"dir" + index}
                index={index}
                direcciones={direcciones}
                setDirecciones={setDirecciones}
              />
            ))}
            <Button
              size="small"
              onClick={() => {
                setDirecciones([
                  ...direcciones,
                  { calle: "", número: "", ciudad: "" },
                ]); //Agrega una string vacía
              }}
              className="w-52 "
            >
              <p className="font-semibold">Agregar Dirección</p>
              <AddCircleOutline className="cursor-pointer my-1 pl-1" />
            </Button>
          </div>
        </div>
        {feedback && (
          <p className="text-red-500 text-xs font-semibold mt-2">{feedback}</p>
        )}

        {cargando ? (
          <PuffLoader size={20} />
        ) : (
          <div className="mt-5">
            <Button className="" type="submit" variant="contained">
              Actualizar
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

/**
 * Código para el componente modal
 * Información de https://mui.com/base-ui/react-modal/
 */
const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

export const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
