import { DATA_LOADED, SELECT_STOCK, DETAIL_LOADED } from "../constants/action-types";
const initialState = {
    remoteArticles: [],
    stock: '',
    detail: null
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
    return state;
}
export default rootReducer;