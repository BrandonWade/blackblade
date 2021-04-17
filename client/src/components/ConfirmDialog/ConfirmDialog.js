import Backdrop from '../Backdrop';
import Button from '../Button';
import './ConfirmDialog.scss';

function ConfirmDialog({ message = '', visible = false, onCancel = () => {}, onConfirm = () => {}, setVisible = () => {} }) {
    const onCancelClick = () => {
        onCancel();
        setVisible(false);
    };

    const onConfirmClick = () => {
        onConfirm();
        setVisible(false);
    };

    return (
        <Backdrop className='ConfirmDialog' visible={visible}>
            <div className='ConfirmDialog-content'>
                <div className='ConfirmDialog-message'>{message}</div>
                <div className='ConfirmDialog-buttons'>
                    <Button onClick={onCancelClick}>Cancel</Button>
                    <Button onClick={onConfirmClick}>Confirm</Button>
                </div>
            </div>
        </Backdrop>
    );
}

export default ConfirmDialog;
