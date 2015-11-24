import React from 'react';
import moment from 'moment'
import _ from 'lodash'

import { setBreakTime } from '../actions/AppActions'

let timeChoices = [
    { key: '5m', value: 5, display: '5 minutes' },
    { key: '10m', value: 10, display: '10 minutes' },
    { key: '20m', value: 20, display: '20 minutes' }
];
//
//                {_.map(timeChoices, (e) => {
//                    <a onClick={() => {setBreakTime({minutesFromNow: e.value})}}>
//                    {e.display}
//                    </a>
                   //                 })}

function renderItem(it) {
    return (
        <div key={it.key} style={{cursor: 'pointer'}} onClick={() => setBreakTime({minutesFromNow: it.value})}>
            {it.display}
        </div>);
}
export default class TimeChooser extends React.Component {


    render()  {
        return (
            <div>
                {_.map(timeChoices, renderItem)}
            </div>);

    }
}
