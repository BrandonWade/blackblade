import mysql from 'mysql2/promise';
import Knex from 'knex';

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env;
const config = {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
};

export const connection = mysql.createPool(config);

export const builder = Knex({
    client: 'mysql2',
    connection: config,
});
