/**
 * @jest-environment jsdom
 */

import getUsuario from "../../src/utils/getUsuario";
/// <reference path="../../src/types/.d.ts" /

//Hacemos mock de localStorage
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockClear = jest.fn();
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: (...args: string[]) => mockGetItem(...args),
    setItem: (...args: string[]) => mockSetItem(...args),
    removeItem: (...args: string[]) => mockRemoveItem(...args),
    clear: (...args: string[]) => mockClear(...args),
  },
});

describe("getUsuario", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("debería devolver null si no hay token JWT en el localStorage", () => {
    const sesión = getUsuario();
    expect(sesión).toBeNull();
  });

  it("debería devolver null si el token JWT es inválido", () => {
    localStorage.setItem(
      "pkt1-jwt",
      JSON.stringify({ token: "token.invalido" }),
    );

    const sesión = getUsuario();
    expect(sesión).toBeNull();
  });
});
