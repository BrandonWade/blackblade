import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import DeckBuilderContext from '../../contexts/DeckBuilderContext';
import HeaderPage from '../../components/HeaderPage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './DeckCreation.scss';

const DeckCreation = () => {
    const history = useHistory();
    const { createDeck } = useDeck();
    const { deckName, setDeckName } = useContext(DeckBuilderContext);

    const onChange = e => {
        setDeckName(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        const response = await createDeck(deckName);
        if (!response.success) {
            console.error(response.errors); // TODO: Handle
            return;
        }

        history.push(response.deckURI);
    };

    return (
        <HeaderPage className='DeckCreation'>
            <form className='DeckCreation-form' onSubmit={onSubmit}>
                <Input className='DeckCreation-deckName' placeholder='Deck Name (optional)' value={deckName} onChange={onChange} />
                <Button className='DeckCreation-createButton'>Create</Button>
            </form>
        </HeaderPage>
    );
};

export default DeckCreation;
