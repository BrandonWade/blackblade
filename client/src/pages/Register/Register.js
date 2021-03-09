import { useState } from 'react';
import Logo from '../../components/Logo';
import { InputField } from '../../components/Input';
import PasswordField from '../../components/PasswordField';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Register.scss';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onChangeConfirmPassword = e => {
        setConfirmPassword(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (email === '' || password === '' || password !== confirmPassword) {
            return;
        }

        // TODO: Call endpoint
    };

    return (
        <div className='Register'>
            <div className='Register-content'>
                <Logo className='Register-logo' size='large' />
                <form className='Register-form'>
                    <InputField
                        label='Email'
                        rowClassName='Register-inputRow'
                        labelClassName='Register-inputLabel'
                        className='Register-input'
                        autoComplete='email'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <PasswordField
                        label='Password'
                        rowClassName='Register-inputRow'
                        labelClassName='Register-inputLabel'
                        className='Register-input'
                        autoComplete='new-password'
                        value={password}
                        onChange={onChangePassword}
                    />
                    <PasswordField
                        label='Confirm Password'
                        rowClassName='Register-inputRow'
                        labelClassName='Register-inputLabel'
                        className='Register-input'
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                    <Button className='Register-submit' onClick={onSubmit}>
                        Register
                    </Button>
                    <div className='Register-loginContainer'>
                        Already have an account? <Link to='/login'>Login!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
