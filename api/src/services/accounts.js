import AccountRepository from '../repositories/accounts';

// TODO: Implement
const registerAccount = async (email, password) => {
    const emailIV = '';
    const emailEnc = '';
    const emailHash = '';
    const passwordHash = '';

    return AccountRepository.registerAccount(
        emailIV,
        emailEnc,
        emailHash,
        passwordHash,
    );
};

export default {
    registerAccount,
};
