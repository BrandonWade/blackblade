export default function useValidation() {
    const isPasswordLengthValid = password => password.trim().length >= 15 && password.trim().length <= 50;
    const doesPasswordContainValidChars = password => /^[\w!@#$%^&*]+$/.test(password);
    const doPasswordsMatch = (password, confirmPassword) => password === confirmPassword;
    const isPasswordValid = password => isPasswordLengthValid(password) && doesPasswordContainValidChars(password);
    const isEmailValid = email => /^[^@]+@[^.@]+\..{2,}$/.test(email);

    return {
        isPasswordLengthValid,
        doesPasswordContainValidChars,
        doPasswordsMatch,
        isPasswordValid,
        isEmailValid,
    };
}
