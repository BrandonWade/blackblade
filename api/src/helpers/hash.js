import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hashValue = async (value) => {
    return await bcrypt.hash(value, SALT_ROUNDS);
};

const compareValues = async (value, hash) => {
    return await bcrypt.compare(value, hash);
};

export { hashValue, compareValues };
