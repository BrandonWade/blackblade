import React from 'react';
import HeaderPage from '../../components/HeaderPage';
import './About.scss';

function About() {
    return (
        <HeaderPage className='About'>
            <div className='About-content'>
                <section className='About-section'>
                    <h3 className='About-sectionHeading'>Wizard of the Coast Fan Content</h3>
                    <p className='About-sectionText'>
                        Blackblade is unofficial Fan Content permitted under the{' '}
                        <a href='https://company.wizards.com/fancontentpolicy'>Wizards of the Coast Fan Content Policy</a>. Blackblade is in no way approved or
                        endorsed by Wizards. Portions of the materials (including but not limited to oracle text, card images, and card logos) used are property
                        of Wizards of the Coast. &copy; Wizards of the Coast LLC.
                    </p>
                </section>
                <section className='About-section'>
                    <h3 className='About-sectionHeading'>Scryfall</h3>
                    <p className='About-sectionText'>
                        Blackblade uses <a href='https://scryfall.com/'>Scryfall</a> as the source of it's data and images. Blackblade is in no way approved by,
                        endorsed by, or related to Scryfall. Please go and support them and the work they do - this website cannot exist without them.
                    </p>
                </section>
                <section className='About-section'>
                    <h3 className='About-sectionHeading'>Prices</h3>
                    <p className='About-sectionText'>
                        Card pricing information comes from <a href='https://scryfall.com/'>Scryfall</a>, which in turn comes from{' '}
                        <a href='https://www.tcgplayer.com/'>TCGPlayer</a>. Prices are in USD, and are <strong>ONLY</strong> estimates. Prices are updated
                        weekly, and are in no way a guarantee or a promise - they are only intended to be used as a loose guideline.
                    </p>
                </section>
                <section className='About-section'>
                    <h3 className='About-sectionHeading'>Source Code</h3>
                    <p className='About-sectionText'>
                        Blackblade is open source. You can find the code for the website <a href='https://github.com/BrandonWade/blackblade'>here</a>, and the
                        code for the batch that retrieves Scryfall's data weekly can be found <a href='https://github.com/BrandonWade/blackblade-batch'>here</a>
                        .
                    </p>
                </section>
            </div>
        </HeaderPage>
    );
}

export default About;
