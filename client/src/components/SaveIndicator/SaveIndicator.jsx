import { useContext } from 'react';
import useIsDeckUnmodified from '../../hooks/useIsDeckUnmodified';
import DeckBuilderContext from '../../contexts/DeckBuilder';
import { Hourglass, Check, Warning } from '../../components/Icons';

export default function SaveIndicator() {
    const { isDeckUnmodified } = useIsDeckUnmodified();
    const { isSaving, isErrored } = useContext(DeckBuilderContext);

    let icon = '';
    let status = '';

    if (isDeckUnmodified()) {
        icon = <Check className='DeckBuilder-saveIndicatorIcon DeckBuilder-saveSucceededIcon' />;
        status = 'Saved';
    } else if (isErrored) {
        icon = <Warning className='DeckBuilder-saveIndicatorIcon DeckBuilder-saveFailedIcon' />;
        status = 'Error';
    } else if (isSaving) {
        icon = <Hourglass className='DeckBuilder-saveIndicatorIcon DeckBuilder-savingIcon' />;
        status = 'Saving';
    } else {
        icon = <Warning className='DeckBuilder-saveIndicatorIcon DeckBuilder-unsavedChangesIcon' />;
        status = 'Unsaved';
    }

    return (
        <div className='DeckBuilder-saveIndicator'>
            {icon}
            <p className='DeckBuilder-saveStatus'>{status}</p>
        </div>
    );
}
