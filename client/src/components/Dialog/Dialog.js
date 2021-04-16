import Backdrop from '../Backdrop';
import CloseButton from '../CloseButton';
import './Dialog.scss';

function Dialog({ visible = false, setVisible = () => {}, children = [] }) {
    return (
        <Backdrop visible={visible}>
            <CloseButton onClose={setVisible} />
            <div className='Dialog-content'>{children}</div>
        </Backdrop>
    );
}

export default Dialog;
