var _ = require('lodash')
var alt = require('../utils/alt');
var AppActions = require('../actions/AppActions');
import {
    sendStateChange
}
from '../utils/liveWinIPC'
import moment from 'moment'
import i18n from '../utils/i18n'

import _debug from 'debug';
const debug = _debug('app:stores/AppStore.jsx');
const windowListAsJson = window.require('./utils/native-sgrab-helper').windowListAsJson

debug('loaded');

class AppStore {
    constructor() {
        /* `this` is the state */
        this.currentLiveWindow = 0
        this.currentLiveWindowData = {}
        this.currentLanguage = 'en';
        this.__ = i18n(this.currentLanguage)
        this.priorityMode = "normal";
        this.showTopBar = true;
        this.window = {
            size: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        this.liveView = {
            time: {
                showTime: false,
                breakTime: undefined
            }
        }
        this.pointer = {
            pointerActive: true,
            pointerPosition: [0.0, 0.0],
            pointerIntensity: 0.9,
            pointerSize: 0.05
        }
        this.currentSystemWindows = windowListAsJson();

        /* Bind the actions in AppActions */
        this.bindActions(AppActions)
    }

    _updateCurrentLiveWindowUnconditional(wid) {
            this.currentLiveWindow = wid;
            this.currentLiveWindowData = _.first(_.filter(this.currentSystemWindows, (it) => it.wid == wid))
    }

    updateCurrentLiveWindow(wid) {
        if (this.priorityMode === "normal") {
            this._updateCurrentLiveWindowUnconditional(wid);
            sendStateChange(this);
        }
    }

    updateCurrentSystemWindows(list) {
        let windowList = _.filter(list, (it) => it.layer == 0);
        windowList = _.filter(windowList, (it) => it.name !== 'Teasy 2.0')
        this.currentSystemWindows = windowList;
        if(this.priorityMode === "dynamic") {
            this._updateCurrentLiveWindowUnconditional(_.head(windowList).wid);
        }
        sendStateChange(this)
    }

    updateLiveViewTime(data) {
        this.liveView.time = _.assign(this.liveView.time, data)
        sendStateChange(this)
    }

    updateWindowSize(size) {
        this.window.size = size;
        sendStateChange(this)
    }

    setBreakTime({
        minutesFromNow
    }) {
        this.liveView.breakTime = moment().add(minutesFromNow, "minute").format("HH:mm")
            // Shouldnt invoke sendStateChange?
    }

    clearBreakTime() {
        this.liveView.breakTime = undefined;
        // Shouldnt invoke sendStateChange?
    }

    togglePriorityMode() {
        if(this.priorityMode === "normal") {
            this.priorityMode = "dynamic";
        } else {
            this.priorityMode = "normal";
        }
        sendStateChange(this);
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        this.__ = i18n(this.currentLanguage)
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        this.__ = i18n(this.currentLanguage)
    }

    toggleShowTopBar() {
        this.showTopBar = !this.showTopBar;
        sendStateChange(this);
    }
}

module.exports = window.$s = alt.createStore(AppStore, 'AppStore');
