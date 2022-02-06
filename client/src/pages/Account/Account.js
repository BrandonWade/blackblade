import { useState } from 'react';
import useValidation from '../../hooks/useValidation';
import HeaderPage from '../../components/HeaderPage';
import { PasswordInputField } from '../../components/PasswordInput';
import { InputField } from '../../components/Input';
import Button from '../../components/Button';
import './Account.scss';

export default function Account() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { isPasswordLengthValid, doesPasswordContainValidChars, doPasswordsMatch } = useValidation();
    const passwordLengthValid = isPasswordLengthValid(newPassword);
    const passwordValidCharsOnly = doesPasswordContainValidChars(newPassword);
    const passwordsMatch = doPasswordsMatch(newPassword, confirmPassword);
    const isFormValid = passwordLengthValid && passwordValidCharsOnly && passwordsMatch;

    const onChangeCurrentPassword = e => {
        setCurrentPassword(e.target.value);
    };

    const onChangeNewPassword = e => {
        setNewPassword(e.target.value);
    };

    const onChangeConfirmPassword = e => {
        setConfirmPassword(e.target.value);
    };

    const onChangePassword = () => {
        // TODO: Implement me
    };

    return (
        <HeaderPage className='Account'>
            <div className='Account-content'>
                <section className='Account-section'>
                    <label className='Account-sectionLabel'>Change Password</label>
                    <form className='Account-changePasswordForm' onSubmit={onChangePassword}>
                        <InputField
                            label='Current Password'
                            rowClassName='Account-inputRow'
                            labelClassName='Account-inputLabel'
                            className='Account-input'
                            value={currentPassword}
                            onChange={onChangeCurrentPassword}
                        />
                        <PasswordInputField
                            label='New Password'
                            rowClassName='Account-inputRow'
                            labelClassName='Account-inputLabel'
                            className='Account-input'
                            value={newPassword}
                            onChange={onChangeNewPassword}
                        />
                        <PasswordInputField
                            label='Confirm Password'
                            rowClassName='Account-inputRow'
                            labelClassName='Account-inputLabel'
                            className='Account-input'
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                        />
                        <Button className='Account-changePasswordButton' type='submit' disabled={!isFormValid} onClick={onChangePassword}>
                            Change Password
                        </Button>
                    </form>
                </section>
            </div>
        </HeaderPage>
    );
}
