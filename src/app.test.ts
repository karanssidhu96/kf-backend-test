import { getMessage } from "./app";

describe('app', () => {
    test("getMessage returns 'Hello world'", () => {
      const result = getMessage();
      expect(result).toBe('Hello World');
    })
})