import { useState } from 'react';
import useSymbols from '../../hooks/useSymbols';
import symbolMap from '../../hooks/useSymbols/symbolMap';
import Backdrop from '../Backdrop';
import Panel from '../Panel';
import { InputField } from '../Input';
import Button from '../Button';
import './SymbolKey.scss';

export default function SymbolKey({ visible = false, onClose = () => {} }) {
    const [selectedSymbols, setSelectedSymbols] = useState('{W}{U}{B}{R}{G}'); // TODO: Remove symbols

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
                            return (
                                <div className='SymbolKey-symbolRow'>
                                    <div className='SymbolKey-symbolImage' dangerouslySetInnerHTML={{ __html: symbol[1] }} />
                                    <div className='SymbolKey-symbolText'>{symbol[0]}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='SymbolKey-inputContainer'>
                    <InputField
                        rowClassName='Panel-inputRow SymbolKey-symbolInputRow'
                        className='SymbolKey-symbolInput'
                        label='You can also manually edit the symbols here:'
                        value={selectedSymbols}
                        onChange={onChangeSymbols}
                    />
                    <div className='SymbolKey-symbolPreview' dangerouslySetInnerHTML={{ __html: useSymbols(selectedSymbols) }} />
                </div>
                <div className='SymbolKey-buttonContainer'>
                    <Button>OK</Button>
                    <Button>Cancel</Button>
                </div>
            </Panel>
        </Backdrop>
    );
}
