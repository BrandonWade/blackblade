import { connection } from '../db';

const registerAccount = async (
    emailIV,
    emailAuthTag,
    emailEnc,
    emailHash,
    passwordHash,
    activationToken,
) => {
    const conn = await connection.getConnection();
    await conn.beginTransaction();

    let success = false;
    try {
        const [accountResult] = await conn.query(
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

        if (!accountResult?.insertId) {
            throw 'invalid insert id from creating account';
        }

        await conn.query(
            `INSERT INTO account_activation_tokens(
                account_id,
                activation_token
            ) VALUES (
                ?,
                ?
            );
        `,
            [accountResult.insertId, activationToken],
        );

        await conn.commit();

        success = true;
    } catch (e) {
        console.error('error saving deck:', e);
    }

    await conn.release();

    return success;
};

export default {
    registerAccount,
};
