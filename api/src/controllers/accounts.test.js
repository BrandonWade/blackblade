import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import { requestMock, responseMock } from '../helpers/testing';
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
});
