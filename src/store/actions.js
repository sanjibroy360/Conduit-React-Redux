import { GET_ALL_ARTICLE, GET_ALL_TAG, SIGNIN_USER } from "./types";

// function fetch(url = "", method = "", authToken = "") {
//   console.log(url, method)
//   var data =  fetch(url, {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => data)
//     .catch((error) => console.log(error));

//   // console.log(data);
//   return data;
// }

export function fetchArticle(url) {
  return function (dispatch) {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ articles }) =>
        dispatch({
          type: GET_ALL_ARTICLE,
          payload: articles,
        })
      )
      .catch((error) => console.log(error));
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

export function signinUser(url, payload, history) {
  return function(dispatch) {
    console.log(payload, "payload_before");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: payload }),
    }).then((res) => {
        if (res.status === 200) {
          history.push("/");
        }
        return res.json();
      })
      .then(({user}) => {
        console.log(user , "signin");
        return dispatch({
        type: SIGNIN_USER,
        payload : {...user}
      })
      })
      .catch(err => console.log(err));
      // .this(({ user }) => console.log(user));
  }
}