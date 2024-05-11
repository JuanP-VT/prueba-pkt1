/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen } from "@testing-library/react";
import TarjetaContactoEdición from "../../../src/componentes/compuestos/Tarjeta/TarjetaContactoEdición";

describe("TarjetaContactoedicion component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const contacto = {
    nombre: "John Doe",
    apellido: "Smith",
    correo: "l6CpK@example.com",
    teléfonos: ["1234567890"],
    direcciones: [{ número: "123", calle: "Street", ciudad: "City" }],
  };
  const setEdición = jest.fn();

  test("Muestra los detalles del contacto correctamente", () => {
    const { getByTestId } = render(
      <TarjetaContactoEdición contacto={contacto} setEdición={setEdición} />,
    );

    expect(getByTestId("correo")).toHaveValue(contacto.correo);
    expect(getByTestId("nombre")).toHaveValue(contacto.nombre);
    expect(getByTestId("apellido")).toHaveValue(contacto.apellido);
  });

  test("Actualiza los valores correctamente", async () => {
    render(
      <TarjetaContactoEdición contacto={contacto} setEdición={setEdición} />,
    );

    const nombreInput = screen.getByTestId("nombre");
    const apellidoInput = screen.getByTestId("apellido");
    const correoInput = screen.getByTestId("correo");

    fireEvent.change(nombreInput, { target: { value: "Jane" } });
    fireEvent.change(apellidoInput, { target: { value: "Tronk" } });
    fireEvent.change(correoInput, {
      target: { value: "jane.tronk@example.com" },
    });

    expect(nombreInput).toHaveValue("Jane");
    expect(apellidoInput).toHaveValue("Tronk");
    expect(correoInput).toHaveValue("jane.tronk@example.com");
  });

  test("Muestra feedback correctamente", async () => {
    render(
      <TarjetaContactoEdición contacto={contacto} setEdición={setEdición} />,
    );

    const correoInput = screen.getByTestId("correo");
    fireEvent.change(correoInput, { target: { value: "invalid-email" } });

    const submitButton = screen.getByText("Actualizar");
    fireEvent.click(submitButton);

    const feedbackElement = await screen.findByText(/correo no es valido/i);
    expect(feedbackElement).toBeInTheDocument();
  });
});
