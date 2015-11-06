import React from 'react';

import { WindowCapture } from './windowCaptureGLReact.jsx';
import AppActions from '../actions/AppActions'
import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/systemWindowListItem');

debug('lodaded');

export default class SystemWindowListItem extends React.Component {

    clicked() {
        debug("Item clicked!!");
        AppActions.updateCurrentLiveWindow(this.props.item.wid);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div> {this.props.item.name} </div>
                <div onClick={this.clicked.bind(this)}>
                    {this.props.item.wid}
                </div>
                <WindowCapture width="200" height="140" wid={this.props.item.wid}  dynamic="0"/>
            </div>
        );
    }

}

// <div> {this.props.item.owner} </div>
// <div> {this.props.item.layer} </div>
