import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { isEmpty } from 'lodash';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import Backdrop from '../Backdrop';
import Panel from '../Panel';
import TextArea from '../TextArea';
import Message from '../Message';
import { Copy, Download } from '../Icons';
import Button from '../Button';
import './ExportDeckDialog.scss';

function ExportDeckDialog() {
    const [message, setMessage] = useState({});
    const { publicID } = useParams();
    const { deckExport, visible, setVisible } = useContext(ExportDeckDialogContext);

    const onClose = () => {
        setMessage({});
        setVisible(false);
    };

    const onCopy = async e => {
        e.preventDefault();

        try {
            await navigator.clipboard.writeText(deckExport);
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
        <Backdrop className='ExportDeckDialog' visible={visible} onClose={onClose}>
            <Panel className='ExportDeckDialog-content'>
                <div className='ExportDeckDialog-close' onClick={onClose}>
                    &#x2715;
                </div>
                <TextArea className='ExportDeckDialog-deck' value={deckExport} readOnly={true} />
                <Message type={message.type} text={message.text} visible={!isEmpty(message)} />
                <div className='ExportDeckDialog-buttons'>
                    <Button onClick={onCopy}>
                        <Copy className='ExportDeckDialog-icon' />
                        Copy
                    </Button>
                    <a href={`/api/decks/${publicID}/download`}>
                        <Button>
                            <Download className='ExportDeckDialog-icon' />
                            Download
                        </Button>
                    </a>
                </div>
            </Panel>
        </Backdrop>,
        document.getElementById('portal-root')
    );
}

export default ExportDeckDialog;
