import React, { Component } from "react";
import { fetchCommentList, deleteComment } from "../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.slug,
    };
  }

  handleDelete = (id) => {
    const slug = this.props.match.params.slug;
    var deleteCommentUrl = `https://conduit.productionready.io/api/articles/${slug}/comments/${id}`;
    const commentListUrl = `https://conduit.productionready.io/api/articles/${slug}/comments`;

    this.props.dispatch(
      deleteComment(id, slug, deleteCommentUrl, commentListUrl)
    );
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    const url = `https://conduit.productionready.io/api/articles/${slug}/comments`;

    this.props.dispatch(fetchCommentList(url));
  }

  render() {
    let { commentList } = this.props;
    return (
      <>
        {commentList
          ? commentList.map((comment) => {
              return (
                <div className="comment_form">
                  <p className="comment_textarea">{comment.body}</p>
                  <div className="comment_card_footer">
                    <div className="comment_footer_left">
                      <img
                        src={comment.author.image}
                        alt="author"
                        className="author_small_image"
                      />
                      <p className="author_name">{comment.author.username}</p>
                      <p className="comment_date">
                        {comment.createdAt
                          .toString()
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join(" / ")}
                      </p>
                    </div>
                    <div className="comment_del_btn">
                      <button onClick={() => this.handleDelete(comment.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </>
    );
  }
}

function mapStateToProps({ commentList }) {
  return { commentList };
}

export default connect(mapStateToProps)(withRouter(CommentList));
