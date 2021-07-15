function useCSSVariableValue(name = '') {
    const value = window.getComputedStyle(document.body).getPropertyValue(name);

    if (typeof value === 'string' && value.endsWith('rem')) {
        const rem = parseFloat(value);
        const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

        return rem * fontSize;
    } else {
        return value;
    }
}

export default useCSSVariableValue;
