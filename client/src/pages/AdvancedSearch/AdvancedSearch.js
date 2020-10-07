import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import AdvancedSearchContext from '../../contexts/AdvancedSearchContext';
import HeaderPage from '../../components/HeaderPage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './AdvancedSearch.scss';

const AdvancedSearch = () => {
    const { advancedSearch } = useSearch();
    const { name, setName, text, setText, type, setType, colors, setColors, manaCost, setManaCost } = useContext(AdvancedSearchContext);

    const fetchResults = async () => {
        const criteria = { name, text, type, colors, manaCost };
        await advancedSearch(criteria);
    };

    const onSubmit = e => {
        e.preventDefault();
        fetchResults();
    };

    const onChangeColors = color => {
        setColors({
            ...colors,
            [color]: !colors[color],
        });
    };

    return (
        <HeaderPage className='AdvancedSearch'>
            <div className='AdvancedSearch-content'>
                <form onSubmit={onSubmit}>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Card Name</label>
                        <Input className='AdvancedSearch-input' value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Text</label>
                        <Input className='AdvancedSearch-input' value={text} onChange={e => setText(e.target.value)} />
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Type</label>
                        <Input className='AdvancedSearch-input' value={type} onChange={e => setType(e.target.value)} />
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Colors</label>
                        <div className='AdvancedSearch-colorBoxes'>
                            <div>
                                <Input
                                    className='AdvancedSearch-colorCheckbox'
                                    type='checkbox'
                                    name='color-white'
                                    value={colors['white']}
                                    onChange={() => onChangeColors('white')}
                                />
                                <label className='AdvancedSearch-fieldLabel' htmlFor='color-white'>
                                    White
                                </label>
                            </div>
                            <div>
                                <Input
                                    className='AdvancedSearch-colorCheckbox'
                                    type='checkbox'
                                    name='color-blue'
                                    value={colors['blue']}
                                    onChange={() => onChangeColors('blue')}
                                />
                                <label className='AdvancedSearch-fieldLabel' htmlFor='color-blue'>
                                    Blue
                                </label>
                            </div>
                            <div>
                                <Input
                                    className='AdvancedSearch-colorCheckbox'
                                    type='checkbox'
                                    name='color-black'
                                    value={colors['black']}
                                    onChange={() => onChangeColors('black')}
                                />
                                <label className='AdvancedSearch-fieldLabel' htmlFor='color-black'>
                                    Black
                                </label>
                            </div>
                            <div>
                                <Input
                                    className='AdvancedSearch-colorCheckbox'
                                    type='checkbox'
                                    name='color-red'
                                    value={colors['red']}
                                    onChange={() => onChangeColors('red')}
                                />
                                <label className='AdvancedSearch-fieldLabel' htmlFor='color-red'>
                                    Red
                                </label>
                            </div>
                            <div>
                                <Input
                                    className='AdvancedSearch-colorCheckbox'
                                    type='checkbox'
                                    name='color-green'
                                    value={colors['green']}
                                    onChange={() => onChangeColors('green')}
                                />
                                <label className='AdvancedSearch-fieldLabel' htmlFor='color-green'>
                                    Green
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Mana Cost</label>
                        <Input className='AdvancedSearch-input' value={manaCost} onChange={e => setManaCost(e.target.value)} />
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <Button className='AdvancedSearch-submitButton' onClick={onSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </HeaderPage>
    );
};

export default AdvancedSearch;
