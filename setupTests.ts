// setupTests.ts
import "@testing-library/jest-dom";

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  (console.log as jest.Mock).mockRestore();
});
