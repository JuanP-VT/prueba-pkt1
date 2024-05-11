import { Contacto } from "../../src/types/Contactos";
import filtrarContactos from "../../src/utils/filtrarContactos";

describe("filtrarContactos", () => {
  const contactos: Contacto[] = [
    {
      nombre: "Juan",
      apellido: "Peña",
      correo: "a@a.com",
      teléfonos: ["123456789", "987654321"],
      direcciones: [
        {
          calle: "Calle 1",
          ciudad: "Ciudad 1",
          número: "123",
        },
      ],
    },
    {
      nombre: "Pedro",
      apellido: "Torres",
      correo: "PT@a.com",
      teléfonos: ["123456789", "987654321"],
      direcciones: [
        {
          calle: "Calle 2",
          ciudad: "Ciudad 2",
          número: "1001",
        },
      ],
    },
    {
      nombre: "Ivan",
      apellido: "Salazar",
      correo: "IvnSal@a.com",
      teléfonos: ["6682020", "987654321"],
      direcciones: [
        {
          calle: "Calle 2",
          ciudad: "Ciudad 1",
          número: "523",
        },
      ],
    },
  ];
  test("retorna todos los contactos si no hay filtro", () => {
    const filtrados = filtrarContactos(contactos, "");
    expect(filtrados).toEqual(contactos);
  });
  test("debe filtrar contactos por nombre", () => {
    const filtrados = filtrarContactos(contactos, "Ivan");
    expect(filtrados).toEqual([contactos[2]]);
  });
  test("debe filtrar contactos por nombre y es case insensitive", () => {
    const filtrados = filtrarContactos(contactos, "IVAN");
    expect(filtrados).toEqual([contactos[2]]);
  });
  test("debe filtrar contactos por apellido ", () => {
    const filtrados = filtrarContactos(contactos, "Torres");
    expect(filtrados).toEqual([contactos[1]]);
  });
  test("debe filtrar contactos por apellido y es case insensitive", () => {
    const filtrados = filtrarContactos(contactos, "tOrReS");
    expect(filtrados).toEqual([contactos[1]]);
  });
  test("debe filtrar contactos por correo y es case insensitive", () => {
    const filtrados = filtrarContactos(contactos, "PT@a");
    expect(filtrados).toEqual([contactos[1]]);
  });
  test("debe filtrar contactos por teléfono y es case insensitive", () => {
    const filtrados = filtrarContactos(contactos, "123456789");
    expect(filtrados).toEqual([contactos[0], contactos[1]]);
  });
  test("debe filtrar contactos por calle y es case insensitive", () => {
    const filtrados = filtrarContactos(contactos, "calle 1");
    expect(filtrados).toEqual([contactos[0]]);
  });
  test("debe filtrar contactos por ciudad y es case insensitive", () => {
    const filtrados = filtrarContactos(contactos, "ciudad 2");
    expect(filtrados).toEqual([contactos[1]]);
  });
  test("debe filtrar contactos por número y es case insensitive", () => {
    const filtrados = filtrarContactos(contactos, "523");
    expect(filtrados).toEqual([contactos[2]]);
  });
});
