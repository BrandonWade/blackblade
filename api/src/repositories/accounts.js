import { connection } from '../db';

const registerAccount = async (
    emailIV,
    emailAuthTag,
    emailEnc,
    emailHash,
    passwordHash,
    activationToken,
) => {
    const tx = await connection.getConnection();
    await tx.beginTransaction();

    let success = false;
    try {
        const [accountResult] = await tx.query(
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

        await tx.query(
            `INSERT INTO account_activation_tokens(
                account_id,
                activation_token
            ) VALUES (
                ?,
                ?
            )
        `,
            [accountResult.insertId, activationToken],
        );

        await tx.commit();

        success = true;
    } catch (e) {
        console.error('error saving deck:', e);
    }

    await tx.release();

    return success;
};

const activateAccount = async (activationToken) => {
    let success = false;

    const tx = await connection.getConnection();
    await tx.beginTransaction();

    try {
        const [results] = await connection.query(
            `SELECT
            a.id
            FROM accounts a
            INNER JOIN account_activation_tokens t ON a.id = t.account_id
            WHERE t.activation_token = ?
            AND t.is_used = 0
        `,
            [activationToken],
        );
        if (!results.length !== 1 && !results?.[0]?.id) {
            throw `unable to locate account associated with activation token ${activationToken}`;
        }

        const accountID = results[0].id;
        await tx.query(
            `UPDATE account_activation_tokens
            SET is_used = 1
            WHERE account_id = ?
            AND activation_token = ?
        `,
            [accountID, activationToken],
        );

        await tx.query(
            `UPDATE accounts
            SET is_activated = 1
            WHERE id = ?
        `,
            [accountID],
        );

        await tx.commit();

        success = true;
    } catch (e) {
        console.error('error activating account', e);
    }

    await tx.release();

    return success;
};

const createPasswordResetToken = async (email, token) => {
    let success = false;

    const tx = await connection.getConnection();
    await tx.beginTransaction();

    try {
        const [accountResults] = await connection.query(
            `SELECT
            a.id
            FROM accounts a
            WHERE a.email = ?
        `,
            [email],
        );
        if (!accountResults.length !== 1 && !accountResults?.[0]?.id) {
            throw `unable to locate account associated with email ${email}`;
        }

        const accountID = accountResults[0].id;
        const [insertResults] = await tx.query(
            `INSERT INTO account_password_reset_tokens(
                account_id,
                reset_token,
                expires_at
            ) VALUES (
                ?,
                ?,
                DATE_ADD(NOW(), INTERVAL 1 HOUR)
            )
        `,
            [accountID, token],
        );
        if (!insertResults?.insertId) {
            throw `error inserting password reset token for account ${accountID}`;
        }

        const insertID = insertResults?.insertId;
        await tx.query(
            `UPDATE account_password_reset_tokens p
            SET p.status = 'disabled'
            WHERE p.account_id = ?
            AND p.status = 'pending'
            AND p.id != ?
        `,
            [accountID, insertID],
        );

        await tx.commit();

        success = true;
    } catch (e) {
        console.error('error creating password reset token', e);
    }

    await tx.release();

    return success;
};

export default {
    registerAccount,
    activateAccount,
    createPasswordResetToken,
};
