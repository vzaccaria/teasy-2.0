import React from 'react';
import { Link } from 'react-router';
import { WindowCapture } from '../components/windowCaptureGLReact.jsx';
import AppStore from '../stores/AppStore'
// Debug..

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:containers/PreviewContainer');

export default class PreviewContainer extends React.Component {

    getInitialState() {
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
        if(this.state) {
            return (
                <div>
                    <h2>Previewing {this.props.params}</h2>
                    <WindowCapture width="400" height="280" wid={this.state.currentLiveWindow} dynamic="1" />
                </div>
            );}
        else {
            return <div> cant render anything here </div>;
        }
    }
}
