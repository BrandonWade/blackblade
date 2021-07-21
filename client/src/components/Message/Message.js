import { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { isEmpty } from 'lodash';
import MessageContext from '../../contexts/Message';
import './Message.scss';

function Message() {
    const { message, duration, setMessage } = useContext(MessageContext);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage();
        }, duration);

        return () => clearTimeout(timeout);
    }, [message]);

    const getMessageTypeClass = () => {
        switch (message.type) {
            case 'error':
                return 'Message--error';
            case 'warning':
                return 'Message--warning';
            case 'success':
                return 'Message--success';
            case 'info':
            default:
                return 'Message--info';
        }
    };

    return ReactDOM.createPortal(
        !isEmpty(message) ? <div className={`Message ${getMessageTypeClass()}`}>{message.text}</div> : null,
        document.getElementById('portal-root')
    );
}

export default Message;
