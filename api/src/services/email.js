import MailjetClient from '../clients/mailjet';

const domain = process.env.BLACKBLADE_DOMAIN || '';

const sendAccountActivationEmail = async (email, token) => {
    const link = `${domain}/api/accounts/activate/${token}`;

    const message = {
        From: {
            Email: 'register@blackblade.ca',
            Name: 'Blackblade',
        },
        To: [
            {
                Email: email,
            },
        ],
        Subject: 'Complete Registration',
        HTMLPart: `Please visit the following URL to complete your registration: <a href="${link}">${link}</a>`,
    };

    await MailjetClient.send(email, message);
};

const sendPasswordResetEmail = async (email, token) => {
    const link = `${domain}/api/accounts/password/forgot/${token}`;

    const message = {
        From: {
            Email: 'accounts@blackblade.ca',
            Name: 'Blackblade',
        },
        To: [
            {
                Email: email,
            },
        ],
        Subject: 'Password Reset',
        HTMLPart: `Please visit the following URL to reset your password: <a href="${link}">${link}</a>`,
    };

    await MailjetClient.send(email, message);
};

export default {
    sendAccountActivationEmail,
    sendPasswordResetEmail,
};
