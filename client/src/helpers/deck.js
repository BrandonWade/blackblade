// Strip out extra data to reduce payload size
export function trimCards(cards, location) {
    return cards.map(card => ({
        count: card.count,
        name: card.name,
        combined_cost: card.faces_json.map(f => f.mana_cost).join(''),
        is_white: card.faces_json.some(f => f.is_white),
        is_blue: card.faces_json.some(f => f.is_blue),
        is_black: card.faces_json.some(f => f.is_black),
        is_red: card.faces_json.some(f => f.is_red),
        is_green: card.faces_json.some(f => f.is_green),
        card_id: card.card_id,
        selection_type: card.selection_type,
        location,
    }));
}
