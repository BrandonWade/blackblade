import { Image, MagnifyingGlass, QuestionMark } from '../Icons';
import './BackgroundMessage.scss';

export const NO_RESULTS = 'NO_RESULTS';
export const EMPTY_DECK_PREVIEW = 'EMPTY_DECK_PREVIEW';

export default function BackgroundMessage({ showMessage = false, type = '', children = null }) {
    const message = getMessageInfo(type);

    function getMessageInfo(type) {
        switch (type) {
            case NO_RESULTS:
                return {
                    primaryText: 'No Results',
                    secondaryText: 'Try searching for something else',
                    icon: <MagnifyingGlass className='BackgroundMessage-icon' />,
                };
            case EMPTY_DECK_PREVIEW:
                return {
                    primaryText: 'No Preview Available',
                    secondaryText: 'Add some cards to your deck first',
                    icon: <Image className='BackgroundMessage-icon' />,
                };
            default:
                return {
                    primaryText: 'Nothing Here',
                    secondaryText: "Whatever you were looking for, it's not here",
                    icon: <QuestionMark className='BackgroundMessage-icon' />,
                };
        }
    }

    return showMessage ? (
        <div className='BackgroundMessage'>
            <div className='BackgroundMessage-content'>
                {message.icon}
                <p className='BackgroundMessage-primaryText'>{message.primaryText}</p>
                <p className='BackgroundMessage-secondaryText'>{message.secondaryText}</p>
            </div>
        </div>
    ) : (
        children
    );
}
