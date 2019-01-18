import { DATA_LOADED, SELECT_STOCK, DETAIL_LOADED } from "../constants/action-types";

export function selectStock(payload) {
    return { type: SELECT_STOCK, payload };
}

// API
var bser_url = "http://localhost:5000"
export function getData() {
    return function (dispatch) {
        return fetch(bser_url + "/list")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: DATA_LOADED, payload: json['userlist'] });
            });
    };
}
export function getDetail(payload) {
    return function (dispatch) {
        return fetch(bser_url + "/stock" + "/" + payload)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                dispatch({ type: DETAIL_LOADED, payload: json.data });
            });
    };
}