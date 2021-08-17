import { useState } from 'react';
import useSymbols from '../../hooks/useSymbols';
import Backdrop from '../Backdrop';
import Panel from '../Panel';
import Input from '../Input';
import { SelectField } from '../Select';
import Button from '../Button';
import './SymbolKey.scss';

export default function SymbolKey({ visible = false, onClose = () => {} }) {
    const [symbols, setSymbols] = useState('{W}{U}{B}{R}{G}');

    const onChangeSymbols = e => {
        setSymbols(e.target.value);
    };

    return (
        <Backdrop visible={visible} onClose={onClose}>
            <Panel className='SymbolKey-content'>
                <SelectField
                    rowClassName='Panel-inputRow'
                    labelClassName='Panel-inputLabel'
                    className='SymbolKey-symbols'
                    label='Select symbols from the list below to build out a cost:'
                    multiple={true}
                >
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                    <option>Option 5</option>
                </SelectField>
                <div className='SymbolKey-inputContainer'>
                    <Input className='SymbolKey-symbolInput' value={symbols} onChange={onChangeSymbols} />
                    <div className='SymbolKey-symbolPreview' dangerouslySetInnerHTML={{ __html: useSymbols(symbols) }} />
                </div>
                <div className='SymbolKey-buttonContainer'>
                    <Button>OK</Button>
                    <Button>Cancel</Button>
                </div>
            </Panel>
        </Backdrop>
    );
}
