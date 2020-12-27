import React, { useContext } from 'react';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import symbolMap from '../../hooks/useSymbols/symbolMap';
import HeaderPage from '../../components/HeaderPage';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Button from '../../components/Button';
import './AdvancedSearch.scss';

function AdvancedSearch() {
    const { searchResultsRedirect } = useDisplayResults();
    const { name, setName, text, setText, type, setType, colors, setColors, setColorless, set, setSet } = useContext(SearchContext);

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeText = e => {
        setText(e.target.value);
    };

    const onChangeType = e => {
        setType(e.target.value);
    };

    const onChangeWhite = () => onChangeColors('white');
    const onChangeBlue = () => onChangeColors('blue');
    const onChangeBlack = () => onChangeColors('black');
    const onChangeRed = () => onChangeColors('red');
    const onChangeGreen = () => onChangeColors('green');
    const onChangeColors = color => setColors(color, !colors[color]);
    const onChangeColorless = () => setColorless(!colors['colorless']);

    const onChangeSet = e => {
        setSet(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        searchResultsRedirect({ name, text, type, colors, set, page: 1 });
    };

    return (
        <HeaderPage className='AdvancedSearch'>
            <div className='AdvancedSearch-content'>
                <form className='AdvancedSearch-form' onSubmit={onSubmit}>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Name</label>
                        <Input className='AdvancedSearch-input' value={name} onChange={onChangeName} />
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Text</label>
                        <Input className='AdvancedSearch-input' value={text} onChange={onChangeText} />
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Type</label>
                        <Input className='AdvancedSearch-input' value={type} onChange={onChangeType} />
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Colors</label>
                        <div className='AdvancedSearch-colorBoxes'>
                            <Checkbox className='AdvancedSearch-colorCheckbox' text='White' value={colors['white']} onClick={onChangeWhite}>
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{W}'] }} />
                                White
                            </Checkbox>
                            <Checkbox className='AdvancedSearch-colorCheckbox' text='Blue' value={colors['blue']} onClick={onChangeBlue}>
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{U}'] }} />
                                Blue
                            </Checkbox>
                            <Checkbox className='AdvancedSearch-colorCheckbox' text='Black' value={colors['black']} onClick={onChangeBlack}>
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{B}'] }} />
                                Black
                            </Checkbox>
                            <Checkbox className='AdvancedSearch-colorCheckbox' text='Red' value={colors['red']} onClick={onChangeRed}>
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{R}'] }} />
                                Red
                            </Checkbox>
                            <Checkbox className='AdvancedSearch-colorCheckbox' text='Green' value={colors['green']} onClick={onChangeGreen}>
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{G}'] }} />
                                Green
                            </Checkbox>
                            <Checkbox className='AdvancedSearch-colorCheckbox' text='Green' value={colors['colorless']} onClick={onChangeColorless}>
                                <span className='AdvancedSearch-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{C}'] }} />
                                Colorless
                            </Checkbox>
                        </div>
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Set</label>
                        <Input className='AdvancedSearch-input' value={set} onChange={onChangeSet} />
                    </div>
                    <Button className='AdvancedSearch-searchButton' onClick={onSubmit}>
                        Search
                    </Button>
                </form>
            </div>
        </HeaderPage>
    );
}

export default AdvancedSearch;
