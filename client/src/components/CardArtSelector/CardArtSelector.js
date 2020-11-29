import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import './CardArtSelector.scss';

const CardArtSelector = () => {
    const { card } = useContext(CardContext);

    return (
        <div className='CardArtSelector'>
            <div className='CardArtSelector-content'>
                {(card.sets_json || []).map(set => (
                    <div>{set}</div>
                ))}
            </div>
        </div>
    );
};

export default CardArtSelector;
