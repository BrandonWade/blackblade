import { useContext } from 'react';
import MessageContext from '../../contexts/Message';

export default function useMessage() {
    const { setMessage, setDuration } = useContext(MessageContext);

    const showMessage = ({ text = '', type = 'info', duration = 6500 }) => {
        if (text !== '') {
            setMessage({ type, text });
            setDuration(duration);
        }
    };

    return {
        showMessage,
    };
}
