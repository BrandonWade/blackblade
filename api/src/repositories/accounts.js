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

const createAccountActivationToken = async (accountID, activationToken) => {
    return connection.query(
        `INSERT INTO account_activation_tokens(
            account_id,
            activation_token
        ) VALUES (
            ?,
            ?
        );
    `,
        [accountID, activationToken],
    );
};

export default {
    registerAccount,
    createAccountActivationToken,
};
