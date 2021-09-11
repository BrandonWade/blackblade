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

    return generateColorString(colors);
}

// Generating the string verbosely like this ensures the resulting symbol string is always in the same order
function generateColorString(colors) {
    let colorList = [];

    if (colors['{W}']) {
        colorList = colorList.concat('{W}');
    }

    if (colors['{U}']) {
        colorList = colorList.concat('{U}');
    }

    if (colors['{B}']) {
        colorList = colorList.concat('{B}');
    }

    if (colors['{R}']) {
        colorList = colorList.concat('{R}');
    }

    if (colors['{G}']) {
        colorList = colorList.concat('{G}');
    }

    if (colors['{C}']) {
        colorList = colorList.concat('{C}');
    }

    if (colors['{S}']) {
        colorList = colorList.concat('{S}');
    }

    return colorList.join('');
}
