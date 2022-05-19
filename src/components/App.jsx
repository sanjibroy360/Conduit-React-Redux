import React, { Component } from "react";
import Home from "./Home";
import Header from "./Header";
import Signup from "./Signup";
import Signin from "./Signin";
import Loader from "./Loader";
import SingleArticle from "./SingleArticle";
import CreateArticle from "./CreateArticle";
import EditArticle from "./EditArticle";
import UserProfile from "./UserProfile";
import Setting from "./Setting";
import { connect } from "react-redux";
import { USER_INFO } from "../store/types";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    if (localStorage.authToken) {
      const url = "https://conduit.productionready.io/api/user";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) =>
          this.props.dispatch({ type: USER_INFO, payload: user })
        )
        .catch((error) => console.error(error));
    }
  }

  render() {
    if (localStorage.authToken && !this.props.userInfo.token) {
      return <Loader />;
    }
    return (
      <>
        <>
          <Header />
          <Switch>
            <Route path="/" render={() => <Home />} exact />
            <Route path="/register" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/settings/:username" component={Setting} />
            <Route path="/user/profile/:username" component={UserProfile} />
            <Route path="/new/article" component={CreateArticle} />
            <Route path="/edit/article/:slug" component={EditArticle} />
            <Route path="/article/:slug" component={SingleArticle} />
          </Switch>
        </>
      </>
    );
  }
}

function mapStateToProps(state) {
  return { userInfo: state.user };
}

export default connect(mapStateToProps)(App);
