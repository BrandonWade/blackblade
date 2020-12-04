import React, { useContext } from 'react';
import CardArtSelectorContext from '../../contexts/CardArtSelectorContext';
import CardContext from '../../contexts/CardContext';
import Overlay from '../Overlay';
import './CardArtSelector.scss';

const CardArtSelector = () => {
    const { artSelectorVisible, setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const { card } = useContext(CardContext);
    const sets = card.sets_json || [];

    return artSelectorVisible ? (
        <div className='CardArtSelector'>
            <Overlay className='CardArtSelector-content' visible={true} setVisible={setArtSelectorVisible}>
                {sets.map((set, i) => (
                    <img
                        key={i}
                        src={set.card_faces[0].image}
                        alt=''
                        className='CardArtSelector-cardImage'
                        onClick={() => console.log('TODO: Implement', set)}
                    />
                ))}
            </Overlay>
        </div>
    ) : null;
};

export default CardArtSelector;
