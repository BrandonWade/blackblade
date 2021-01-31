import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashValue = async (value) => {
    return await bcrypt.hash(value, SALT_ROUNDS);
};

export default hashValue;
