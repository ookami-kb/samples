import {endpoint, configuration, interval} from "./config.json";

export const PAIRS_UPDATED = 'PAIRS_UPDATED';
export const pairsUpdated = pairs => ({type: PAIRS_UPDATED, pairs});

export const RATES_UPDATED = 'RATES_UPDATED';
export const ratesUpdated = rates => ({type: RATES_UPDATED, rates});

export const FILTER_UPDATED = 'FILTER_UPDATED';
export const filterUpdated = (id, checked) => ({type: FILTER_UPDATED, id, checked});

export const FILTERS_LOADED = 'FILTERS_LOADED';
export const filtersLoaded = filters => ({type: FILTERS_LOADED, filters});

export function updateFilter(id, checked) {
    return dispatch => {
        let current = JSON.parse(localStorage.getItem('filters')) || {};
        current[id] = checked;
        localStorage.setItem('filters', JSON.stringify(current));
        dispatch(filterUpdated(id, checked))
    }
}

export function loadFilters() {
    return dispatch => {
        dispatch(filtersLoaded(JSON.parse(localStorage.getItem('filters')) || {}));
    }
}

export function fetchPairs() {
    return dispatch => {
        fetch(configuration)
            .then(response => response.json())
            .then(json => {
                dispatch(pairsUpdated(json.currencyPairs));
                dispatch(fetchRates());
                setInterval(() => dispatch(fetchRates()), interval);
            })
    }
}

const encodePairIds = pairs => pairs.map(k => `currencyPairIds=${encodeURIComponent(k)}`).join('&');

export function fetchRates() {
    return (dispatch, getState) => {
        fetch(endpoint + '?' + encodePairIds(Object.keys(getState().pairs)))
            .then(response => {
                if (response.status == 500) {
                    throw new Error();
                } else {
                    return response.json();
                }
            })
            .then(json => dispatch(ratesUpdated(json.rates)))
            .catch(() => dispatch(fetchRates()))
        ;
    }
}