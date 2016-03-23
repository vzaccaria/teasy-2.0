import React from 'react';
import moment from 'moment'
import _ from 'lodash'
import color from 'color'

import { updatePointerSettings } from '../actions/AppActions'

let colorChoices = [
    { key: 'red'   , value: color("#D33131").alpha(1).rgbaString() } ,
    { key: 'green' , value: color("#D33131").alpha(0.8).rgbaString() } ,
    { key: 'blue'  , value: color("#D33131").alpha(0.5).rgbaString() }
];

function renderItem(it) {

    let handler = () => {
        updatePointerSettings({pointerColor: it.value})
    }

    let style = {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        marginBottom: '0.5rem',
        borderRadius: '50%',
        background: it.value
    }
    return (
        <div key={it.key} style={style} onClick={handler}>
        </div>);
}
export default class ColorChooser extends React.Component {


    render()  {
        return (
            <div>
                {_.map(colorChoices, renderItem)}
            </div>);

    }
}
