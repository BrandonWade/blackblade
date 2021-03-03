import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Logo from '../../components/Logo';
import { InputField } from '../../components/Input';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { login } = useAuth();

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (email === '' || password === '') {
            return;
        }

        const result = await login(email, password);
        if (result?.success) {
            // TODO: Set authenticated prop
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
                        autoComplete='username'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <InputField
                        type='password'
                        label='Password'
                        rowClassName='Login-inputRow'
                        labelClassName='Login-inputLabel'
                        className='Login-input'
                        autoComplete='current-password'
                        value={password}
                        onChange={onChangePassword}
                    />
                    <div className='Login-forgotPasswordContainer'>
                        <Link>Forgot your password?</Link>
                    </div>
                    <Button className='Login-submit' onClick={onSubmit}>
                        Login
                    </Button>
                    <div className='Login-registerContainer'>
                        Don't have an account yet? <Link>Register!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;