import { ADD_ARTICLE } from "../constants/action-types";
export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload };
}
export function getData() {
    return function(dispatch) {
      return fetch("http://localhost:5000/list")
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "DATA_LOADED", payload: json['userlist'] });
        });
    };
  }