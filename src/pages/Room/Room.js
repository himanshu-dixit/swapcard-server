import React, {Component} from 'react';
import MicrolinkCard from '@microlink/react'

import sendRequest from "../../services/API";
import getUrls from "get-urls";

class Room extends Component {

  constructor(props) {
    super(props);
    this.room_id = this.props.match.params.id;
    this.handleChange = this.handleChange.bind(this);

    // Fetch user name and role from localstorage
    let name = localStorage.getItem("name");
    let role = localStorage.getItem("role");
    let userRegistered = name ? true : false;
    this.state = {
      userRegister: userRegistered,
      loaded: false,
      name: name,
      role: role,
      group: null,
      roomData: {},
      admin: false
    };
  }


  handleChange(key, event) {
    let state = {};
    state[key] = event.target.value;
    this.setState(state);
  }

  componentDidMount() {
    this.isActive();
    this.fetchRoomInfo();
    this.fetchMessage();
  }


  // Fetch room info
  async fetchRoomInfo() {
    const response = await sendRequest('api/group/fetch', {group_id: this.room_id});
    if (response.status = "success" && response.data) {
      this.setState({roomData: response.data});
      if (response.data.is_owner == "yes") {
        this.setState({admin: true});
      }
    } else {
      this.setState({userRegister: false, loaded: true});
    }
  }

  // Fetch messages of particular group.
  async fetchMessage() {
    const response = await sendRequest('api/group/fetch-messages', {group_id: this.room_id});
    if (response.status == "success") {
      this.setState({messages: response.data, loaded: true});
    }
  }

  // Check the status of user.
  async isActive() {
    const response = await sendRequest('api/group/is_banned', {group_id: this.room_id});
    if (!response.data) {
      this.setState({userStatus: 'none'});
    }
    if (response.data == "kicked") {
      this.setState({userStatus: 'kicked', loaded: true});
    }
  }

  // Kick user from the group.
  async kick(user_id) {
    const response = await sendRequest('api/group/kick', {group_id: this.room_id, user_id: user_id});
    if (response.status == "success") {
      this.fetchMessage();
    } else {
      console.log("Error in deleting the message")
    }
  }

  // Delete a message from group.
  async delete(message_id) {
    const response = await sendRequest('api/group/delete_message', {group_id: this.room_id, message_id: message_id});
    if (response.status == "success") {
      this.fetchMessage();
    }
  }

  // Add message to the group.
  async addMessage() {
    const response = await sendRequest('api/group/add-message', {group_id: this.room_id, message: this.state.message});
    if (response.status == "success") {
      this.setState({userRegister: true});
      this.fetchMessage();
    }
  }

  render() {

    function find_url(text) {
      var matches = getUrls(text);
      if (matches.entries().next().value) {
        return matches.entries().next().value[0];
      }
      return null;
    }

    if (!this.state.loaded) {
      return <div>We're loading</div>;
    }

    if (this.state.userStatus === 'kicked') {
      return <div>You're note allowed to access this room</div>;
    }

    const floatingActionBar = () => {
      return (<div className="floating-container">
        <div className="form-box-inline ">
          <input type="text" placeholder="Enter your message" value={this.state.message}
                 onChange={(e) => this.handleChange("message", e)} className="inline-input"/>
          <button onClick={() => this.addMessage()} className="button inline-button">Send Message</button>
        </div>
      </div>);
    }

    // Display all the messages in the group
    const displayMessages = () => {
      return this.state.messages.map((message) => {
        return (
          <div className={find_url(message.message) ? "large chat_card" : "chat_card "}>
            <div className={this.state.name == message.name ? "profile_icon right" : "profile_icon"}><label
              title={message.name}>{message.name.substr(0, 1)}            </label></div>

            <div
              className={this.state.name == message.name ? "message right" : "message"}>{message.message}{find_url(message.message) ?
              <MicrolinkCard
                url={find_url(message.message)}
              /> : null
            }
              <div>
                {this.state.name == message.name ? <span style={{color: 'red'}} onClick={() => {
                  this.delete(message.message_id)
                }}>Delete</span> : null}
                {this.state.admin && !(this.state.name == message.name) ?
                  <span style={{color: 'red'}} onClick={() => {
                    this.kick(message.user_id)
                  }}>Kick this user</span> : null}</div>
            </div>

          </div>
        );
      })
    }

    // Component to render message list based on the text
    const searchMessage = () => {
      return this.state.messages.map((message) => {
        console.log(message)
        if (message.message.includes(this.state.search)) {
          console.log(message)
          return (
            <div className={find_url(message.message) ? "large chat_card" : "chat_card "}>
              <div className="profile_icon right"><label
                title={message.name}>{message.name.substr(0, 1)}            </label></div>

              <div className="message right">{message.message}{find_url(message.message) ?
                <MicrolinkCard
                  url={find_url(message.message)}
                /> : null
              }<br></br>
                <span style={{color: 'red'}} onClick={() => {
                  this.delete(message.message_id)
                }}>Delete</span></div>
            </div>
          );
        }
      });
    }

    return (
      <React.Fragment>
        {floatingActionBar()}
        <div className="top-section-chat">
          <div className="logo"><img
            src="https://www.swapcard.com/static/LogoFINAL-8700cd1c4ccb0b24abfdaf26e5b67b4f.svg" width="190px"/></div>
          Room name is - {this.state.roomData.name}<br></br>
          {this.state.admin ? "You're the admin of this group" : null}<br></br>
          <input type="text" placeholder="Search message" value={this.state.search}
                 onChange={(e) => this.handleChange("search", e)} className="inline-input"/>
        </div>

        <div className="other-section">
          <div className="container chat-container">
            {this.state.search ? searchMessage() : null}
            {this.state.messages && !this.state.search ? displayMessages() : null}
          </div>
        </div>
      </React.Fragment>

    );
  }
}

export default Room;
