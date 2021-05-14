import cookies from 'js-cookie';
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isEmailValid } from '../../validators/email';
import { isPasswordValid } from '../../validators/password';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../contexts/Auth';
import Panel from '../../components/Panel';
import Message from '../../components/Message';
import { InputField } from '../../components/Input';
import { PasswordField } from '../../components/PasswordInput';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({});
    const history = useHistory();
    const { login } = useAuth();
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
        setMessage(message);
    }, []);

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        setMessage({});

        if (!isFormValid) {
            return;
        }

        const response = await login(email, password);
        if (response?.success) {
            setAuthenticated(true);
            setAccountPublicID(response.accountPublicID);
            history.push('/');
        } else {
            setMessage(response?.message);
        }
    };

    return (
        <div className='Login'>
            <Panel wrapperClassName='Login-wrapper' className='' showLogo={true}>
                <Message type={message.type} text={message.text} />
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
                    <PasswordField
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
                    <Button className='Login-submit' disabled={!isFormValid} onClick={onSubmit}>
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

export default Login;
