import { useState } from 'react';
import './TabStrip.scss';

export default function TabStrip({ tabs = [] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelectTab = e => {
        const index = parseInt(e.target.dataset.tabStripIndex);
        setSelectedIndex(index);
    };

    return (
        <div className='TabStrip'>
            <div className='TabStrip-titlesContainer'>
                {tabs.map((tab, i) => {
                    return (
                        <div
                            key={tab.title}
                            className={`TabStrip-title ${i === selectedIndex ? 'TabStrip-title--selected' : ''}`}
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
                    className={`TabStrip-content ${i === selectedIndex ? 'TabStrip-content--selected' : ''}`}
                    data-tab-strip-index={i}
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
}
