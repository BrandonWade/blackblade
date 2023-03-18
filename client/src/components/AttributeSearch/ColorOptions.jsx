import PropTypes from 'prop-types';
import withFormField from '../../hocs/withFormField';
import symbolMap from '../../hooks/useSymbols/symbolMap';
import FieldGroup from '../../components/FieldGroup';
import Checkbox from '../../components/Checkbox';
import { SelectField } from '../../components/Select';

function ColorOptions({ loading = false, colors = {}, setColors = () => {}, setColorless = () => {}, matchType = '', setMatchType = () => {} }) {
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
                <Checkbox loading={loading} className='AttributeSearch-checkbox' value={colors['white']} onClick={onChangeWhite}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{W}'] }} />
                    White
                </Checkbox>
                <Checkbox loading={loading} className='AttributeSearch-checkbox' value={colors['blue']} onClick={onChangeBlue}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{U}'] }} />
                    Blue
                </Checkbox>
                <Checkbox loading={loading} className='AttributeSearch-checkbox' value={colors['black']} onClick={onChangeBlack}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{B}'] }} />
                    Black
                </Checkbox>
                <Checkbox loading={loading} className='AttributeSearch-checkbox' value={colors['red']} onClick={onChangeRed}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{R}'] }} />
                    Red
                </Checkbox>
                <Checkbox loading={loading} className='AttributeSearch-checkbox' value={colors['green']} onClick={onChangeGreen}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{G}'] }} />
                    Green
                </Checkbox>
                <Checkbox loading={loading} className='AttributeSearch-checkbox' value={colors['colorless']} onClick={onChangeColorless}>
                    <span className='ColorOptions-manaSymbol' dangerouslySetInnerHTML={{ __html: symbolMap['{C}'] }} />
                    Colorless
                </Checkbox>
            </FieldGroup>
            <SelectField
                loading={loading}
                rowClassName='ColorOptions-matchTypeSection'
                className='AttributeSearch-select ColorOptions-matchType'
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

ColorOptions.propTypes = {
    loading: PropTypes.bool,
    colors: PropTypes.object,
    setColors: PropTypes.func,
    setColorless: PropTypes.func,
    matchType: PropTypes.string,
    setMatchType: PropTypes.func,
};

export default withFormField(ColorOptions);
