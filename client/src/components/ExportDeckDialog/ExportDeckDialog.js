import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop';
import TextArea from '../TextArea';
import './ExportDeckDialog.scss';

function ExportDeckDialog({ visible = false, exportList = '' }) {
    return ReactDOM.createPortal(
        <Backdrop className='ExportDeckDialog' visible={visible}>
            <div className='ExportDeckDialog-content'>
                <TextArea className='ExportDeckDialog-deck' value={exportList} readOnly={true} />
                <div className='ExportDeckDialog-options'></div>
            </div>
        </Backdrop>,
        document.getElementById('portal-root')
    );
}

export default ExportDeckDialog;
