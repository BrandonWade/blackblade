import * as mailjet from 'node-mailjet';

const send = async (email, message) => {
    const client = mailjet.connect(
        process.env.MAILJET_PUBLIC_KEY,
        process.env.MAILJET_PRIVATE_KEY,
    );

    try {
        await client.post('send', { version: 'v3.1' }).request({
            Messages: [message],
        });
    } catch (e) {
        const statusCode = e?.response?.statusCode || 0;
        const text = e?.response?.error?.text || '';
        throw `error occurred while sending email to ${email} with status ${statusCode} and text ${text}`;
    }

    return true;
};

export default {
    send,
};
