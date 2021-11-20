import AccountRepository from '../repositories/accounts';
import AccountService from './accounts';
import EmailService from './email';
import { hashValue, compareValues } from '../helpers/hash';
import generateToken from '../helpers/tokens';
import AlreadyExistsError from '../errors/already_exists';

jest.mock('../repositories/accounts');
jest.mock('../services/email');
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

        test('returns true if the account has already been registered but not activated', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';
            const account = {
                is_activated: false,
            };

            AccountRepository.getAccountByEmail.mockResolvedValue(account);
            hashValue.mockResolvedValue('testhashvalue');
            generateToken.mockResolvedValue('testtokenvalue');
            AccountRepository.registerAccount.mockImplementation(() => {
                throw new AlreadyExistsError();
            });
            EmailService.sendAccountActivationEmail.mockResolvedValue();

            const output = await AccountService.registerAccount(
                email,
                password,
            );

            expect(output).toBe(true);
        });

        test('throws an error if one occurred while registering a new account', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';
            const account = {
                is_activated: false,
            };

            AccountRepository.getAccountByEmail.mockResolvedValue(account);
            hashValue.mockResolvedValue('testhashvalue');
            generateToken.mockResolvedValue('testtokenvalue');
            AccountRepository.registerAccount.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                AccountService.registerAccount(email, password),
            ).rejects.toThrow();
        });
    });

    describe('activateAccount', () => {
        test('throws an error if one occurred while activating an account', async () => {
            const token = 'testtoken';

            AccountRepository.activateAccount.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                AccountService.activateAccount(token),
            ).rejects.toThrow();
        });

        test('returns true if the account was successfully activated', async () => {
            const token = 'testtoken';

            AccountRepository.activateAccount.mockResolvedValue();

            const output = await AccountService.activateAccount(token);

            expect(output).toBe(true);
        });
    });

    describe('requestPasswordReset', () => {
        test('throws an error if one occurred while creating an activation token', async () => {
            const email = 'test@test.com';

            generateToken.mockResolvedValue('testtokenvalue');
            AccountRepository.createPasswordResetToken.mockImplementation(
                () => {
                    throw new Error();
                },
            );

            await expect(() =>
                AccountService.requestPasswordReset(email),
            ).rejects.toThrow();
        });

        test('throws an error if one occurred while sending a password reset email', async () => {
            const email = 'test@test.com';

            generateToken.mockResolvedValue('testtokenvalue');
            AccountRepository.createPasswordResetToken.mockResolvedValue();
            EmailService.sendPasswordResetEmail.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                AccountService.requestPasswordReset(email),
            ).rejects.toThrow();
        });

        test('returns true if the password reset was successfully requested', async () => {
            const email = 'test@test.com';

            generateToken.mockResolvedValue('testtokenvalue');
            AccountRepository.createPasswordResetToken.mockResolvedValue();
            EmailService.sendPasswordResetEmail.mockResolvedValue();

            const output = await AccountService.requestPasswordReset(email);

            expect(output).toBe(true);
        });
    });

    describe('resetPassword', () => {
        test('throws an error if one occured while resetting an account password', async () => {
            const token = 'testtoken';
            const password = 'testpassword123';

            hashValue.mockResolvedValue('testhashvalue');
            AccountRepository.resetPassword.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                AccountService.resetPassword(token, password),
            ).rejects.toThrow();
        });

        test('returns true if the password was successfully reset', async () => {
            const token = 'testtoken';
            const password = 'testpassword123';

            hashValue.mockResolvedValue('testhashvalue');
            AccountRepository.resetPassword.mockResolvedValue();

            const output = await AccountService.resetPassword(token, password);

            expect(output).toBe(true);
        });
    });
});
