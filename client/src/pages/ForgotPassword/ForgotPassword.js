import { useState } from 'react';
import useMessage from '../../hooks/useMessage';
import useAccounts from '../../hooks/useAccounts';
import useValidation from '../../hooks/useValidation';
import Panel from '../../components/Panel';
import { InputField } from '../../components/Input';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './ForgotPassword.scss';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const { requestPasswordReset } = useAccounts();
    const { isEmailValid } = useValidation();
    const { clearMessage } = useMessage();
    const emailValid = isEmailValid(email);

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        clearMessage();

        if (!emailValid) {
            return;
        }

        const response = await requestPasswordReset(email);
        if (!response.success) {
            return;
        }
    };

    return (
        <div className='ForgotPassword'>
            <Panel wrapperClassName='ForgotPassword-wrapper' showLogo={true}>
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
                    <Button className='ForgotPassword-submit' type='submit' disabled={!emailValid} onClick={onSubmit}>
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
