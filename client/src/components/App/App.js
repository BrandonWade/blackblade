import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CardContext, { initialState as CardInitialState } from '../../contexts/CardContext';
import Home from '../../pages/Home';
import CardInfo from '../../pages/CardInfo';
import './App.scss';

const App = () => {
    const [card, setCard] = useState(CardInitialState);

    return (
        <>
            <CardContext.Provider value={{ card, setCard }}>
                <BrowserRouter>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/cards/:id' component={CardInfo} />
                        <Redirect to='/' />
                    </Switch>
                </BrowserRouter>
            </CardContext.Provider>
        </>
    );
};

export default App;
