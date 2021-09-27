import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import { requestMock, responseMock } from '../helpers/testing';
import cookieOptions, { DURATION_ONE_HOUR } from '../helpers/cookies';
import AccountService from '../services/accounts';
import {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    passwordResetRedirect,
    resetPassword,
} from './accounts';

jest.mock('../services/accounts');

describe.only('Accounts Controller', () => {
    describe('registerAccount', () => {
        test('returns an error if one occurred while registering an account', async () => {
            const body = {
                email: 'test@test.com',
                password: 'testpassword1234',
            };
            const req = requestMock({ body });
            const res = responseMock();
            AccountService.registerAccount.mockImplementation(() => {
                throw new Error();
            });

            await registerAccount(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while registering your account.',
                },
            });
        });

        test('returns a message indicating the account needs to be activated', async () => {
            const email = 'test@test.com';
            const body = {
                email,
                password: 'testpassword1234',
            };
            const req = requestMock({ body });
            const res = responseMock();
            const result = {
                message: {
                    type: 'info',
                    text: `We've sent a link to ${email}. To complete registration, please check your inbox.`,
                },
            };
            AccountService.registerAccount.mockResolvedValue();

            await registerAccount(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });

    describe('activateAccount', () => {
        test('returns a not found error if one occurred while activating an account', async () => {
            const params = {
                activationToken: '1234567890abcdef',
            };
            const req = requestMock({ params });
            const res = responseMock();
            AccountService.activateAccount.mockImplementation(() => {
                throw new NotFoundError();
            });

            await activateAccount(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'Your activation link is invalid. Please try again.',
                },
            });
        });

        test('returns an error if one occurred while activating an account', async () => {
            const params = {
                activationToken: '1234567890abcdef',
            };
            const req = requestMock({ params });
            const res = responseMock();
            AccountService.activateAccount.mockImplementation(() => {
                throw new Error();
            });

            await activateAccount(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while activating your account.',
                },
            });
        });

        test('returns a message indicating the account needs to be activated', async () => {
            const params = {
                activationToken: '1234567890abcdef',
            };
            const req = requestMock({ params });
            const res = responseMock();
            const result = [
                'rm',
                JSON.stringify({
                    type: 'success',
                    text: 'Your account has been successfully activated. Please log in.',
                }),
                cookieOptions({ maxAge: DURATION_ONE_HOUR }),
            ];
            AccountService.activateAccount.mockResolvedValue();

            await activateAccount(req, res);

            expect(res.redirect).toHaveBeenCalledWith('/login');
            expect(res.cookie).toHaveBeenCalledWith(...result);
        });
    });

    describe('requestPasswordReset', () => {
        test('returns an error if one occurred while requesting a password reset', async () => {
            const body = {
                email: 'test@test.com',
            };
            const req = requestMock({ body });
            const res = responseMock();
            AccountService.requestPasswordReset.mockImplementation(() => {
                throw new Error();
            });

            await requestPasswordReset(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while requesting a password reset.',
                },
            });
        });

        test('returns a message indicating a password link was successfully sent', async () => {
            const email = 'test@test.com';
            const body = {
                email,
            };
            const req = requestMock({ body });
            const res = responseMock();
            const result = {
                message: {
                    type: 'info',
                    text: `We've sent a link to ${email}. To reset your password, please check your inbox.`,
                },
            };
            AccountService.requestPasswordReset.mockResolvedValue();

            await requestPasswordReset(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });
});
