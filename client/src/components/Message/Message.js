import './Message.scss';

function Message({ type = 'info', text = '', visible = false }) {
    const getMessageTypeClass = () => {
        switch (type) {
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

    return visible ? <div className={`Message ${getMessageTypeClass()}`}>{text}</div> : null;
}

export default Message;
