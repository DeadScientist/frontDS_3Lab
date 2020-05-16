import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AuthenticateComponent from "./components/AuthenticateComponent";
import userStore from "./store/UserStore";
import {observer} from "mobx-react";
import MainComponent from './components/MainComponent';

function App() {
    const {auth} = userStore;

    return (
        <Router>
        {auth ?
            <Switch>
                <Route exact path="/auth">
                    <AuthenticateComponent />
                </Route>
                <Route path="/">
                    <MainComponent />
                </Route>
            </Switch>
            :
            <AuthenticateComponent />
        }
        </Router>
    );
}

export default observer(App);
