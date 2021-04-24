import { useState } from 'react';
import ExportDeckDialogContext, { initialState } from '../../contexts/ExportDeckDialog';

function ExportDeckDialogProvider({ children = [] }) {
    const [visible, setVisible] = useState(initialState);

    const props = {
        visible,
        setVisible,
    };

    return <ExportDeckDialogContext.Provider value={props}>{children}</ExportDeckDialogContext.Provider>;
}

export default ExportDeckDialogProvider;
