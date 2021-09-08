import { useState } from 'react';
import useMessage, { DURATION_LONG } from '../../hooks/useMessage';
import useAccounts from '../../hooks/useAccounts';
import useValidation from '../../hooks/useValidation';
import Panel from '../../components/Panel';
import { InputField } from '../../components/Input';
import { PasswordInputField } from '../../components/PasswordInput';
import ValidationRow from '../../components/ValidationRow/ValidationRow';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Register.scss';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useAccounts();
    const { isEmailValid, isPasswordLengthValid, doesPasswordContainValidChars, doPasswordsMatch } = useValidation();
    const { showMessage } = useMessage();
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
        showMessage();

        if (!isFormValid) {
            return;
        }

        const response = await register(email, password, confirmPassword);
        const { text, type } = response?.message;
        showMessage(text, type, DURATION_LONG);
    };

    return (
        <div className='Register'>
            <Panel wrapperClassName='Register-wrapper' showLogo={true}>
                <form className='Register-form'>
                    <InputField
                        label='Email'
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
                        autoComplete='email'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <PasswordInputField
                        label='Password'
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
                        autoComplete='new-password'
                        value={password}
                        onChange={onChangePassword}
                    />
                    <PasswordInputField
                        label='Confirm Password'
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
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
                    <Button className='Register-submit' type='submit' disabled={!isFormValid} onClick={onSubmit}>
                        Register
                    </Button>
                    <div className='Register-loginContainer'>
                        Already have an account? <Link to='/login'>Login!</Link>
                    </div>
                </form>
            </Panel>
        </div>
    );
}
