import { useContext } from 'react';
import ReactDOM from 'react-dom';
import useDrawHand from '../../hooks/useDrawHand/useDrawHand';
import DrawHandDialogContext from '../../contexts/DrawHandDialog';
import Backdrop from '../Backdrop';
import Panel from '../Panel';
import CardGrid from '../CardGrid';
import { NumberInputField } from '../NumberInput';
import Button from '../Button';
import './DrawHandDialog.scss';

export default function DrawHandDialog() {
    const { drawHand } = useDrawHand();
    const { handSize, setHandSize, hand, visible, setVisible } = useContext(DrawHandDialogContext);

    const onClose = () => {
        setVisible(false);
    };

    const onChangeHandSize = e => {
        setHandSize(e.target.value);
    };

    const onIncrementHandSize = () => {
        setHandSize(handSize + 1);
    };

    const onDecrementHandSize = () => {
        setHandSize(Math.max(handSize - 1, 1));
    };

    const onDraw = () => {
        drawHand();
    };

    return ReactDOM.createPortal(
        <Backdrop className='DrawHandDialog' visible={visible} onClose={onClose}>
            <Panel className='DrawHandDialog-content'>
                <div className='DrawHandDialog-close' onClick={onClose}>
                    &#x2715;
                </div>
                <div className='DrawHandDialog-hand'>
                    <div className='DrawHandDialog-formWrapper'>
                        <NumberInputField
                            rowClassName='DrawHandDialog-handSizeRow'
                            labelClassName='DrawHandDialog-handSizeLabel'
                            className='DrawHandDialog-handSize'
                            label='Hand size'
                            value={handSize}
                            onChange={onChangeHandSize}
                            onIncrement={onIncrementHandSize}
                            onDecrement={onDecrementHandSize}
                        />
                        <Button className='DrawHandDialog-draw' onClick={onDraw}>
                            Draw
                        </Button>
                    </div>
                    <CardGrid className='DrawHandDialog-cardGrid' cards={hand} />
                </div>
            </Panel>
        </Backdrop>,
        document.getElementById('portal-root')
    );
}
