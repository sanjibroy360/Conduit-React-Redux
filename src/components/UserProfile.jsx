import React, { Component } from "react";
import Loader from "./Loader";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchVisitedProfileInfo,
  handleFollowAndUnfollow,
} from "../store/actions";
import ProfileArticleList from "./ProfileArticleList.jsx";

class UserProfile extends Component {
  componentDidMount() {
    const username = this.props.match.params.username;
    var url = `https://conduit.productionready.io/api/profiles/${username}`;
    this.props.dispatch(fetchVisitedProfileInfo(url));
  }

  componentDidUpdate() {
    if (
      this.props.profile.userInfo.username &&
      this.props.profile.userInfo.username !== this.props.match.params.username
    ) {
      const username = this.props.match.params.username;
      var url = `https://conduit.productionready.io/api/profiles/${username}`;

      this.props.dispatch(fetchVisitedProfileInfo(url));
    }
  }

  handleFollow = (isFollowing, username) => {
    const url = `https://conduit.productionready.io/api/profiles/${username}/follow`;

    let method = isFollowing ? "DELETE" : "POST";

    this.props.dispatch(
      handleFollowAndUnfollow(url, username, method, this.props.history)
    );
  };

  render() {
    const { currentUser, profile } = this.props;
    const { image, username, following } = profile.userInfo;
    if (
      username !== this.props.match.params.username &&
      this.props.profile.articleList.length
    ) {
      return <Loader />;
    }

    return (
      <div>
        <div className="profile_hero_sec">
          <div className="container profile_info">
            <div className="user_image_wrapper">
              <img src={image} alt="User" className="user_image" />
            </div>
            <p className="profile_username">{username}</p>
            <div className="follow_btn_wrapper">
              {currentUser.username && currentUser.username !== username ? (
                <button
                  className="follow_btn"
                  onClick={() => this.handleFollow(following, username)}
                >
                  {following
                    ? `+ Unfollow ${username}`
                    : `+ Follow ${username}`}
                </button>
              ) : (
                <Link to={`/settings/${username}`}>
                  <button className="follow_btn">Edit Profile</button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="profile_articles_sec">
          <ProfileArticleList />
        </div>
      </div>
    );
  }
}
function mapStateToProps({ user, profile }) {
  return { currentUser: user, profile };
}

export default connect(mapStateToProps)(withRouter(UserProfile));
