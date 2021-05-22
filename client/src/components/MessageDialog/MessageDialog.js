import { useContext } from 'react';
import ReactDOM from 'react-dom';
import MessageDialogContext from '../../contexts/MessageDialog';
import Backdrop from '../Backdrop';
import Button from '../Button';
import './MessageDialog.scss';

function MessageDialog() {
    const { message, setMessage } = useContext(MessageDialogContext);

    const onClose = () => {
        setMessage('');
    };

    return ReactDOM.createPortal(
        <Backdrop className='MessageDialog' visible={message !== ''} onClose={onClose}>
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
