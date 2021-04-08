import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import { connection } from './db';
import router from './routes';
import cookieOptions from './helpers/cookies';

const app = express();

const sessionSecret = process.env.SESSION_SECRET || '';
if (!sessionSecret) {
    throw 'session secret not loaded';
}

if (process.env.ENVIRONMENT !== 'develop') {
    app.set('trust proxy', 1);
}

const sessionStore = MySQLStore(session);
const sessionMiddleware = new session({
    key: 'sid',
    secret: sessionSecret,
    store: new sessionStore({}, connection),
    resave: false,
    saveUninitialized: false,
    cookie: cookieOptions(),
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use('/', router);

export default app;
