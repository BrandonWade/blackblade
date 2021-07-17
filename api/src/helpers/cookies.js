export const DURATION_SESSION = null;
export const DURATION_ONE_HOUR = 3600000;
export const DURATION_ONE_WEEK = 604800000;
export const SECURE_NON_DEVELOP = process.env.ENVIRONMENT !== 'develop';
export const SAMESITE_LAX = 'lax';

export default function cookieOptions({
    maxAge = DURATION_SESSION,
    secure = SECURE_NON_DEVELOP,
    httpOnly = false,
    sameSite = SAMESITE_LAX,
}) {
    const options = {
        maxAge,
        secure,
        httpOnly,
        sameSite,
    };

    if (maxAge === null) {
        delete options.maxAge;
    }

    return options;
}
