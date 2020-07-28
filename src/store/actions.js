import {
  GET_ALL_ARTICLE,
  GET_ALL_TAG,
  SIGNIN_USER,
  CHANGE_TAB,
  SINGLE_ARTICLE_INFO,
  COMMENT_LIST,
  USER_PROFILE,
  PROFILE_ARTICLE_LIST,
  USER_INFO,
  TOGGLE_FAVORITE,
  LOG_OUT,
  COUNT_ARTICLES,
} from "./types";

export function fetchArticle(url, isAuthRequired) {
  return function (dispatch) {
    if (isAuthRequired) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ articles, articlesCount }) => {
          dispatch({
            type: GET_ALL_ARTICLE,
            payload: [...articles],
          });

          dispatch({
            type: COUNT_ARTICLES,
            payload: articlesCount,
          });
        })
        .catch((error) => console.log(error));
    } else {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ articles, articlesCount }) => {
          dispatch({
            type: GET_ALL_ARTICLE,
            payload: [...articles],
          });
          dispatch({
            type: COUNT_ARTICLES,
            payload: articlesCount,
          });
        })
        .catch((error) => console.log(error));
    }
  };
}

export function fetchTags(url) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ tags }) =>
        dispatch({
          type: GET_ALL_TAG,
          payload: tags,
        })
      )
      .catch((error) => console.log(error));
  };
}

// Signin User

export function signinUser(url, payload, history) {
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: payload }),
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
        }
        return res.json();
      })
      .then(({ user }) => {
        return dispatch({
          type: SIGNIN_USER,
          payload: { ...user },
        });
      })
      .catch((err) => console.log(err));
  };
}

// Update UserInfo

export function updateUserInfo(url, payload, history) {
  return function (dispatch) {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(({ user }) => {
        dispatch({
          type: USER_INFO,
          payload: user,
        });
        history.push("/");
      });
  };
}

// Filter Article List according to the current active tab in home page.

export function filterArticleAction(payload) {
  return {
    type: CHANGE_TAB,
    payload,
  };
}

// Fetch Single Article Infos

export function fetchSingleArticle(url) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        dispatch({
          type: SINGLE_ARTICLE_INFO,
          payload: article,
        });
      });
  };
}

// Fetch Comment List

export function fetchCommentList(url) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ comments }) => {
        dispatch({
          type: COMMENT_LIST,
          payload: comments,
        });
      });
  };
}

// Add Comment and update article list

export function addComment(url, payload, commentListUrl) {
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status === 200) {
        dispatch(fetchCommentList(commentListUrl));
      }
    });
  };
}

// Delete Comment and return remaining list of article

export function deleteComment(id, slug, deleteCommentUrl, commentListUrl) {
  return function (dispatch) {
    fetch(deleteCommentUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        dispatch(fetchCommentList(commentListUrl));
      }
    });
  };
}

// Create Article

export function createArticle(url, payload, history) {
  return function (dispatch) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ article: payload }),
    })
      .then((res) => res.json())
      .then(({ article }) => {
        history.push(`/article/${article.slug}`);
      })
      .catch((error) => console.log(error));
  };
}

// Edit Article

export function editArticle(url, slug, payload, history) {
  return function (dispatch) {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ article: payload }),
    }).then((res) => {
      if (res.status === 200) {
        history.push(`/article/${slug}`);
      }
    });
  };
}

// Delete Article

export function deleteArticle(url, history) {
  return function (dispatch) {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        history.push("/");
      }
    });
  };
}

// Fetch visited profile infos

export function fetchVisitedProfileInfo(url) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        dispatch({
          type: USER_PROFILE,
          payload: profile,
        });
      })
      .catch((error) => console.log(error));
  };
}

// Fetch visited profile's articles

export function fetchVisitedProfileArticles(tab = "author", username) {
  const url = `https://conduit.productionready.io/api/articles?${tab}=${username}&limit=5&offset=0`;

  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then(({ articles }) => {
        dispatch({
          type: PROFILE_ARTICLE_LIST,
          payload: articles,
        });
      });
  };
}

// Handle Follow and Unfollow user

export function handleFollowAndUnfollow(url, username, method, history) {
  return function (dispatch) {
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        dispatch({
          type: USER_PROFILE,
          payload: profile,
        });
        history.push(`/user/profile/${username}`);
      });
  };
}

export function FavoriteAndUnfavoriteArticle(
  url,
  type,
  slug,
  history,
  method,
  targetPage
) {
  return function (dispatch) {
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        console.log(targetPage, "targetPage");
        history.push(targetPage);
        console.log(article, "fav");
        dispatch({
          type,
          payload: article,
        });
      });
  };
}

export function LogoutAction(history) {
  history.push("/");
  return {
    type: LOG_OUT,
  };
}

export function fetchNextPageArticles(url, history) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ articles, articlesCount }) => {
        dispatch({
          type: GET_ALL_ARTICLE,
          payload: [...articles],
        });

        dispatch({
          type: COUNT_ARTICLES,
          payload: articlesCount,
        });
      })
      .catch((error) => console.log(error));
  };
}
