import {
    parseTypesFromString,
    parseValuesFromObject,
    addLikeCondition,
    addNegatableLikeCondition,
    addInCondition,
    addColorConditions,
    addColorlessCondition,
    addStatCondition,
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

    describe('addColorConditions', () => {
        test('returns if the provided color list or match type are empty', async () => {
            const bm = builderMock();
            const colors = [];
            const matchType = '';

            addColorConditions(bm, colors, matchType);

            expect(bm.where).not.toHaveBeenCalled();
            expect(bm.orWhere).not.toHaveBeenCalled();
            expect(bm.andWhere).not.toHaveBeenCalled();
        });

        test('adds a where true condition for each provided color and where false for each color that was not provided', async () => {
            const bm = builderMock();
            const colors = ['B'];
            const matchType = 'exact';

            addColorConditions(bm, colors, matchType);

            expect(bm.where).toHaveBeenCalledTimes(5);
            expect(bm.where).toHaveBeenCalledWith('is_black', '=', true);
            expect(bm.where).toHaveBeenCalledWith('is_white', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_blue', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_green', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_red', '=', false);
        });

        test('adds a where true condition for each provided color', async () => {
            const bm = builderMock();
            const colors = ['B'];
            const matchType = 'at_least';

            addColorConditions(bm, colors, matchType);

            expect(bm.where).toHaveBeenCalledTimes(1);
            expect(bm.where).toHaveBeenCalledWith('is_black', '=', true);
        });

        test('adds a where true condition for each provided color', async () => {
            const bm = builderMock();
            const colors = ['B', 'U'];
            const matchType = 'at_most';

            addColorConditions(bm, colors, matchType);

            // TODO: Need a special builder mock to handle .where and .orWhere cases that accept a function

            // expect(bm.orWhere).toHaveBeenCalledTimes(3);
            // expect(bm.orWhere).toHaveBeenCalledWith('is_black', '=', true);
            // expect(bm.orWhere).toHaveBeenCalledWith('is_blue', '=', true);

            // expect(bm.andWhere).toHaveBeenCalledTimes(5);
            // expect(bm.andWhere).toHaveBeenCalledWith('is_white', '=', false);
            // expect(bm.andWhere).toHaveBeenCalledWith('is_blue', '=', false);
            // expect(bm.andWhere).toHaveBeenCalledWith('is_black', '=', false);
            // expect(bm.andWhere).toHaveBeenCalledWith('is_red', '=', false);
            // expect(bm.andWhere).toHaveBeenCalledWith('is_green', '=', false);

            expect(bm.where).toHaveBeenCalledTimes(4);
            expect(bm.where).toHaveBeenCalledWith('is_white', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_green', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_red', '=', false);
        });
    });

    describe('addColorlessCondition', () => {
        test('returns if the provided boolean is false or match type are empty', async () => {
            const bm = builderMock();
            const colorless = false;
            const matchType = '';

            addColorlessCondition(bm, colorless, matchType);

            expect(bm.where).not.toHaveBeenCalled();
        });

        test('adds a where false condition for each color if the match type is exact', async () => {
            const bm = builderMock();
            const colorless = true;
            const matchType = 'exact';

            addColorlessCondition(bm, colorless, matchType);

            expect(bm.where).toHaveBeenCalledTimes(5);
            expect(bm.where).toHaveBeenCalledWith('is_white', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_blue', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_black', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_red', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_green', '=', false);
        });

        test('adds a where false condition for each color if the match type is at_most', async () => {
            const bm = builderMock();
            const colorless = true;
            const matchType = 'at_most';

            addColorlessCondition(bm, colorless, matchType);

            expect(bm.where).toHaveBeenCalledTimes(5);
            expect(bm.where).toHaveBeenCalledWith('is_white', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_blue', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_black', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_red', '=', false);
            expect(bm.where).toHaveBeenCalledWith('is_green', '=', false);
        });

        test('returns without adding any conditions if the match type is at_least', async () => {
            const bm = builderMock();
            const colorless = true;
            const matchType = 'at_least';

            addColorlessCondition(bm, colorless, matchType);

            expect(bm.where).not.toHaveBeenCalled();
        });
    });

    describe('addStatCondition', () => {
        test('returns if the stat is empty, missing a comparator, or the value is empty', async () => {
            const bm = builderMock();
            const stat = {};
            const field = '';

            addStatCondition(bm, stat, field);

            expect(bm.where).not.toHaveBeenCalled();
        });

        test('adds a where value for the provided field using the specified comparator and value', async () => {
            const bm = builderMock();
            const stat = {
                comparator: '>=',
                value: 0,
            };
            const field = 'cmc';

            addStatCondition(bm, stat, field);

            expect(bm.where).toHaveBeenCalledTimes(1);
            expect(bm.where).toHaveBeenCalledWith(
                field,
                stat.comparator,
                stat.value,
            );
        });
    });
});
