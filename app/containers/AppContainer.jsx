import React from 'react';
import SystemWindowList from '../components/systemWindowList';
import PreviewContainer from './PreviewContainer'
import AppStore from '../stores/AppStore';

import { WindowListStyle, PreviewStyle } from '../styles/Layout.js'

import _debug from 'debug';
const debug = _debug('app:containers/AppContainer');

debug('loaded!!');

const validState = (state) => {
   return (state !== null)
}

export default class AppContainer extends React.Component {

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
        debug("Rendering")
        if(validState(this.state)) {
            return (
                <div>
                    <div style={WindowListStyle(this.state.window)}>
                        <SystemWindowList />
                    </div>
                    <div style={PreviewStyle}>
                        <PreviewContainer />
                    </div>
                </div>
            );
        } else {
            return <div> not ready yet </div>
        }
    }

}
