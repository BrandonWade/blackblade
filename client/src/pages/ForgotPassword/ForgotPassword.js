import { useState } from 'react';
import useAccounts from '../../hooks/useAccounts';
import { isEmailValid } from '../../validators/email';
import Panel from '../../components/Panel';
import Message from '../../components/Message';
import { InputField } from '../../components/Input';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './ForgotPassword.scss';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({});
    const { requestPasswordReset } = useAccounts();
    const emailValid = isEmailValid(email);

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        setMessage({});

        if (!emailValid) {
            return;
        }

        const response = await requestPasswordReset(email);
        if (response?.success) {
            setMessage(response?.message);
        }
    };

    return (
        <div className='ForgotPassword'>
            <Panel wrapperClassName='ForgotPassword-wrapper' showLogo={true}>
                <Message type={message.type} text={message.text} />
                <form className='ForgotPassword-form'>
                    <p className='ForgotPassword-description'>Enter your email below and we'll send you a link to reset your password.</p>
                    <InputField
                        label='Email'
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
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
            </Panel>
        </div>
    );
}

export default ForgotPassword;
