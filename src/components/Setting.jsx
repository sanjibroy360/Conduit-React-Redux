import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserInfo, LogoutAction } from "../store/actions";

class EditUserInfo extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: this.props.user.username,
      bio: this.props.user.bio,
      email: this.props.user.email,
      image: this.props.user.image,
    };
  }

  handleLogOut = () => {
    localStorage.clear();
    this.props.dispatch(LogoutAction(this.props.history));
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.username !== prevProps.user.username) {
      const { username, bio, email, password, image } = this.props.user;
      return this.setState({ username, bio, email, password, image });
    }
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleUpdateProfile = () => {
    const url = "https://conduit.productionready.io/api/user";
    const payload = { user: this.state };
    this.props.dispatch(updateUserInfo(url, payload, this.props.history));
    
  };

  render() {
    return (
      <div className="container">
        <div className="form_wrapper">
          <h1 className="form_heading">Your Settings</h1>
          <div className="form">
            {" "}
           
            <input
              type="text"
              placeholder="URL of profile picture"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.image}
              name="image"
            />
            <input
              type="text"
              placeholder="Username"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.username}
              name="username"
            />
            <textarea
              name="bio"
              onChange={this.handleInput}
              className="form_input"
              rows="10"
              placeholder="Short bio about you"
              value={this.state.bio}
            ></textarea>
            <input
              type="text"
              placeholder="Email"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.email}
              name="email"
            />
            <input
              type="text"
              placeholder="New Password"
              className="form_input"
              onChange={this.handleInput}
              value={this.state.password}
              name="password"
            />
            <div className="btn_wrapper">
              <input
                onClick={this.handleUpdateProfile}
                type="submit"
                value="Update Settings"
                className="form_submit"
              />
            </div>
          </div>
          <button onClick={this.handleLogOut}>Log Out</button>
        </div>
      </div>
    );
  }
}

function mapStateToProp({ user }) {
  return { user };
}

export default connect(mapStateToProp)(withRouter(EditUserInfo));
