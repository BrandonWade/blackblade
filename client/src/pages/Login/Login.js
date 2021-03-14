import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { isEmailValid } from '../../validators/email';
import { isPasswordValid } from '../../validators/password';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../contexts/Auth';
import Logo from '../../components/Logo';
import { InputField } from '../../components/Input';
import { PasswordField } from '../../components/PasswordInput';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { login } = useAuth();
    const { setAuthenticated } = useContext(AuthContext);
    const emailValid = isEmailValid(email);
    const passwordValid = isPasswordValid(password);
    const isFormValid = emailValid && passwordValid;

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        const result = await login(email, password);
        if (result?.success) {
            setAuthenticated(true);
            history.push('/');
        }
    };

    return (
        <div className='Login'>
            <div className='Login-content'>
                <Logo className='Login-logo' size='large' />
                <form className='Login-form'>
                    <InputField
                        label='Email'
                        rowClassName='Login-inputRow'
                        labelClassName='Login-inputLabel'
                        className='Login-input'
                        autoComplete='email'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <PasswordField
                        hideStrength={true}
                        label='Password'
                        rowClassName='Login-inputRow'
                        labelClassName='Login-inputLabel'
                        className='Login-input'
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
            </div>
        </div>
    );
}

export default Login;
