import React from 'react';
import { WindowCapture } from '../components/windowCaptureGLReact.jsx';
import LiveWinAppStore from '../stores/LiveWinAppStore'
import _ from 'lodash'

import _debug from 'debug';
const debug = _debug('app:containers/LiveWinContainer');

const validState = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.currentLiveWindow !== 0)
}

export default class PreviewContainer extends React.Component {

    getInitialState() {
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
                    <WindowCapture
                        width={this.state.window.size.width}
                        height={this.state.window.size.height}
                        wid={this.state.currentLiveWindow} dynamic="1" />
                </div>
            );}
        else {
            return <div> sorry nothing to render...</div>;
        }
    }
}
