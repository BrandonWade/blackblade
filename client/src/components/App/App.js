import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import CardInfo from '../../pages/CardInfo';
import './App.scss';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/cards/:id' component={CardInfo} />
                    <Redirect to='/' />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default App;
