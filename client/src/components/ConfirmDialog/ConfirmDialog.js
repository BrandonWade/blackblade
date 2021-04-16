import Backdrop from '../Backdrop';
import Button from '../Button';
import './ConfirmDialog.scss';

function ConfirmDialog({ message = '', visible = false, setVisible = () => {} }) {
    return (
        <Backdrop className='ConfirmDialog' visible={visible}>
            <div className='ConfirmDialog-content'>
                <div className='ConfirmDialog-message'>{message}</div>
                <div className='ConfirmDialog-buttons'>
                    <Button>Cancel</Button>
                    <Button>Confirm</Button>
                </div>
            </div>
        </Backdrop>
    );
}

export default ConfirmDialog;
