export default function getColorString(deck = []) {
    const colors = {};

    deck.forEach((card) => {
        if (card.is_white) {
            colors['{W}'] = true;
        }

        if (card.is_blue) {
            colors['{U}'] = true;
        }

        if (card.is_black) {
            colors['{B}'] = true;
        }

        if (card.is_red) {
            colors['{R}'] = true;
        }

        if (card.is_green) {
            colors['{G}'] = true;
        }

        if (card.combined_cost.indexOf('{C}') !== -1) {
            colors['{C}'] = true;
        }

        if (card.combined_cost.indexOf('{S}') !== -1) {
            colors['{S}'] = true;
        }
    });

    // Ensure the symbols appear in a consistent order in the string
    const sortOrder = {
        '{W}': 1,
        '{U}': 2,
        '{B}': 3,
        '{R}': 4,
        '{G}': 5,
        '{C}': 6,
        '{S}': 7,
    };

    return Object.keys(colors)
        .filter((color) => colors[color])
        .sort((a, b) => sortOrder[a] - sortOrder[b])
        .join('');
}
