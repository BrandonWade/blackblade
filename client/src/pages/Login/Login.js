import Logo from '../../components/Logo';
import { InputField } from '../../components/Input';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Login.scss';

function Login() {
    return (
        <div className='Login'>
            <div className='Login-content'>
                <Logo className='Login-logo' size='large' />
                <form className='Login-form'>
                    <InputField label='Email' rowClassName='Login-inputRow' labelClassName='Login-inputLabel' className='Login-input' />
                    <InputField label='Password' rowClassName='Login-inputRow' labelClassName='Login-inputLabel' className='Login-input' />
                    <div className='Login-forgotPasswordContainer'>
                        <Link>Forgot your password?</Link>
                    </div>
                    <Button className='Login-submit'>Login</Button>
                    <div className='Login-registerContainer'>
                        Don't have an account yet? <Link>Register!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
