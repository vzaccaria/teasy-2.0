var _ = require('lodash')
var alt = require('../utils/alt');
var AppActions = require('../actions/AppActions');

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:stores/AppStore.jsx');

debug('loaded');

class AppStore {
    constructor() {
        /* `this` is the state */
        this.currentLiveWindow = 0

        /* Bind the actions in AppActions */
        this.bindActions(AppActions)
    }

    updateCurrentLiveWindow(wid) {
        this.currentLiveWindow = wid;
    }
}

module.exports = alt.createStore(AppStore, 'AppStore');
