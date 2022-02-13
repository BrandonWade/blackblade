import { useState } from 'react';
import useValidation from '../../hooks/useValidation';
import useAccounts from '../../hooks/useAccounts';
import HeaderPage from '../../components/HeaderPage';
import { PasswordInputField } from '../../components/PasswordInput';
import Button from '../../components/Button';
import './Account.scss';

export default function Account() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { isPasswordLengthValid, doesPasswordContainValidChars, doPasswordsMatch } = useValidation();
    const { changePassword } = useAccounts();
    const currentPasswordLengthValid = isPasswordLengthValid(currentPassword);
    const currentPasswordValidCharsOnly = doesPasswordContainValidChars(currentPassword);
    const newPasswordLengthValid = isPasswordLengthValid(newPassword);
    const newPasswordValidCharsOnly = doesPasswordContainValidChars(newPassword);
    const passwordsMatch = doPasswordsMatch(newPassword, confirmPassword);
    const currentPasswordValid = currentPasswordLengthValid && currentPasswordValidCharsOnly;
    const newPasswordValid = newPasswordLengthValid && newPasswordValidCharsOnly && passwordsMatch;
    const isFormValid = currentPasswordValid && newPasswordValid;

    const onChangeCurrentPassword = e => {
        setCurrentPassword(e.target.value);
    };

    const onChangeNewPassword = e => {
        setNewPassword(e.target.value);
    };

    const onChangeConfirmPassword = e => {
        setConfirmPassword(e.target.value);
    };

    const onChangePassword = async e => {
        e.preventDefault();

        const response = await changePassword(currentPassword, newPassword, confirmPassword);
        if (!response.success) {
            return;
        }
    };

    return (
        <HeaderPage className='Account'>
            <div className='Account-content'>
                <section className='Account-section'>
                    <h3 className='Account-sectionHeading'>Change Password</h3>
                    <form className='Account-changePasswordForm' onSubmit={onChangePassword}>
                        <PasswordInputField
                            label='Current Password'
                            rowClassName='Account-inputRow'
                            labelClassName='Account-inputLabel'
                            className='Account-input'
                            hideStrength={true}
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
