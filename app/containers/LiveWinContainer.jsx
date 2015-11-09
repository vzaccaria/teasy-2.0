import React from 'react';
import { WindowCapture } from '../components/windowCaptureGLReact.jsx';
import LiveWinAppStore from '../stores/LiveWinAppStore'
// Debug..

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:containers/LiveWinContainer');

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
        if(this.state) {
            return (
                <div>
                    <h2>Previewing {this.props.params}</h2>
                    <WindowCapture width="800" height="600" wid={this.state.currentLiveWindow} dynamic="1" />
                </div>
            );}
        else {
            return <div> cant render anything here </div>;
        }
    }
}
