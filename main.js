/* eslint no-path-concat: 0, func-names:0 */
var app = require('app');
var BrowserWindow = require('browser-window');
//var getAppWindowStyle = require('./app/styles/Layout').getAppWindowStyle

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

function setupLiveWindow() {
    liveWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
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
    mainWindow = new BrowserWindow({ width: 350, height: 800});

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
