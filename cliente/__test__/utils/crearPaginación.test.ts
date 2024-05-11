import crearPaginación from "../../src/utils/crearPaginación";

describe("crearPaginación", () => {
  test("debe paginar correctamente", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const paginación = crearPaginación(array, 3);
    expect(paginación).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
  });
});
