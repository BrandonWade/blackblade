import React from 'react';
import { Pencil } from '../Icons';
import './DeckActions.scss';

const DeckActions = () => {
    const renameDeck = () => {};

    return (
        <div className='DeckActions'>
            <div className='DeckActions-button' onClick={() => renameDeck}>
                <Pencil className='DeckActions-renameDeck' />
                <span className='DeckActions-buttonLabel'>Rename Deck</span>
            </div>
        </div>
    );
};

export default DeckActions;
