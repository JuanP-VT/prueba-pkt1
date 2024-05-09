import { useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { InputLabel } from "@mui/material";

import InputTeléfonos from "./InputTeléfonos";
import { AddCircleOutline } from "@mui/icons-material";
import { Dirección } from "../../types/Contactos";
import crearDirección from "../../factory/crearDirección";
import InputDirecciones from "./InputDirecciones";
import crearContacto from "../../factory/crearContacto";
import { validarCorreo, validarNombre } from "../../validación/Contactos";
import { ZodError } from "zod";
import { PuffLoader } from "react-spinners";
/**
 * Componente para mostrar el formulario de nuevo contacto
 * Nota: Utilicé parte del código de la documentación de Material UI
 * https://mui.com/material-ui/react-dialog/
 */
export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function FormularioFlotante(props: SimpleDialogProps) {
  //En este estado almacenaremos nombre, apellido y correo
  //Dirección y teléfonos tendrán un estado separado para mantener mejor el orden
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });
  //Estado para la lista de teléfonos
  const [teléfonos, setTeléfonos] = useState<string[]>([""]);
  //Estado para la lista de direcciones
  const [direcciones, setDirecciones] = useState<Dirección[]>([
    { calle: "", ciudad: "", número: "" },
  ]);
  //Estado para el feedback
  const [feedback, setFeedback] = useState<string>("");
  const [errorEnElNombre, setErrorEnElNombre] = useState(false);
  const [errorEnElCorreo, setErrorEnElCorreo] = useState(false);
  const [cargando, setCargando] = useState(false);

  //Props del dialog
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };
  async function manejarPetición(ev: React.FormEvent) {
    ev.preventDefault();
    setCargando(true);
    //Limpiamos feedback anterior
    setFeedback("");
    setErrorEnElNombre(false);
    setErrorEnElCorreo(false);
    //Creamos nuevo contacto con los datos del formulario
    const nuevoContacto = crearContacto({
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      correo: formulario.correo,
      direcciones: direcciones,
      teléfonos: teléfonos,
    });
    //Validamos nombre y correo (apellido, direcciones y teléfonos no son obligatorios)
    try {
      validarNombre.parse(nuevoContacto.nombre);
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
      validarCorreo.parse(nuevoContacto.correo);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorJSON = JSON.parse(error.message);
        setFeedback(errorJSON[0].message);
        setErrorEnElCorreo(true);
        setCargando(false);
        return;
      }
    }

    //Buscamos el token para adjuntarlo en el headers de la petición http
    const jwt = JSON.parse(localStorage.getItem("pkt1-jwt") || "{}");

    //Enviar petición al servidor
    const respuesta = await fetch("http://localhost:8080/agenda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify(nuevoContacto),
    });
    if (!respuesta.ok) {
      setCargando(false);
      setFeedback("Error en el servidor");
      return;
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="sm:w-[350px] font-bold text-blue-500">
        Nuevo Contacto
      </DialogTitle>
      <form
        className="p-2 flex flex-col pl-10 justify-center"
        onSubmit={(ev) => manejarPetición(ev)}
      >
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
        <div>
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
          {teléfonos.map((_, index) => (
            <InputTeléfonos
              key={"teléfono " + index}
              teléfonos={teléfonos}
              setTeléfonos={setTeléfonos}
              index={index}
            />
          ))}
        </div>
        <div>
          <div>
            {direcciones.map((_, index) => (
              <InputDirecciones
                key={"dirección " + index}
                direcciones={direcciones}
                setDirecciones={setDirecciones}
                index={index}
              />
            ))}
          </div>
          <div>
            <Button
              className=" w-52"
              onClick={() => {
                const nuevaDirección = crearDirección({
                  calle: "",
                  número: "",
                  ciudad: "",
                });
                setDirecciones([...direcciones, nuevaDirección]);
              }}
            >
              <p className="font-semibold">Agregar Dirección</p>
              <AddCircleOutline className="cursor-pointer my-1 pl-1" />
            </Button>
          </div>
          <div className="mt-10">
            {feedback && <p className="text-red-500 py-2">{feedback}</p>}
            {cargando ? (
              <PuffLoader size={15} />
            ) : (
              <Button type="submit" variant="contained">
                Crear Contacto
              </Button>
            )}
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default function FormularioNuevoContacto() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Contacto
      </Button>
      <FormularioFlotante open={open} onClose={handleClose} />
    </div>
  );
}
