import hashValue from '../helpers/hash';
import AccountRepository from '../repositories/accounts';

// TODO: Implement
const registerAccount = async (email, password) => {
    const emailIV = '';
    const emailEnc = '';
    const emailHash = await hashValue(email);
    const passwordHash = await hashValue(password);

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
