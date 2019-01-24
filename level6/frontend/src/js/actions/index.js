import { SELECT_STOCK, GET_DETAIL_SUCCESS, SELECT_FUNC, GET_DETAIL } from "../constants/action-types";

export function selectStock(payload) {
    return { type: SELECT_STOCK, payload: payload };
}
export function selectFunc(payload) {
    return { type: SELECT_FUNC, payload: payload };
}

// API
var bser_url = "http://localhost:5000"
export function getDetail(payload) {
    return function (dispatch) {
        dispatch({ type: GET_DETAIL })
        return fetch(bser_url + "/stock/" + payload.func + "/" + payload.stock)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_DETAIL_SUCCESS, payload: json.data });
            });
    };
}