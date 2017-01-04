import {connect} from "react-redux";
import Filter from "../components/Filter";
import {updateFilter} from "../actions";

const FilterContainer = connect(
    state => {
        return {
            pairs: state.pairs,
            filters: state.filters
        }
    },

    dispatch => {
        return {
            onFilterChanged: (id, checked) => dispatch(updateFilter(id, checked))
        }
    }
)(Filter);

export default FilterContainer;