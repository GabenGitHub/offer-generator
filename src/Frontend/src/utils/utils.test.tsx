import { formatDate, formatNumberWithCommas } from "./utils";

describe("Unit tests for util functions", () => {
    it("format numbers with commas", () => {
        const result = formatNumberWithCommas(100000);

        expect(result).toBe("100.000");
    });

    it("format dates to locale", () => {
        const result: string = formatDate("2021-08-19T16:25:04.142Z");
        
        expect(result).toBe("2021.08.19.");
    });
});