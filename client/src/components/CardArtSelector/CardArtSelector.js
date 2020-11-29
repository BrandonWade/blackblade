import React, { useContext } from 'react';
import CardArtSelectorContext from '../../contexts/CardArtSelectorContext';
import CardContext from '../../contexts/CardContext';
import './CardArtSelector.scss';

const CardArtSelector = () => {
    const { artSelectorVisible } = useContext(CardArtSelectorContext);
    const { card } = useContext(CardContext);
    const sets = card.sets_json || [];

    console.log(sets);

    return artSelectorVisible ? (
        <div className='CardArtSelector'>
            <div className='CardArtSelector-content'>
                {sets.map((set, i) => (
                    <img key={i} src={set.card_faces[0].image} alt='' className='CardArtSelector-cardImage' />
                ))}
            </div>
        </div>
    ) : null;
};

export default CardArtSelector;
