import { useContext } from 'react';
import ReactDOM from 'react-dom';
import ConfirmDialogContext from '../../contexts/ConfirmDialog';
import Backdrop from '../Backdrop';
import Button from '../Button';
import './ConfirmDialog.scss';

export default function ConfirmDialog() {
    const { message, visible, onConfirm, onCancel } = useContext(ConfirmDialogContext);

    return ReactDOM.createPortal(
        <Backdrop className='ConfirmDialog' visible={visible} onClose={onCancel}>
            <div className='ConfirmDialog-content'>
                <div className='ConfirmDialog-message'>{message}</div>
                <div className='ConfirmDialog-buttons'>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </Backdrop>,
        document.getElementById('portal-root')
    );
}
