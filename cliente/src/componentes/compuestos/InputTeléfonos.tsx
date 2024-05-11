/**
 * Componente para poder guardar y modificar teléfonos en el estado
 */

import { TextField } from "@mui/material";
import { HighlightOff } from "@mui/icons-material";

type Props = {
  teléfonos: string[];
  setTeléfonos: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
};
export default function InputTeléfonos({
  teléfonos,
  setTeléfonos,
  index,
}: Props) {
  return (
    <div className="flex  flex-col pt-1">
      <div className="flex pb-1">
        <p className="font-semibold">Teléfono {index + 1}</p>
        <HighlightOff
          data-testid={`delete-${index}`}
          className=" ml-2 mt-1 cursor-pointer pl-1 hover:text-red-500 "
          onClick={() => {
            setTeléfonos((teléfonos) =>
              teléfonos.filter((_, i) => i !== index),
            ); //Remueve el teléfono del state basado en su indice
          }}
        />
      </div>
      <div className="flex ">
        <TextField
          size="small"
          value={teléfonos[index]}
          onChange={(e) => {
            const teléfonosModificados = [...teléfonos];
            teléfonosModificados[index] = e.target.value;
            setTeléfonos(teléfonosModificados);
          }}
        />
      </div>
    </div>
  );
}
