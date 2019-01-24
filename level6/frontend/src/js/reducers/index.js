import { SELECT_STOCK, GET_DETAIL_SUCCESS, SELECT_FUNC, GET_DETAIL } from "../constants/action-types";
import { API_FUNC_LIST } from "../constants/index";
const initialState = {
    remoteArticles: [],
    stock: '',
    detail: null,
    func: API_FUNC_LIST[2],
    isLoading: false
};
function rootReducer(state = initialState, action) {
    if (action.type === SELECT_STOCK) {
        return Object.assign({}, state, {
            stock: action.payload.slice(0, action.payload.length)
        });
    }
    if (action.type === GET_DETAIL_SUCCESS) {
        return Object.assign({}, state, {
            detail: Object.assign({}, action.payload),
            isLoading: false
        });
    }
    if (action.type === GET_DETAIL) {
        return Object.assign({}, state, {
            isLoading: true
        });
    }
    if (action.type === SELECT_FUNC) {
        return Object.assign({}, state, {
            func: action.payload.slice(0, action.payload.length)
        });
    }
    return state;
}
export default rootReducer;