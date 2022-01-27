import {
    parseTypesFromString,
    parseValuesFromObject,
    addLikeCondition,
    addNegatableLikeCondition,
    addInCondition,
} from './search';
import { builderMock } from '../testing/helpers';

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

    describe('addLikeCondition', () => {
        test('adds a where condition for each of the provided parameters for the specified field', async () => {
            const bm = builderMock();
            const params = ['test1', 'test2'];
            const field = 'test_field';

            addLikeCondition(bm, params, field);

            expect(bm.where).toHaveBeenCalledTimes(params.length);
            expect(bm.where).toHaveBeenNthCalledWith(
                1,
                field,
                'like',
                '%test1%',
            );
            expect(bm.where).toHaveBeenNthCalledWith(
                2,
                field,
                'like',
                '%test2%',
            );
        });
    });

    describe('addNegatableLikeCondition', () => {
        test('adds a where condition for each of the provided parameters for the specified field', async () => {
            const bm = builderMock();
            const params = [
                {
                    key: 'Type1',
                    isNegated: true,
                },
                {
                    key: 'Type2',
                    isNegated: false,
                },
                {
                    key: 'Type3',
                    isNegated: true,
                },
            ];
            const key = 'key';
            const field = 'test_field';

            addNegatableLikeCondition(bm, params, key, field);

            expect(bm.where).toHaveBeenCalledTimes(1);
            expect(bm.whereNot).toHaveBeenCalledTimes(2);
            expect(bm.where).toHaveBeenCalledWith(field, 'like', '%Type2%');
            expect(bm.whereNot).toHaveBeenNthCalledWith(
                1,
                field,
                'like',
                '%Type1%',
            );
            expect(bm.whereNot).toHaveBeenNthCalledWith(
                2,
                field,
                'like',
                '%Type3%',
            );
        });
    });

    describe('addInCondition', () => {
        test('returns if the provided list of parameters is empty', async () => {
            const bm = builderMock();
            const params = [];
            const field = 'test_field';

            addInCondition(bm, params, field);

            expect(bm.whereIn).not.toHaveBeenCalled();
        });

        test('adds a where in condition using the provided parameters for the specified field', async () => {
            const bm = builderMock();
            const params = [
                {
                    key: 'Type1',
                    isNegated: true,
                },
                {
                    key: 'Type2',
                    isNegated: false,
                },
                {
                    key: 'Type3',
                    isNegated: true,
                },
            ];
            const field = 'test_field';

            addInCondition(bm, params, field);

            expect(bm.whereIn).toHaveBeenCalledWith(field, params);
        });
    });
});
