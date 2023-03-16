import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import useSearch from '../../hooks/useSearch';
import CardContext from '../../contexts/Card';
import CardImagePreviewContext from '../../contexts/CardImagePreview';
import HeaderPage from '../../components/HeaderPage';
import CardImage from '../../components/CardImage';
import CardFaceDetails from '../../components/CardFaceDetails';
import CardSets from '../../components/CardSets';
import CardRulings from '../../components/CardRulings';
import CardImagePreview from '../../components/CardImagePreview';
import Link from '../../components/Link';
import Button from '../../components/Button';
import './Card.scss';

function Card({ loading = false }) {
    const { id } = useParams();
    const { getCardByID } = useSearch();
    const { card, setCard } = useContext(CardContext);
    const { setVisible } = useContext(CardImagePreviewContext);
    const cardID = parseInt(id);
    const cardFaces = card?.faces_json || [];

    if (loading) {
        return (
            <HeaderPage className='Card'>
                <div className='Card-content'>
                    <CardImage loading={loading} className='Card-cardImage' imageClassName='Card-image--loading' />
                    <div className='Card-facesContainer'>
                        <CardFaceDetails loading={loading} />
                    </div>
                    <div>
                        <CardSets loading={loading} />
                        <div className='Card-externalSites'>
                            <Button loading={loading} className='Card-externalLink Card-externalButton' />
                            <Button loading={loading} className='Card-externalLink Card-externalButton' />
                        </div>
                    </div>
                    <CardRulings loading={loading} className='Card-rulings' />
                </div>
            </HeaderPage>
        );
    }

    useEffect(() => {
        return () => {
            setCard({});
            setVisible(false);
        };
    }, []);

    useEffect(() => {
        const fetchCard = async () => {
            const response = await getCardByID(id);
            if (!response.success) {
                setCard({});
                return;
            }

            if (response.results.length) {
                const [card] = response?.results;
                setCard(card);
                return;
            }

            setCard({});
        };

        if (card.card_id !== cardID) {
            fetchCard();
        }
    }, [id]);

    return (
        <HeaderPage className='Card'>
            <CardImagePreview />
            <div className='Card-content'>
                <CardImage className='Card-cardImage' imageClassName='Card-image' card={card} />
                <div className='Card-facesContainer'>
                    {cardFaces?.map(face => {
                        return <CardFaceDetails key={face.face_id} face={face} />;
                    })}
                </div>
                <div>
                    <CardSets cardSets={card?.sets_json} currentCardID={cardID} />
                    <div className='Card-externalSites'>
                        {card?.tcgplayer_id ? (
                            <Link className='Card-externalLink' to={`https://shop.tcgplayer.com/product/productsearch?id=${card?.tcgplayer_id}`}>
                                <Button className='Card-externalButton'>Buy on TCGPlayer</Button>
                            </Link>
                        ) : null}
                        {card?.scryfall_uri ? (
                            <Link className='Card-externalLink' to={card?.scryfall_uri}>
                                <Button className='Card-externalButton'>View on Scryfall</Button>
                            </Link>
                        ) : null}
                    </div>
                </div>
                <CardRulings className='Card-rulings' rulings={card?.rulings_json} />
            </div>
        </HeaderPage>
    );
}

Card.propTypes = {
    loading: PropTypes.bool,
};

export default Card;
