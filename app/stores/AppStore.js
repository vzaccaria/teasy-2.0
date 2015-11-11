var _ = require('lodash')
var alt = require('../utils/alt');
var AppActions = require('../actions/AppActions');

import _debug from 'debug';
const debug = _debug('app:stores/AppStore.jsx');
const windowListAsJson = window.require('native-sgrab-helper').windowListAsJson

debug('loaded');

class AppStore {
    constructor() {
        /* `this` is the state */
        this.currentLiveWindow = 0
        this.currentLiveWindowData = {}
        this.window = { size: { width: window.innerWidth, height: window.innerHeight } }
        this.currentSystemWindows = windowListAsJson();

        /* Bind the actions in AppActions */
        this.bindActions(AppActions)
    }

    updateCurrentLiveWindow(wid) {
        this.currentLiveWindow = wid;
        this.currentLiveWindowData = _.first(_.filter(this.currentSystemWindows, (it) => it.wid == wid))
    }

    updateCurrentSystemWindows(list) {
        let windowList = _.filter(list, (it) => it.layer == 0);
        windowList = _.filter(windowList, (it) => it.name !== 'Teasy 2.0')
        this.currentSystemWindows = windowList;
    }

    updateWindowSize(size) {
        this.window.size = size;
    }
}

module.exports = window.$s = alt.createStore(AppStore, 'AppStore');
