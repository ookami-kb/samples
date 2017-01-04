import {endpoint} from "./config";
import {createStore, compose, applyMiddleware} from "redux";
import {reducers} from "./reducers";
import thunkMiddleware from "redux-thunk";
import {render} from "react-dom";
import {Provider} from "react-redux";
import React from "react";
import {fetchPairs, loadFilters} from "./actions";
import FilterContainer from "./containers/FilterContainer";
import RatesContainer from "./containers/RatesContainer";

let store = createStore(reducers,
    compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

render(
    <Provider store={store}>
        <div className="row">
            <div className="col-md-8">
                <RatesContainer/>
            </div>

            <div className="col-md-4">
                <FilterContainer/>
            </div>
        </div>
    </Provider>,
    document.getElementById('exchange-rate-client')
);

store.dispatch(fetchPairs());
store.dispatch(loadFilters());

