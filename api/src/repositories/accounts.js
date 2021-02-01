import { connection } from '../db';

const registerAccount = async (
    emailIV,
    emailAuthTag,
    emailEnc,
    emailHash,
    passwordHash,
) => {
    return connection.query(
        `INSERT INTO accounts (
            email_iv,
            email_auth_tag,
            email_enc,
            email_hash,
            password_hash
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `,
        [emailIV, emailAuthTag, emailEnc, emailHash, passwordHash],
    );
};

export default {
    registerAccount,
};
