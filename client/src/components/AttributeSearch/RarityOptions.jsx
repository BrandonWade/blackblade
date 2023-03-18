import PropTypes from 'prop-types';
import withFormField from '../../hocs/withFormField';
import FieldGroup from '../../components/FieldGroup';
import Checkbox from '../../components/Checkbox';

function RarityOptions({ loading = false, rarities = {}, setRarities = () => {} }) {
    const onChangeCommon = () => onChangeRarity('common');
    const onChangeUncommon = () => onChangeRarity('uncommon');
    const onChangeRare = () => onChangeRarity('rare');
    const onChangeMythic = () => onChangeRarity('mythic');
    const onChangeRarity = rarity => setRarities(rarity, !rarities[rarity]);

    return (
        <FieldGroup className='RarityOptions'>
            <Checkbox loading={loading} className='AttributeSearch-checkbox' value={rarities['common']} onClick={onChangeCommon}>
                Common
            </Checkbox>
            <Checkbox loading={loading} className='AttributeSearch-checkbox' value={rarities['uncommon']} onClick={onChangeUncommon}>
                Uncommon
            </Checkbox>
            <Checkbox loading={loading} className='AttributeSearch-checkbox' value={rarities['rare']} onClick={onChangeRare}>
                Rare
            </Checkbox>
            <Checkbox loading={loading} className='AttributeSearch-checkbox' value={rarities['mythic']} onClick={onChangeMythic}>
                Mythic Rare
            </Checkbox>
        </FieldGroup>
    );
}

RarityOptions.propTypes = {
    loading: PropTypes.bool,
    rarities: PropTypes.object,
    setRarities: PropTypes.func,
};

export default withFormField(RarityOptions);
