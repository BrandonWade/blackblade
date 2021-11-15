import AccountRepository from '../repositories/accounts';
import AccountService from './accounts';
import { hashValue } from '../helpers/hash';
import generateToken from '../helpers/tokens';

jest.mock('../repositories/accounts');
jest.mock('../helpers/hash');
jest.mock('../helpers/tokens');

describe('Account Service', () => {
    describe('registerAccount', () => {
        test('returns true if the account already exists and is activated', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';
            const account = {
                is_activated: true,
            };

            AccountRepository.getAccountByEmail.mockResolvedValue(account);
            hashValue.mockResolvedValue('testhashvalue');
            generateToken.mockResolvedValue('testtokenvalue');

            const output = await AccountService.registerAccount(
                email,
                password,
            );

            expect(output).toBe(true);
        });
    });
});
