import React from 'react';
import { WindowCapture } from '../components/windowCaptureGLReact.jsx';
import AppStore from '../stores/AppStore'
import _ from 'lodash'
import { getPreviewSize } from '../styles/Layout'
// Debug..

import _debug from 'debug';
const debug = _debug('app:containers/PreviewContainer');

const validState = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.currentLiveWindow !== 0)
}

const windowNotSet = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.currentLiveWindow === 0)
}

export default class PreviewContainer extends React.Component {

    constructor() {
        super();
        AppStore.getState();
    }

    onStoreChange(state) {
        this.setState(state)
    }

    componentDidMount() {
        AppStore.listen(this.onStoreChange.bind(this))
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onStoreChange.bind(this))
    }

    render() {
        debug('rendering container');
        if(validState(this.state)) {
            var width = 400;
            var height = 200
            var s = getPreviewSize(this.state.window.size);
            width = s.width;
            height = s.height*2/3;
            var own = this.state.currentLiveWindowData.owner;
            var nam = this.state.currentLiveWindowData.name;
            var clw = this.state.currentLiveWindow;

            let hd = (
                <h2 className="ui header">
                    {own}
                    <div className="sub header">
                        {nam}
                    </div>
                </h2>);

            return (
                <div>
                    <div style={{ padding: '20px'}} className="ui">
                        <div className="sixteen wide column"> {hd} </div>
                        <div className="ui container">
                        <button className="ui button"><i className="expand icon"></i> Expand </button>
                        <button className="ui button"><i className="remove icon"></i> Close </button>
                        </div>
                    </div>
                    <WindowCapture width={width} height={height} wid={clw} dynamic="1" />
                </div>
            );}
        else {
            if(windowNotSet(this.state)) {
                let { width, height } = getPreviewSize(this.state.window.size);
                let cstyle = {
                    width: width,
                    height: height,
                    paddingTop: height/3
                };
                return (
                    <div style={cstyle} className="ui equal width center aligned padded grid">
                        <div className="row">
                            <div className="column">
                                <div> No window selected! </div>
                                <p> Please choose a window from the left</p>
                            </div>
                        </div>
                    </div>);
            } else {
                return (
                    <div className="ui inverted active dimmer">
                        <div className="ui text loader">
                            Initializing
                        </div>
                    </div>)
            }
        }
    }
}
