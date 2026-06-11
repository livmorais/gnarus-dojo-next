import { compactObject } from "./compactObject";

describe("compactObject", () => {
  // deve remover propriedades undefined, null e arrays vazios
  it("should remove undefined, null and empty arrays", () => {
    const payload = {
      name: "John Doe",
      age: 30,
      city: null,
      tags: [],
      address: undefined,
      skills: ["react", "typescript"],
    };

    expect(compactObject(payload)).toEqual({
      name: "John Doe",
      age: 30,
      skills: ["react", "typescript"],
    });
  });

  // deve manter valores falsy válidos e arrays não vazios
  it("should keep valid falsy values and non-empty arrays", () => {
    const payload = {
      active: false,
      amount: 0,
      description: "",
      enabled: true,
      items: [0],
    };

    expect(compactObject(payload)).toEqual(payload);
  });

  // deve retornar objeto vazio quando todas as propriedades forem compactadas
  it("should return an empty object when all properties are compacted", () => {
    const payload = {
      first: undefined,
      second: null,
      third: [],
    };

    expect(compactObject(payload)).toEqual({});
  });

  // não deve mutar o objeto original
  it("should not mutate original object", () => {
    const payload = {
      keep: "value",
      remove: null,
      empty: [],
    };

    const payloadSnapshot = { ...payload };
    compactObject(payload);

    expect(payload).toEqual(payloadSnapshot);
  });
});
