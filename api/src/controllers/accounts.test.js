import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import { requestMock, responseMock } from '../testing/helpers';
import cookieOptions, { DURATION_ONE_HOUR } from '../helpers/cookies';
import AccountService from '../services/accounts';
import {
    registerAccount,
    activateAccount,
    requestPasswordReset,
    passwordResetRedirect,
    resetPassword,
    changePassword,
} from './accounts';

jest.mock('../services/accounts');

describe('Accounts Controller', () => {
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

            expect(res.cookie).toHaveBeenCalledWith(...result);
            expect(res.redirect).toHaveBeenCalledWith('/login');
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

        test('returns a message indicating the password link was successfully sent if an account with the provided was not found', async () => {
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
            AccountService.requestPasswordReset.mockImplementation(() => {
                throw new NotFoundError();
            });

            await requestPasswordReset(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        test('returns a message indicating the password link was successfully sent', async () => {
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

    describe('passwordResetRedirect', () => {
        test('returns a redirect to the password reset page', async () => {
            const passwordResetToken = '1234567890abcdef';
            const params = {
                passwordResetToken,
            };
            const req = requestMock({ params });
            const res = responseMock();
            const result = [
                'prt',
                passwordResetToken,
                cookieOptions({ maxAge: DURATION_ONE_HOUR }),
            ];

            await passwordResetRedirect(req, res);

            expect(res.cookie).toHaveBeenCalledWith(...result);
            expect(res.redirect).toHaveBeenCalledWith('/password/reset');
        });
    });

    describe('resetPassword', () => {
        test('returns an error if the reset link is expired or invalid', async () => {
            const cookies = {
                prt: {},
            };
            const params = {
                password: 'testpassword123',
            };
            const req = requestMock({ cookies, params });
            const res = responseMock();
            const result = {
                message: {
                    type: 'error',
                    text: 'Your reset link has either expired or is invalid. Please try again.',
                },
            };
            AccountService.resetPassword.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await resetPassword(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.UNPROCESSABLE_ENTITY,
            );
            expect(res.json).toHaveBeenCalledWith(result);
        });

        test('returns an error if the reset link invalid', async () => {
            const cookies = {
                prt: {},
            };
            const params = {
                password: 'testpassword123',
            };
            const req = requestMock({ cookies, params });
            const res = responseMock();
            const result = {
                message: {
                    type: 'error',
                    text: 'Your reset link is invalid. Please try again.',
                },
            };
            AccountService.resetPassword.mockImplementation(() => {
                throw new NotFoundError();
            });

            await resetPassword(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        test('returns an error if one occurred while resetting the account password', async () => {
            const cookies = {
                prt: {},
            };
            const params = {
                password: 'testpassword123',
            };
            const req = requestMock({ cookies, params });
            const res = responseMock();
            const result = {
                message: {
                    type: 'error',
                    text: 'An error occurred while resetting your password.',
                },
            };
            AccountService.resetPassword.mockImplementation(() => {
                throw new Error();
            });

            await resetPassword(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith(result);
        });

        test('returns a message indicating the account password was successfully reset', async () => {
            const cookies = {
                prt: {},
            };
            const params = {
                password: 'testpassword123',
            };
            const req = requestMock({ cookies, params });
            const res = responseMock();
            const result = [
                'rm',
                JSON.stringify({
                    type: 'success',
                    text: 'Your password has been successfully reset. Please log in.',
                }),
                cookieOptions({ maxAge: DURATION_ONE_HOUR }),
            ];
            AccountService.resetPassword.mockResolvedValue();

            await resetPassword(req, res);

            expect(res.clearCookie).toHaveBeenCalledWith('prt');
            expect(res.cookie).toHaveBeenCalledWith(...result);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('changePassword', () => {
        test('returns an error if the logged in account could not be found', async () => {
            const body = {
                currentPassword: 'testpassword1234',
                newPassword: 'testpassword5678',
            };
            const session = {
                accountID: 123456,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            const result = {
                message: {
                    type: 'error',
                    text: 'We were unable to reset your password. Please logout and back in then try again.',
                },
            };
            AccountService.changePassword.mockImplementation(() => {
                throw new NotFoundError();
            });

            await changePassword(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        test('returns an error if the current password does not match the password for the logged in account', async () => {
            const body = {
                currentPassword: 'testpassword1234',
                newPassword: 'testpassword5678',
            };
            const session = {
                accountID: 123456,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            const result = {
                message: {
                    type: 'error',
                    text: 'Your current password is incorrect. Please try again.',
                },
            };
            AccountService.changePassword.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await changePassword(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        test('returns an error if one occurred while changing the account password', async () => {
            const body = {
                currentPassword: 'testpassword1234',
                newPassword: 'testpassword5678',
            };
            const session = {
                accountID: 123456,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            const result = {
                message: {
                    type: 'error',
                    text: 'An error occurred while changing your password.',
                },
            };
            AccountService.changePassword.mockImplementation(() => {
                throw new Error();
            });

            await changePassword(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith(result);
        });

        test('returns a message indicating the account password was successfully changed', async () => {
            const body = {
                currentPassword: 'testpassword1234',
                newPassword: 'testpassword5678',
            };
            const session = {
                accountID: 123456,
            };
            const req = requestMock({ body, session });
            const res = responseMock();
            const result = {
                message: {
                    type: 'success',
                    text: 'Your password was changed successfully.',
                },
            };
            AccountService.changePassword.mockResolvedValue(result);

            await changePassword(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith(result);
        });
    });
});
