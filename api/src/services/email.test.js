import EmailService from './email';
import MailjetClient from '../clients/mailjet';

jest.mock('../clients/mailjet');

describe('Email Service', () => {
    describe('sendAccountActivationEmail', () => {
        test('returns after sending the account activation email', async () => {
            const email = 'test@test.com';
            const token = 'testtoken';

            MailjetClient.send.mockImplementation(() => {});
            await EmailService.sendAccountActivationEmail(email, token);

            expect(MailjetClient.send).toHaveBeenCalled();
        });
    });

    describe('sendPasswordResetEmail', () => {
        test('returns after sending the password reset email', async () => {
            const email = 'test@test.com';
            const token = 'testtoken';

            MailjetClient.send.mockImplementation(() => {});
            await EmailService.sendPasswordResetEmail(email, token);

            expect(MailjetClient.send).toHaveBeenCalled();
        });
    });

    describe('sendPasswordChangedEmail', () => {
        test('returns after sending the password changed email', async () => {
            const email = 'test@test.com';

            MailjetClient.send.mockImplementation(() => {});
            await EmailService.sendPasswordChangedEmail(email);

            expect(MailjetClient.send).toHaveBeenCalled();
        });
    });
});
