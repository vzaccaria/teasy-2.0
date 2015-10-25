import React from 'react';
import ndarray from 'ndarray';
import _ from 'lodash'

//import { computeAllPosAndSizeNoFit } from 'image-data-resizer';

import { GLDisplayUintBuf } from './GLDisplayUintBuf';

let nsh = window.require('native-sgrab-helper');

window.grabHelper = nsh;

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/windowCapture');

function getWindowBufferFromWid(wid, width, height) {
    return nsh.nativeSgrabHelper.getImageBufferResized(wid, width, height);
}



debug('loaded');

let WindowCapture = React.createClass({

    refreshImageBuffer: function() {
        let width = parseInt(this.props.width);
        let height = parseInt(this.props.height);
        let wid = parseInt(this.props.wid);
        debug(width, height, wid);
        let { buf, cols, rows } = getWindowBufferFromWid(wid, width, height);
        debug(cols, rows);
        this.setState({buf: ndarray(buf, [rows, cols, 4]).transpose(1,0), width: cols, height: rows});
    },

    getInitialState: function() {
        return { buf: undefined, width: 1, height: 1 };
    },

    componentDidMount: function() {
        debug('mounting');
        if(!_.isUndefined(this.props.dynamic) && this.props.dynamic==="1") {
            setInterval(this.refreshImageBuffer.bind(this), 1000);
        } else {
            this.refreshImageBuffer();
        }
    },

    render: function()  {
        if(_.isUndefined(this.state.buf)) {
            return (<div>no buf</div>);
        } else {
            return (
                <GLDisplayUintBuf width={this.props.width} height={this.props.height} image={this.state.buf}/>
            );
        }
    }

});

module.exports = { WindowCapture }
