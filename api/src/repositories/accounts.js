import { connection } from '../db';
import NotFoundError from '../errors/not_found';
import AlreadyExistsError from '../errors/already_exists';

const registerAccount = async (email, passwordHash, activationToken) => {
    let success = false;

    const tx = await connection.getConnection();
    await tx.beginTransaction();

    try {
        const [accountResult] = await tx.query(
            `INSERT INTO accounts (
                email,
                password_hash
            ) VALUES (
                ?,
                ?
            )
        `,
            [email, passwordHash],
        );
        if (accountResult?.affectedRows !== 1 && !accountResult?.insertId) {
            throw `error creating account with email ${email}`;
        }

        const accountID = accountResult.insertId;
        const [tokenResults] = await tx.query(
            `INSERT INTO account_activation_tokens(
                account_id,
                activation_token
            ) VALUES (
                ?,
                ?
            )
        `,
            [accountID, activationToken],
        );
        if (tokenResults?.affectedRows !== 1 && !tokenResults?.insertId) {
            throw `error creating account with email ${email}`;
        }

        await tx.commit();

        success = true;
    } catch (e) {
        if (e.toString().indexOf('Duplicate entry') !== -1) {
            throw new AlreadyExistsError(
                `account with email ${email} already exists`,
            );
        } else {
            throw e;
        }
    } finally {
        await tx.release();
    }

    return success;
};

const activateAccount = async (activationToken) => {
    let success = false;

    const tx = await connection.getConnection();
    await tx.beginTransaction();

    try {
        const [accountIDResults] = await connection.query(
            `SELECT
            a.id
            FROM accounts a
            INNER JOIN account_activation_tokens t ON a.id = t.account_id
            WHERE t.activation_token = ?
            AND t.is_used = 0
        `,
            [activationToken],
        );
        if (!accountIDResults.length !== 1 && !accountIDResults?.[0]?.id) {
            throw new NotFoundError(
                `could not find account associated with activation token ${activationToken}`,
            );
        }

        const accountID = accountIDResults[0].id;
        const [tokenResults] = await tx.query(
            `UPDATE account_activation_tokens
            SET is_used = 1
            WHERE account_id = ?
            AND activation_token = ?
        `,
            [accountID, activationToken],
        );
        if (!tokenResults.length !== 1 && !tokenResults?.[0]?.id) {
            throw new NotFoundError(
                `could not find activation token ${activationToken} associated with account ${accountID}`,
            );
        }

        const [accountResults] = await tx.query(
            `UPDATE accounts
            SET is_activated = 1
            WHERE id = ?
        `,
            [accountID],
        );
        if (!accountResults.length !== 1 && !accountResults?.[0]?.id) {
            throw new NotFoundError(`could not activate account ${accountID}`);
        }

        await tx.commit();

        success = true;
    } catch (e) {
        throw e;
    } finally {
        await tx.release();
    }

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
            throw new NotFoundError(
                `could not find account with email ${email}`,
            );
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
            throw `error creating password reset token for account ${accountID}`;
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
        throw e;
    } finally {
        await tx.release();
    }

    return success;
};

const resetPassword = async (token, passwordHash) => {
    let success = false;

    const tx = await connection.getConnection();
    await tx.beginTransaction();

    try {
        const [accountResult] = await tx.query(
            `UPDATE accounts a
            INNER JOIN account_password_reset_tokens t ON a.id = t.id
            SET a.password_hash = ?
            WHERE t.reset_token = ?
            AND t.status = 'pending'
        `,
            [passwordHash, token],
        );
        if (accountResult?.affectedRows === 0) {
            throw new NotFoundError(
                `could not find account associated with reset token ${token}`,
            );
        }

        const [tokenResult] = await tx.query(
            `UPDATE account_password_reset_tokens t
            SET t.status = 'used'
            WHERE t.reset_token = ?
        `,
            [token],
        );

        if (tokenResult?.affectedRows === 0) {
            throw new NotFoundError(`could not find reset token ${token}`);
        }

        await tx.commit();

        success = true;
    } catch (e) {
        throw e;
    } finally {
        await tx.release();
    }

    return success;
};

export default {
    registerAccount,
    activateAccount,
    createPasswordResetToken,
    resetPassword,
};
