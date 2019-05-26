import React, { Suspense, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Events from './Events';
import Contacts from './Contacts';
import Admin from './Admin';
import Event from './Event';
import NotFound from './NotFound';
import Header from './Header';
import Footer from './Footer';

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/events",
        component: Events
    },
    {
        path: "/contacts",
        component: Contacts
    },
    {
        path: "/admin",
        component: Admin
    },
    {
        path: "/event/:id",
        component: Event
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBanner: window.location.pathname === "/",
        };
        this.changeHasBannerState = this.changeHasBannerState.bind(this);
    }

    changeHasBannerState() {
        this.setState({hasBanner: window.location.pathname === "/"});
    }

    render() {
        return (
            <Router>
                <Header hasBanner={this.state.hasBanner}/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {routes.map((route, i) => {
                            return (<Route key={i} exact
                                    path={route.path}
                                    render={props => (
                                        <route.component {...props} changeHasBannerState={this.changeHasBannerState} />
                                    )}
                            />)
                        })}
                        <Route key={routes.length}
                               render={props => (
                                   <NotFound {...props} changeHasBannerState={this.changeHasBannerState} />
                               )}
                        />
                    </Switch>
                </Suspense>
                <Footer/>
            </Router>
        )
    }
}

export default App