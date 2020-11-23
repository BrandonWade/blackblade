import React from 'react';
import { Pencil } from '../Icons';
import './DeckActions.scss';

const DeckActions = () => {
    return (
        <div className='DeckActions'>
            <div className='DeckActions-button'>
                <Pencil className='DeckActions-renameDeck' />
                <span className='DeckActions-buttonLabel'>Rename Deck</span>
            </div>
        </div>
    );
};

export default DeckActions;
