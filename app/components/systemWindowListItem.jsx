import React from 'react';

import { WindowCapture } from './windowCaptureGLReact.jsx';
import AppActions from '../actions/AppActions'
import S from 'string';
import Radium from 'radium'
import color from 'color'

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/systemWindowListItem');

debug('lodaded');

@Radium
export default class SystemWindowListItem extends React.Component {

    clicked() {
        debug("Item clicked!!");
        AppActions.updateCurrentLiveWindow(this.props.item.wid);
    }

    render() {
        var shortName = S(this.props.item.name).truncate(30).s
        const hoverOnIt = {
            ':hover': {
                background: color("#FFFFFF").darken(0.05).hexString()
            },
            cursor: 'pointer'
        };
        return (
            <div style={hoverOnIt} className="item" onClick={this.clicked.bind(this)}>
                <div className="ui tiny image">
                    <WindowCapture width="80" height="80" wid={this.props.item.wid}  dynamic="0"/>
                </div>
                <div className="middle aligned content">
                    <div className="header"> {this.props.item.owner} </div>
                    <div className="meta">
                        {shortName} -
                        {this.props.item.wid}
                    </div>
                </div>
            </div>
        );
    }

}

// <div> {this.props.item.owner} </div>
// <div> {this.props.item.layer} </div>
