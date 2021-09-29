import { StatusCodes } from 'http-status-codes';
import NotActivatedError from '../errors/not_activated';
import NotFoundError from '../errors/not_found';
import UnauthorizedError from '../errors/unauthorized';
import { requestMock, responseMock } from '../helpers/testing';
import AccountService from '../services/accounts';
import { csrf, login, logout } from './auth';

jest.mock('../services/accounts');

describe.only('Auth Controller', () => {
    describe('csrf', () => {
        test('returns a response when calling the csrf endpoint', async () => {
            const req = requestMock({});
            const res = responseMock();

            await csrf(req, res);

            expect(res.send).toHaveBeenCalled();
        });
    });
});
