import { useState } from 'react';
import ExportDeckDialogContext, { initialState } from '../../contexts/ExportDeckDialog';

export default function ExportDeckDialogProvider({ children = [] }) {
    const { deckExport: deckExportDefault, visible: visibleDefault } = initialState;
    const [deckExport, setDeckExport] = useState(deckExportDefault);
    const [visible, setVisible] = useState(visibleDefault);

    const props = {
        deckExport,
        setDeckExport,
        visible,
        setVisible,
    };

    return <ExportDeckDialogContext.Provider value={props}>{children}</ExportDeckDialogContext.Provider>;
}
