import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pencil } from '../Icons';
import './DeckActions.scss';

const DeckActions = () => {
    const { publicID } = useParams();

    const renameDeck = () => {};

    return (
        <div className='DeckActions'>
            <Link to={`/decks/${publicID}/edit`}>
                <div className='DeckActions-button' onClick={() => renameDeck}>
                    <Pencil className='DeckActions-renameDeck' />
                    <span className='DeckActions-buttonLabel'>Rename Deck</span>
                </div>
            </Link>
        </div>
    );
};

export default DeckActions;
