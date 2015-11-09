var ipc = require('ipc');

var { updateCurrentLiveWindow } = require('../actions/LiveWinAppActions');

import _debug from 'debug';
_debug.enable('liveWinApp:*');
const debug = _debug('liveWinApp:utils/liveWinIPC');

function sendWidChange(wid) {
    ipc.send('update-current-live-window', { wid });
}

function listenToWidChange() {
    debug("Registering IPC handler")
    ipc.on('update-current-live-window', function({wid}) {
        updateCurrentLiveWindow(wid);
    });
}


module.exports = {
    listenToWidChange,
    sendWidChange
}
