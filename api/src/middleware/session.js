import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { connection } from '../db';
import cookieOptions, { DURATION_ONE_WEEK } from '../helpers/cookies';

const sessionSecret = process.env.SESSION_SECRET || '';
if (!sessionSecret) {
    throw new Error('session secret not loaded');
}

const sessionStore = MySQLStore(session);

export default new session({
    key: 'sid',
    secret: sessionSecret,
    store: new sessionStore({}, connection),
    resave: false,
    saveUninitialized: false,
    cookie: cookieOptions({ maxAge: DURATION_ONE_WEEK }),
});
