import { parseTypesFromString, parseValuesFromObject } from './search';

describe('Search Helpers', () => {
    describe('parseTypesFromString', () => {
        test('returns the list of type objects parsed from the provided string', async () => {
            const typeString = '!Type1,Type2';
            const expected = [
                {
                    type: 'Type1',
                    isNegated: true,
                },
                {
                    type: 'Type2',
                    isNegated: false,
                },
            ];

            const output = parseTypesFromString(typeString);

            expect(output).toEqual(expected);
        });

        test('returns an empty list if no string is provided', async () => {
            const output = parseTypesFromString();

            expect(output).toEqual([]);
        });
    });

    describe('parseValuesFromObject', () => {
        test('returns the keys with truthy values from from the provided object', async () => {
            const obj = {
                test1: false,
                test2: true,
                test3: true,
                test4: false,
                test5: true,
            };
            const expected = ['test2', 'test3', 'test5'];

            const output = parseValuesFromObject(obj);

            expect(output).toEqual(expected);
        });

        test('returns an empty list if no object is provided', async () => {
            const output = parseValuesFromObject();

            expect(output).toEqual([]);
        });
    });
});
