import React from "react";

const Filter = ({pairs, filters, onFilterChanged}) => {
    const ids = Object.keys(pairs);

    let content;
    if (ids.length == 0) {
        content = <div className="text-xs-center">Loading...</div>;
    } else {
        content = <div>
            {ids.map(item => <div className="form-check" key={item}>
                <label htmlFor="" className="form-check-label">
                    <input type="checkbox"
                           onChange={e => onFilterChanged(item, e.target.checked)}
                           checked={filters[item] === true}
                           className="form-check-input"/>
                    &nbsp;
                    <span className="tag tag-default">{pairs[item][0].code}/{pairs[item][1].code}</span>
                    <br/>
                    <small>{pairs[item][0].name} / {pairs[item][1].name}</small>
                </label>
            </div>)}
        </div>;
    }

    return <div className="card">
        <div className="card-header">Filters</div>
        <div className="card-block">
            {content}
        </div>
    </div>
};

export default Filter;