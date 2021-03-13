export const isPasswordLengthValid = password => password.trim().length >= 15 && password.trim().length <= 50;
export const doesPasswordContainValidChars = password => /^[\w!@#$%^&*]+$/.test(password);
export const doPasswordsMatch = (password, confirmPassword) => password === confirmPassword;

export const isPasswordValid = (password, confirmPassword) => {
    return isPasswordLengthValid(password) && doesPasswordContainValidChars(password) && doPasswordsMatch(password, confirmPassword);
};
