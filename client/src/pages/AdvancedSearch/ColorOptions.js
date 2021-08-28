import { useContext } from 'react';
import withFormField from '../../hocs/withFormField';
import SearchContext from '../../contexts/Search';
import symbolMap from '../../hooks/useSymbols/symbolMap';
import FieldGroup from '../../components/FieldGroup';
import Checkbox from '../../components/Checkbox';
import { SelectField } from '../../components/Select';

function ColorOptions() {
    const { colors, setColors, setColorless, matchType, setMatchType } = useContext(SearchContext);

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
        <div className='ColorOptions'>
            <FieldGroup>
                <Checkbox className='AdvancedSearch-checkbox' value={colors['white']} onClick={onChangeWhite}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{W}'] }} />
                    White
                </Checkbox>
                <Checkbox className='AdvancedSearch-checkbox' value={colors['blue']} onClick={onChangeBlue}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{U}'] }} />
                    Blue
                </Checkbox>
                <Checkbox className='AdvancedSearch-checkbox' value={colors['black']} onClick={onChangeBlack}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{B}'] }} />
                    Black
                </Checkbox>
                <Checkbox className='AdvancedSearch-checkbox' value={colors['red']} onClick={onChangeRed}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{R}'] }} />
                    Red
                </Checkbox>
                <Checkbox className='AdvancedSearch-checkbox' value={colors['green']} onClick={onChangeGreen}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{G}'] }} />
                    Green
                </Checkbox>
                <Checkbox className='AdvancedSearch-checkbox' value={colors['colorless']} onClick={onChangeColorless}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{C}'] }} />
                    Colorless
                </Checkbox>
            </FieldGroup>
            <SelectField
                rowClassName='ColorOptions-matchTypeSection'
                className='AdvancedSearch-select ColorOptions-matchType'
                descriptionClassName='AdvancedSearch-description'
                value={matchType}
                description={renderColorMatchDescription()}
                onChange={onChangeMatchType}
            >
                <option value='exact'>Exactly these colors</option>
                <option value='at_least'>At least these colors</option>
                <option value='at_most'>At most these colors</option>
            </SelectField>
        </div>
    );
}

export default withFormField(ColorOptions);
