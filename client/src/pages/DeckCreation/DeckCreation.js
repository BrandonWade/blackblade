import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import useErrors from '../../hooks/useErrors';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import HeaderPage from '../../components/HeaderPage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './DeckCreation.scss';

function DeckCreation({ editing = false }) {
    const history = useHistory();
    const { publicID } = useParams();
    const { createDeck } = useDeck();
    const { addErrors } = useErrors();
    const { deckName, setDeckName } = useContext(DeckBuilderContext);

    const onChange = e => {
        setDeckName(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        let redirect = '/';

        if (!editing) {
            const response = await createDeck(deckName);
            if (!response.success) {
                addErrors(response.errors);
                return;
            }

            redirect = response.deckURI;
        } else {
            redirect = `/decks/${publicID}`;
        }

        history.push(redirect);
    };

    return (
        <HeaderPage className='DeckCreation'>
            <form className='DeckCreation-form' onSubmit={onSubmit}>
                <Input className='DeckCreation-deckName' placeholder='Deck Name (optional)' value={deckName} onChange={onChange} />
                <Button className='DeckCreation-createButton'>{`${editing ? 'Update' : 'Create'}`}</Button>
            </form>
        </HeaderPage>
    );
}

export default DeckCreation;
