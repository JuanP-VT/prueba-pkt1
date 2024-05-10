/**
 * Componente para poder guardar y modificar direcciones en el estado
 */

import { InputLabel, TextField } from "@mui/material";
import { Dirección } from "../../types/Contactos";
import { HighlightOff } from "@mui/icons-material";

type Props = {
  direcciones: Dirección[];
  setDirecciones: React.Dispatch<React.SetStateAction<Dirección[]>>;
  index: number;
};

export default function InputDirecciones({
  direcciones,
  setDirecciones,
  index,
}: Props) {
  return (
    <div>
      <div className="flex mt-5">
        <p className="font-semibold ">Dirección {index + 1}</p>
        <HighlightOff
          className="self-center mt-1  cursor-pointer hover:text-red-500 ml-1 pl-1"
          onClick={() =>
            setDirecciones(direcciones.filter((_, i) => i !== index))
          }
        />
      </div>
      <InputLabel>Calle</InputLabel>
      <TextField
        size="small"
        inputProps={{ "data-testid": `calle${index}` }}
        value={direcciones[index].calle}
        onChange={(e) => {
          const direccionesModificadas = [...direcciones];
          direccionesModificadas[index] = {
            ...direcciones[index],
            calle: e.target.value,
          };
          setDirecciones(direccionesModificadas);
        }}
      />
      <InputLabel>Número</InputLabel>
      <TextField
        size="small"
        type="number"
        value={direcciones[index].número}
        onChange={(e) => {
          const direccionesModificadas = [...direcciones];
          direccionesModificadas[index] = {
            ...direcciones[index],
            número: e.target.value,
          };
          setDirecciones(direccionesModificadas);
        }}
      />
      <InputLabel>Ciudad</InputLabel>
      <TextField
        size="small"
        value={direcciones[index].ciudad}
        onChange={(e) => {
          const direccionesModificadas = [...direcciones];
          direccionesModificadas[index] = {
            ...direcciones[index],
            ciudad: e.target.value,
          };
          setDirecciones(direccionesModificadas);
        }}
      />
    </div>
  );
}
