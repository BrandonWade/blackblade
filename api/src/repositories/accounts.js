import { connection } from '../db';

const registerAccount = async (emailIV, emailEnc, emailHash, passwordHash) => {
    return connection.query(
        `INSERT INTO accounts(
        email_iv,
        email_enc,
        email_hash,
        password_hash
    ) VALUES (
        ?,
        ?,
        ?,
        ?
    )`,
        [emailIV, emailEnc, emailHash, passwordHash],
    );
};

export default {
    registerAccount,
};
