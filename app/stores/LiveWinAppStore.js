var alt = require('../utils/alt');
var LiveWinAppActions = require('../actions/LiveWinAppActions');

import _debug from 'debug';
const debug = _debug('app:stores/LiveWinAppStore.jsx');

debug('loaded');

class LiveWinAppStore {
    constructor() {
        /* `this` is the state */
        this.currentLiveWindow = 0
        this.window = { size: { width: window.innerWidth, height: window.innerHeight } }

        /* Bind the actions in LiveWinAppActions */
        this.bindActions(LiveWinAppActions)
    }

    updateCurrentLiveWindow(wid) {
        this.currentLiveWindow = wid;
    }

    updateWindowSize(size) {
        this.window.size = size;
    }
}

module.exports = window.$s = alt.createStore(LiveWinAppStore, 'LiveWinAppStore');
