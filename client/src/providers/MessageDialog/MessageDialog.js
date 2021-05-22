import { useState } from 'react';
import MessageDialogContext, { initialState } from '../../contexts/MessageDialog';

function MessageDialogProvider({ children = [] }) {
    const [message, setMessage] = useState(initialState);

    const props = {
        message,
        setMessage,
    };

    return <MessageDialogContext.Provider value={props}>{children}</MessageDialogContext.Provider>;
}

export default MessageDialogProvider;
