import React from 'react';
import { sumBy, sum, head, sortBy } from 'lodash';
import './DeckStats.scss';

function DeckStats({ deck = [] }) {
    let stats = [];

    const estimatedPrice = () => {
        const price = sumBy(deck, card => {
            let variantPrice;

            if (card.selection_type === 'manual') {
                // If the variant was specifically selected, use it's price
                const variant = card.sets_json.find(set => set.card_id === card.card_id);
                variantPrice = variant?.price || 0;
            } else {
                // If the variant was selected by default, use the lowest variant price
                const sortedSets = sortBy(card.sets_json, set => parseFloat(set.price) || 0);
                const lowest = head(sortedSets.filter(set => set.price !== ''));
                variantPrice = lowest?.price || 0;
            }

            return (parseFloat(variantPrice) || 0) * (parseInt(card.count) || 0);
        });
        stats = stats.concat({ label: 'Estimated Price', value: `$${price.toFixed(2)}` });
    };

    const totalCards = () => {
        const total = sumBy(deck, card => parseInt(card.count) || 0);
        stats = stats.concat({ label: 'Total Cards', value: total });
    };

    const averageCMC = () => {
        const costSum = sumBy(deck, card => parseFloat(card.cmc) * (parseInt(card.count) || 0));
        const nonLandCount = sumBy(deck, card => {
            const count = parseInt(card.count) || 0;
            const faces = card?.sets_json?.[0]?.card_faces || [];
            const anyNonLandFaces = faces.some(face => face.derived_type !== 'land');
            return anyNonLandFaces ? count : 0;
        });

        const total = (costSum / nonLandCount).toFixed(2);
        stats = stats.concat({ label: 'Avg Cost', value: isNaN(total) ? 0 : total });
    };

    const totalOfTypes = types => {
        return sumBy(deck, card => {
            const count = parseInt(card.count) || 0;
            const faces = card?.sets_json?.[0]?.card_faces || [];
            const anyFacesOfTypes = faces.some(face => types.includes(face.derived_type));
            return anyFacesOfTypes ? count : 0;
        });
    };

    const totalCreatures = () => {
        const types = ['creature'];
        const total = totalOfTypes(types);
        if (total > 0) {
            stats = stats.concat({ label: 'Total Creatures', value: total });
        }
    };

    const totalSpells = () => {
        const types = ['instant', 'sorcery', 'artifact', 'enchantment', 'planeswalker'];
        const total = totalOfTypes(types);
        if (total > 0) {
            stats = stats.concat({ label: 'Total Spells', value: total });
        }
    };

    const totalLands = () => {
        const types = ['land'];
        const total = totalOfTypes(types);
        if (total > 0) {
            stats = stats.concat({ label: 'Total Lands', value: total });
        }
    };

    const getColorPercentages = () => {
        const colorCounts = { '{B}': 0, '{W}': 0, '{G}': 0, '{U}': 0, '{R}': 0 };

        deck.forEach(card => {
            const count = parseInt(card.count) || 0;
            const faces = card?.sets_json?.[0]?.card_faces || [];
            faces.forEach(face => {
                const symbols = face.mana_cost.split(/(\{(?:\D|[A-Z0-9]+|[A-Z0-9]+\/[A-Z0-9]+)\})/g);
                symbols.forEach(symbol => {
                    if (symbol === '{W}' || symbol === '{W/P}' || symbol === '{2/W}') {
                        colorCounts['{W}'] += count;
                    } else if (symbol === '{U}' || symbol === '{U/P}' || symbol === '{2/U}') {
                        colorCounts['{U}'] += count;
                    } else if (symbol === '{B}' || symbol === '{B/P}' || symbol === '{2/B}') {
                        colorCounts['{B}'] += count;
                    } else if (symbol === '{R}' || symbol === '{R/P}' || symbol === '{2/R}') {
                        colorCounts['{R}'] += count;
                    } else if (symbol === '{G}' || symbol === '{G/P}' || symbol === '{2/G}') {
                        colorCounts['{G}'] += count;
                    } else if (symbol === '{W/U}') {
                        colorCounts['{W}'] += count;
                        colorCounts['{U}'] += count;
                    } else if (symbol === '{W/B}') {
                        colorCounts['{W}'] += count;
                        colorCounts['{B}'] += count;
                    } else if (symbol === '{U/B}') {
                        colorCounts['{U}'] += count;
                        colorCounts['{B}'] += count;
                    } else if (symbol === '{U/R}') {
                        colorCounts['{U}'] += count;
                        colorCounts['{R}'] += count;
                    } else if (symbol === '{B/R}') {
                        colorCounts['{B}'] += count;
                        colorCounts['{R}'] += count;
                    } else if (symbol === '{B/G}') {
                        colorCounts['{B}'] += count;
                        colorCounts['{G}'] += count;
                    } else if (symbol === '{R/G}') {
                        colorCounts['{R}'] += count;
                        colorCounts['{G}'] += count;
                    } else if (symbol === '{R/W}') {
                        colorCounts['{R}'] += count;
                        colorCounts['{W}'] += count;
                    } else if (symbol === '{G/W}') {
                        colorCounts['{G}'] += count;
                        colorCounts['{W}'] += count;
                    } else if (symbol === '{G/U}') {
                        colorCounts['{G}'] += count;
                        colorCounts['{U}'] += count;
                    }
                });
            });
        });

        const total = sum(Object.values(colorCounts));

        if (colorCounts['{B}'] > 0) {
            const percentage = ((colorCounts['{B}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% Black', value: percentage });
        }

        if (colorCounts['{W}'] > 0) {
            const percentage = ((colorCounts['{W}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% White', value: percentage });
        }

        if (colorCounts['{G}'] > 0) {
            const percentage = ((colorCounts['{G}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% Green', value: percentage });
        }

        if (colorCounts['{U}'] > 0) {
            const percentage = ((colorCounts['{U}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% Blue', value: percentage });
        }

        if (colorCounts['{R}'] > 0) {
            const percentage = ((colorCounts['{R}'] / total) * 100).toFixed(2);
            stats = stats.concat({ label: '% Red', value: percentage });
        }
    };

    estimatedPrice();
    totalCards();
    averageCMC();
    totalCreatures();
    totalSpells();
    totalLands();
    getColorPercentages();

    return (
        <div className='DeckStats'>
            {stats.map(stat => {
                return (
                    <div key={stat.label} className='DeckStats-statBlock'>
                        <div className='DeckStats-statLabel'>{stat.label}:</div>
                        <div className='DeckStats-statValue'>{stat.value}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default DeckStats;
