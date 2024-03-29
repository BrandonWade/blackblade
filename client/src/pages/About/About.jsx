import { useContext } from 'react';
import AuthContext from '../../contexts/Auth';
import HeaderPage from '../../components/HeaderPage';
import Link from '../../components/Link';
import './About.scss';

export default function About() {
    const { authenticated } = useContext(AuthContext);

    return (
        <HeaderPage className='About'>
            <div className='About-content'>
                <section className='About-section'>
                    <h3 className='About-sectionHeading'>Wizard of the Coast Fan Content</h3>
                    <p className='About-sectionText'>
                        Blackblade is unofficial Fan Content permitted under the{' '}
                        <Link to='https://company.wizards.com/en/legal/fancontentpolicy'>Wizards of the Coast Fan Content Policy</Link>. Blackblade is
                        in no way approved or endorsed by Wizards. Portions of the materials (including but not limited to oracle text, card images,
                        and card logos) used are property of Wizards of the Coast. &copy; Wizards of the Coast LLC.
                    </p>
                </section>
                <section className='About-section'>
                    <h3 className='About-sectionHeading'>Scryfall</h3>
                    <p className='About-sectionText'>
                        Blackblade uses <Link to='https://scryfall.com/'>Scryfall</Link> as the source of it's data and images. Blackblade is in no
                        way approved by, endorsed by, or related to Scryfall. Please go and support them and the work they do - this website cannot
                        exist without them.
                    </p>
                </section>
                <section className='About-section'>
                    <h3 className='About-sectionHeading'>Prices</h3>
                    <p className='About-sectionText'>
                        Card pricing information comes from <Link to='https://scryfall.com/'>Scryfall</Link>, which in turn comes from{' '}
                        <Link to='https://www.tcgplayer.com/'>TCGPlayer</Link>. Prices are in USD, and are <strong>ONLY</strong> estimates. Prices are
                        updated weekly, and are in no way a guarantee or a promise - they are only intended to be used as a loose guideline.
                    </p>
                </section>
                {/* <section className='About-section'>
                    <h3 className='About-sectionHeading'>Data & Privacy</h3>
                    <p className='About-sectionText'>
                        Your data is your own. We strongly believe in the right to privacy and therefore only collect the minimum amount of
                        information about you necessary to provide service. We will never use this information to track you or advertise to you, and
                        we will never sell this information. If you decide that you no longer wish to use the service, you may permanently delete your
                        account and all of your data from {authenticated ? <Link to='/account'>this page</Link> : 'the Account page'}. Please note
                        that it will take a minimum of 60 days for your data to be completely removed from our system.
                    </p>
                </section> */}
                <section className='About-section'>
                    <h3 className='About-sectionHeading'>Source Code</h3>
                    <p className='About-sectionText'>
                        Blackblade is open source. You can find the code for the website{' '}
                        <Link to='https://github.com/BrandonWade/blackblade'>here</Link>. The code for the infrastructure can be found{' '}
                        <Link to='https://github.com/BrandonWade/blackblade-infrastructure'>here</Link>, and the code for the batch that retrieves
                        data from Scryfall can be found <Link to='https://github.com/BrandonWade/blackblade-batch'>here</Link>.
                    </p>
                </section>
            </div>
        </HeaderPage>
    );
}
