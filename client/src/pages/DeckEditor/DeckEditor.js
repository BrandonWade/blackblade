import { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import HeaderPage from '../../components/HeaderPage';
import Message from '../../components/Message';
import { InputField } from '../../components/Input';
import { SelectField } from '../../components/Select';
import Button from '../../components/Button';
import './DeckEditor.scss';

function DeckEditor({ editing = false }) {
    const [message, setMessage] = useState({});
    const history = useHistory();
    const { publicID } = useParams();
    const { createDeck } = useDeck();
    const { setDeckPublicID, setDeckAccountPublicID, deckName, setDeckName, deckVisibility, setDeckVisibility, resetDeckBuilder } = useContext(
        DeckBuilderContext
    );

    const onChangeName = e => {
        setDeckName(e.target.value);
    };

    const onChangeVisibility = e => {
        setDeckVisibility(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        setMessage({});

        if (!editing) {
            const response = await createDeck(deckName, deckVisibility);
            if (!response.success) {
                return;
            }

            resetDeckBuilder();
            setDeckPublicID(response.deckPublicID);
            setDeckAccountPublicID(response.accountPublicID);
            history.push(`/decks/${response.deckPublicID}`);
        } else {
            history.push(`/decks/${publicID}`);
        }
    };

    const renderVisibilityDescription = () => {
        return deckVisibility === 'private'
            ? 'This deck will only be visible to you, and only while logged in.'
            : 'This deck will be visible to everyone.';
    };

    return (
        <HeaderPage className='DeckEditor'>
            <div className='DeckEditor-content'>
                <Message type={message.type} text={message.text} />
                <form className='DeckEditor-form' onSubmit={onSubmit}>
                    <InputField
                        rowClassName='DeckEditor-inputRow'
                        labelClassName='DeckEditor-label'
                        className='DeckEditor-deckName'
                        label='Name'
                        value={deckName}
                        onChange={onChangeName}
                    />
                    <SelectField
                        rowClassName='DeckEditor-inputRow'
                        labelClassName='DeckEditor-label'
                        className='DeckEditor-visibility'
                        descriptionClassName='DeckEditor-description'
                        label='Visibility'
                        value={deckVisibility}
                        description={renderVisibilityDescription()}
                        onChange={onChangeVisibility}
                    >
                        <option value='private'>Private</option>
                        <option value='public'>Public</option>
                    </SelectField>
                    <Button className='DeckEditor-createButton'>{`${editing ? 'Update' : 'Create'}`}</Button>
                </form>
            </div>
        </HeaderPage>
    );
}

export default DeckEditor;
