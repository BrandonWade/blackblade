import { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import useMessage from '../../hooks/useMessage';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import HeaderPage from '../../components/HeaderPage';
import Panel from '../../components/Panel';
import { InputField } from '../../components/Input';
import { SelectField } from '../../components/Select';
import Button from '../../components/Button';
import './DeckEditor.scss';

function DeckEditor({ editing = false }) {
    const history = useHistory();
    const { publicID } = useParams();
    const { createDeck } = useDecks();
    const { showMessage } = useMessage();
    const { setDeckPublicID, setDeckAccountPublicID, deckName, setDeckName, deckVisibility, setDeckVisibility, resetDeckBuilder } =
        useContext(DeckBuilderContext);
    const [name, setName] = useState(editing ? deckName : 'Untitled Deck');
    const [visibility, setVisibility] = useState(editing ? deckVisibility : 'private');

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeVisibility = e => {
        setVisibility(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        showMessage();
        setDeckName(name);
        setDeckVisibility(visibility);

        if (!editing) {
            const response = await createDeck(name, visibility);
            if (!response.success) {
                return;
            }

            resetDeckBuilder();
            setDeckPublicID(response.deckPublicID);
            setDeckAccountPublicID(response.accountPublicID);
            history.replace(`/decks/${response.deckPublicID}`);
        } else {
            history.replace(`/decks/${publicID}`);
        }
    };

    const renderVisibilityDescription = () => {
        return deckVisibility === 'private'
            ? 'This deck will only be visible to you, and only while logged in.'
            : 'This deck will be visible to everyone.';
    };

    return (
        <HeaderPage className='DeckEditor'>
            <Panel wrapperClassName='DeckEditor-wrapper'>
                <form className='DeckEditor-form' onSubmit={onSubmit}>
                    <InputField
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
                        label='Name'
                        value={name}
                        onChange={onChangeName}
                    />
                    <SelectField
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
                        descriptionClassName='DeckEditor-description'
                        label='Visibility'
                        value={visibility}
                        description={renderVisibilityDescription()}
                        onChange={onChangeVisibility}
                    >
                        <option value='private'>Private</option>
                        <option value='public'>Public</option>
                    </SelectField>
                    <Button className='DeckEditor-createButton'>{`${editing ? 'Update' : 'Create'}`}</Button>
                </form>
            </Panel>
        </HeaderPage>
    );
}

export default DeckEditor;
