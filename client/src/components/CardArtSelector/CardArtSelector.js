import React, { useContext } from 'react';
import CardArtSelectorContext from '../../contexts/CardArtSelectorContext';
import CardContext from '../../contexts/CardContext';
import Overlay from '../Overlay';
import CardGrid from '../CardGrid';
import './CardArtSelector.scss';

const CardArtSelector = () => {
    const { artSelectorVisible, setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const { card } = useContext(CardContext);
    const sets = card.sets_json || [];

    return artSelectorVisible ? (
        <div className='CardArtSelector'>
            <Overlay className='CardArtSelector-content' visible={true} setVisible={setArtSelectorVisible}>
                <CardGrid cards={sets} onClick={() => console.log('TODO: Implement')} />
            </Overlay>
        </div>
    ) : null;
};

export default CardArtSelector;
