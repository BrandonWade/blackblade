import MailjetClient from '../clients/mailjet';

const domain = process.env.BLACKBLADE_DOMAIN || '';

const sendAccountActivationEmail = async (email, token) => {
    const link = `${domain}/api/accounts/activate?bb_at=${token}`;

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
        TextPart: `Please visit the following URL to complete your registration: ${link}`,
        HTMLPart: '', // TODO: Get an HTML template, then replace TextPart
    };

    await MailjetClient.send(email, message);

    return true;
};

const sendPasswordResetEmail = async (email, token) => {
    const link = `${domain}/api/accounts/password/forgot?bb_prt=${token}`;

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
        TextPart: `Please visit the following URL to reset your password: ${link}`,
        HTMLPart: '', // TODO: Get an HTML template, then replace TextPart
    };

    await MailjetClient.send(email, message);

    return true;
};

export default {
    sendAccountActivationEmail,
    sendPasswordResetEmail,
};
