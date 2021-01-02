import React, { useContext } from 'react';
import withFormField from '../../hocs/withFormField';
import SearchContext from '../../contexts/Search';
import FieldGroup from '../../components/FieldGroup';
import Checkbox from '../../components/Checkbox';

function RarityOptions() {
    const { rarities, setRarities } = useContext(SearchContext);

    const onChangeCommon = () => onChangeRarity('common');
    const onChangeUncommon = () => onChangeRarity('uncommon');
    const onChangeRare = () => onChangeRarity('rare');
    const onChangeMythic = () => onChangeRarity('mythic');
    const onChangeRarity = rarity => setRarities(rarity, !rarities[rarity]);

    return (
        <FieldGroup className='RarityOptions'>
            <Checkbox className='AdvancedSearch-checkbox' value={rarities['common']} onClick={onChangeCommon}>
                Common
            </Checkbox>
            <Checkbox className='AdvancedSearch-checkbox' value={rarities['uncommon']} onClick={onChangeUncommon}>
                Uncommon
            </Checkbox>
            <Checkbox className='AdvancedSearch-checkbox' value={rarities['rare']} onClick={onChangeRare}>
                Rare
            </Checkbox>
            <Checkbox className='AdvancedSearch-checkbox' value={rarities['mythic']} onClick={onChangeMythic}>
                Mythic Rare
            </Checkbox>
        </FieldGroup>
    );
}

export default withFormField(RarityOptions);
