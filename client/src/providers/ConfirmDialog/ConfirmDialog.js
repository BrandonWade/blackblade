import { useState } from 'react';
import ConfirmDialogContext, { initialState } from '../../contexts/ConfirmDialog';

export default function ConfirmDialogProvider({ children = [] }) {
    const [visible, setVisible] = useState(initialState.visible);
    const [message, setMessage] = useState(initialState.message);
    const [onConfirm, setOnConfirm] = useState(() => initialState.onConfirm);
    const [onCancel, setOnCancel] = useState(() => initialState.onCancel);

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
