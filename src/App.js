import React, {Component} from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';
import {Route, Router} from 'react-router-dom';
import Auth from './services/Auth';
import history from './services/history';

class App extends Component {
    render() {
        const handleAuthentication = (nextState) => {
            if (/access_token|id_token|error/.test(nextState.location.hash)) {
                const auth = new Auth();
                auth.handleAuthentication();
            }
        }
        if (localStorage.getItem('isLoggedIn') === 'true') {
            history.replace('/dashboard');
        }
        return (
            <div className="container">
                <Router history={history}>
                    <div>
                        <Route exact path="/" render={() => <Login/>}/>
                        <Route exact path="/dashboard" render={() => <Dashboard/>}/>
                        <Route path="/callback" render={(props) => {
                            handleAuthentication(props);
                            return <div>
                                <img src="https://i.imgur.com/YFlGRZC.png" height="100px"/><br></br>loading</div>;
                        }}></Route>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
