import { getProducerByCode } from "../utils/procedures";

describe("getProducerByCode", () => {
  it("should return the correct procedure family", () => {
    expect(getProducerByCode("99001")).toBe("E/M");
    expect(getProducerByCode("11002")).toBe("Surgery");
    expect(getProducerByCode("71003")).toBe("Rediology");
    expect(getProducerByCode("A405")).toBe("Misecllaneous");
    expect(getProducerByCode("XY999")).toBe(undefined);
  });
});
