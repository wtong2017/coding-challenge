import { DATA_LOADED, SELECT_STOCK, DETAIL_LOADED, SELECT_FUNC } from "../constants/action-types";
import { API_FUNC_LIST } from "../constants/index";
const initialState = {
    remoteArticles: [],
    stock: '',
    detail: null,
    func: API_FUNC_LIST[2]
};
function rootReducer(state = initialState, action) {
    if (action.type === DATA_LOADED) {
        return Object.assign({}, state, {
            remoteArticles: state.remoteArticles.concat(action.payload)
        });
    }
    if (action.type === SELECT_STOCK) {
        return Object.assign({}, state, {
            stock: action.payload.slice(0, action.payload.length)
        });
    }
    if (action.type === DETAIL_LOADED) {
        return Object.assign({}, state, {
            detail: Object.assign({}, action.payload)
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