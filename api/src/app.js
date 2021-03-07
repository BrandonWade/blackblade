import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { connection } from './db';
import router from './routes';

const app = express();

const sessionSecret = process.env.SESSION_SECRET || '';
if (!sessionSecret) {
    throw 'session secret not loaded';
}

const sessionCookieAge = 604800000; // 7 days
const sessionCookieSecure = process.env.ENVIRONMENT !== 'develop';
const sessionStore = MySQLStore(session);
const sessionMiddleware = new session({
    key: 'session',
    secret: sessionSecret,
    store: new sessionStore({}, connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: sessionCookieAge,
        httpOnly: false,
        secure: sessionCookieSecure,
    },
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use('/', router);

export default app;
