import "./App.css";
import { Routes, Route } from "react-router-dom";
import InicioSesión from "./componentes/páginas/InicioSesión";
import Navegación from "./componentes/compuestos/Navegación";
import FormularioInicioDeSesión from "./componentes/compuestos/FormularioInicioDeSesión";
import getUsuario from "./utils/getUsuario";
import { UsuarioID } from "./types/Usuario";
import Agenda from "./componentes/páginas/Agenda";
function App() {
  const usuario: UsuarioID | null = getUsuario();
  return (
    <div style={{ fontFamily: "Raleway" }}>
      <Navegación usuario={usuario} />
      <Routes>
        <Route path="/registrar" element={<InicioSesión usuario={usuario} />} />
        <Route
          path="/auth"
          element={<FormularioInicioDeSesión usuario={usuario} />}
        />
        <Route path="/agenda" element={<Agenda usuario={usuario} />} />
      </Routes>
    </div>
  );
}

export default App;
