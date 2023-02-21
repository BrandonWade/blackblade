export default function useCardGroups(cards = []) {
    let creatures = [];
    let land = [];
    let spells = [];
    cards.forEach(card => {
        if (card.sets_json?.[0]?.faces_json?.[0].derived_type === 'creature') {
            creatures = creatures.concat(card);
        } else if (card.sets_json?.[0]?.faces_json?.[0].derived_type === 'land') {
            land = land.concat(card);
        } else {
            spells = spells.concat(card);
        }
    });

    return { creatures, land, spells };
}
