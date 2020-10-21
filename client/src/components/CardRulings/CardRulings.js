import React from 'react';
import CardSection from '../CardSection';
import './CardRulings.scss';

const CardRulings = () => {
    const rulings = [
        {
          "id": 1,
          "oracle_id": "0004ebd0-dfd6-4276-b4a6-de0003e94237",
          "comment_hash": "0c4accb88830bbedfb8f2c74edfc656c",
          "source": "wotc",
          "published_at": "2004-10-04",
          "comment": "If there are two of these on the battlefield, they do not add together. The result is that only two permanents can be untapped."
        },
        {
          "id": 2,
          "oracle_id": "0007c283-5b7a-4c00-9ca1-b455c8dff8c3",
          "comment_hash": "9bb64f57e8359b1c261f91c665f0d5a8",
          "source": "wotc",
          "published_at": "2019-08-23",
          "comment": "The “commander tax” increases based on how many times a commander was cast from the command zone. Casting a commander from your hand doesn’t require that additional cost, and it doesn’t increase what the cost will be the next time you cast that commander from the command zone."
        },
        {
          "id": 3,
          "oracle_id": "0007c283-5b7a-4c00-9ca1-b455c8dff8c3",
          "comment_hash": "1b193bf0245fad8e62c4d90da32c1dbd",
          "source": "wotc",
          "published_at": "2019-08-23",
          "comment": "Certain cards in other sets with the partner keyword may allow you to have more than one commander. If you have two commanders in the command zone, Road of Return’s second mode puts one of your choice into your hand, not both."
        },
        {
          "id": 4,
          "oracle_id": "0007c283-5b7a-4c00-9ca1-b455c8dff8c3",
          "comment_hash": "4f02f049e6d775e55df111b3d77bd86a",
          "source": "wotc",
          "published_at": "2019-08-23",
          "comment": "If your commander isn’t in the command zone (or if you’re not playing the Commander variant), Road of Return’s second mode does nothing."
        }
    ];

    return (
        <>
        {
            rulings.map(ruling => {
                return (
                    <CardSection>
                        {ruling.comment}
                    </CardSection>
                );
            })
        }
        </>
    )
}

export default CardRulings;