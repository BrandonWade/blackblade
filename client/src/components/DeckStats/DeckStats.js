import React from 'react';
import { sumBy, sum } from 'lodash';
import './DeckStats.scss';

const DeckStats = ({ deck = [] }) => {
    let stats = [];

    const totalCards = () => {
        const total = sumBy(deck, card => card.count || 0);
        stats = stats.concat({ label: 'Total Cards', value: total });
    };

    const averageCMC = () => {
        const costSum = sumBy(deck, card => {
            const count = card.count || 0;
            const faces = card?.sets_json?.[0]?.card_faces || [];
            return sumBy(faces, face => (face.cmc || 0) * count);
        });
        const nonLandCount = sumBy(deck, card => {
            const count = card.count || 0;
            const faces = card?.sets_json?.[0]?.card_faces || [];
            const anyNonLandFaces = faces.some(face => face.derived_type !== 'land');
            return anyNonLandFaces ? count : 0;
        });

        const total = (costSum / nonLandCount).toFixed(2);
        stats = stats.concat({ label: 'Avg Cost', value: isNaN(total) ? 0 : total });
    };

    const totalOfType = type => {
        return sumBy(deck, card => {
            const count = card.count || 0;
            const faces = card?.sets_json?.[0]?.card_faces || [];
            const anyFacesOfType = faces.some(face => face.derived_type === type);
            return anyFacesOfType ? count : 0;
        });
    };

    const totalCreatures = () => {
        const total = totalOfType('creature');

        if (total > 0) {
            stats = stats.concat({ label: 'Total Creatures', value: total });
        }
    };

    const totalSpells = () => {
        const total = sumBy(deck, card => {
            const count = card.count || 0;
            const faces = card?.sets_json?.[0]?.card_faces || [];
            const anySpellFaces = faces.some(face => face.derived_type !== 'creature' && face.derived_type !== 'land');
            return anySpellFaces ? count : 0;
        });

        if (total > 0) {
            stats = stats.concat({ label: 'Total Spells', value: total });
        }
    };

    const totalLands = () => {
        const total = totalOfType('land');
        if (total > 0) {
            stats = stats.concat({ label: 'Total Spells', value: total });
        }
    };

    const getColourPercentages = () => {
        const colourCounts = { '{B}': 0, '{W}': 0, '{G}': 0, '{U}': 0, '{R}': 0 };

        deck.forEach(card => {
            const count = card.count || 0;
            const faces = card?.sets_json?.[0]?.card_faces || [];
            faces.forEach(face => {
                const symbols = face.mana_cost.split(/(\{(?:\D|[A-Z0-9]+|[A-Z0-9]+\/[A-Z0-9]+)\})/g);
                symbols.forEach(symbol => {
                    if (symbol === '{W}' || symbol === '{W/P}' || symbol === '{2/W}') {
                        colourCounts['{W}'] += count;
                    } else if (symbol === '{U}' || symbol === '{U/P}' || symbol === '{2/U}') {
                        colourCounts['{U}'] += count;
                    } else if (symbol === '{B}' || symbol === '{B/P}' || symbol === '{2/B}') {
                        colourCounts['{B}'] += count;
                    } else if (symbol === '{R}' || symbol === '{R/P}' || symbol === '{2/R}') {
                        colourCounts['{R}'] += count;
                    } else if (symbol === '{G}' || symbol === '{G/P}' || symbol === '{2/G}') {
                        colourCounts['{G}'] += count;
                    } else if (symbol === '{W/U}') {
                        colourCounts['{W}'] += count;
                        colourCounts['{U}'] += count;
                    } else if (symbol === '{W/B}') {
                        colourCounts['{W}'] += count;
                        colourCounts['{B}'] += count;
                    } else if (symbol === '{U/B}') {
                        colourCounts['{U}'] += count;
                        colourCounts['{B}'] += count;
                    } else if (symbol === '{U/R}') {
                        colourCounts['{U}'] += count;
                        colourCounts['{R}'] += count;
                    } else if (symbol === '{B/R}') {
                        colourCounts['{B}'] += count;
                        colourCounts['{R}'] += count;
                    } else if (symbol === '{B/G}') {
                        colourCounts['{B}'] += count;
                        colourCounts['{G}'] += count;
                    } else if (symbol === '{R/G}') {
                        colourCounts['{R}'] += count;
                        colourCounts['{G}'] += count;
                    } else if (symbol === '{R/W}') {
                        colourCounts['{R}'] += count;
                        colourCounts['{W}'] += count;
                    } else if (symbol === '{G/W}') {
                        colourCounts['{G}'] += count;
                        colourCounts['{W}'] += count;
                    } else if (symbol === '{G/U}') {
                        colourCounts['{G}'] += count;
                        colourCounts['{U}'] += count;
                    }
                });
            });
        });

        const total = sum(Object.values(colourCounts));

        if (colourCounts['{B}'] > 0) {
            const percentage = ((colourCounts['{B}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% Black', value: percentage });
        }

        if (colourCounts['{W}'] > 0) {
            const percentage = ((colourCounts['{W}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% White', value: percentage });
        }

        if (colourCounts['{G}'] > 0) {
            const percentage = ((colourCounts['{G}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% Green', value: percentage });
        }

        if (colourCounts['{U}'] > 0) {
            const percentage = ((colourCounts['{U}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% Blue', value: percentage });
        }

        if (colourCounts['{R}'] > 0) {
            const percentage = ((colourCounts['{R}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% Red', value: percentage });
        }
    };

    totalCards();
    averageCMC();
    totalCreatures();
    totalSpells();
    totalLands();
    getColourPercentages();

    return (
        <div className='DeckStats'>
            {stats.map(stat => {
                return (
                    <div className='DeckStats-statBlock'>
                        <div className='DeckStats-statLabel'>{stat.label}:</div>
                        <div className='DeckStats-statValue'>{stat.value}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default DeckStats;
