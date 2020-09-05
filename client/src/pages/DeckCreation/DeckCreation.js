import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import HeaderPage from '../../components/HeaderPage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './DeckCreation.scss';

const DeckCreation = () => {
    const history = useHistory();
    const { createDeck } = useDeck();
    const [name, setName] = useState('');

    const onChange = e => {
        setName(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        const response = await createDeck(name);
        if (!response.success) {
            console.error(response.errors); // TODO: Handle
            return;
        }

        history.push(response.deckURI);
    };

    return (
        <HeaderPage className='DeckCreation'>
            <form className='DeckCreation-form' onSubmit={onSubmit}>
                <Input className='DeckCreation-deckName' placeholder='Deck Name (optional)' value={name} onChange={onChange} />
                <Button>Create</Button>
            </form>
        </HeaderPage>
    );
};

export default DeckCreation;
