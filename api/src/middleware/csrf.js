import csrf from 'csurf';
import cookieOptions, { SECURE_NON_DEVELOP } from '../helpers/cookies';

export const csrfMiddleware = csrf({
    cookie: cookieOptions({
        secure: SECURE_NON_DEVELOP,
        httpOnly: true,
    }),
});

export const csrfCookieMiddleware = (req, res, next) => {
    res.cookie(
        'ct',
        req.csrfToken(),
        cookieOptions({ secure: SECURE_NON_DEVELOP }),
    );
    next();
};
