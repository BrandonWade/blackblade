import { useState } from 'react';
import useSymbols from '../../hooks/useSymbols';
import symbolMap from '../../hooks/useSymbols/symbolMap';
import Backdrop from '../Backdrop';
import Panel from '../Panel';
import SymbolRow from './SymbolRow';
import { InputField } from '../Input';
import Button from '../Button';
import './SymbolKey.scss';

export default function SymbolKey({ visible = true, onClose = () => {} }) {
    const [selectedSymbols, setSelectedSymbols] = useState('{W}{U}{B}{R}{G}'); // TODO: Remove symbols

    const onAddSymbol = symbol => {
        setSelectedSymbols(`${selectedSymbols}${symbol}`);
    };

    const onChangeSymbols = e => {
        setSelectedSymbols(e.target.value);
    };

    return (
        <Backdrop visible={visible} onClose={onClose}>
            <Panel className='SymbolKey-content'>
                <p className='SymbolKey-description'>Select symbols from the list below to build out a cost:</p>
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
                        label='You can also manually edit the symbols here:'
                        value={selectedSymbols}
                        maxLength={150}
                        onChange={onChangeSymbols}
                    />
                    <div className='SymbolKey-symbolPreview' dangerouslySetInnerHTML={{ __html: useSymbols(selectedSymbols) }} />
                </div>
                <Button className='SymbolKey-confirmButton'>OK</Button>
            </Panel>
        </Backdrop>
    );
}
