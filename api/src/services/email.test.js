import EmailService from '../services/email';
import MailjetClient from '../clients/mailjet';

jest.mock('../clients/mailjet');

describe('Email Service', () => {
    describe('sendAccountActivationEmail', () => {
        test('returns true after sending the account activation email', async () => {
            const email = 'test@test.com';
            const token = 'testtoken';

            MailjetClient.send.mockImplementation(() => {});
            const output = await EmailService.sendAccountActivationEmail(
                email,
                token,
            );

            expect(output).toBe(true);
            expect(MailjetClient.send).toHaveBeenCalled();
        });
    });

    describe('sendPasswordResetEmail', () => {
        test('returns true after sending the account activation email', async () => {
            const email = 'test@test.com';
            const token = 'testtoken';

            MailjetClient.send.mockImplementation(() => {});
            const output = await EmailService.sendPasswordResetEmail(
                email,
                token,
            );

            expect(output).toBe(true);
            expect(MailjetClient.send).toHaveBeenCalled();
        });
    });
});
