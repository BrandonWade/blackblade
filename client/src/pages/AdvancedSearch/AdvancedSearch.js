import React, { useContext } from 'react';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/Search';
import symbolMap from '../../hooks/useSymbols/symbolMap';
import HeaderPage from '../../components/HeaderPage';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';
import Select from '../../components/Select';
import Button from '../../components/Button';
import './AdvancedSearch.scss';

function AdvancedSearch() {
    const { searchResultsRedirect } = useDisplayResults();
    const { name, setName, text, setText, type, setType, colors, setColors, setColorless, matchType, setMatchType, set, setSet } = useContext(SearchContext);

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

    const onChangeMatchType = e => {
        setMatchType(e.target.value);
    };

    const onChangeSet = e => {
        setSet(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        searchResultsRedirect({ name, text, type, colors, matchType, set, page: 1 });
    };

    const renderColorMatchDescription = () => {
        if (matchType === 'exact') {
            return 'This match type means that cards must include all colors selected and no others.';
        } else if (matchType === 'at_least') {
            return 'This match type means that cards must include all colors selected and may include additional colors.';
        } else {
            return 'This match type means that cards will have some or all of the colors selected.';
        }
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
                        <div className='AdvancedSearch-colorOptions'>
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
                            <div className='AdvancedSearch-colorMatchSection'>
                                <Select className='AdvancedSearch-colorMatchType' onChange={onChangeMatchType}>
                                    <option value='exact'>Exactly these colors</option>
                                    <option value='at_least'>At least these colors</option>
                                    <option value='at_most'>At most these colors</option>
                                </Select>
                                <p className='AdvancedSearch-colorMatchDescription'>{renderColorMatchDescription()}</p>
                            </div>
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
