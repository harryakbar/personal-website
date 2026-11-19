import { yearsShipping } from "./constants";

describe("yearsShipping", () => {
  it("counts whole years since Dec 2018", () => {
    expect(yearsShipping(new Date("2026-11-19T00:00:00Z"))).toBe(7);
  });

  it("ticks over on the December anniversary", () => {
    expect(yearsShipping(new Date("2026-12-01T00:00:00Z"))).toBe(8);
  });

  it("never goes negative", () => {
    expect(yearsShipping(new Date("2018-01-01T00:00:00Z"))).toBe(0);
  });
});
