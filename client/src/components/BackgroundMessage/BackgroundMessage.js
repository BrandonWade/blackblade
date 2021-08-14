import { MagnifyingGlass } from '../Icons';
import './BackgroundMessage.scss';

export const NO_RESULTS = 'NO_RESULTS';

function BackgroundMessage({ showMessage = false, type = NO_RESULTS, children = null }) {
    const message = getMessageInfo(type);

    function getMessageInfo(type) {
        switch (type) {
            case NO_RESULTS:
            default:
                return {
                    primaryText: 'No Results',
                    secondaryText: 'Try searching for something else',
                    icon: <MagnifyingGlass className='BackgroundMessage-icon' />,
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

export default BackgroundMessage;
