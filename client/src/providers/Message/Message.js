import { useState } from 'react';
import MessageContext, { initialState } from '../../contexts/Message';

function MessageProvider({ children = [] }) {
    const [message, setMessage] = useState(initialState.message);
    const [duration, setDuration] = useState(initialState.duration);

    const props = {
        message,
        setMessage,
        duration,
        setDuration,
    };

    return <MessageContext.Provider value={props}>{children}</MessageContext.Provider>;
}

export default MessageProvider;
