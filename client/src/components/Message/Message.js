import { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import MessageContext from '../../contexts/Message';
import './Message.scss';

export default function Message() {
    const { message, duration, setMessage } = useContext(MessageContext);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage();
        }, duration);

        return () => clearTimeout(timeout);
    }, [message, duration]);

    const getMessageTypeClass = () => {
        switch (message?.type) {
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

    const onClose = () => {
        setMessage();
    };

    return ReactDOM.createPortal(
        message?.text ? (
            <div className={`Message ${getMessageTypeClass()}`}>
                <div className='Message-close' onClick={onClose}>
                    &#x2715;
                </div>
                {message?.text}
            </div>
        ) : null,
        document.getElementById('portal-root')
    );
}
