import { useGetAgendaQuery } from "../../store/api/contactosApi";
import { ClipLoader } from "react-spinners";
import { Agenda, Contacto } from "../../types/Contactos";
import TarjetaDeContacto from "./TarjetaDeContacto";
import { Button, Input } from "@mui/material";
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
  //Estado de carga para el botón de demo
  // Usaremos type assertion para sobreponer el tipo Agenda

  const agenda = data as Agenda;
  const contactosFiltrados = filtrarContactos(agenda?.contactos, filtro);
  //Organizar nombre por orden alfabético
  const contactosOrganizados = contactosFiltrados.sort((a, b) =>
    a.nombre.localeCompare(b.nombre),
  );
  const contactosPaginados = crearPaginación(
    contactosOrganizados,
    6,
  ) as Contacto[][];
  //efecto para corregir la página actual si se llega a salir de limite del array
  useEffect(() => {
    if (páginaActual > contactosPaginados.length) {
      setPáginaActual(1);
    }
  }, [contactosPaginados.length, páginaActual]);

  return (
    <div className="flex w-full flex-col justify-center">
      {isLoading && <ClipLoader size={50} className="self-center" />}
      {/*/ Este botón es extra, llama a la API para cargar datos de prueba en la base de datos */}
      {data?.contactos.length === 0 && !isLoading && (
        <Button
          onClick={async () => {
            const jwt = JSON.parse(localStorage.getItem("pkt1-jwt") || "{}");
            const respuesta = await fetch(
              "https://pkt1-prueba-api.fly.dev/demo",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt.token}`,
                },
              },
            );

            if (respuesta.ok) {
              location.reload();
            }
          }}
          style={{ backgroundColor: "#7caaee" }}
          variant="contained"
        >
          Cargar Demo
        </Button>
      )}
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
            {contactosPaginados[páginaActual - 1]?.map((contacto, index) => (
              <TarjetaDeContacto
                key={"contacto " + index}
                contacto={contacto}
              />
            ))}
          </div>
          {contactosFiltrados.length === 0 && (
            <p className="py-5 text-center">No se encontraron contactos</p>
          )}
          <div className="my-3">
            <Stack spacing={2}>
              <Pagination
                page={páginaActual}
                count={contactosPaginados.length}
                color="primary"
                onChange={(_, page) => {
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
