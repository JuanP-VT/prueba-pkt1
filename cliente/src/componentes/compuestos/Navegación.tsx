import { Link } from "react-router-dom";
export default function Navegación() {
  return (
    <div className="w-full h-12">
      <Link to="/sesión">Iniciar Sesión</Link>
      <Link to="/">Inicio</Link>
    </div>
  );
}
