import { isEmpty } from 'lodash';
import './Message.scss';

function Message({ type = 'info', text = '', visible = null }) {
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

    const isVisible = () => {
        if (visible !== null) {
            return visible;
        }

        return !isEmpty(text);
    };

    return isVisible() ? <div className={`Message ${getMessageTypeClass()}`}>{text}</div> : null;
}

export default Message;
