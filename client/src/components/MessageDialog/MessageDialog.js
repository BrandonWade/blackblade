import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop';
import Button from '../Button';
import './MessageDialog.scss';

function MessageDialog({ message = '', visible = false, onClose = () => {} }) {
    return ReactDOM.createPortal(
        <Backdrop className='MessageDialog' visible={visible} onClose={onClose}>
            <div className='MessageDialog-content'>
                <div className='MessageDialog-message'>{message}</div>
                <div className='MessageDialog-buttons'>
                    <Button className='MessageDialog-okButton' onClick={onClose}>
                        OK
                    </Button>
                </div>
            </div>
        </Backdrop>,
        document.getElementById('portal-root')
    );
}

export default MessageDialog;
