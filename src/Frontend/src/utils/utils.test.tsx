import { formatDate, formatNumberWithCommas } from "./utils";

describe("Unit tests for util functions", () => {
    test.each`
        input       | expected
        ${1000.15}  | ${'1.000'}
        ${1000}     | ${'1.000'}
        ${100000}   | ${'100.000'}
        ${1000000}  | ${'1.000.000'}
        `('format numbers with commas', ({ input, expected}) => {
            expect(formatNumberWithCommas(input)).toBe(expected);
        });
        
    it("format dates to locale", () => {
                const result: string = formatDate("2021-08-19T16:25:04.142Z");
        
        expect(result).toBe("2021.08.19.");
    });
});