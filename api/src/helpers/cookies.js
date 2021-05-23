export const DURATION_ONE_HOUR = 3600000;
export const DURATION_ONE_WEEK = 604800000;
export const SECURE_NON_DEVELOP = process.env.ENVIRONMENT !== 'develop';

export default function cookieOptions(
    maxAge = DURATION_ONE_WEEK,
    secure = SECURE_NON_DEVELOP,
    httpOnly = false,
    sameSite = 'lax',
) {
    return {
        maxAge,
        secure,
        httpOnly,
        sameSite,
    };
}
