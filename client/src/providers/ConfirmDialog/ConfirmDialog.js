import { useState } from 'react';
import ConfirmDialogContext, { initialState } from '../../contexts/ConfirmDialog';

export default function ConfirmDialogProvider({ children = [] }) {
    const { visible: visibleDefault, message: messageDefault, onConfirm: onConfirmDefault, onCancel: onCancelDefault } = initialState;
    const [visible, setVisible] = useState(visibleDefault);
    const [message, setMessage] = useState(messageDefault);
    const [onConfirm, setOnConfirm] = useState(() => onConfirmDefault);
    const [onCancel, setOnCancel] = useState(() => onCancelDefault);

    const props = {
        visible,
        setVisible,
        message,
        setMessage,
        onConfirm,
        setOnConfirm,
        onCancel,
        setOnCancel,
    };

    return <ConfirmDialogContext.Provider value={props}>{children}</ConfirmDialogContext.Provider>;
}
