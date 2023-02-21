import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import ReactDOM from 'react-dom';
import ExportDeckDialogContext from '../../contexts/ExportDeckDialog';
import Backdrop from '../Backdrop';
import Panel from '../Panel';
import TextArea from '../TextArea';
import { Copy, Download } from '../Icons';
import Button from '../Button';
import './ExportDeckDialog.scss';

export default function ExportDeckDialog() {
    const { publicID } = useParams();
    const { showMessage, clearMessage } = useMessage();
    const { deckExport, visible, setVisible } = useContext(ExportDeckDialogContext);

    const onClose = () => {
        clearMessage();
        setVisible(false);
    };

    const onCopy = async e => {
        e.preventDefault();

        try {
            await navigator.clipboard.writeText(deckExport);
        } catch (e) {
            showMessage({ text: 'An error occurred while copying your deck to clipboard.', type: 'error' });
            return;
        }

        showMessage({ text: 'Deck successfully copied to clipboard.', type: 'success' });
    };

    return ReactDOM.createPortal(
        <Backdrop className='ExportDeckDialog' visible={visible} onClose={onClose}>
            <Panel className='ExportDeckDialog-content'>
                <div className='ExportDeckDialog-close' onClick={onClose}>
                    &#x2715;
                </div>
                <TextArea className='ExportDeckDialog-deck' value={deckExport} readOnly={true} />
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
