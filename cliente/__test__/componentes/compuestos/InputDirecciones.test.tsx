/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import InputDirecciones from "../../../src/componentes/compuestos/InputDirecciones";
import { Dirección } from "../../../src/types/Contactos";

describe("InputDirecciones", () => {
  let direcciones: Dirección[];
  let setDirecciones: React.Dispatch<React.SetStateAction<Dirección[]>>;

  beforeEach(() => {
    direcciones = [
      {
        calle: "Calle 1",
        ciudad: "Ciudad 1",
        número: "123",
      },
      {
        calle: "Calle 2",
        ciudad: "Ciudad 2",
        número: "456",
      },
    ];
    setDirecciones = jest.fn();
  });

  test("Carga los datos correctamente", () => {
    const { getAllByRole } = render(
      <InputDirecciones
        direcciones={direcciones}
        setDirecciones={setDirecciones}
        index={0}
      />,
    );
    const inputFields = getAllByRole("textbox");
    expect(inputFields).toHaveLength(2);
    expect(inputFields[0]).toHaveValue("Calle 1");
    expect(inputFields[1]).toHaveValue("Ciudad 1");
  });
});
