import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import useAccount from '../../hooks/useAccount';
import { isPasswordLengthValid, doesPasswordContainValidChars, doPasswordsMatch } from '../../validators/password';
import Logo from '../../components/Logo';
import { PasswordField } from '../../components/PasswordInput';
import ValidationRow from '../../components/ValidationRow/ValidationRow';
import Button from '../../components/Button';
import './ResetPassword.scss';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    const { resetPassword } = useAccount();
    const passwordLengthValid = isPasswordLengthValid(password);
    const passwordValidCharsOnly = doesPasswordContainValidChars(password);
    const passwordsMatch = doPasswordsMatch(password, confirmPassword);
    const isFormValid = passwordLengthValid && passwordValidCharsOnly && passwordsMatch;

    const checkPasswordResetTokenCookie = () => {
        const cookieExists = document.cookie.indexOf('prt=') !== -1;
        return cookieExists ? null : <Redirect to='/password/forgot' />;
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

        const result = await resetPassword(password, confirmPassword);
        if (result?.success) {
            history.push('/login');
        }
    };

    return (
        <div className='ResetPassword'>
            {checkPasswordResetTokenCookie()}
            <div className='ResetPassword-content'>
                <Logo className='ResetPassword-logo' size='large' />
                <form className='ResetPassword-form'>
                    <PasswordField
                        label='New Password'
                        rowClassName='ResetPassword-inputRow'
                        labelClassName='ResetPassword-inputLabel'
                        className='ResetPassword-input'
                        autoComplete='new-password'
                        value={password}
                        onChange={onChangePassword}
                    />
                    <PasswordField
                        label='Confirm Password'
                        rowClassName='ResetPassword-inputRow'
                        labelClassName='ResetPassword-inputLabel'
                        className='ResetPassword-input'
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                    <div className='ResetPassword-validationRules'>
                        <ValidationRow valid={passwordLengthValid} description='Password is between 15 and 50 characters' />
                        <ValidationRow valid={passwordValidCharsOnly} description='Password only contains letters, numbers, and !@#$%^&*' />
                        <ValidationRow valid={passwordsMatch} description='Passwords match' />
                    </div>
                    <Button className='ResetPassword-submit' disabled={!isFormValid} onClick={onSubmit}>
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
