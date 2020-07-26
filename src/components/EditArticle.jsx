import React from "react";
import Loader from "./Loader.jsx";
import { connect } from "react-redux";
import { editArticle } from "../store/actions";

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      description: "",
      tagList: [],
    };
  }

  componentDidMount() {
    const { title, body, description, tagList } = this.props.singleArticleInfo;

    this.setState({ title, body, description, tagList });
  }

  handleInput = ({ target: { name, value } }) => {
    if (name !== "tagList") {
      this.setState({ [name]: value });
    } else {
      value = value.split(",").map((el) => el.trim());
      this.setState({ [name]: value });
    }
  };

  handleSubmit = () => {
    const slug = this.props.match.params.slug;
    var url = `https://conduit.productionready.io/api/articles/${slug}`;

    const payload = { ...this.state };
    this.props.dispatch(editArticle(url, slug, payload, this.props.history));
  };

  render() {
    if (!this.state.title) {
      return <Loader />;
    }

    let { description, title, tagList, body } = this.state;

    return (
      <div className="container">
        <div className="form_wrapper">
          <div className="form">
            {" "}
            <input
              type="text"
              placeholder="Article Title"
              className="form_input"
              onChange={this.handleInput}
              name="title"
              value={title}
            />
            <input
              type="text"
              placeholder="Description"
              className="form_input"
              onChange={this.handleInput}
              name="description"
              value={description}
            />
            <textarea
              name="body"
              onChange={this.handleInput}
              className="form_input"
              rows="10"
              placeholder="Content"
              value={body}
            ></textarea>
            <input
              type="text"
              placeholder="Tags"
              className="form_input"
              onChange={this.handleInput}
              name="tagList"
              value={tagList}
            />
            <div className="btn_wrapper">
              <input
                onClick={this.handleSubmit}
                type="submit"
                value="Publish"
                className="form_submit"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ singleArticleInfo }) {
  return { singleArticleInfo };
}

export default connect(mapStateToProps)(EditArticle);
