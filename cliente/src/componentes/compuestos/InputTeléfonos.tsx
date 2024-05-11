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
    <div className="flex  pt-1 flex-col">
      <div className="flex pb-1">
        <p className="font-semibold">Teléfono {index + 1}</p>
        <HighlightOff
          data-testid={`delete-${index}`}
          className=" mt-1 cursor-pointer hover:text-red-500 ml-2 pl-1 "
          onClick={() => {
            setTeléfonos((teléfonos) =>
              teléfonos.filter((_, i) => i !== index)
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
