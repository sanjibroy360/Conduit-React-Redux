import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addComment } from "../store/actions";
import { connect } from "react-redux";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        body: "",
      },
    };
  }

  handleInput = (event) => {
    this.setState({
      comment: {
        body: event.target.value,
      },
    });
  };

  handleSubmit = () => {
    const slug = this.props.article.slug;
    const url = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    const payload = this.state;
    const commentListUrl = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    this.props.dispatch(addComment(url, payload, commentListUrl));
    this.setState({
      comment: {
        body: "",
      },
    });
  };

  render() {
    return (
      <div className="comment_form">
        <textarea
          name="comment"
          rows="10"
          placeholder="Write a Comment..."
          className="comment_textarea"
          onChange={this.handleInput}
          value={this.state.comment.body}
        ></textarea>
        <div className="comment_btn_wrapper">
          <input
            type="submit"
            value="Publish"
            className="comment_submit"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ singleArticleInfo }) {
  return { article: singleArticleInfo };
}

export default connect(mapStateToProps)(withRouter(Comment));
