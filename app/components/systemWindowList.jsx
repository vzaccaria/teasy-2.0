import React from 'react';
import _ from 'lodash'

import SystemWindowListItem from './systemWindowListItem';
import { updateCurrentSystemWindows } from '../actions/AppActions'
import AppStore from '../stores/AppStore'

import _debug from 'debug';
const debug = _debug('app:components/systemWindowList');

const windowListAsJson = window.require('native-sgrab-helper').windowListAsJson

debug('loaded');

function updateSystemWindows() {
    updateCurrentSystemWindows(windowListAsJson());
}

function setupWindowListHelper() {
    setInterval( updateSystemWindows, 500)
}


const validState = (state) => {
    return (state !== null)
}

setupWindowListHelper()

export default class SystemWindowList extends React.Component {
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

    render()  {
        debug("Rendering state");
        debug(this.state);

        if(validState(this.state)) {
            let windowList = this.state.currentSystemWindows
            let renderedItems = _.map(windowList, (it, idx) => {
                return (
                    <SystemWindowListItem item={it} key={idx} />
                )});

            return(
                <div className="ui divided items">{renderedItems}</div>
            )
        } else {
            return <div> no windows yet </div>
        }
    }
}
