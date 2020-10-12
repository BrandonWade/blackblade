import mysql from 'mysql2/promise';
import Knex from 'knex';

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
const credentials = {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
};

export const connection = mysql.createPool(credentials);

export const builder = Knex({
    client: 'mysql2',
    connection: credentials,
});
