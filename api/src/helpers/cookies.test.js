import cookieOptions from './cookies';

describe('Cookie Helpers', () => {
    describe('cookieOptions', () => {
        test('returns an object containing the default cookie options', async () => {
            const output = cookieOptions({});

            expect(output.maxAge).toBe(undefined);
            expect(output.secure).toBe(true);
            expect(output.httpOnly).toBe(false);
            expect(output.sameSite).toBe('lax');
        });
    });
});
