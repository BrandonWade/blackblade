import Input from '../../components/Input';
import Button from '../../components/Button';
import './Login.scss';

function Login() {
    return (
        <div className='Login'>
            <div className='Login-content'>
                Username:
                <Input />
                Password:
                <Input />
                <Button>Log In</Button>
            </div>
        </div>
    );
}

export default Login;
