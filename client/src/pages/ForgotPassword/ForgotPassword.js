import { useState } from 'react';
import useAccount from '../../hooks/useAccount';
import { isEmailValid } from '../../validators/email';
import Logo from '../../components/Logo';
import { InputField } from '../../components/Input';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './ForgotPassword.scss';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const { requestPasswordReset } = useAccount();
    const emailValid = isEmailValid(email);

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (!emailValid) {
            return;
        }

        // TODO: Display response message
        await requestPasswordReset(email);
    };

    return (
        <div className='ForgotPassword'>
            <div className='ForgotPassword-content'>
                <Logo className='ForgotPassword-logo' size='large' />
                <form className='ForgotPassword-form'>
                    <p className='ForgotPassword-description'>Enter your email below and we'll send you a link to reset your password.</p>
                    <InputField
                        label='Email'
                        rowClassName='ForgotPassword-inputRow'
                        labelClassName='ForgotPassword-inputLabel'
                        className='ForgotPassword-input'
                        autoComplete='email'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <Button className='ForgotPassword-submit' disabled={!emailValid} onClick={onSubmit}>
                        Submit
                    </Button>
                    <div className='Login-registerContainer'>
                        Don't have an account yet? <Link to='/register'>Register!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
