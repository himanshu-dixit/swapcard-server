import React, {Component} from 'react';
import Auth from "../../services/Auth";

import sendRequest from "../../services/API";


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.registerUser = this.registerUser.bind(this);

    // Fetch name and role from localstorage
    let name = localStorage.getItem("name");
    let role = localStorage.getItem("role");
    let userRegistered = name ? true : false;
    this.state = {userRegister: userRegistered, loaded: false, name: name, role: role, group: null, state: 'create'};
  }

  componentDidMount() {
    // If no name in localstoage, check from server.
    this.fetchUserInfo();
    this.listGroups();
  }

  // Request user info from server and set it in component state and localstorage
  async fetchUserInfo() {
    if (!this.state.name) {
      const response = await sendRequest('api/user/check', {});
      if (response.status = "success" && response.data) {
        let user = response.data[0];
        localStorage.setItem("name", user.name);
        localStorage.setItem("role", user.role);
        this.setState({userRegister: true, name: user.name, role: user.role});
      } else {
        this.setState({userRegister: false, loaded: true});
      }
    }
  }

  // Request user info from server and set it in component state and localstorage
  // On creation fetch list of groups again.
  async createGroup() {
    if (this.state.group) {
      const response = await sendRequest('api/group/add', {name: this.state.group});
      if (response.status = "success" && response.group_id) {
        this.listGroups();
      } else {
        console.log("Error in creating group");
      }
    }
  }

  async joinGroup() {
    if (this.state.group_id) {
      const response = await sendRequest('api/group/join', {group_id: this.state.group_id});
      if (response.status = "success" && response.group_id) {
        this.listGroups();
      } else {
        console.log("Error in joining the group")
      }
    }
  }

  // Request user info from server and set it in component state and localstorage
  async listGroups() {
    const response = await sendRequest('api/group/list', {});
    if (response.status = "success" && response.data) {
      this.setState({data: response.data, loaded: true});
    } else {
      this.setState({userRegister: false, loaded: true});
    }
  }

  logout() {
    let auth = new Auth();
    auth.logout();
  }

  handleChange(key, event) {
    let state = {};
    state[key] = event.target.value;
    this.setState(state);
  }

  async registerUser() {
    const response = await sendRequest('api/user/add', {name: this.state.name, role: this.state.role});
    if (response.status = "success") {
      this.setState({userRegister: true});
    }
  }

  render() {

    if (!this.state.loaded) {
      return <div>We're loading</div>;
    }

    return (
      <React.Fragment>
        <div className="top-section">
          <div className="logo"><img
            src="https://www.swapcard.com/static/LogoFINAL-8700cd1c4ccb0b24abfdaf26e5b67b4f.svg" width="190px"/></div>

          <div>Join or create rooms</div>
          {this.state.userRegister ? <a onClick={() => {
            this.logout()
          }}> Logout from app</a> : null}
        </div>

        {!this.state.userRegister ? (
          <div className="other-section">
            <div className="form-box">
              <input type="text" placeholder="name" value={this.state.name}
                     onChange={(e) => this.handleChange("name", e)}/>


              <input type="text" placeholder="role" value={this.state.role}
                     onChange={(e) => this.handleChange("role", e)}/>
              <br></br>
              <button onClick={this.registerUser} className="button ">Save my profile</button>
            </div>
          </div>
        ) : (
          <div className="container dashboard-container">
            {this.state.state == "create" ? <div className="form-box-inline form-box-dashboard">
              <input type="text" placeholder="Room Name" value={this.state.group_name}
                     onChange={(e) => this.handleChange("group", e)} className="inline-input"/>
              <button onClick={() => this.createGroup()} className="button inline-button">Create Room</button>
              <br></br><p className="action_handler" onClick={() => this.setState({state: "join"})}>Join Room</p>
            </div> : <div className="form-box-inline form-box-dashboard">

              <input type="text" placeholder="Enter Room id" value={this.state.group_id}
                     onChange={(e) => this.handleChange("group_id", e)} className="inline-input"/>

              <button onClick={() => this.joinGroup()} className="button inline-button">Join Room</button>
              <br></br><p className="action_handler" onClick={() => this.setState({state: "create"})}>Join Room</p>
            </div>}

            <div className="row">

              {this.state.data ? this.state.data.map((group) => {
                return (

                  <div className="col-md-4">
                    <a href={"/room/" + group.group_id} target="_blank">
                      <div className="card">
                        <h3>{group.name}<br></br>Your group id is{group.group_id}</h3>
                      </div>
                    </a>
                  </div>


                );
              }) : null}

            </div>


          </div>
        )}

      </React.Fragment>

    );
  }
}

export default Dashboard;
