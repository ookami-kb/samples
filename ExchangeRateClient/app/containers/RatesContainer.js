import {connect} from "react-redux";
import Rates from "../components/Rates";

function getTrend(oldValue, newValue) {
    if (oldValue == null) return 'unknown';
    if (oldValue < newValue) return 'growing';
    if (oldValue > newValue) return 'declining';
    return 'stagnating';
}

function getData(state) {
    const ids = Object.keys(state.rates.current).filter(id => state.filters[id] === true);
    return ids.map(id => ({
        id: id, rate: state.rates.current[id],
        trend: getTrend(state.rates.last[id], state.rates.current[id]),
        label: `${state.pairs[id][0].code}/${state.pairs[id][1].code}`
    }));
}

const RatesContainer = connect(
    state => ({
        data: getData(state),
        empty: Object.keys(state.rates.current).length == 0 ? 'No data yet' : 'Select at least one pair'
    })
)(Rates);

export default RatesContainer;