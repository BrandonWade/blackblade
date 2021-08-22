import { useState } from 'react';
import useSymbols from '../../hooks/useSymbols';
import symbolMap from '../../hooks/useSymbols/symbolMap';
import Backdrop from '../Backdrop';
import Panel from '../Panel';
import SymbolRow from './SymbolRow';
import { InputField } from '../Input';
import Button from '../Button';
import './SymbolKey.scss';

export default function SymbolKey({ visible = false, onInsertSymbols = () => {}, onClose = () => {} }) {
    const [selectedSymbols, setSelectedSymbols] = useState('');
    const maxInputLength = 150;

    const onAddSymbol = symbol => {
        if (selectedSymbols.length + symbol.length < maxInputLength) {
            setSelectedSymbols(`${selectedSymbols} ${symbol}`);
        }
    };

    const onChangeSymbols = e => {
        setSelectedSymbols(e.target.value);
    };

    const onConfirmClick = () => {
        onInsertSymbols(selectedSymbols);
        onClose();
    };

    return (
        <Backdrop visible={visible} onClose={onClose}>
            <Panel className='SymbolKey-content'>
                <div className='SymbolKey-close' onClick={onClose}>
                    &#x2715;
                </div>
                <p className='SymbolKey-description'>Select one or more symbols from the list below:</p>
                <div className='SymbolKey-symbolListContainer'>
                    <div className='SymbolKey-symbolList'>
                        {Object.entries(symbolMap).map(symbol => {
                            return <SymbolRow key={symbol[0]} image={symbol[1]} text={symbol[0]} onClick={onAddSymbol} />;
                        })}
                    </div>
                </div>
                <div className='SymbolKey-inputContainer'>
                    <InputField
                        rowClassName='Panel-inputRow SymbolKey-symbolInputRow'
                        className='SymbolKey-symbolInput'
                        label='Symbol text can also be manually edited here:'
                        value={selectedSymbols}
                        maxLength={maxInputLength}
                        onChange={onChangeSymbols}
                    />
                    <div className='SymbolKey-symbolPreview' dangerouslySetInnerHTML={{ __html: useSymbols(selectedSymbols) }} />
                </div>
                <Button className='SymbolKey-confirmButton' onClick={onConfirmClick}>
                    OK
                </Button>
            </Panel>
        </Backdrop>
    );
}
