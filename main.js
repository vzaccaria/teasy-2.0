/* eslint no-path-concat: 0, func-names:0 */
var app = require('app');
var BrowserWindow = require('browser-window');
//var getAppWindowStyle = require('./app/styles/Layout').getAppWindowStyle

var _ = require('lodash')

require('electron-debug')();
require('crash-reporter').start();

var ipc = require('ipc')

var mainWindow = null;
var liveWindow = null;


app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit();
});

function byPassWidChange(w2) {
    ipc.on('update-state', function(event, arg) {
        w2.webContents.send('update-state', arg);
    })
}

function getSecondDisplay() {
    /* This should be  here until we dont update electron */
    var electronScreen = require('screen')
    var displays = electronScreen.getAllDisplays();
    var found = _.find(displays, function(it) {
        return (it.bounds.x !== 0 || it.bounds.y !== 0);
    })
    console.log(JSON.stringify(found, 0, 4));
    if (_.isUndefined(found)) {
        return {
            x: 0,
            y: 0
        }
    } else {
        return {
            x: found.bounds.x,
            y: found.bounds.y,
            fullscreen: true
        }
    }

}

function setupLiveWindow() {
    var wnd = {
        width: 800,
        height: 600
    }
    wnd = _.assign(wnd, getSecondDisplay());

    liveWindow = new BrowserWindow(wnd)

    if (process.env.HOT) {
        liveWindow.loadUrl('file://' + __dirname + '/app/hot-dev-liveWin.html');
    } else {
        liveWindow.loadUrl('file://' + __dirname + '/app/liveWin.html');
    }
    liveWindow.on('closed', function() {
        liveWindow = null;
    })
    if (process.env.NODE_ENV === 'development') {
        //        liveWindow.openDevTools();
    }
    byPassWidChange(liveWindow);
}

function setupMainWindow() {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 800
    });

    if (process.env.HOT) {
        mainWindow.loadUrl('file://' + __dirname + '/app/hot-dev-app.html');
    } else {
        mainWindow.loadUrl('file://' + __dirname + '/app/app.html');
    }

    mainWindow.setAlwaysOnTop(true);

    mainWindow.setResizable(false);

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    if (process.env.NODE_ENV === 'development') {
        //        mainWindow.openDevTools();
    }
}


app.on('ready', function() {
    setupMainWindow();
    setupLiveWindow();
});
