import React from "react";
import {connect} from "react-redux";
import {createArticle} from "../store/actions";

class CreateArtilce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    if (name !== "tagList") {
      this.setState({ [name]: value });
    } else {
      value = value.trim().split(",");
      this.setState({ [name]: value });
    }
  };

  handleSubmit = () => {
    const url = "https://conduit.productionready.io/api/articles";
    const payload = this.state;
    this.props.dispatch(createArticle(url, payload, this.props.history));
  };

  render() {
    return (
      <div className="container">
        <div className="form_wrapper">
          <div className="form">
            <input
              type="text"
              placeholder="Article Title"
              className="form_input"
              onChange={this.handleInput}
              name="title"
            />
            <input
              type="text"
              placeholder="Description"
              className="form_input"
              onChange={this.handleInput}
              name="description"
            />
            <textarea
              name="body"
              onChange={this.handleInput}
              className="form_input"
              rows="10"
              placeholder="Content"
            ></textarea>
            <input
              type="text"
              placeholder="Tags"
              className="form_input"
              onChange={this.handleInput}
              name="tagList"
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

export default connect()(CreateArtilce);
