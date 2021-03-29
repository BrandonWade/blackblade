import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useDeck from '../../hooks/useDeck';
import useErrors from '../../hooks/useErrors';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import HeaderPage from '../../components/HeaderPage';
import { InputField } from '../../components/Input';
import { SelectField } from '../../components/Select';
import Button from '../../components/Button';
import './DeckEditor.scss';

function DeckEditor({ editing = false }) {
    const history = useHistory();
    const { publicID } = useParams();
    const { createDeck } = useDeck();
    const { addErrors } = useErrors();
    const { setDeckAccountPublicID, deckName, setDeckName, deckVisibility, setDeckVisibility } = useContext(DeckBuilderContext);

    const onChangeName = e => {
        setDeckName(e.target.value);
    };

    const onChangeVisibility = e => {
        setDeckVisibility(e.target.value);
    };

    const onSubmit = async e => {
        e.preventDefault();

        let redirect = '/';

        if (!editing) {
            const response = await createDeck(deckName, deckVisibility);
            if (!response.success) {
                addErrors(response.errors);
                return;
            }

            redirect = response.deckURI;
            setDeckAccountPublicID(response.accountPublicID);
        } else {
            redirect = `/decks/${publicID}`;
        }

        history.push(redirect);
    };

    const renderVisibilityDescription = () => {
        return deckVisibility === 'private'
            ? 'This deck will only be visible to you, and only while logged in.'
            : 'This deck will be visible to everyone.';
    };

    return (
        <HeaderPage className='DeckEditor'>
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
        </HeaderPage>
    );
}

export default DeckEditor;
