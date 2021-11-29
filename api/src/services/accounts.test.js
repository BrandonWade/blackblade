import AccountRepository from '../repositories/accounts';
import AccountService from './accounts';
import EmailService from './email';
import { hashValue, compareValues } from '../helpers/hash';
import generateToken from '../helpers/tokens';
import AlreadyExistsError from '../errors/already_exists';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import NotActivatedError from '../errors/not_activated';

jest.mock('../repositories/accounts');
jest.mock('../services/email');
jest.mock('../helpers/hash');
jest.mock('../helpers/tokens');

describe('Account Service', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

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

    describe('verifyAccount', () => {
        test('throws an error if one occured while retrieving the account with the given email', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';

            AccountRepository.getAccountByEmail.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                AccountService.verifyAccount(email, password),
            ).rejects.toThrow();
        });

        test('throws an error if the account with the given email could not be found', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';

            AccountRepository.getAccountByEmail.mockResolvedValue(null);

            await expect(() =>
                AccountService.verifyAccount(email, password),
            ).rejects.toThrow(NotFoundError);
        });

        test('throws an error if the hash for the provided password does not match the password hash on the account with the given email', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';
            const account = {
                id: 123,
                public_id: 456,
                is_activated: true,
                password_hash: 'testhashvalue',
            };

            AccountRepository.getAccountByEmail.mockResolvedValue(account);
            compareValues.mockResolvedValue(false);

            await expect(() =>
                AccountService.verifyAccount(email, password),
            ).rejects.toThrow(UnauthorizedError);
        });

        test('throws an error if the account with the given email is not activated and one occurred while attempting to register the account as new', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';
            const account = {
                id: 123,
                public_id: 456,
                is_activated: true,
                password_hash: 'testhashvalue',
            };

            AccountRepository.getAccountByEmail.mockResolvedValue(account);
            compareValues.mockResolvedValue(false);

            await expect(() =>
                AccountService.verifyAccount(email, password),
            ).rejects.toThrow(UnauthorizedError);
        });

        test('throws an error if the account with the given email is not activated', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';
            const account = {
                id: 123,
                public_id: 456,
                is_activated: false,
                password_hash: 'testhashvalue',
            };

            AccountRepository.getAccountByEmail.mockResolvedValue(account);
            compareValues.mockResolvedValue(true);

            await expect(() =>
                AccountService.verifyAccount(email, password),
            ).rejects.toThrow(NotActivatedError);
        });

        test('returns the id and public id for the account if the account was verified successfully', async () => {
            const email = 'test@test.com';
            const password = 'testpassword123';
            const account = {
                id: 123,
                public_id: 456,
                is_activated: true,
                password_hash: 'testhashvalue',
            };

            AccountRepository.getAccountByEmail.mockResolvedValue(account);
            compareValues.mockResolvedValue(true);

            const output = await AccountService.verifyAccount(email, password);

            expect(output).toEqual([account.id, account.public_id]);
        });
    });
});
