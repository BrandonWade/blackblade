import { useState } from 'react';
import ConfirmDialogContext, { initialState } from '../../contexts/ConfirmDialog';

export default function ConfirmDialogProvider({ children = [] }) {
    const { visible: visibleDefault, message: messageDefault, onAccept: onAcceptDefault, onCancel: onCancelDefault } = initialState;
    const [visible, setVisible] = useState(visibleDefault);
    const [message, setMessage] = useState(messageDefault);
    const [onAccept, setOnAccept] = useState(onAcceptDefault);
    const [onCancel, setOnCancel] = useState(onCancelDefault);

    const props = {
        visible,
        setVisible,
        message,
        setMessage,
        onAccept,
        setOnAccept,
        onCancel,
        setOnCancel,
    };

    return <ConfirmDialogContext.Provider value={props}>{children}</ConfirmDialogContext.Provider>;
}
