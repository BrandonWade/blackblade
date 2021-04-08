import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CardContext from '../../contexts/Card';
import CardArtSelectorContext from '../../contexts/CardArtSelector';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DeckRowManaCost from './DeckRowManaCost';
import Input from '../../components/Input';
import { Images, ArrowUp, ArrowDown } from '../Icons';

function DeckRow({ card = {}, count = 0, sectionType = '' }) {
    const { accountPublicID } = useContext(AuthContext);
    const { setCard } = useContext(CardContext);
    const { setArtSelectorVisible } = useContext(CardArtSelectorContext);
    const {
        deckAccountPublicID,
        updateDeckCardCount,
        removeDeckCard,
        updateMaybeboardCardCount,
        removeMaybeboardCard,
        moveToDeck,
        moveToMaybeboard,
    } = useContext(DeckBuilderContext);
    const cardFaces = card?.sets_json?.[0]?.card_faces;
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const inDeck = card.location === 'deck';
    const isMaybeboardSection = sectionType === 'maybeboard';

    const onCountChange = e => {
        const updateCardCount = inDeck ? updateDeckCardCount : updateMaybeboardCardCount;
        updateCardCount(card.card_id, e.target.value);
    };

    const onSelectArt = () => {
        setCard(card);
        setArtSelectorVisible(true);
    };

    const onSwitchSection = () => {
        const moveCard = isMaybeboardSection ? moveToDeck : moveToMaybeboard;
        moveCard(card.card_id, card.count);
    };

    const onRemoveCard = () => {
        const removeCard = inDeck ? removeDeckCard : removeMaybeboardCard;
        removeCard(card.card_id);
    };

    const renderCardCount = () => {
        return ownsDeck ? (
            <td className='DeckTable-count'>
                <Input className='DeckTable-input' value={count} onChange={onCountChange} />
            </td>
        ) : (
            <td className='DeckTable-count'>
                <p className='DeckTable-input--readonly'>{count}</p>
            </td>
        );
    };

    const renderSelectArtButton = () => {
        return ownsDeck ? (
            <td className='DeckTable-selectArt' onClick={onSelectArt}>
                <Images className='DeckTable-selectArtIcon' />
            </td>
        ) : null;
    };

    const renderSwitchSectionButton = () => {
        return ownsDeck ? (
            <td className='DeckTable-switchSection' onClick={onSwitchSection}>
                {isMaybeboardSection ? <ArrowUp className='DeckTable-switchSectionIcon' /> : <ArrowDown className='DeckTable-switchSectionIcon' />}
            </td>
        ) : null;
    };

    const renderRemoveButton = () => {
        return ownsDeck ? (
            <td className='DeckTable-remove' onClick={onRemoveCard}>
                &#x2715;
            </td>
        ) : null;
    };

    return (
        <tr key={card.card_id} className='DeckTable-cardRow'>
            {renderCardCount()}
            {renderSelectArtButton()}
            {renderSwitchSectionButton()}
            <td className='DeckTable-manaCosts'>
                {cardFaces.map((face, i) => (
                    <DeckRowManaCost key={i} manaCost={face.mana_cost} />
                ))}
            </td>
            <td className='DeckTable-names'>
                {cardFaces.map((face, i) => (
                    <div key={i} className='DeckTable-subRow'>
                        <Link to={`/cards/${card.card_id}`}>
                            <span className='DeckTable-cardLink'>{face.name}</span>
                        </Link>
                    </div>
                ))}
            </td>
            {renderRemoveButton()}
        </tr>
    );
}

export default DeckRow;
