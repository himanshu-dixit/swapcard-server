import React, {Component} from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import {Route, Router} from 'react-router-dom';
import Auth from './services/Auth';
import history from './services/history';
import Room from "./pages/Room/Room";

class App extends Component {
    render() {
        const handleAuthentication = (nextState) => {
            if (/access_token|id_token|error/.test(nextState.location.hash)) {
                const auth = new Auth();
                auth.handleAuthentication();
            }
        }

        return (
            <div>
                <Router history={history}>
                    <div>
                        <Route exact path="/" render={() => <Login/>}/>
                        <Route exact path="/dashboard" render={() => <Dashboard/>}/>
                        <Route exact path="/room/:id" component={Room}/>
                        <Route path="/callback" render={(props) => {
                            handleAuthentication(props);
                            return (          <React.Fragment>
                                <div className="top-section">
                                    <div c lassName="logo"><img src="https://www.swapcard.com/static/LogoFINAL-8700cd1c4ccb0b24abfdaf26e5b67b4f.svg" width="190px"/></div>
                                    We're loading App
                                </div>
                                <div className="other_section">
                                    <div className="container">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" width="40px"/>
                                    </div>
                                </div>
                            </React.Fragment>);
                        }}></Route>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
