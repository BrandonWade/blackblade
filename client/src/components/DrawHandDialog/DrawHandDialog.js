import { useContext } from 'react';
import ReactDOM from 'react-dom';
import DrawHandDialogContext from '../../contexts/DrawHandDialog';
import Backdrop from '../Backdrop';
import Panel from '../Panel';
import CardGrid from '../CardGrid';
import { NumberInputField } from '../NumberInput';
import Button from '../Button';
import './DrawHandDialog.scss';

export default function DrawHandDialog() {
    const { hand, visible, setVisible } = useContext(DrawHandDialogContext);

    const onClose = () => {
        setVisible(false);
    };

    return ReactDOM.createPortal(
        <Backdrop className='DrawHandDialog' visible={visible} onClose={onClose}>
            <Panel className='DrawHandDialog-content'>
                <div className='DrawHandDialog-close' onClick={onClose}>
                    &#x2715;
                </div>
                <div className='DrawHandDialog-hand'>
                    <div className='DrawHandDialog-formWrapper'>
                        <NumberInputField className='DrawHandDialog-handSize' label='Hand size' />
                        <Button>Draw</Button>
                    </div>
                    <CardGrid className='DrawHandDialog-cardGrid' cards={hand} />
                </div>
            </Panel>
        </Backdrop>,
        document.getElementById('portal-root')
    );
}
