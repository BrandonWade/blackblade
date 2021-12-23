import withFormField from '../../hocs/withFormField';
import FieldGroup from '../../components/FieldGroup';
import Checkbox from '../../components/Checkbox';

function RarityOptions({ rarities = {}, setRarities = () => {} }) {
    const onChangeCommon = () => onChangeRarity('common');
    const onChangeUncommon = () => onChangeRarity('uncommon');
    const onChangeRare = () => onChangeRarity('rare');
    const onChangeMythic = () => onChangeRarity('mythic');
    const onChangeRarity = rarity => setRarities(rarity, !rarities[rarity]);

    return (
        <FieldGroup className='RarityOptions'>
            <Checkbox className='AttributeSearch-checkbox' value={rarities['common']} onClick={onChangeCommon}>
                Common
            </Checkbox>
            <Checkbox className='AttributeSearch-checkbox' value={rarities['uncommon']} onClick={onChangeUncommon}>
                Uncommon
            </Checkbox>
            <Checkbox className='AttributeSearch-checkbox' value={rarities['rare']} onClick={onChangeRare}>
                Rare
            </Checkbox>
            <Checkbox className='AttributeSearch-checkbox' value={rarities['mythic']} onClick={onChangeMythic}>
                Mythic Rare
            </Checkbox>
        </FieldGroup>
    );
}

export default withFormField(RarityOptions);
