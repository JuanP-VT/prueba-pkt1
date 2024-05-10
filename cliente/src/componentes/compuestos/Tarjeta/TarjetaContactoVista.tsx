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
    <div className="w-full p-5 cursor-pointer hover:bg-slate-100 group relative">
      <Edit
        className="absolute right-2 hover:text-blue-500"
        onClick={() => setEdición(true)}
      />
      <div className="flex gap-5">
        <div className="flex">
          <IconoDePerfil contacto={contacto} />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-xl capitalize">
            {contacto.nombre} {contacto.apellido}
          </p>
          <p className="text-slate-500 text-xs ml-1">{contacto.correo}</p>
        </div>
      </div>
      <div className="flex flex-col p-2 mt-3">
        <p className="text-xs text-blue-500 font-semibold">Teléfonos</p>
        {contacto.teléfonos.map((tel, index) => (
          <div className="flex gap-2 " key={index}>
            <Phone className="text-slate-500 mt-1" />
            <p className="text-slate-500 py-1">{tel}</p>
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
    <div className="rounded-full w-10 font-semibold h-10 bg-slate-200 text-xs p-2 flex items-center justify-center">
      {iniciales.toUpperCase()}
    </div>
  );
}
