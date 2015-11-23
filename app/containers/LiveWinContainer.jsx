import React from 'react';
import { WindowCapture } from '../components/windowCaptureGLReact.jsx';
import moment from 'moment'
import LiveWinAppStore from '../stores/LiveWinAppStore'
import Loader from '../components/loader';
import _ from 'lodash'

import _debug from 'debug';
const debug = _debug('app:containers/LiveWinContainer');

const validState = (state) => {
    return _.get(state, 'remoteState.currentLiveWindow', false);
}

export default class LiveWinContainer extends React.Component {

    constructor() {
        super()
        LiveWinAppStore.getState();
    }

    onStoreChange(state) {
        this.setState(state)
    }

    componentDidMount() {
        LiveWinAppStore.listen(this.onStoreChange.bind(this))
    }

    componentWillUnmount() {
        LiveWinAppStore.unlisten(this.onStoreChange.bind(this))
    }

    render() {
        debug('rendering container');
        if(validState(this.state)) {
            return (
                <div>
                    <div className="ui inverted menu fixed">
                        <div className="item"> Teasy 2.0 </div>
                        <div className="right menu">
                            <div className="item">
                                {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
                            </div>
                        </div>
                    </div>

                    <WindowCapture
                        width={this.state.window.size.width}
                        height={this.state.window.size.height}
                        wid={this.state.remoteState.currentLiveWindow} dynamic="1" />
                </div>
            );
        }
        else {
            return <Loader message="Waiting for connection" />;
        }
    }
}
