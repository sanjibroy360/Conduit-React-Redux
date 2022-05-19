import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchNextPageArticles } from "../store/actions";

class Pagination extends Component {
  handleClick = (event, pageNo) => {
    const limit = 10;
    const offset = (pageNo - 1) * 10;
    const { filterParam } = this.props;
    let articleFetchUrl = "";
    let prevActiveLink = document.querySelector(".active_page_link");

    if (prevActiveLink) {
      prevActiveLink.classList.remove("active_page_link");
    }
    event.target.classList.add("active_page_link");

    switch (filterParam) {
      case "global":
        articleFetchUrl = `https://conduit.productionready.io/api/articles?limit=${limit}&offset=${offset}`;
        break;

      case "yourFeed":
        articleFetchUrl = `https://conduit.productionready.io/api/articles/feed?limit=${limit}&offset=${offset}`;
        break;
      default:
        articleFetchUrl = `https://conduit.productionready.io/api/articles?tag=${filterParam}&limit=${limit}&offset=${offset}`;
    }

    return this.props.dispatch(
      fetchNextPageArticles(articleFetchUrl, this.props.history)
    );
  };

  render() {
    let pageNumbers = [];
    const { articlesCount } = this.props;
    for (let i = 1; i <= Math.floor(articlesCount / 10); i++) {
      pageNumbers.push(i);
    }
    let prevActiveLink = document.querySelector(".active_page_link");

    return (
      <div className="pagination_wrapper">
        {pageNumbers.map((no) => {
          return (
            <>
              {prevActiveLink ? (
                <li
                  className="page_links"
                  onClick={(event) => this.handleClick(event, no)}
                >
                  {no}
                </li>
              ) : (
                <li
                  className={
                    no === 1 ? "page_links active_page_link" : "page_links"
                  }
                  onClick={(event) => this.handleClick(event, no)}
                >
                  {no}
                </li>
              )}
            </>
          );
        })}
      </div>
    );
  }
}

function mapStateToProp({ articlesCount, articles, filterArticle }) {
  return { articlesCount, articles, filterParam: filterArticle };
}

export default connect(mapStateToProp)(withRouter(Pagination));
