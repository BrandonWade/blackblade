export default function getColorList(deck = []) {
    const colors = {};

    deck.forEach((card) => {
        const symbols = getSymbols(card.combined_cost);
        addColors(colors, symbols);
    });

    return getColorString(colors);
}

function addColors(colors, symbols) {
    symbols.forEach((symbol) => {
        if (['{W}', '{2/W}', '{W/P}'].includes(symbol)) {
            colors['{W}'] = true;
        } else if (['{U}', '{U/P}', '{2/U}'].includes(symbol)) {
            colors['{U}'] = true;
        } else if (['{B}', '{B/P}', '{2/B}'].includes(symbol)) {
            colors['{B}'] = true;
        } else if (['{R}', '{R/P}', '{2/R}'].includes(symbol)) {
            colors['{R}'] = true;
        } else if (['{G}', '{G/P}', '{2/G}'].includes(symbol)) {
            colors['{G}'] = true;
        } else if (symbol === '{C}') {
            colors['{C}'] = true;
        } else if (symbol === '{S}') {
            colors['{S}'] = true;
        } else if (symbol === '{W/U}') {
            colors['{W}'] = true;
            colors['{U}'] = true;
        } else if (symbol === '{W/B}') {
            colors['{W}'] = true;
            colors['{B}'] = true;
        } else if (symbol === '{U/B}') {
            colors['{U}'] = true;
            colors['{B}'] = true;
        } else if (symbol === '{U/R}') {
            colors['{U}'] = true;
            colors['{R}'] = true;
        } else if (symbol === '{B/R}') {
            colors['{B}'] = true;
            colors['{R}'] = true;
        } else if (symbol === '{B/G}') {
            colors['{B}'] = true;
            colors['{G}'] = true;
        } else if (symbol === '{R/G}') {
            colors['{R}'] = true;
            colors['{G}'] = true;
        } else if (symbol === '{R/W}') {
            colors['{R}'] = true;
            colors['{W}'] = true;
        } else if (symbol === '{G/W}') {
            colors['{G}'] = true;
            colors['{W}'] = true;
        } else if (symbol === '{G/U}') {
            colors['{G}'] = true;
            colors['{U}'] = true;
        }
    });
}

function getSymbols(cost) {
    return cost.split(/(\{(?:\D|[A-Z0-9]+|[A-Z0-9]+\/[A-Z0-9]+)\})/g);
}

function getColorString(colors) {
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
