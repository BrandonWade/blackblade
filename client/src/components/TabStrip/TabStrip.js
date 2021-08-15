import './TabStrip.scss';

export default function TabStrip({ tabs = [], selectedTabIndex = 0, setSelectedTabIndex = () => {} }) {
    const onSelectTab = e => {
        const index = parseInt(e.target.dataset.tabStripIndex);
        setSelectedTabIndex(index);
    };

    return (
        <div className='TabStrip'>
            <div className='TabStrip-titlesContainer'>
                {tabs.map((tab, i) => {
                    return (
                        <div
                            key={tab.title}
                            className={`TabStrip-title ${i === selectedTabIndex ? 'TabStrip-title--selected' : ''}`}
                            onClick={onSelectTab}
                            data-tab-strip-index={i}
                        >
                            {tab.title}
                        </div>
                    );
                })}
            </div>
            {tabs.map((tab, i) => (
                <div
                    key={tab.title}
                    className={`TabStrip-content ${i === selectedTabIndex ? 'TabStrip-content--selected' : ''}`}
                    data-tab-strip-index={i}
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
}
