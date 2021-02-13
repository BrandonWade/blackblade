import MailjetClient from '../clients/mailjet';

const sendAccountActivationEmail = (email, token) => {
    const domain = process.env.BLACKBLADE_DOMAIN || '';
    const link = `${domain}/api/accounts/activate?t=${token}`;

    const message = {
        From: {
            Email: `register@${domain}`,
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

    const result = MailjetClient.send(message);
    if (!result) {
        console.error('error sending activation email');
        return false;
    }

    return true;
};

export default {
    sendAccountActivationEmail,
};
