const message = (type = 'info', text = '') => {
    return {
        type,
        text,
    };
};

export const errorMessage = (text = '') => {
    return message('error', text);
};

export const warningMessage = (text = '') => {
    return message('warning', text);
};

export const successMessage = (text = '') => {
    return message('success', text);
};

export const infoMessage = (text = '') => {
    return message('info', text);
};
