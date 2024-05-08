import "./App.css";
import { Routes, Route } from "react-router-dom";
import InicioSesión from "./componentes/páginas/InicioSesión";
import Navegación from "./componentes/compuestos/Navegación";
function App() {
  return (
    <div>
      <Navegación />
      <Routes>
        <Route path="/sesión" element={<InicioSesión />} />
      </Routes>
    </div>
  );
}

export default App;
