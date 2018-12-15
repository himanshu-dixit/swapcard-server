import React, { Component } from 'react';
import Auth from '../../services/Auth';

class Login extends Component {
    login(){
        let auth = new Auth();
        auth.login();
    }
    render() {
        return (
            <div>
                <div><img src="https://i.imgur.com/YFlGRZC.png" height="100px"/></div>
                <div className="button" onClick={()=>this.login()}>Login</div>
            </div>
    );
    }
}

export default Login;
