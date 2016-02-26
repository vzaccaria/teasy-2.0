var ipc = require('ipc');

var { updateRemoteState, updateMouseCoordinates } = require('../actions/LiveWinAppActions');

import _debug from 'debug';
const debug = _debug('liveWinApp:utils/liveWinIPC');

function sendStateChange(state) {
    ipc.send('update-state', { state });
}

function listenToMouseCoordinatesChange() {
    ipc.on('update-coordinates', function(coordinates) {
        debug(`Received updated coordinates ${coordinates}`)
        updateMouseCoordinates(coordinates);
    });
}

function listenToStateChange() {
    ipc.on('update-state', function({state}) {
        debug('received updated state')
        debug(state)
        updateRemoteState(state);
    });
}

module.exports = {
    sendStateChange,
    listenToStateChange,
    listenToMouseCoordinatesChange
}
