import mysql from 'mysql';

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
});

export const initializeDatabase = async () => {
    const success = connect();
    if (success) {
        return;
    }

    let retries = 3;
    while (retries--) {
        console.log(
            `Attempting to connect to ${DB_DATABASE}, attempt ${
                3 - retries
            }...`,
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const success = connect();
        if (success) {
            return;
        }
    }

    console.error('All attempts to connect to DB failed');
    process.exit(1);
};

const connect = async () => {
    await connection.connect((err) => {
        if (err) {
            console.error(err);
            return false;
        } else {
            console.log(
                `Successfully connected to '${DB_DATABASE}' as '${DB_USERNAME}'`,
            );
            return true;
        }
    });

    return false;
};

export const query = (query, args) =>
    new Promise((resolve, reject) => {
        connection.query(query, args, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve({ results, fields });
            }
        });
    });
