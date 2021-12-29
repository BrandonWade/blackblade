import { useState } from 'react';
import DrawHandDialogContext, { initialState } from '../../contexts/DrawHandDialog';

export default function DrawHandDialogProvider({ children = [] }) {
    const [hand, setHand] = useState(initialState.hand);
    const [visible, setVisible] = useState(initialState.visible);

    const props = {
        hand,
        setHand,
        visible,
        setVisible,
    };

    return <DrawHandDialogContext.Provider value={props}>{children}</DrawHandDialogContext.Provider>;
}
