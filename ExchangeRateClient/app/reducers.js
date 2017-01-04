import {PAIRS_UPDATED, RATES_UPDATED, FILTER_UPDATED, FILTERS_LOADED} from "./actions";
import {combineReducers} from "redux";

function pairs(state = {}, action) {
    switch (action.type) {
        case PAIRS_UPDATED:
            return {...action.pairs};
        default:
            return state;
    }
}

function rates(state = {current: {}, last: {}}, action) {
    switch (action.type) {
        case RATES_UPDATED:
            return {last: {...state.current}, current: {...action.rates}};
        default:
            return state;
    }
}

function filters(state = {}, action) {
    switch (action.type) {
        case FILTER_UPDATED:
            return {...state, [action.id]: action.checked};
        case FILTERS_LOADED:
            return {...action.filters};
        default:
            return state;
    }
}

export const reducers = combineReducers({pairs, rates, filters});