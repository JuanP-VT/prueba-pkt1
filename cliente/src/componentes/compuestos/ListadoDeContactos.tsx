import { useGetAgendaQuery } from "../../store/api/contactosApi";
import { ClipLoader } from "react-spinners";
import { Agenda, Contacto } from "../../types/Contactos";
import TarjetaDeContacto from "./TarjetaDeContacto";
import { Input } from "@mui/material";
import FormularioNuevoContacto from "./FormularioNuevoContacto";
import { useEffect, useState } from "react";
import filtrarContactos from "../../utils/filtrarContactos";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import crearPaginación from "../../utils/crearPaginación";
/**
 *  Componente para mostrar el listado de contactos
 *
 */
export default function ListadoDeContactos() {
  //Cargamos los contactos
  const { data, isLoading } = useGetAgendaQuery({});
  //Estado para el filtro
  const [filtro, setFiltro] = useState("");
  //Estado para la paginación
  const [páginaActual, setPáginaActual] = useState(1);
  // Usaremos type assertion para sobreponer el tipo Agenda
  const agenda = data as Agenda;
  const contactosFiltrados = filtrarContactos(agenda?.contactos, filtro);
  const contactosFiltradosPaginados = crearPaginación(
    contactosFiltrados,
    6,
  ) as Contacto[][];
  //efecto para corregir la página actual si se llega a salir de limite del array
  useEffect(() => {
    if (páginaActual > contactosFiltradosPaginados.length) {
      setPáginaActual(1);
    }
  }, [contactosFiltradosPaginados.length, páginaActual]);

  return (
    <div className="flex w-full flex-col justify-center">
      {isLoading && <ClipLoader size={50} className="self-center" />}

      {data && (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex w-full justify-center gap-3 p-5">
            <FormularioNuevoContacto />
            <Input
              placeholder="Buscar"
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-5 sm:grid md:grid-cols-2">
            {contactosFiltradosPaginados[páginaActual - 1]?.map(
              (contacto, index) => (
                <TarjetaDeContacto
                  key={"contacto " + index}
                  contacto={contacto}
                />
              ),
            )}
          </div>
          {contactosFiltrados.length === 0 && (
            <p className="py-5 text-center">No se encontraron contactos</p>
          )}
          <div>
            <Stack spacing={2}>
              <Pagination
                page={páginaActual}
                count={contactosFiltradosPaginados.length}
                color="primary"
                onChange={(ev, page) => {
                  setPáginaActual(page);
                }}
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}
