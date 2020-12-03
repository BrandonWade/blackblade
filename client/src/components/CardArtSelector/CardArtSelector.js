import React, { useContext } from 'react';
import CardArtSelectorContext from '../../contexts/CardArtSelectorContext';
import CardContext from '../../contexts/CardContext';
import Button from '../Button';
import './CardArtSelector.scss';

// TODO: Refactor to use Overlay component
const CardArtSelector = () => {
    const { artSelectorVisible, setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const { card } = useContext(CardContext);
    const sets = card.sets_json || [];

    return artSelectorVisible ? (
        <div className='CardArtSelector'>
            <div className='CardArtSelector-content'>
                <Button className='CardArtSelector-closeButton' onClick={() => setArtSelectorVisible(false)}>
                    <span className='CardArtSelector-closeIcon'></span>
                </Button>
                {sets.map((set, i) => (
                    <img
                        key={i}
                        src={set.card_faces[0].image}
                        alt=''
                        className='CardArtSelector-cardImage'
                        onClick={() => console.log('TODO: Implement', set)}
                    />
                ))}
            </div>
        </div>
    ) : null;
};

export default CardArtSelector;
