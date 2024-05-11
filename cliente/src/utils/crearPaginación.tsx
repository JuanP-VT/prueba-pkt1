/**
 * Función para crear una paginación
 *
 *
 * Ejemplo  Input = [1,2,3,4,5,6,7,8,9,10], objectosPorPágina = 3
 *          Output = [[1,2,3],[4,5,6],[7,8,9],[10]]
 */

//
export default function crearPaginación(
  lista: unknown[],
  objectosPorPágina: number
) {
  const paginación = [];
  //Utilizaremos mutación para crear el array final
  const copia = [...lista];
  while (copia.length > 0) {
    paginación.push(copia.splice(0, objectosPorPágina));
  }

  return paginación;
}
