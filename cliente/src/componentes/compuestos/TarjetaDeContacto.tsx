/**
 * Componente para representar un contacto en la agenda
 * Tiene funcionalidad para editar y borrar un contacto
 */

import { Contacto } from "../../types/Contactos";
import { useState } from "react";
import TarjetaContactoVista from "./Tarjeta/TarjetaContactoVista";
import TarjetaContactoEdición from "./Tarjeta/TarjetaContactoEdición";
type Props = {
  contacto: Contacto;
};

export default function TarjetaDeContacto({ contacto }: Props) {
  //Estado indicar al componente si mostrar el modo de edición o no
  const [edición, setEdición] = useState(false);
  return (
    <div className="w-[400px] border rounded-xl ">
      {edición ? (
        <TarjetaContactoEdición contacto={contacto} setEdición={setEdición} />
      ) : (
        <TarjetaContactoVista contacto={contacto} setEdición={setEdición} />
      )}
    </div>
  );
}
