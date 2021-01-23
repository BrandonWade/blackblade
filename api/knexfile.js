const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
const credentials = {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
};

module.exports = {
    client: 'mysql2',
    connection: credentials,
};
