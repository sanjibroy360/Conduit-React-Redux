import React, { Component } from "react";
import Home from "./Home";
import Header from "./Header";
import Signup from "./Signup";
import Signin from "./Signin";
import { withRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userInfo: null,
      profileVisit: "",
      profile: null,
    };
  }

  handleLogOut = () => {
    this.setState({
      isLoggedIn: false,
      userInfo: null,
      profileVisit: "",
      profile: null,
    });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
  };

  // updateLoggedIn = (status, user) => {
  //   this.setState({ isLoggedIn: status, userInfo: user });
  //   localStorage.setItem("authToken", user.token);
  // };
  render() {
    return (
      <>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          userInfo={this.state.userInfo}
          handleProfileVisit={this.handleProfileVisit}
        />
        <Switch>
          <Route
            path="/"
            render={() => (
              <Home
                isLoggedIn={this.state.isLoggedIn}
                handleProfileVisit={this.handleProfileVisit}
              />
            )}
            exact
          />
          <Route path="/register" component={Signup} />
          <Route
            path="/signin"
            render={() => <Signin  />}
          />
        </Switch>{" "}
      </>
    );
  }
}

export default withRouter(App);
