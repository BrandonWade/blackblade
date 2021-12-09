import * as mailjet from 'node-mailjet';
import MailjetClient from '../clients/mailjet';
import { mailjetMock } from '../helpers/testing';

jest.mock('node-mailjet');

describe('Mailjet Client', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('send', () => {
        test('throws an error if one occurred while attempting to connect to mailjet', async () => {
            const email = 'test@test.com';
            const message = {
                From: {
                    Email: email,
                    Name: 'Test Email',
                },
                To: [
                    {
                        Email: email,
                    },
                ],
                Subject: 'Test Email',
                HTMLPart: `This is a test email. It will not actually be sent.`,
            };

            mailjet.connect.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                MailjetClient.send(email, message),
            ).rejects.toThrow();
        });

        test('throws an error if one occurred while attempting to send an email', async () => {
            const mailjetConnection = mailjetMock();
            const email = 'test@test.com';
            const message = {
                From: {
                    Email: email,
                    Name: 'Test Email',
                },
                To: [
                    {
                        Email: email,
                    },
                ],
                Subject: 'Test Email',
                HTMLPart: `This is a test email. It will not actually be sent.`,
            };

            mailjet.connect.mockResolvedValue(mailjetConnection);
            mailjetConnection.post.mockImplementation(() => {
                throw new Error();
            });

            await expect(() =>
                MailjetClient.send(email, message),
            ).rejects.toThrow();
        });

        test('returns if the email was successfully sent', async () => {
            const mailjetConnection = mailjetMock();
            const email = 'test@test.com';
            const message = {
                From: {
                    Email: email,
                    Name: 'Test Email',
                },
                To: [
                    {
                        Email: email,
                    },
                ],
                Subject: 'Test Email',
                HTMLPart: `This is a test email. It will not actually be sent.`,
            };

            mailjet.connect.mockResolvedValue(mailjetConnection);

            await expect(() =>
                MailjetClient.send(email, message),
            ).not.toThrow();
        });
    });
});
