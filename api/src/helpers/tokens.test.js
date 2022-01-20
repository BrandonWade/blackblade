import generateToken from './tokens';

describe('Token Helpers', () => {
    describe('generateToken', () => {
        test('returns the generated token', async () => {
            const output = generateToken();

            expect(output.length).toBe(64);
        });
    });
});
