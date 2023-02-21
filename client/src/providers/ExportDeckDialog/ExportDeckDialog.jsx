import { useState } from 'react';
import ExportDeckDialogContext, { initialState } from '../../contexts/ExportDeckDialog';

export default function ExportDeckDialogProvider({ children = [] }) {
    const [deckExport, setDeckExport] = useState(initialState.deckExport);
    const [visible, setVisible] = useState(initialState.visible);

    const props = {
        deckExport,
        setDeckExport,
        visible,
        setVisible,
    };

    return <ExportDeckDialogContext.Provider value={props}>{children}</ExportDeckDialogContext.Provider>;
}
