export const isEmailWellFormed = email => /^[^@]+@[^.@]+\..{2,}$/.test(email);

export const isEmailValid = email => isEmailWellFormed(email);
