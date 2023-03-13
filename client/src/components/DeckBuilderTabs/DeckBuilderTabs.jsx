import { useRef } from 'react';
import DeckBuilderTabTitle from './DeckBuilderTabTitle';
import DeckBuilderSearch from '../../components/DeckBuilderSearch';
import DeckBuilderSearchResults from '../../components/DeckBuilderSearchResults';
import DeckPreview from '../../components/DeckPreview';
import './DeckBuilderTabs.scss';

export default function DeckBuilderTabs({ selectedTab = '', setSelectedTab = () => {} }) {
    const tabContentRef = useRef();

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'deck_preview':
                return <DeckPreview />;
            case 'search_results':
                return <DeckBuilderSearchResults forwardRef={tabContentRef} />;
            case 'search_cards':
            default:
                return <DeckBuilderSearch />;
        }
    };

    return (
        <div className='DeckBuilderTabs'>
            <div className='DeckBuilderTabs-titlesContainer'>
                <DeckBuilderTabTitle id='search_cards' title='Search Cards' isSelected={selectedTab === 'search_cards'} onClick={setSelectedTab} />
                <DeckBuilderTabTitle
                    id='search_results'
                    title='Search Results'
                    isSelected={selectedTab === 'search_results'}
                    onClick={setSelectedTab}
                />
                <DeckBuilderTabTitle id='deck_preview' title='Deck Preview' isSelected={selectedTab === 'deck_preview'} onClick={setSelectedTab} />
            </div>
            <div ref={tabContentRef} className='DeckBuilderTabs-content'>
                {renderTabContent()}
            </div>
        </div>
    );
}