import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import symbolMap from '../../hooks/useSymbols/symbolMap';
import HeaderPage from '../../components/HeaderPage';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import './AdvancedSearch.scss';

const AdvancedSearch = () => {
    const { advancedSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const { name, setName, text, setText, type, setType, colors, setColors } = useContext(SearchContext);

    const onChangeColors = color => {
        setColors({
            ...colors,
            [color]: !colors[color],
        });
    };

    const onSubmit = async e => {
        e.preventDefault();

        const response = await advancedSearch({ name, text, type, colors });
        displayResults(response, { name, text, type, colors, page: 1 }, true);
    };

    return (
        <HeaderPage className='AdvancedSearch'>
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form' onSubmit={onSubmit}>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Name</label>
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
                            <Checkbox
                                className='AdvancedSearch-colorCheckbox'
                                text='White'
                                name='Color--white'
                                value={colors['white']}
                                onClick={() => onChangeColors('white')}
                            >
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{W}'] }} />
                                White
                            </Checkbox>
                            <Checkbox
                                className='AdvancedSearch-colorCheckbox'
                                text='Blue'
                                name='Color--blue'
                                value={colors['blue']}
                                onClick={() => onChangeColors('blue')}
                            >
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{U}'] }} />
                                Blue
                            </Checkbox>
                            <Checkbox
                                className='AdvancedSearch-colorCheckbox'
                                text='Black'
                                name='Color--black'
                                value={colors['black']}
                                onClick={() => onChangeColors('black')}
                            >
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{B}'] }} />
                                Black
                            </Checkbox>
                            <Checkbox
                                className='AdvancedSearch-colorCheckbox'
                                text='Red'
                                name='Color--red'
                                value={colors['red']}
                                onClick={() => onChangeColors('red')}
                            >
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{R}'] }} />
                                Red
                            </Checkbox>
                            <Checkbox
                                className='AdvancedSearch-colorCheckbox'
                                text='Green'
                                name='Color--green'
                                value={colors['green']}
                                onClick={() => onChangeColors('green')}
                            >
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{G}'] }} />
                                Green
                            </Checkbox>
                        </div>
                    </div>
                    <Button className='AdvancedSearch-searchButton' onClick={onSubmit}>
                        Search
                    </Button>
                </form>
            </div>
        </HeaderPage>
    );
};

export default AdvancedSearch;
