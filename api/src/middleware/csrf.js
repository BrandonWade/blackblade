import csrf from 'csurf';
import cookieOptions, {
    DURATION_ONE_HOUR,
    SECURE_NON_DEVELOP,
} from '../helpers/cookies';

export const csrfMiddleware = csrf({
    cookie: cookieOptions(DURATION_ONE_HOUR, SECURE_NON_DEVELOP, true),
});

export const csrfCookieMiddleware = (req, res, next) => {
    res.cookie(
        'ct',
        req.csrfToken(),
        cookieOptions(DURATION_ONE_HOUR, SECURE_NON_DEVELOP),
    );
    next();
};
