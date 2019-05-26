import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Events from './Events';
import Contracts from './Contracts';
import Admin from './Admin';
import Event from './Event';
import NotFound from './NotFound';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

const App = () => (
    <Router>
        <Navbar/>
        <Header/>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/events" component={Events}/>
                <Route path="/contacts" component={Contracts}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/event/:id" component={Event}/>
                <Route component={NotFound} />
            </Switch>
        </Suspense>
        <Footer/>
    </Router>
);

export default App