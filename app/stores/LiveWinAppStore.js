var _ = require('lodash')
var alt = require('../utils/alt');
var LiveWinAppActions = require('../actions/LiveWinAppActions');

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:stores/LiveWinAppStore.jsx');

debug('loaded');

class LiveWinAppStore {
    constructor() {
        /* `this` is the state */
        this.currentLiveWindow = 0

        /* Bind the actions in LiveWinAppActions */
        this.bindActions(LiveWinAppActions)
    }

    updateCurrentLiveWindow(wid) {
        this.currentLiveWindow = wid;
    }
}

module.exports = alt.createStore(LiveWinAppStore, 'LiveWinAppStore');
