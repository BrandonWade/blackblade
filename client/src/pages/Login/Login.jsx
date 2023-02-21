import cookies from 'js-cookie';
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import useAuth from '../../hooks/useAuth';
import useValidation from '../../hooks/useValidation';
import AuthContext from '../../contexts/Auth';
import Panel from '../../components/Panel';
import { InputField } from '../../components/Input';
import { PasswordInputField } from '../../components/PasswordInput';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Login.scss';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { login } = useAuth();
    const { isEmailValid, isPasswordValid } = useValidation();
    const { showMessage, clearMessage } = useMessage();
    const { setAuthenticated, setAccountPublicID } = useContext(AuthContext);
    const emailValid = isEmailValid(email);
    const passwordValid = isPasswordValid(password);
    const isFormValid = emailValid && passwordValid;

    useEffect(() => {
        const rm = cookies.get('rm');
        if (rm === undefined) {
            return null;
        }

        cookies.remove('rm');

        const message = JSON.parse(rm);
        const { text, type } = message;
        showMessage({ text, type });
    }, []);

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        clearMessage();

        if (!isFormValid) {
            return;
        }

        const response = await login(email, password);
        if (!response.success) {
            return;
        }

        setAuthenticated(true);
        setAccountPublicID(response.accountPublicID);
        history.push('/');
    };

    return (
        <div className='Login'>
            <Panel wrapperClassName='Login-wrapper' showLogo={true}>
                <form className='Login-form'>
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
                        hideStrength={true}
                        label='Password'
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
                        autoComplete='current-password'
                        value={password}
                        onChange={onChangePassword}
                    />
                    <div className='Login-forgotPasswordContainer'>
                        <Link to='/password/forgot'>Forgot your password?</Link>
                    </div>
                    <Button className='Login-submit' type='submit' disabled={!isFormValid} onClick={onSubmit}>
                        Login
                    </Button>
                    <div className='Login-registerContainer'>
                        Don't have an account yet? <Link to='/register'>Register!</Link>
                    </div>
                </form>
            </Panel>
        </div>
    );
}
