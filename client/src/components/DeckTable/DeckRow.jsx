import { useContext } from 'react';
import PropTypes from 'prop-types';
import CardContext from '../../contexts/Card';
import AuthContext from '../../contexts/Auth';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import DeckRowManaCost from './DeckRowManaCost';
import DeckRowName from './DeckRowName';
import Input from '../Input';
import { Images, ArrowUp, ArrowDown } from '../Icons';
import LoadingSkeleton from '../LoadingSkeleton';

function DeckRow({ loading = false, card = {}, count = 0, sectionType = '' }) {
    const { accountPublicID } = useContext(AuthContext);
    const { setCard } = useContext(CardContext);
    const {
        deckAccountPublicID,
        updateDeckCardCount,
        removeDeckCard,
        updateMaybeboardCardCount,
        removeMaybeboardCard,
        moveToDeck,
        moveToMaybeboard,
        showCardArtSelector,
    } = useContext(DeckBuilderContext);
    const ownsDeck = accountPublicID === deckAccountPublicID;
    const inDeck = card?.location === 'deck';
    const isMaybeboardSection = sectionType === 'maybeboard';
    const [frontImage, backImage] = (card?.faces_json || [])?.map(face => face.image);

    if (loading) {
        return (
            <tr className='DeckTable-cardRow'>
                <td className='DeckTable-cardRow--loading'>
                    <LoadingSkeleton className='DeckTable-cardRowContent--loading' />
                </td>
            </tr>
        );
    }

    const onCountChange = e => {
        const updateCardCount = inDeck ? updateDeckCardCount : updateMaybeboardCardCount;
        updateCardCount(card.card_id, e.target.value);
    };

    const onSelectArt = () => {
        setCard(card);
        showCardArtSelector();
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
            <td className='DeckTable-selectArt' title='Select card art' onClick={onSelectArt}>
                <Images className='DeckTable-selectArtIcon' />
            </td>
        ) : (
            <td className='DeckTable-spacer' />
        );
    };

    const renderSwitchSectionButton = () => {
        if (!ownsDeck) {
            return <td className='DeckTable-spacer' />;
        }

        return isMaybeboardSection ? (
            <td className='DeckTable-switchSection' title='Move to deck' onClick={onSwitchSection}>
                <ArrowUp className='DeckTable-switchSectionIcon' />
            </td>
        ) : (
            <td className='DeckTable-switchSection' title='Move to maybeboard' onClick={onSwitchSection}>
                <ArrowDown className='DeckTable-switchSectionIcon' />
            </td>
        );
    };

    const renderRemoveButton = () => {
        return ownsDeck ? (
            <td className='DeckTable-remove' title='Remove card' onClick={onRemoveCard}>
                &#x2715;
            </td>
        ) : (
            <td className='DeckTable-spacer' />
        );
    };

    return (
        <tr className='DeckTable-cardRow'>
            {renderCardCount()}
            {renderSelectArtButton()}
            {renderSwitchSectionButton()}
            <td className='DeckTable-manaCosts'>
                {card.faces_json.map((face, i) => (
                    <DeckRowManaCost key={i} manaCost={face.mana_cost} />
                ))}
            </td>
            <td className='DeckTable-names'>
                {card.faces_json.map((face, i) => {
                    return (
                        <DeckRowName
                            key={i}
                            cardID={card.card_id}
                            name={face.name}
                            previewImageFront={frontImage}
                            previewImageBack={backImage}
                            previewLocation='left'
                        />
                    );
                })}
            </td>
            {renderRemoveButton()}
        </tr>
    );
}

DeckRow.propTypes = {
    loading: PropTypes.bool,
    card: PropTypes.object,
    count: PropTypes.number,
    sectionType: PropTypes.string,
};

export default DeckRow;
