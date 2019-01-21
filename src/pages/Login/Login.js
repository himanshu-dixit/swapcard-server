import React, {Component} from 'react';
import Auth from '../../services/Auth';
import history from '../../services/history';

class Login extends Component {
  constructor(props) {
    super();
    if (localStorage.getItem('isLoggedIn') === 'true') {
      history.replace('/dashboard');
    }
  }

  login() {
    let auth = new Auth();
    auth.login();
  }

  render() {
    return (
      <React.Fragment>
        <div className="top-section">
          <div className="logo"><img
            src="https://www.swapcard.com/static/LogoFINAL-8700cd1c4ccb0b24abfdaf26e5b67b4f.svg" width="190px"/></div>
          Welcome to Swapcard demo chat app
        </div>
        <div className="other_section">
          <div className="small-container">

            <div className="button" onClick={() => this.login()}>Login to the App</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
