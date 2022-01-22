import { hashValue, compareValues } from './hash';

describe('Hash Helpers', () => {
    describe('hashValue', () => {
        test('returns the expected hash for the provided value', async () => {
            const value = 'testhash1234567';
            const output = await hashValue(value);
            expect(output.length).toBeGreaterThan(0);
        });
    });

    describe('compareValues', () => {
        test('returns true if provided value matches the provided hash', async () => {
            const hash =
                '$2b$10$EzazWHoTA/DEx4mxRmaBaeat9z49gw6Yn4DBE4ZV3FnGNyqg4uyse'; // testhash1234567
            const value = 'testhash1234567';
            const output = await compareValues(value, hash);
            expect(output).toBe(true);
        });
    });
});
