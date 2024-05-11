import { Contacto } from "../../../types/Contactos";
import { Phone } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Edit } from "@mui/icons-material";
type Props = {
  contacto: Contacto;
  setEdición: React.Dispatch<React.SetStateAction<boolean>>;
};
/**
 * Representa la vista de un contacto en la agenda
 */
export default function TarjetaContactoVista({ contacto, setEdición }: Props) {
  return (
    <div className="group relative w-full cursor-pointer p-5 hover:bg-slate-100">
      <Edit
        className="absolute right-2 hover:text-blue-500"
        onClick={() => setEdición(true)}
      />
      <div className="flex gap-5">
        <div className="flex">
          <IconoDePerfil contacto={contacto} />
        </div>
        <div className="flex w-full flex-col">
          <p className="w-10/12 text-xl font-bold capitalize">
            {contacto.nombre.trim()} {contacto.apellido.trim()}
          </p>
          <p className="ml-1 text-xs text-slate-500">{contacto.correo}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-col p-2">
        <p className="text-xs font-semibold text-blue-500">Teléfonos</p>
        {contacto.teléfonos.map((tel, index) => (
          <div className="flex gap-2 " key={index}>
            <Phone className="mt-1 text-slate-500" />
            <p className="py-1 text-slate-500">{tel}</p>
          </div>
        ))}
      </div>
      <div>
        <Accordion className="group group-hover:bg-sky-50">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Direcciones
          </AccordionSummary>
          <AccordionDetails>
            {contacto.direcciones.map((dir, index) => (
              <p key={index}>
                {index + 1} - {dir.calle} {dir.número}, {dir.ciudad}
              </p>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
type PropsDelIcono = {
  contacto: Contacto;
};
function IconoDePerfil({ contacto }: PropsDelIcono) {
  //Conseguimos la primera letra del nombre y la primera letra del apellido
  const iniciales = `${contacto.nombre[0]}${contacto.apellido[0] ?? ""}`;
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 p-2 text-xs font-semibold">
      {iniciales.toUpperCase()}
    </div>
  );
}
