import { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useDecks from '../../hooks/useDecks';
import useMessage from '../../hooks/useMessage';
import DeckBuilderContext, { initialState } from '../../contexts/DeckBuilder';
import HeaderPage from '../../components/HeaderPage';
import Panel from '../../components/Panel';
import { InputField } from '../../components/Input';
import { SelectField } from '../../components/Select';
import { TextAreaField } from '../../components/TextArea';
import Button from '../../components/Button';
import './DeckEditor.scss';

function DeckEditor({ editing = false }) {
    const history = useHistory();
    const { publicID } = useParams();
    const { createDeck } = useDecks();
    const { showMessage } = useMessage();
    const {
        setDeckPublicID,
        setDeckAccountPublicID,
        deckName,
        setDeckName,
        deckVisibility,
        setDeckVisibility,
        deckNotes,
        setDeckNotes,
        resetDeckBuilder,
    } = useContext(DeckBuilderContext);
    const [name, setName] = useState(editing ? deckName : initialState.deckName);
    const [visibility, setVisibility] = useState(editing ? deckVisibility : initialState.deckVisibility);
    const [notes, setNotes] = useState(editing ? deckNotes : initialState.deckNotes);
    const notesMaxLength = 512;

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeVisibility = e => {
        setVisibility(e.target.value);
    };

    const onChangeNotes = e => {
        setNotes(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        showMessage();
        setDeckName(name);
        setDeckVisibility(visibility);
        setDeckNotes(notes);

        if (!editing) {
            const response = await createDeck(name, visibility, notes);
            if (!response.success) {
                const { text, type } = response?.message;
                showMessage(text, type);
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
                    <TextAreaField
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='DeckEditor-notes'
                        descriptionClassName='Panel-inputLabel DeckEditor-description DeckEditor-notesDescription'
                        label='Notes'
                        value={notes}
                        maxLength={notesMaxLength}
                        description={`${notes.length}/${notesMaxLength}`}
                        onChange={onChangeNotes}
                    />
                    <Button type='submit'>{`${editing ? 'Update' : 'Create'}`}</Button>
                </form>
            </Panel>
        </HeaderPage>
    );
}

export default DeckEditor;
