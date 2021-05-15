import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import useAccount from '../../hooks/useAccount';
import { isPasswordLengthValid, doesPasswordContainValidChars, doPasswordsMatch } from '../../validators/password';
import Panel from '../../components/Panel';
import Message from '../../components/Message';
import { PasswordField } from '../../components/PasswordInput';
import ValidationRow from '../../components/ValidationRow/ValidationRow';
import Button from '../../components/Button';
import './ResetPassword.scss';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({});
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
        setMessage({});

        if (!isFormValid) {
            return;
        }

        const response = await resetPassword(password, confirmPassword);
        if (response?.success) {
            history.push('/login');
        } else {
            setMessage(response?.message);
        }
    };

    return (
        <div className='ResetPassword'>
            {checkPasswordResetTokenCookie()}
            <Panel wrapperClassName='ResetPassword-wrapper' showLogo={true}>
                <Message type={message.type} text={message.text} />
                <form className='ResetPassword-form'>
                    <PasswordField
                        label='New Password'
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
                        autoComplete='new-password'
                        value={password}
                        onChange={onChangePassword}
                    />
                    <PasswordField
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
                    <Button className='ResetPassword-submit' disabled={!isFormValid} onClick={onSubmit}>
                        Reset Password
                    </Button>
                </form>
            </Panel>
        </div>
    );
}

export default ResetPassword;
