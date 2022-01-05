import AccountRepository from '../repositories/accounts';
import { transactionMock, DatabaseErrorMock } from '../helpers/testing';
import { connection } from '../db';
import AlreadyExistsError from '../errors/already_exists';

jest.mock('../db');

describe('Account Repository', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('registerAccount', () => {
        test('throws an error if one occurred while checking for an existing unactivated account with the provided email address', async () => {
            const email = 'test@test.com';
            const passwordHash = 'testpasswordhash1234123123';
            const activationToken = 'testactivationtoken123456';

            const tx = transactionMock();
            tx.query.mockImplementation(() => {
                throw new Error();
            });
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                AccountRepository.registerAccount(
                    email,
                    passwordHash,
                    activationToken,
                ),
            ).rejects.toThrow();
            expect(tx.query).toHaveBeenCalledTimes(1);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('throws an error if one occurred while creating a new account with the provided email address', async () => {
            const email = 'test@test.com';
            const passwordHash = 'testpasswordhash1234123123';
            const activationToken = 'testactivationtoken123456';

            const tx = transactionMock();
            tx.query.mockResolvedValueOnce([[]]).mockImplementationOnce(() => {
                throw new Error();
            });
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                AccountRepository.registerAccount(
                    email,
                    passwordHash,
                    activationToken,
                ),
            ).rejects.toThrow();
            expect(tx.query).toHaveBeenCalledTimes(2);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('throws an already exists error if one occurred while creating a new account if an account already exists with the provided email address', async () => {
            const email = 'test@test.com';
            const passwordHash = 'testpasswordhash1234123123';
            const activationToken = 'testactivationtoken123456';

            const tx = transactionMock();
            tx.query.mockResolvedValueOnce([[]]).mockImplementationOnce(() => {
                throw new DatabaseErrorMock({ code: 'ER_DUP_ENTRY' });
            });
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                AccountRepository.registerAccount(
                    email,
                    passwordHash,
                    activationToken,
                ),
            ).rejects.toThrow(AlreadyExistsError);
            expect(tx.query).toHaveBeenCalledTimes(2);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('throws an error if one occurred while inserting the activation token for a new account with the provided email address', async () => {
            const email = 'test@test.com';
            const passwordHash = 'testpasswordhash1234123123';
            const activationToken = 'testactivationtoken123456';

            const tx = transactionMock();
            tx.query
                .mockResolvedValueOnce([[]])
                .mockResolvedValueOnce([{ insertId: 123 }])
                .mockImplementationOnce(() => {
                    throw new Error();
                });
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                AccountRepository.registerAccount(
                    email,
                    passwordHash,
                    activationToken,
                ),
            ).rejects.toThrow();
            expect(tx.query).toHaveBeenCalledTimes(3);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('throws an error if one occurred while inserting the activation token for an existing account with the provided email address', async () => {
            const email = 'test@test.com';
            const passwordHash = 'testpasswordhash1234123123';
            const activationToken = 'testactivationtoken123456';

            const tx = transactionMock();
            tx.query
                .mockResolvedValueOnce([[{ id: 123 }]])
                .mockImplementationOnce(() => {
                    throw new Error();
                });
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                AccountRepository.registerAccount(
                    email,
                    passwordHash,
                    activationToken,
                ),
            ).rejects.toThrow();
            expect(tx.query).toHaveBeenCalledTimes(2);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('throws an error if the activation token was not inserted properly for the account with the provided email address', async () => {
            const email = 'test@test.com';
            const passwordHash = 'testpasswordhash1234123123';
            const activationToken = 'testactivationtoken123456';

            const tx = transactionMock();
            tx.query
                .mockResolvedValueOnce([[]])
                .mockResolvedValueOnce([{ insertId: 123 }])
                .mockResolvedValueOnce([{}]);
            connection.getConnection.mockResolvedValue(tx);

            await expect(() =>
                AccountRepository.registerAccount(
                    email,
                    passwordHash,
                    activationToken,
                ),
            ).rejects.toThrow();
            expect(tx.query).toHaveBeenCalledTimes(3);
            expect(tx.commit).not.toHaveBeenCalled();
            expect(tx.rollback).toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });

        test('returns true if the account was successfully registered', async () => {
            const email = 'test@test.com';
            const passwordHash = 'testpasswordhash1234123123';
            const activationToken = 'testactivationtoken123456';

            const tx = transactionMock();
            tx.query
                .mockResolvedValueOnce([[]])
                .mockResolvedValueOnce([{ insertId: 123 }])
                .mockResolvedValueOnce([{ affectedRows: 1, insertId: 123 }]);
            connection.getConnection.mockResolvedValue(tx);

            const output = await AccountRepository.registerAccount(
                email,
                passwordHash,
                activationToken,
            );

            expect(output).toBe(true);
            expect(tx.query).toHaveBeenCalledTimes(3);
            expect(tx.commit).toHaveBeenCalled();
            expect(tx.rollback).not.toHaveBeenCalled();
            expect(tx.release).toHaveBeenCalled();
        });
    });
});
