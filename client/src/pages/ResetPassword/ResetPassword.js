import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import useMessage, { DURATION_LONG } from '../../hooks/useMessage';
import useAccounts from '../../hooks/useAccounts';
import useValidation from '../../hooks/useValidation';
import Panel from '../../components/Panel';
import { PasswordInputField } from '../../components/PasswordInput';
import ValidationRow from '../../components/ValidationRow/ValidationRow';
import Button from '../../components/Button';
import './ResetPassword.scss';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    const { resetPassword } = useAccounts();
    const { isPasswordLengthValid, doesPasswordContainValidChars, doPasswordsMatch } = useValidation();
    const { showMessage } = useMessage();
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
        showMessage({});

        if (!isFormValid) {
            return;
        }

        const response = await resetPassword(password, confirmPassword);
        if (response?.success) {
            history.push('/login');
        } else {
            const { text, type } = response?.message;
            showMessage({ text, type, DURATION_LONG });
        }
    };

    return (
        <div className='ResetPassword'>
            {checkPasswordResetTokenCookie()}
            <Panel wrapperClassName='ResetPassword-wrapper' showLogo={true}>
                <form className='ResetPassword-form'>
                    <PasswordInputField
                        label='New Password'
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
                    <div className='ResetPassword-validationRules'>
                        <ValidationRow valid={passwordLengthValid} description='Password is between 15 and 50 characters' />
                        <ValidationRow valid={passwordValidCharsOnly} description='Password only contains letters, numbers, and !@#$%^&*' />
                        <ValidationRow valid={passwordsMatch} description='Passwords match' />
                    </div>
                    <Button className='ResetPassword-submit' type='submit' disabled={!isFormValid} onClick={onSubmit}>
                        Reset Password
                    </Button>
                </form>
            </Panel>
        </div>
    );
}
