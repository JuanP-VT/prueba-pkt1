import IconoDePerfil from "../IconoDePerfil";
import { Star } from "@mui/icons-material";
/**
 * Componente para mostrar una tarjeta de review en la página inicial
 */

type Props = {
  nombre: string;
  apellido: string;
  puesto: string;
  comentario: string;
};

export default function TarjetaReview({
  nombre,
  apellido,
  puesto,
  comentario,
}: Props) {
  return (
    <div className="relative rounded-xl border  bg-cyan-50 p-7 sm:h-72 sm:w-96">
      <div className="flex ">
        <IconoDePerfil nombre={nombre} apellido={apellido} />
        <div className="ml-3 flex flex-col">
          <p className="font-semibold capitalize">
            {nombre} {apellido}
          </p>
          <p className="text-slate-700">{puesto}</p>
        </div>
      </div>
      <div className="my-4">{comentario}</div>
      <div className="absolute bottom-3 flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="ml-1 mt-1  text-yellow-500" />
        ))}
      </div>
    </div>
  );
}
