type compactObjectPayload = Record<string, unknown>;

/**
 * Compacta um objeto removendo as propriedades undefined, null e arrays vazios
 * @param payload - O objeto a ser compactado
 * @returns O objeto compactado
 * @example
 * const payload = {
 *   name: "John Doe",
 *   age: 30,
 *   city: null,
 *   friends: [],
 *    address: undefined,
 * };
 * const compacted = compactObject(payload);
 * console.log(compacted); // { name: "John Doe", age: 30, friends: [] }
 */
export function compactObject(
  payload: compactObjectPayload,
): compactObjectPayload {
  const compacted: compactObjectPayload = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value) && value.length === 0) {
      continue;
    }

    compacted[key] = value;
  }

  return compacted;
}
