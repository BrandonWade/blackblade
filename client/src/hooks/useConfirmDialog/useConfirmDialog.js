import { useContext } from 'react';
import ConfirmDialogContext from '../../contexts/ConfirmDialog';

export default function useConfirmDialog() {
    const { setVisible, setMessage, setOnAccept, setOnCancel } = useContext(ConfirmDialogContext);

    const showConfirmDialog = (message = '', onAccept = () => {}, onCancel = () => {}) => {
        setMessage(message);
        setOnAccept(onAccept);
        setOnCancel(onCancel);
        setVisible(true);
    };

    // TODO: Wrap onAccept and onCancel to setVisible(false)

    return {
        showConfirmDialog,
    };
}
