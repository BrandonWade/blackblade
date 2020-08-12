import mysql from 'mysql';

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
});

export const initializeDatabase = () => {
    // TODO: Implement graceful reconnection attempts
    // This is a hack to wait a few seconds before attempting to
    // connect to MySQL to give it a chance to finish booting up
    setTimeout(() => {
        connection.connect((err) => {
            if (err) {
                throw err;
            }

            console.log(
                `Successfully connected to '${DB_DATABASE}' as '${DB_USERNAME}'`,
            );
        });
    }, 5000);
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
