import React, { useContext } from 'react';
import useSearch from '../../hooks/useSearch';
import useDisplayResults from '../../hooks/useDisplayResults';
import SearchContext from '../../contexts/SearchContext';
import HeaderPage from '../../components/HeaderPage';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './AdvancedSearch.scss';

const AdvancedSearch = () => {
    const { advancedSearch } = useSearch();
    const { displayResults } = useDisplayResults();
    const { name, setName, text, setText } = useContext(SearchContext);

    const onSubmit = async e => {
        e.preventDefault();

        const response = await advancedSearch({ name, text });
        displayResults(response, { name, text, page: 1 }, true);
    };

    return (
        <HeaderPage className='AdvancedSearch'>
            <div className='AdvancedSearch-content'>
                <form onSubmit={onSubmit}>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Card Name</label>
                        <Input className='AdvancedSearch-input' value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='AdvancedSearch-formRow'>
                        <label className='AdvancedSearch-rowLabel'>Text</label>
                        <Input className='AdvancedSearch-input' value={text} onChange={e => setText(e.target.value)} />
                    </div>
                    <Button className='AdvancedSearch-searchButton' onClick={onSubmit}>
                        Search
                    </Button>
                </form>
            </div>
        </HeaderPage>
    );
};

export default AdvancedSearch;
