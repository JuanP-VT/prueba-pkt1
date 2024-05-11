/**
 * @jest-environment jsdom
 */

/**
 * Pruebas de integración para el formulario de nuevo usuario con react-testing-library
 */
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import FormularioNuevoUsuario from "../../../src/componentes/compuestos/FormularioNuevoUsuario";

describe("FormularioNuevoUsuario", () => {
  test("renderiza correctamente", () => {
    render(<FormularioNuevoUsuario />);
    expect(screen.getByText("Registrar Nuevo Usuario")).toBeInTheDocument();
  });

  test("actualiza el estado cuando se cambia el nombre de usuario", () => {
    render(<FormularioNuevoUsuario />);
    const nombreInput = screen.getByPlaceholderText(
      "Nombre de usuario",
    ) as HTMLInputElement;
    fireEvent.change(nombreInput, { target: { value: "nuevoUsuario" } });
    expect(nombreInput.value).toBe("nuevoUsuario");
  });

  test("actualiza el estado cuando se cambia la contraseña", () => {
    render(<FormularioNuevoUsuario />);
    const contraseñaInput = screen.getByPlaceholderText(
      "Contraseña",
    ) as HTMLInputElement;
    fireEvent.change(contraseñaInput, {
      target: { value: "NuevaContraseña123" },
    });
    expect(contraseñaInput.value).toBe("NuevaContraseña123");
  });

  test("muestra feedback cuando el nombre de usuario es inválido", async () => {
    render(<FormularioNuevoUsuario />);
    const nombreInput = screen.getByPlaceholderText("Nombre de usuario");
    fireEvent.change(nombreInput, { target: { value: "a" } });
    fireEvent.submit(screen.getByRole("button", { name: "Registrar" }));
    await waitFor(() =>
      expect(screen.getByText(/4 caracteres/)).toBeInTheDocument(),
    );
  });

  test("muestra feedback cuando la contraseña es inválida", async () => {
    render(<FormularioNuevoUsuario />);
    const contraseñaInput = screen.getByPlaceholderText("Contraseña");
    fireEvent.change(contraseñaInput, { target: { value: "abc" } });
    fireEvent.submit(screen.getByRole("button", { name: "Registrar" }));
    await waitFor(() =>
      expect(screen.getByText(/4 caracteres/)).toBeInTheDocument(),
    );
  });

  test("muestra feedback cuando el nombre de usuario ya está registrado", async () => {
    // Simular una respuesta del servidor con código 409
    render(<FormularioNuevoUsuario />);
    const nombreInput = screen.getByTestId("nombre");
    const contraseñaInput = screen.getByTestId("contraseña");

    global.fetch = jest.fn().mockResolvedValue({
      status: 409,
      headers: new Headers(),
      ok: false,
      redirected: false,
      statusText: "Conflict",
      json: () => Promise.resolve({}),
    });

    fireEvent.change(nombreInput, { target: { value: "nuevoUsuario" } });
    fireEvent.change(contraseñaInput, {
      target: { value: "NuevaContraseña123" },
    });
    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() =>
      expect(screen.getByText(/ya está registrado/)).toBeInTheDocument(),
    );
  });

  test("muestra feedback cuando el registro es exitoso", async () => {
    render(<FormularioNuevoUsuario />);
    const nombreInput = screen.getByTestId("nombre");
    const contraseñaInput = screen.getByTestId("contraseña");
    fireEvent.change(nombreInput, { target: { value: "nuevoUsuario" } });
    fireEvent.change(contraseñaInput, {
      target: { value: "NuevaContraseña123" },
    });
    // Simular una respuesta del servidor con código 200
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: new Headers(),
      ok: true,
      redirected: false,
      statusText: "Ok",
      json: () => Promise.resolve({}),
    });

    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByText(/creado/)).toBeInTheDocument());
  });

  test("muestra feedback cuando hay un error en el servidor", async () => {
    render(<FormularioNuevoUsuario />);
    const nombreInput = screen.getByTestId("nombre");
    const contraseñaInput = screen.getByTestId("contraseña");
    fireEvent.change(nombreInput, { target: { value: "nuevoUsuario" } });
    fireEvent.change(contraseñaInput, {
      target: { value: "NuevaContraseña123" },
    });
    // Simular una respuesta del servidor con código 500
    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      headers: new Headers(),
      ok: false,
      redirected: false,
      statusText: "Internal Server Error",
      json: () => Promise.resolve({ message: "Error" }),
    });

    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByText(/Error/)).toBeInTheDocument());
  });
});
