import React from 'react';
import ndarray from 'ndarray';
import _ from 'lodash'
import { GLDisplayUintBuf } from './GLDisplayUintBuf';
import Loader from './loader'

const nsh = window.require('./utils/native-sgrab-helper');

window.grabHelper = nsh;

import _debug from 'debug';
const debug = _debug('app:components/windowCapture');

function getWindowBufferFromWid(wid, width, height) {
    return nsh.nativeSgrabHelper.getImageBufferResized(wid, width, height);
}


debug('loaded');

function isDynamic(props) {
    return !_.isUndefined(props.dynamic) && _.isEqual(props.dynamic, "1");
}

let WindowCapture = React.createClass({

    refreshImageBuffer: function(props) {
        let width = parseInt(props.width);
        let height = parseInt(props.height);
        let wid = parseInt(props.wid);
        debug(width, height, wid);
        let { buf, cols, rows } = getWindowBufferFromWid(wid, width, height);
        debug(cols, rows);
        this.setState({
            buf: ndarray(buf, [rows, cols, 4]).transpose(1,0),
            width: cols,
            height: rows,
            time: Date.now()
        });
    },

    getInitialState: function() {
        return {
            buf: undefined,
            width: 1,
            height: 1,
            time: Date.now()
        };
    },

    componentDidMount: function() {
        if(isDynamic(this.props)) {
            setInterval(() => {
                this.refreshImageBuffer(this.props);
            }, 1000);
        } else {
            this.refreshImageBuffer(this.props);
        }
    },

    componentWillReceiveProps: function(props) {
        this.refreshImageBuffer(props);
    },

    shouldComponentUpdate: function(np, ns) {
        var bufChanged = _.isUndefined(this.state.buf) && !_.isUndefined(ns.buf);
        var propsChanged = !(_.isEqual(np, this.props));
        var timeChanged = (ns.time !== this.state.time);
        var shouldUpdate = propsChanged || bufChanged || (isDynamic(this.props) && timeChanged);
        return shouldUpdate;
    },

    render: function()  {
        if(_.isUndefined(this.state.buf)) {
            let s = {
                width: this.props.width,
                height: this.props.height
            }
            return (<Loader style={s} inverted="1" message="Rendering.." />);
        } else {
            return (
                <GLDisplayUintBuf
                    width={this.props.width}
                    height={this.props.height}
                    image={this.state.buf}/>
            );
        }
    }

});

module.exports = { WindowCapture }
