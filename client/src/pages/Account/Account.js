import { useState } from 'react';
import useValidation from '../../hooks/useValidation';
import useAccounts from '../../hooks/useAccounts';
import HeaderPage from '../../components/HeaderPage';
import { PasswordInputField } from '../../components/PasswordInput';
import ValidationRow from '../../components/ValidationRow';
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

    const onDeleteAccount = () => {
        // TODO: Implement me
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
                        <div className='Account-validationRules'>
                            <ValidationRow valid={newPasswordLengthValid} description='Password is between 15 and 50 characters' />
                            <ValidationRow valid={newPasswordValidCharsOnly} description='Password only contains letters, numbers, and !@#$%^&*' />
                            <ValidationRow valid={passwordsMatch} description='Passwords match' />
                        </div>
                        <Button className='Account-changePasswordButton' type='submit' disabled={!isFormValid} onClick={onChangePassword}>
                            Change Password
                        </Button>
                    </form>
                </section>
                <section className='Account-section'>
                    <h3 className='Account-sectionHeading'>Delete Account</h3>
                    <div className='Account-deleteAccount'>
                        <p className='Account-deleteAccountDescription'>
                            If you decide you no longer want to use Blackblade, you can permanently delete your account. Please note that this cannot
                            be undone, and that it will take approximately 60 days for your data to be completely removed from our system.
                        </p>
                        <Button className='Account-deleteAccountButton' onClick={onDeleteAccount}>
                            Delete Account
                        </Button>
                    </div>
                </section>
            </div>
        </HeaderPage>
    );
}
