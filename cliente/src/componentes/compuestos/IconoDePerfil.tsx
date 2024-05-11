type Props = {
  nombre: string;
  apellido: string;
};
export default function IconoDePerfil({ nombre, apellido }: Props) {
  //Conseguimos la primera letra del nombre y la primera letra del apellido
  const iniciales = `${nombre[0]}${apellido[0] ?? ""}`; //verifica que no sea null
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 p-2 text-xs font-semibold">
      {iniciales.toUpperCase()}
    </div>
  );
}
