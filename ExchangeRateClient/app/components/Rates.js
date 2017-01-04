import React from "react";

const Rates = ({data, empty}) => {
    let content;
    if (data.length == 0) {
        content = <tbody>
        <tr>
            <td colSpan="3" className="text-xs-center">{empty}</td>
        </tr>
        </tbody>
    } else {
        content = <tbody>
        {data.map(item => <tr key={item.id}>
            <td>{item.label}</td>
            <td>{item.rate}</td>
            <td>{item.trend}</td>
        </tr>)}
        </tbody>;
    }
    return <table className="table table-striped table-bordered">
        <thead>
        <tr>
            <th>Pair</th>
            <th>Rate</th>
            <th>Trend</th>
        </tr>
        </thead>

        {content}
    </table>
};

export default Rates;