import React from "react";

function ArticleList(props) {
  const { articles } = props;
  console.log(articles);
  return (
    <ul className="article_card_wrapper">
      {props &&
        articles.map((article) => {
          return (
            <li className="article_card">
              <div className="article_card_left">
                <div className="article_info">
                  <div className="author_image">
                    <img src={article.author.image} alt="User" />
                  </div>
                  <div>
                    <p className="author_name">{article.author.username}</p>
                    <p className="create_date">
                      {article.createdAt
                        .toString()
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join(" / ")}
                    </p>
                  </div>
                </div>

                <div className="article_content">
                  <h3 className="article_title">{article.title || ""}</h3>
                  <p className="article_desc">{article.description || ""}</p>
                </div>
              </div>

              <div className="article_card_right">
                {article.favorited ? (
                  <button
                    className="favorited"
                    onClick={(event) =>
                      props.handleFavorited(
                        event,
                        article.slug,
                        article.favorited
                      )
                    }
                  >
                    {article.favoritesCount}
                  </button>
                ) : (
                  <button
                    onClick={(event) =>
                      props.handleFavorited(
                        event,
                        article.slug,
                        article.favorited
                      )
                    }
                  >
                    {article.favoritesCount}
                  </button>
                )}
              </div>

              <div className="card_footer">
                <p>Read More...</p>
                <ul className="card_taglist">
                  {article.tagList.length
                    ? article.tagList.map((tag) => {
                        return <li className="article_card_tag">{tag}</li>;
                      })
                    : ""}
                </ul>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default ArticleList;
