import "./App.css";
import { Routes, Route } from "react-router-dom";
import InicioSesión from "./componentes/páginas/InicioSesión";
import Navegación from "./componentes/compuestos/Navegación";
import FormularioInicioDeSesión from "./componentes/compuestos/FormularioInicioDeSesión";
import Agenda from "./componentes/páginas/Agenda";

function App() {
  return (
    <div style={{ fontFamily: "Raleway" }}>
      <Navegación />
      <Routes>
        <Route path="/registrar" element={<InicioSesión />} />
        <Route path="/auth" element={<FormularioInicioDeSesión />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
    </div>
  );
}

export default App;
