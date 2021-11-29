import { StatusCodes } from 'http-status-codes';
import NotActivatedError from '../errors/not_activated';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import { requestMock, responseMock, sessionMock } from '../helpers/testing';
import cookieOptions, { DURATION_ONE_WEEK } from '../helpers/cookies';
import AccountService from '../services/accounts';
import { csrf, login, logout } from './auth';

jest.mock('../services/accounts');

describe('Auth Controller', () => {
    describe('csrf', () => {
        test('returns a response when calling the csrf endpoint', async () => {
            const req = requestMock({});
            const res = responseMock();

            await csrf(req, res);

            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('login', () => {
        test('returns an unauthorized error when one occurred while logging in', async () => {
            const body = {
                email: 'test@test.com',
                password: 'testpassword1234',
            };
            const req = requestMock({ body });
            const res = responseMock();
            AccountService.verifyAccount.mockImplementation(() => {
                throw new UnauthorizedError();
            });

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'Invalid email or password.',
                },
            });
        });

        test('returns an unauthorized error if a not found error occurred while logging in', async () => {
            const body = {
                email: 'test@test.com',
                password: 'testpassword1234',
            };
            const req = requestMock({ body });
            const res = responseMock();
            AccountService.verifyAccount.mockImplementation(() => {
                throw new NotFoundError();
            });

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'Invalid email or password.',
                },
            });
        });

        test('returns a message indicating account needs to be activated when a not activated error occurred while logging in', async () => {
            const email = 'test@test.com';
            const body = {
                email,
                password: 'testpassword1234',
            };
            const req = requestMock({ body });
            const res = responseMock();
            AccountService.verifyAccount.mockImplementation(() => {
                throw new NotActivatedError();
            });
            AccountService.registerAccount.mockImplementation(() => {});

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'info',
                    text: `We've sent a link to ${email}. To complete registration, please check your inbox.`,
                },
            });
        });

        test('returns an error if one occurred while logging in', async () => {
            const body = {
                email: 'test@test.com',
                password: 'testpassword1234',
            };
            const req = requestMock({ body });
            const res = responseMock();
            AccountService.verifyAccount.mockImplementation(() => {
                throw new Error();
            });

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
            expect(res.json).toHaveBeenCalledWith({
                message: {
                    type: 'error',
                    text: 'An error occurred while logging in.',
                },
            });
        });

        test('returns the public ID for the account when the login attempt is successful', async () => {
            const accountID = 12345;
            const accountPublicID = '1234567890abcdef';
            const body = {
                email: 'test@test.com',
                password: 'testpassword1234',
            };
            const req = requestMock({ body });
            const res = responseMock();
            const result = [
                'apid',
                accountPublicID,
                cookieOptions({ maxAge: DURATION_ONE_WEEK }),
            ];
            AccountService.verifyAccount.mockResolvedValue([
                accountID,
                accountPublicID,
            ]);

            await login(req, res);

            expect(res.cookie).toHaveBeenCalledWith(...result);
            expect(res.json).toHaveBeenCalledWith({
                account_public_id: accountPublicID,
            });
        });
    });

    describe('logout', () => {
        test('returns a response after clearing the active session', async () => {
            const session = sessionMock();
            const req = requestMock({ session });
            const res = responseMock();

            await logout(req, res);

            expect(session.destroy).toHaveBeenCalled();
            expect(res.clearCookie).toHaveBeenCalledWith('sid');
            expect(res.clearCookie).toHaveBeenCalledWith('apid');
            expect(res.send).toHaveBeenCalled();
        });
    });
});
