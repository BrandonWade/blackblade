import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import sessionMiddleware from './middleware/session';
import { csrfMiddleware, csrfCookieMiddleware } from './middleware/csrf';
import auth from './routes/auth';
import search from './routes/search';
import cards from './routes/cards';
import decks from './routes/decks';
import bookmarks from './routes/bookmarks';
import accounts from './routes/accounts';

const app = express();

if (process.env.ENVIRONMENT !== 'develop') {
    app.set('trust proxy', 1);
}

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(csrfMiddleware);
app.use(csrfCookieMiddleware);

// Routes
app.use('/', auth);
app.use('/', search);
app.use('/cards', cards);
app.use('/decks', decks);
app.use('/bookmarks', bookmarks);
app.use('/accounts', accounts);

export default app;
