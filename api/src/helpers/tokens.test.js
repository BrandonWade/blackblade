import crypto from 'crypto';
import generateToken from './tokens';

jest.mock('crypto');

describe('Token Helpers', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('generateToken', () => {
        test('throws an error if one occurred while generating the token', async () => {
            crypto.randomBytes.mockImplementation(() => {
                throw new Error();
            });

            expect(() => generateToken()).toThrow();
        });
    });
});
