import { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import useDecks from '../../hooks/useDecks';
import useFetchDeck from '../../hooks/useFetchDeck';
import DeckBuilderContext, { isDeckUnmodified } from '../../contexts/DeckBuilder';
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
    const { showMessage } = useMessage();
    const { createDeck } = useDecks();
    const { fetchDeck } = useFetchDeck();
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
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        unmodifiedDeckVisibility,
        unmodifiedDeckNotes,
        unmodifiedDeckCards,
        unmodifiedMaybeboardCards,
    } = useContext(DeckBuilderContext);
    const isUnmodified = isDeckUnmodified(
        deckName,
        deckVisibility,
        deckNotes,
        deckCards,
        maybeboardCards,
        unmodifiedDeckName,
        unmodifiedDeckVisibility,
        unmodifiedDeckNotes,
        unmodifiedDeckCards,
        unmodifiedMaybeboardCards
    );
    const notesMaxLength = 512;

    useEffect(() => {
        if (editing && isUnmodified) {
            fetchDeck();
        }
    }, []);

    const onChangeName = e => {
        setDeckName(e.target.value);
    };

    const onChangeVisibility = e => {
        setDeckVisibility(e.target.value);
    };

    const onChangeNotes = e => {
        setDeckNotes(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();
        showMessage();
        setDeckName(deckName);
        setDeckVisibility(deckVisibility);
        setDeckNotes(deckNotes);

        if (!editing) {
            const response = await createDeck(deckName, deckVisibility, deckNotes);
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
                        value={deckName}
                        onChange={onChangeName}
                    />
                    <SelectField
                        rowClassName='Panel-inputRow'
                        labelClassName='Panel-inputLabel'
                        className='Panel-input'
                        descriptionClassName='DeckEditor-description'
                        label='Visibility'
                        value={deckVisibility}
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
                        value={deckNotes}
                        maxLength={notesMaxLength}
                        description={`${deckNotes.length}/${notesMaxLength}`}
                        onChange={onChangeNotes}
                    />
                    <Button type='submit'>{`${editing ? 'Update' : 'Create'}`}</Button>
                </form>
            </Panel>
        </HeaderPage>
    );
}

export default DeckEditor;
