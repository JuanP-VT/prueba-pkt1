/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/react";
import InputTeléfonos from "../../../src/componentes/compuestos/InputTeléfonos";
describe("InputTeléfonos", () => {
  let teléfonos: string[];
  let setTeléfonos: React.Dispatch<React.SetStateAction<string[]>>;

  beforeEach(() => {
    teléfonos = ["123456789", "987654321"];
    setTeléfonos = jest.fn();
  });

  test("Carga los datos correctamente", () => {
    const { getAllByRole } = render(
      <InputTeléfonos
        teléfonos={teléfonos}
        setTeléfonos={setTeléfonos}
        index={0}
      />,
    );
    const inputFields = getAllByRole("textbox");
    expect(inputFields).toHaveLength(1);
    expect(inputFields[0]).toHaveValue("123456789");
  });

  test("Actualiza el estado cuando se cambia el valor del campo", () => {
    const { getByRole } = render(
      <InputTeléfonos
        teléfonos={teléfonos}
        setTeléfonos={setTeléfonos}
        index={0}
      />,
    );
    const inputField = getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "0987654321" } });
    expect(setTeléfonos).toHaveBeenCalledWith(["0987654321", "987654321"]);
  });
});
