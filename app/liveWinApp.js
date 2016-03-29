import __ from "gl-react/react"
import React from 'react';
import ReactDOM from 'react-dom';
import LiveWinContainer from './containers/LiveWinContainer';
import { updateWindowSize } from './actions/LiveWinAppActions';
import { listenToStateChange } from './utils/liveWinIPC';
import _debug from 'debug';
import '../semantic/src/semantic.less';
import './styles/blink.less';


const debug = _debug('app:liveWinApp');
debug('Live w. started');

window.$mine = { }
window.$mine.enableDebugAll  = () => { _debug.enable('app:*') }
window.$mine.disableDebugAll = () => { _debug.disable('app:*') }
window.$mine.disableDebugAll()

function registerListeners() {
    listenToStateChange();
    window.addEventListener('resize', function() {
        updateWindowSize({width: window.innerWidth, height: window.innerHeight})
    }, true)
}


ReactDOM.render(<LiveWinContainer/>, document.getElementById('react-live-win-root'));

registerListeners()
