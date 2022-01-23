import getColorString from './colors';

describe('Color Helpers', () => {
    describe('getColorString', () => {
        test('returns the color string calculated from the provided cards', async () => {
            const deck = [
                {
                    is_white: true,
                    is_blue: true,
                    is_black: false,
                    is_red: false,
                    is_green: false,
                    combined_cost: '{W}{U}{S}',
                },
                {
                    is_white: true,
                    is_blue: false,
                    is_black: false,
                    is_red: true,
                    is_green: false,
                    combined_cost: '{W}{R}',
                },
                {
                    is_white: false,
                    is_blue: true,
                    is_black: true,
                    is_red: false,
                    is_green: true,
                    combined_cost: '{U}{B}{G}{C}',
                },
            ];
            const colorString = '{W}{U}{B}{R}{G}{C}{S}';

            const output = getColorString(deck);

            expect(output).toBe(colorString);
        });

        test('returns an empty color string if no cards are provided', async () => {
            const output = getColorString();

            expect(output).toBe('');
        });
    });
});
