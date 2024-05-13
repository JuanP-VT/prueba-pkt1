import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import TarjetaReview from "../compuestos/Tarjeta/TarjetaReview";

export default function Inicio() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-center justify-center gap-3 bg-zinc-100 p-6 sm:pt-20 md:flex-row md:p-10">
        <div className="flex  flex-col gap-3">
          <p className="text-center text-4xl font-bold sm:text-6xl">
            Nunca Vuelvas A <br />
            Perder Tus Contactos
          </p>
          <p className="max-w-[600px] text-xl text-slate-600">
            PKTContacto es la mejor app para mantener tus contactos seguros,
            organizados y sincronizados en la nube.
          </p>
          <Button style={{ backgroundColor: "#7caaee" }} variant="contained">
            <Link className="w-full" to="/agenda">
              Comienza
            </Link>
          </Button>
        </div>
        <div>
          <img
            src="/pkt1contacto.png"
            className="w-full rounded-xl sm:w-[600px] "
          />
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-sky-100">
        <div className="t mt-10 flex justify-center">
          <p className="rounded-lg bg-slate-200 p-3 text-center text-xs font-semibold">
            Funcionalidades
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="mt-5 p-1 py-4 text-center text-4xl font-bold">
            Una Poderosa Herramienta Para Manejar Tus Contactos
          </p>
          <p className="max-w-[700px] p-1 text-center text-xl text-slate-600">
            PKTContacto ofrece una gran variedad de funcionalidades para
            mantener tus contactos seguros, organizados y accesibles desde todos
            tus dispositivos
          </p>
        </div>
        <div className="mt-5  flex flex-col justify-center gap-5 p-3 sm:grid sm:grid-cols-2 sm:p-16 lg:grid-cols-3">
          <div className="flex flex-col">
            <p className="p-2 text-lg font-bold ">Restauración y Respaldo</p>
            <p className="px-2 text-sm text-slate-600">
              Guarda fácilmente tus contactos en la nube desde cualquier parte
            </p>
          </div>
          <div className="flex flex-col">
            <p className="p-2 text-lg font-bold ">Sincronización En La Nube</p>
            <p className="px-2 text-sm text-slate-600">
              Mantenga sus contactos actualizados y accesibles en todos sus
              dispositivos
            </p>
          </div>

          <div className="flex flex-col">
            <p className="p-2 text-lg font-bold ">Organización</p>
            <p className="px-2 text-sm text-slate-600">
              Clasifique y administre sus contactos con etiquetas y filtros
              personalizados
            </p>
          </div>
          <div className="flex flex-col">
            <p className="p-2 text-lg font-bold">Búsqueda Inteligente</p>
            <p className="px-2 text-sm text-slate-600">
              Encuentre rápidamente cualquier contacto con capacidades de
              búsqueda avanzada
            </p>
          </div>
          <div className="flex flex-col">
            <p className="p-2 text-lg font-bold ">Seguro y Privado</p>
            <p className="px-2 text-sm text-slate-600">
              Sus contactos están almacenados de forma segura, sin acceso de
              terceros
            </p>
          </div>
          <div className="flex flex-col">
            <p className="p-2 text-lg font-bold ">Más..</p>
            <p className="px-2 text-sm text-slate-600">
              Descubre toda las capacidades de PKTContacto
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-slate-100">
        <div className="mt-10 flex flex-col items-center  p-5">
          <p className="text-center text-4xl font-bold ">
            Lo Que Dicen Nuestros Usuarios
          </p>
          <p className="mt-2 text-center text-xl text-slate-600">
            Personas reales que han utilizado PKTContacto para mantener sus
            contactos seguros y organizados
          </p>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 p-2 py-10 sm:grid md:grid-cols-2 xl:grid-cols-3">
          <TarjetaReview
            nombre="Miguel"
            apellido="Gonzalez"
            puesto="Director"
            comentario="PKTContacto ha cambiado las reglas del juego para mí. Ya no me preocupo por perder mis contactos o tenerlos dispersos en varios dispositivos. Es una aplicación imprescindible."
          />
          <TarjetaReview
            nombre="Eduardo"
            apellido="Gonzalez"
            puesto="Gerente De Marketing"
            comentario="He probado numerosas aplicaciones de administración de contactos, pero PKTContacto es, con diferencia, la mejor. Las funciones de sincronización y copia de seguridad son increíblemente confiables."
          />
          <TarjetaReview
            nombre="Cristian"
            apellido="Gonzalez"
            puesto="Transito Municipal"
            comentario="Excelente aplicación. Lo recomiendo. Manejar mis contactos jamás ha sido tan fácil gracias a la maravilla que es PKTContacto!. Instalar esta app es una de las mejores decisiones de mi vida"
          />
        </div>
      </div>
    </div>
  );
}
