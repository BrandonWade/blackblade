import { useState } from 'react';
import useAccount from '../../hooks/useAccount';
import { isEmailValid } from '../../validators/email';
import { isPasswordLengthValid, doesPasswordContainValidChars, doPasswordsMatch } from '../../validators/password';
import Logo from '../../components/Logo';
import { InputField } from '../../components/Input';
import { PasswordField } from '../../components/PasswordInput';
import ValidationRow from '../../components/ValidationRow/ValidationRow';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Register.scss';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useAccount();
    const emailValid = isEmailValid(email);
    const passwordLengthValid = isPasswordLengthValid(password);
    const passwordValidCharsOnly = doesPasswordContainValidChars(password);
    const passwordsMatch = doPasswordsMatch(password, confirmPassword);
    const isFormValid = emailValid && passwordLengthValid && passwordValidCharsOnly && passwordsMatch;

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = e => {
        setConfirmPassword(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        await register(email, password, confirmPassword);
    };

    return (
        <div className='Register'>
            <div className='Register-content'>
                <Logo className='Register-logo' size='large' />
                <form className='Register-form'>
                    <InputField
                        label='Email'
                        rowClassName='Register-inputRow'
                        labelClassName='Register-inputLabel'
                        className='Register-input'
                        autoComplete='email'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <PasswordField
                        label='Password'
                        rowClassName='Register-inputRow'
                        labelClassName='Register-inputLabel'
                        className='Register-input'
                        autoComplete='new-password'
                        value={password}
                        onChange={onChangePassword}
                    />
                    <PasswordField
                        label='Confirm Password'
                        rowClassName='Register-inputRow'
                        labelClassName='Register-inputLabel'
                        className='Register-input'
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                    <div className='Register-validationRules'>
                        <ValidationRow valid={emailValid} description='Email is valid' />
                        <ValidationRow valid={passwordLengthValid} description='Password is between 15 and 50 characters' />
                        <ValidationRow valid={passwordValidCharsOnly} description='Password only contains letters, numbers, and !@#$%^&*' />
                        <ValidationRow valid={passwordsMatch} description='Passwords match' />
                    </div>
                    <Button className='Register-submit' disabled={!isFormValid} onClick={onSubmit}>
                        Register
                    </Button>
                    <div className='Register-loginContainer'>
                        Already have an account? <Link to='/login'>Login!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
