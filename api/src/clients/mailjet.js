import { StatusCodes } from 'http-status-codes';
import * as mailjet from 'node-mailjet';

const send = async (message) => {
    const client = mailjet.connect(
        process.env.MAILJET_PUBLIC_KEY,
        process.env.MAILJET_PRIVATE_KEY,
    );

    const { response } = await client
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [message],
        });
    if (response.statusCode !== StatusCodes.OK) {
        console.error('error contacting mailjet', response.statusCode);
        return false;
    }

    return true;
};

export default {
    send,
};
