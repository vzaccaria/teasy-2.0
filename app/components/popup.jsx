import React from 'react';

import '../../semantic/src/definitions/modules/popup'
import '../../semantic/src/definitions/modules/transition'

import $ from 'jquery'


function asPopup(iconName, popup) {

    let IconPopup = React.createClass({
        componentDidMount: function() {
            let element = $('.popact');
            element.popup({
                inline   : true,
                hoverable: true,
                position : 'bottom left',
                delay: {
                    show: 100
                }}
            )
        },
        render: function() {
            return (
                    <a className="ui basic icon item popact">
                        <i className={`${iconName} icon`} />
                    </a>

            );}
    });
    let IconPopupContent = React.createClass({
        render: function() {
            return (
                <div className="ui popup">
                    {popup}
                </div>);
        }
    });
    return { IconPopup, IconPopupContent }
}


module.exports = { asPopup }
