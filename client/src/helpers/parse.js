export function parseIntFallback(value = NaN, fallback = 0) {
    const result = parseInt(value);
    if (isNaN(result)) {
        return fallback;
    }

    return result;
}

export function parseFloatFallback(value = NaN, fallback = 0.0) {
    const result = parseFloat(value);
    if (isNaN(result)) {
        return fallback;
    }

    return result;
}
