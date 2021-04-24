import { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { isEmpty } from 'lodash';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import Backdrop from '../Backdrop';
import TextArea from '../TextArea';
import Message from '../Message';
import { Copy, Download } from '../Icons';
import Button from '../Button';
import './ExportDeckDialog.scss';

function ExportDeckDialog({ exportList = '' }) {
    const [message, setMessage] = useState({});
    const { visible, setVisible } = useContext(ExportDeckDialogContext);

    const onClose = () => {
        setVisible(false);
    };

    const onCopy = async e => {
        e.preventDefault();

        try {
            await navigator.clipboard.writeText(exportList);
        } catch (e) {
            setMessage({
                type: 'error',
                text: 'An error occurred while copying your deck to clipboard',
            });
            return;
        }

        setMessage({
            type: 'success',
            text: 'Deck successfully copied to clipboard',
        });
    };

    return ReactDOM.createPortal(
        <Backdrop className='ExportDeckDialog' visible={visible}>
            <div className='ExportDeckDialog-content'>
                <div className='ExportDeckDialog-close' onClick={onClose}>
                    &#x2715;
                </div>
                <TextArea className='ExportDeckDialog-deck' value={exportList} readOnly={true} />
                <Message type={message.type} text={message.text} visible={!isEmpty(message)} />
                <div className='ExportDeckDialog-options'>
                    <Button onClick={onCopy}>
                        <Copy className='ExportDeckDialog-icon' />
                        Copy
                    </Button>
                    <Button>
                        <Download className='ExportDeckDialog-icon' />
                        Download
                    </Button>
                </div>
            </div>
        </Backdrop>,
        document.getElementById('portal-root')
    );
}

export default ExportDeckDialog;
