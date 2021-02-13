import * as mailjet from 'node-mailjet';

const send = async (message) => {
    const client = mailjet.connect(
        process.env.MAILJET_PUBLIC_KEY,
        process.env.MAILJET_PRIVATE_KEY,
    );

    // TODO: Make request
    // const request = await client.post('send', { version: 'v3.1' }).request({
    //     Messages: [message],
    // });
};

export default {
    send,
};
